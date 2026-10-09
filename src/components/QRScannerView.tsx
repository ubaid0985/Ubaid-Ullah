import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import { 
  ScanLine, 
  Upload, 
  Camera, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface QRScannerViewProps {
  onLoadIntoGenerator: (decodedString: string) => void;
}

export const QRScannerView: React.FC<QRScannerViewProps> = ({ onLoadIntoGenerator }) => {
  const [decodedData, setDecodedData] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setAnalyzing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setErrorMsg('Could not initialize canvas context.');
          setAnalyzing(false);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height, {
          inversionAttempts: 'attemptBoth'
        });

        setAnalyzing(false);
        if (code && code.data) {
          setDecodedData(code.data);
          setErrorMsg(null);
        } else {
          setErrorMsg('No QR code detected in this image. Try another image with clear contrast.');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Camera scanner handling
  const startCamera = async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
        scanCameraFrame();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not access device camera. Please check camera permissions or upload an image.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsCameraActive(false);
  };

  const scanCameraFrame = () => {
    if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      animFrameRef.current = requestAnimationFrame(scanCameraFrame);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imgData.data, imgData.width, imgData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code && code.data) {
        setDecodedData(code.data);
        stopCamera();
        return;
      }
    }

    animFrameRef.current = requestAnimationFrame(scanCameraFrame);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleCopy = async () => {
    if (!decodedData) return;
    await navigator.clipboard.writeText(decodedData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <ScanLine className="w-3.5 h-3.5" />
          <span>Universal QR Decoder & Verifier</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Scan & Test QR Codes
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Verify scannability of any image file or test live with your device camera. Read URLs, Wi-Fi configs, contacts, or raw text payloads instantly.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-6">
        {/* Input Methods: File Upload & Camera Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* File Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-indigo-50/20 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">
              Upload QR Image File
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports PNG, JPG, WebP, or SVG screenshots
            </p>
          </div>

          {/* Camera Scanner Toggle */}
          <div
            onClick={isCameraActive ? stopCamera : startCamera}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isCameraActive
                ? 'border-red-400 bg-red-50/40 text-red-700'
                : 'border-slate-300 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/20 text-slate-800 group'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform ${
                isCameraActive
                  ? 'bg-red-100 text-red-600'
                  : 'bg-indigo-100 text-indigo-600 group-hover:scale-110'
              }`}
            >
              <Camera className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold">
              {isCameraActive ? 'Stop Live Camera' : 'Use Device Camera'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {isCameraActive ? 'Scanning live video stream...' : 'Scan code directly with webcam'}
            </p>
          </div>
        </div>

        {/* Live Camera View Area */}
        {isCameraActive && (
          <div className="relative rounded-2xl overflow-hidden bg-black max-w-md mx-auto aspect-video border border-slate-800 flex items-center justify-center shadow-lg">
            <video
              ref={videoRef}
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-8 border-2 border-dashed border-indigo-400/80 rounded-xl pointer-events-none animate-pulse" />
          </div>
        )}

        {/* Status indicator */}
        {analyzing && (
          <div className="flex items-center justify-center space-x-2 text-indigo-600 py-4 font-medium text-sm">
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Analyzing image pixels for QR data matrix...</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Decoded Result Card */}
        {decodedData && (
          <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200/80 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Successfully Decoded!</span>
              </div>
              <span className="text-[11px] font-mono bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full font-semibold">
                Valid Matrix
              </span>
            </div>

            {/* Decoded content box */}
            <div className="p-3 bg-white rounded-xl border border-emerald-200 text-slate-900 font-mono text-xs sm:text-sm break-all select-all">
              {decodedData}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onLoadIntoGenerator(decodedData)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <span>Edit & Re-style in Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Decoded Text</span>
                  </>
                )}
              </button>

              {/^https?:\/\//i.test(decodedData) && (
                <a
                  href={decodedData}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open URL</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
