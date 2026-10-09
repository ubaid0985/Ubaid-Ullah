export type QRDataType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'whatsapp' | 'vcard' | 'sms';

export interface QRDataState {
  type: QRDataType;
  url: string;
  text: string;
  email: {
    to: string;
    subject: string;
    body: string;
  };
  phone: {
    number: string;
  };
  sms: {
    number: string;
    message: string;
  };
  wifi: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
  };
  whatsapp: {
    phone: string;
    message: string;
  };
  vcard: {
    firstName: string;
    lastName: string;
    organization: string;
    jobTitle: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    note: string;
  };
}

export type DotPattern = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';

export type FrameStyle = 
  | 'none'
  | 'bottom-banner'
  | 'top-banner'
  | 'pill-badge'
  | 'phone-frame'
  | 'card-border'
  | 'retro-frame'
  | 'glow-border';

export type ColorType = 'solid' | 'linear' | 'radial';

export interface GradientConfig {
  type: 'linear' | 'radial';
  rotation: number; // in degrees
  colorStops: { offset: number; color: string }[];
}

export interface QRStylingConfig {
  // Dot styling
  dotType: DotPattern;
  dotColorType: ColorType;
  dotColor: string;
  dotGradient: GradientConfig;
  
  // Background styling
  bgColor: string;
  bgTransparent: boolean;

  // Corner Square styling
  cornerSquareType: CornerSquareType;
  customCornerSquareColor: boolean;
  cornerSquareColor: string;

  // Corner Dot styling
  cornerDotType: CornerDotType;
  customCornerDotColor: boolean;
  cornerDotColor: string;

  // Logo styling
  logoUrl: string | null;
  logoSize: number; // 0.1 to 0.4
  logoMargin: number; // 0 to 20
  hideBackgroundDots: boolean;

  // Frame styling
  frameStyle: FrameStyle;
  frameText: string;
  frameSubtext?: string;
  frameColor: string;
  frameTextColor: string;
  frameBgColor: string;

  // Advanced & Calibration
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
}

export interface QRTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  styling: Partial<QRStylingConfig>;
  previewColor: string;
}

export interface QRHistoryItem {
  id: string;
  createdAt: number;
  title: string;
  type: QRDataType;
  payload: string;
  styling: QRStylingConfig;
  previewDataUrl?: string;
}

export type ExportFormat = 'png' | 'jpg' | 'svg' | 'webp';
export type ExportResolution = 512 | 1024 | 2048 | 4096;
