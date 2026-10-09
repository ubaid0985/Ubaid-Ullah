import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Share2, 
  Maximize2,
  BookmarkPlus,
  Smartphone,
  CreditCard,
  Coffee,
  QrCode
} from 'lucide-react';
import { 
  QRStylingConfig, 
  ExportFormat, 
  ExportResolution, 
  QRHistoryItem 
} from '../types/qr';
import { 
  renderCompositeCanvas, 
  verifyQRScannability, 
  downloadQRCode, 
  copyQRImageToClipboard 
} from '../utils/qrRenderer';

interface QRPreviewProps {
  payload: string;
  config: QRStylingConfig;
  onSaveHistory: (item: Omit<QRHistoryItem, 'id' | 'createdAt'>) => void;
  summaryTitle: string;
}

type MockupMode = 'standard' | 'phone' | 'table-stand' | 'card';

export const QRPreview: React.FC<QRPreviewProps> = ({
  payload,
  config,
  onSaveHistory,
  summaryTitle
}) => {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [resolution, setResolution] = useState<ExportResolution>(1024);
  const [mockupMode, setMockupMode] = useState<MockupMode>('standard');
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [scanVerification, setScanVerification] = useState<{
    success: boolean;
    decodedData: string | null;
  }>({ success: true, decodedData: payload });

  const containerRef = useRef<HTMLDivElement>(null);

  // Render preview canvas whenever payload or config updates
  useEffect(() => {
    let isCancelled = false;

    const render = async () => {
      try {
        const canvas = await renderCompositeCanvas(payload, config, 640);
        if (isCancelled) return;

        const url = canvas.toDataURL('image/png');
        setPreviewDataUrl(url);

        // Run client-side jsQR verification
        const result = verifyQRScannability(canvas);
        setScanVerification({
          success: result.success,
          decodedData: result.decodedData
        });
      } catch (err) {
        console.error('Preview render error:', err);
      }
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [payload, config]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadQRCode(payload, config, format, resolution, `qrcraft-${Date.now()}`);
      
      // Trigger festive celebration
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Also automatically save to history on download
      onSaveHistory({
        title: summaryTitle || 'Custom QR Code',
        type: 'url',
        payload,
        styling: config,
        previewDataUrl
      });
      setIsSaved(true);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to generate high-resolution image for download. Please try another format.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    const success = await copyQRImageToClipboard(payload, config);
    if (success) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2500);
    } else {
      // Fallback
      alert('Your browser blocked direct image clipboard access. Please use the Download button.');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveToHistory = () => {
    onSaveHistory({
      title: summaryTitle || 'Custom QR Code',
      type: 'url',
      payload,
      styling: config,
      previewDataUrl
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 sticky top-20">
      {/* Top Header & Live Scan Verifier Badge */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Live Preview & Test
          </span>
          <h3 className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
            {summaryTitle || 'Your QR Code'}
          </h3>
        </div>

        {/* Real-Time Scan Verifier Badge */}
        {scanVerification.success ? (
          <div 
            title={`Verified readable! Decodes to: ${scanVerification.decodedData}`}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Scannable</span>
          </div>
        ) : (
          <div 
            title="Contrast or logo may be too dense. Consider increasing Error Correction Level to 'H' or reducing logo size."
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Low Contrast</span>
          </div>
        )}
      </div>

      {/* Mockup View Switcher */}
      <div className="flex items-center justify-center space-x-1 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setMockupMode('standard')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            mockupMode === 'standard' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Canvas</span>
        </button>

        <button
          type="button"
          onClick={() => setMockupMode('phone')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            mockupMode === 'phone' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Phone</span>
        </button>

        <button
          type="button"
          onClick={() => setMockupMode('table-stand')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            mockupMode === 'table-stand' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>Table Stand</span>
        </button>

        <button
          type="button"
          onClick={() => setMockupMode('card')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            mockupMode === 'card' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Card</span>
        </button>
      </div>

      {/* Preview Display Stage */}
      <div 
        ref={containerRef}
        className="relative min-h-[300px] flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-2xl border border-slate-200/80 overflow-hidden"
      >
        {/* Subtle dot grid backdrop */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />

        {/* 1. Standard Mode */}
        {mockupMode === 'standard' && previewDataUrl && (
          <div className="relative group max-w-[280px] sm:max-w-[320px] transition-transform hover:scale-[1.02] duration-300">
            <img
              src={previewDataUrl}
              alt="Generated QR Code"
              className="w-full h-auto rounded-xl shadow-lg shadow-indigo-950/5 border border-slate-200/60 object-contain bg-white"
            />
          </div>
        )}

        {/* 2. Phone Mockup Mode */}
        {mockupMode === 'phone' && previewDataUrl && (
          <div className="w-[220px] rounded-[32px] bg-slate-900 p-2.5 shadow-2xl border-4 border-slate-800">
            {/* Notch */}
            <div className="w-20 h-3.5 bg-black rounded-b-xl mx-auto mb-2 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800/80 mr-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800/80" />
            </div>
            {/* Screen */}
            <div className="bg-slate-950 rounded-[22px] p-3 text-center text-white">
              <p className="text-[10px] text-slate-400 font-medium mb-1">Camera Preview</p>
              <div className="bg-white rounded-xl p-2 shadow-inner">
                <img
                  src={previewDataUrl}
                  alt="QR on Phone"
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-[9px] text-indigo-400 mt-2 font-mono truncate">
                {payload}
              </p>
            </div>
          </div>
        )}

        {/* 3. Table Stand Mockup Mode */}
        {mockupMode === 'table-stand' && previewDataUrl && (
          <div className="w-[230px] flex flex-col items-center">
            {/* Stand body */}
            <div className="w-full bg-gradient-to-b from-slate-100 to-white rounded-t-2xl p-4 shadow-xl border border-slate-300 text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
                RESTAURANT & BAR
              </span>
              <div className="bg-white p-1 rounded-xl shadow-xs border border-slate-200">
                <img
                  src={previewDataUrl}
                  alt="QR on Stand"
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-[10px] font-bold text-slate-800 mt-2">
                TOUCHLESS MENU
              </p>
            </div>
            {/* Stand Base */}
            <div className="w-48 h-4 bg-slate-800 rounded-b-md shadow-md border-t-2 border-slate-700" />
          </div>
        )}

        {/* 4. Business Card Mockup Mode */}
        {mockupMode === 'card' && previewDataUrl && (
          <div className="w-[280px] bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-4 shadow-2xl border border-slate-700 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold tracking-tight">QRCRAFT STUDIO</p>
                <p className="text-[9px] text-slate-400">Digital Identity Card</p>
              </div>
              <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30">
                VIP
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 h-24 bg-white rounded-lg p-1 shrink-0">
                <img
                  src={previewDataUrl}
                  alt="QR on Card"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-[10px] text-slate-300 space-y-1">
                <p className="font-semibold text-white">Instant Connect</p>
                <p className="text-[9px] text-slate-400 line-clamp-2">
                  Scan code to access credentials & portfolio.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Options (Format & High-Res Resolution) */}
      <div className="mt-5 space-y-3.5 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-3">
          {/* Format */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              File Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ExportFormat)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="png">PNG (Lossless Image)</option>
              <option value="jpg">JPG (Compressed)</option>
              <option value="svg">SVG (Scalable Vector)</option>
              <option value="webp">WebP (Modern Web)</option>
            </select>
          </div>

          {/* Resolution */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resolution
            </label>
            <select
              value={resolution}
              onChange={(e) => setResolution(Number(e.target.value) as ExportResolution)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value={512}>512 × 512 (Standard Web)</option>
              <option value={1024}>1024 × 1024 (HD Display)</option>
              <option value={2048}>2048 × 2048 (Print 300 DPI)</option>
              <option value={4096}>4096 × 4096 (Ultra 4K Print)</option>
            </select>
          </div>
        </div>

        {/* Primary Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>
            {isDownloading ? 'Generating High-Res Export...' : `Download ${format.toUpperCase()} (${resolution}px)`}
          </span>
        </button>

        {/* Action Row: Copy Image, Copy Payload, Save to History */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopyImage}
            className="flex items-center justify-center space-x-1.5 py-2 px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Copy QR image to clipboard"
          >
            {copiedImage ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Image</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center justify-center space-x-1.5 py-2 px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Copy encoded raw text or URL"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSaveToHistory}
            className="flex items-center justify-center space-x-1.5 py-2 px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="Save to session history"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-indigo-700">Saved</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
