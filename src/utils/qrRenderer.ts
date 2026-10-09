import QRCodeStyling, { Options } from 'qr-code-styling';
import jsQR from 'jsqr';
import { QRStylingConfig, ExportFormat, ExportResolution } from '../types/qr';

export function createQRCodeInstance(payload: string, config: QRStylingConfig, size: number = 320): QRCodeStyling {
  const options = mapConfigToQRCodeStylingOptions(payload, config, size);
  return new QRCodeStyling(options);
}

export function mapConfigToQRCodeStylingOptions(
  payload: string,
  config: QRStylingConfig,
  size: number = 320
): Options {
  const dotsOptions: any = {
    type: config.dotType
  };

  if (config.dotColorType === 'solid') {
    dotsOptions.color = config.dotColor;
  } else {
    dotsOptions.gradient = {
      type: config.dotGradient.type,
      rotation: (config.dotGradient.rotation * Math.PI) / 180,
      colorStops: config.dotGradient.colorStops
    };
  }

  const cornersSquareOptions: any = {
    type: config.cornerSquareType
  };
  if (config.customCornerSquareColor) {
    cornersSquareOptions.color = config.cornerSquareColor;
  }

  const cornersDotOptions: any = {
    type: config.cornerDotType
  };
  if (config.customCornerDotColor) {
    cornersDotOptions.color = config.cornerDotColor;
  }

  const backgroundOptions: any = {
    color: config.bgTransparent ? 'transparent' : config.bgColor
  };

  return {
    width: size,
    height: size,
    type: 'canvas',
    data: payload || 'https://google.com',
    margin: config.margin,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: config.errorCorrectionLevel
    },
    image: config.logoUrl || undefined,
    imageOptions: {
      hideBackgroundDots: config.hideBackgroundDots,
      imageSize: config.logoSize,
      margin: config.logoMargin,
      crossOrigin: 'anonymous'
    },
    dotsOptions,
    cornersSquareOptions,
    cornersDotOptions,
    backgroundOptions
  };
}

/**
 * Renders the full framed or unframed QR code onto an offscreen canvas at the requested target resolution.
 */
export async function renderCompositeCanvas(
  payload: string,
  config: QRStylingConfig,
  resolution: number = 1024
): Promise<HTMLCanvasElement> {
  // Step 1: Render raw QR Code styling to canvas at high resolution
  const qrBaseSize = config.frameStyle === 'none' ? resolution : Math.round(resolution * 0.72);
  const qrInstance = createQRCodeInstance(payload, config, qrBaseSize);
  
  const rawBlob = await qrInstance.getRawData('png');
  if (!rawBlob) {
    throw new Error('Failed to generate raw QR image data.');
  }

  const rawImage = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(rawBlob as Blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });

  if (config.frameStyle === 'none') {
    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D canvas context');
    
    if (!config.bgTransparent) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, resolution, resolution);
    }
    ctx.drawImage(rawImage, 0, 0, resolution, resolution);
    return canvas;
  }

  // Frame Rendering
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const width = resolution;
  // Calculate height based on frame style
  let height = resolution;
  if (config.frameStyle === 'bottom-banner') {
    height = Math.round(resolution * 1.25);
  } else if (config.frameStyle === 'top-banner') {
    height = Math.round(resolution * 1.25);
  } else if (config.frameStyle === 'pill-badge') {
    height = Math.round(resolution * 1.22);
  } else if (config.frameStyle === 'phone-frame') {
    height = Math.round(resolution * 1.35);
  } else if (config.frameStyle === 'card-border') {
    height = Math.round(resolution * 1.15);
  } else if (config.frameStyle === 'glow-border') {
    height = Math.round(resolution * 1.18);
  }

  canvas.width = width;
  canvas.height = height;

  const frameBg = config.frameBgColor || '#ffffff';
  const frameColor = config.frameColor || '#4f46e5';
  const textColor = config.frameTextColor || '#ffffff';
  const text = config.frameText || 'SCAN ME';

  // Base canvas background
  ctx.fillStyle = frameBg;
  roundRect(ctx, 0, 0, width, height, resolution * 0.04);
  ctx.fill();

  if (config.frameStyle === 'bottom-banner') {
    // Outer border
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = resolution * 0.02;
    roundRect(ctx, 10, 10, width - 20, height - 20, resolution * 0.04);
    ctx.stroke();

    // Draw QR code centered in top portion
    const qrSize = Math.round(width * 0.78);
    const qrX = Math.round((width - qrSize) / 2);
    const qrY = Math.round(height * 0.08);
    ctx.drawImage(rawImage, qrX, qrY, qrSize, qrSize);

    // Bottom banner bar
    const bannerHeight = Math.round(height * 0.17);
    const bannerY = height - bannerHeight - 20;
    const bannerWidth = width - 40;
    const bannerX = 20;

    ctx.fillStyle = frameColor;
    roundRect(ctx, bannerX, bannerY, bannerWidth, bannerHeight, resolution * 0.025);
    ctx.fill();

    // Banner Text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.round(bannerHeight * 0.38)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.toUpperCase(), width / 2, bannerY + bannerHeight / 2);

  } else if (config.frameStyle === 'top-banner') {
    // Top banner
    const bannerHeight = Math.round(height * 0.16);
    const bannerY = 20;
    const bannerWidth = width - 40;
    const bannerX = 20;

    ctx.fillStyle = frameColor;
    roundRect(ctx, bannerX, bannerY, bannerWidth, bannerHeight, resolution * 0.025);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.round(bannerHeight * 0.4)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.toUpperCase(), width / 2, bannerY + bannerHeight / 2);

    // Draw QR
    const qrSize = Math.round(width * 0.78);
    const qrX = Math.round((width - qrSize) / 2);
    const qrY = bannerY + bannerHeight + Math.round(height * 0.05);
    ctx.drawImage(rawImage, qrX, qrY, qrSize, qrSize);

    // Border
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = resolution * 0.015;
    roundRect(ctx, 10, 10, width - 20, height - 20, resolution * 0.04);
    ctx.stroke();

  } else if (config.frameStyle === 'pill-badge') {
    // Elegant floating pill under the QR
    const qrSize = Math.round(width * 0.8);
    const qrX = Math.round((width - qrSize) / 2);
    const qrY = Math.round(height * 0.07);
    ctx.drawImage(rawImage, qrX, qrY, qrSize, qrSize);

    const pillWidth = Math.round(width * 0.65);
    const pillHeight = Math.round(height * 0.12);
    const pillX = Math.round((width - pillWidth) / 2);
    const pillY = qrY + qrSize + Math.round(height * 0.04);

    ctx.fillStyle = frameColor;
    roundRect(ctx, pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = `600 ${Math.round(pillHeight * 0.4)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, pillY + pillHeight / 2);

  } else if (config.frameStyle === 'phone-frame') {
    // Smartphone mockup style
    ctx.fillStyle = '#0f172a';
    roundRect(ctx, 16, 16, width - 32, height - 32, resolution * 0.08);
    ctx.fill();

    // Notch speaker
    ctx.fillStyle = '#334155';
    const notchWidth = width * 0.28;
    const notchHeight = height * 0.025;
    roundRect(ctx, (width - notchWidth) / 2, 34, notchWidth, notchHeight, notchHeight / 2);
    ctx.fill();

    // Screen area
    const screenMargin = resolution * 0.04;
    ctx.fillStyle = config.bgColor || '#ffffff';
    roundRect(ctx, screenMargin + 10, screenMargin + 30, width - (screenMargin * 2) - 20, height - (screenMargin * 2) - 60, resolution * 0.05);
    ctx.fill();

    // Draw QR
    const qrSize = Math.round(width * 0.72);
    const qrX = Math.round((width - qrSize) / 2);
    const qrY = Math.round(height * 0.18);
    ctx.drawImage(rawImage, qrX, qrY, qrSize, qrSize);

    // Text bar inside screen
    ctx.fillStyle = frameColor;
    ctx.font = `bold ${Math.round(height * 0.038)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, qrY + qrSize + Math.round(height * 0.08));

  } else if (config.frameStyle === 'glow-border') {
    // Cyberpunk neon glowing border
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = resolution * 0.03;
    ctx.shadowColor = frameColor;
    ctx.shadowBlur = resolution * 0.04;
    roundRect(ctx, 30, 30, width - 60, height - 60, resolution * 0.05);
    ctx.stroke();

    ctx.shadowBlur = 0; // reset shadow
    const qrSize = Math.round(width * 0.75);
    const qrX = Math.round((width - qrSize) / 2);
    const qrY = Math.round(height * 0.08);
    ctx.drawImage(rawImage, qrX, qrY, qrSize, qrSize);

    // Text with glow
    ctx.fillStyle = textColor;
    ctx.shadowColor = textColor;
    ctx.shadowBlur = resolution * 0.02;
    ctx.font = `bold ${Math.round(height * 0.045)}px "Plus Jakarta Sans", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`[ ${text} ]`, width / 2, height - Math.round(height * 0.1));
    ctx.shadowBlur = 0;

  } else {
    // card-border
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = resolution * 0.015;
    roundRect(ctx, 24, 24, width - 48, height - 48, resolution * 0.03);
    ctx.stroke();

    const qrSize = Math.round(width * 0.75);
    const qrX = Math.round((width - qrSize) / 2);
    const qrY = Math.round(height * 0.08);
    ctx.drawImage(rawImage, qrX, qrY, qrSize, qrSize);

    // Text
    ctx.fillStyle = frameColor;
    ctx.font = `bold ${Math.round(height * 0.04)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height - Math.round(height * 0.09));
  }

  return canvas;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Test scan verification on a canvas image using jsQR
 */
export function verifyQRScannability(canvas: HTMLCanvasElement): {
  success: boolean;
  decodedData: string | null;
  confidence: number;
} {
  try {
    const ctx = canvas.getContext('2d');
    if (!ctx) return { success: false, decodedData: null, confidence: 0 };
    
    // Sample scan area
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imgData.data, imgData.width, imgData.height, {
      inversionAttempts: 'attemptBoth'
    });

    if (code && code.data) {
      return {
        success: true,
        decodedData: code.data,
        confidence: 100
      };
    }
    return {
      success: false,
      decodedData: null,
      confidence: 0
    };
  } catch (err) {
    console.warn('QR scan test error:', err);
    return { success: false, decodedData: null, confidence: 0 };
  }
}

/**
 * Downloads the composite canvas in specified format
 */
export async function downloadQRCode(
  payload: string,
  config: QRStylingConfig,
  format: ExportFormat,
  resolution: ExportResolution,
  filename: string = 'qrcraft-code'
) {
  if (format === 'svg' && config.frameStyle === 'none') {
    // Pure SVG download from qr-code-styling
    const qr = new QRCodeStyling({
      ...mapConfigToQRCodeStylingOptions(payload, config, resolution),
      type: 'svg'
    });
    await qr.download({ name: filename, extension: 'svg' });
    return;
  }

  const canvas = await renderCompositeCanvas(payload, config, resolution);
  
  let mimeType = 'image/png';
  let ext = 'png';
  let quality: number | undefined = undefined;

  if (format === 'jpg') {
    mimeType = 'image/jpeg';
    ext = 'jpg';
    quality = 0.95;
  } else if (format === 'webp') {
    mimeType = 'image/webp';
    ext = 'webp';
    quality = 0.95;
  }

  const dataUrl = canvas.toDataURL(mimeType, quality);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${filename}-${resolution}x${resolution}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Copies canvas image directly to user clipboard
 */
export async function copyQRImageToClipboard(
  payload: string,
  config: QRStylingConfig
): Promise<boolean> {
  try {
    const canvas = await renderCompositeCanvas(payload, config, 1024);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return false;

    if (navigator.clipboard && navigator.clipboard.write) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Clipboard copy error:', err);
    return false;
  }
}
