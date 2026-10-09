import { QRStylingConfig, QRTemplate } from '../types/qr';

export const DEFAULT_STYLING: QRStylingConfig = {
  dotType: 'rounded',
  dotColorType: 'solid',
  dotColor: '#4f46e5', // indigo-600
  dotGradient: {
    type: 'linear',
    rotation: 45,
    colorStops: [
      { offset: 0, color: '#6366f1' },
      { offset: 1, color: '#a855f7' }
    ]
  },
  bgColor: '#ffffff',
  bgTransparent: false,
  cornerSquareType: 'extra-rounded',
  customCornerSquareColor: true,
  cornerSquareColor: '#4338ca',
  cornerDotType: 'dot',
  customCornerDotColor: true,
  cornerDotColor: '#6366f1',
  logoUrl: null,
  logoSize: 0.22,
  logoMargin: 6,
  hideBackgroundDots: true,
  frameStyle: 'none',
  frameText: 'SCAN ME',
  frameSubtext: 'POINT CAMERA HERE',
  frameColor: '#4f46e5',
  frameTextColor: '#ffffff',
  frameBgColor: '#4f46e5',
  errorCorrectionLevel: 'Q',
  margin: 15
};

export const QR_TEMPLATES: QRTemplate[] = [
  {
    id: 'classic-bw',
    name: 'Classic Black & White',
    category: 'Essential',
    description: 'Crisp, timeless, highest scan contrast for all printing needs.',
    previewColor: '#000000',
    styling: {
      dotType: 'square',
      dotColorType: 'solid',
      dotColor: '#000000',
      bgColor: '#ffffff',
      cornerSquareType: 'square',
      customCornerSquareColor: false,
      cornerSquareColor: '#000000',
      cornerDotType: 'square',
      customCornerDotColor: false,
      cornerDotColor: '#000000',
      frameStyle: 'none',
      errorCorrectionLevel: 'M'
    }
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    category: 'Popular',
    description: 'Electric violet to indigo linear transition with rounded nodes.',
    previewColor: 'linear-gradient(135deg, #6366f1, #9333ea)',
    styling: {
      dotType: 'rounded',
      dotColorType: 'linear',
      dotGradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#4f46e5' },
          { offset: 1, color: '#9333ea' }
        ]
      },
      bgColor: '#ffffff',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#4338ca',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#9333ea',
      frameStyle: 'bottom-banner',
      frameText: 'SCAN ME',
      frameColor: '#4f46e5',
      frameTextColor: '#ffffff',
      frameBgColor: '#4f46e5'
    }
  },
  {
    id: 'neon-cyberpunk',
    name: 'Neon Cyberpunk',
    category: 'Modern',
    description: 'High-contrast cyan & magenta accents on deep midnight canvas.',
    previewColor: 'linear-gradient(135deg, #06b6d4, #ec4899)',
    styling: {
      dotType: 'classy',
      dotColorType: 'linear',
      dotGradient: {
        type: 'linear',
        rotation: 120,
        colorStops: [
          { offset: 0, color: '#06b6d4' },
          { offset: 1, color: '#f43f5e' }
        ]
      },
      bgColor: '#0f172a',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#06b6d4',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#f43f5e',
      frameStyle: 'glow-border',
      frameText: 'DISCOVER MORE',
      frameColor: '#06b6d4',
      frameTextColor: '#06b6d4',
      frameBgColor: '#0f172a'
    }
  },
  {
    id: 'minimal-luxury-gold',
    name: 'Minimal Luxury Gold',
    category: 'Luxury',
    description: 'Warm champagne gold dots with rich obsidian styling for upscale brands.',
    previewColor: 'linear-gradient(135deg, #d97706, #fbbf24)',
    styling: {
      dotType: 'classy-rounded',
      dotColorType: 'linear',
      dotGradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#b45309' },
          { offset: 1, color: '#f59e0b' }
        ]
      },
      bgColor: '#18181b',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#f59e0b',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#fbbf24',
      frameStyle: 'bottom-banner',
      frameText: 'VIP ACCESS',
      frameColor: '#d97706',
      frameTextColor: '#18181b',
      frameBgColor: '#fbbf24'
    }
  },
  {
    id: 'blue-corporate',
    name: 'Blue Corporate',
    category: 'Business',
    description: 'Trustworthy enterprise sapphire and navy scheme with sleek finish.',
    previewColor: 'linear-gradient(135deg, #0284c7, #1e3a8a)',
    styling: {
      dotType: 'dots',
      dotColorType: 'solid',
      dotColor: '#0369a1',
      bgColor: '#ffffff',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#0c4a6e',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#0284c7',
      frameStyle: 'bottom-banner',
      frameText: 'VISIT OUR WEBSITE',
      frameColor: '#0369a1',
      frameTextColor: '#ffffff',
      frameBgColor: '#0284c7'
    }
  },
  {
    id: 'pink-aesthetic',
    name: 'Pink Aesthetic',
    category: 'Lifestyle',
    description: 'Chic blush rose & magenta tones tailored for beauty & lifestyle creators.',
    previewColor: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    styling: {
      dotType: 'rounded',
      dotColorType: 'linear',
      dotGradient: {
        type: 'linear',
        rotation: 60,
        colorStops: [
          { offset: 0, color: '#ec4899' },
          { offset: 1, color: '#fb7185' }
        ]
      },
      bgColor: '#fff1f2',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#db2777',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#e11d48',
      frameStyle: 'pill-badge',
      frameText: 'FOLLOW US',
      frameColor: '#e11d48',
      frameTextColor: '#ffffff',
      frameBgColor: '#db2777'
    }
  },
  {
    id: 'green-nature',
    name: 'Green Nature',
    category: 'Organic',
    description: 'Fresh emerald to spring mint palette for eco, wellness, and organic brands.',
    previewColor: 'linear-gradient(135deg, #059669, #10b981)',
    styling: {
      dotType: 'classy-rounded',
      dotColorType: 'linear',
      dotGradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#047857' },
          { offset: 1, color: '#10b981' }
        ]
      },
      bgColor: '#ffffff',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#065f46',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#059669',
      frameStyle: 'bottom-banner',
      frameText: 'JOIN THE COMMUNITY',
      frameColor: '#059669',
      frameTextColor: '#ffffff',
      frameBgColor: '#059669'
    }
  },
  {
    id: 'dark-premium',
    name: 'Dark Premium',
    category: 'Dark Mode',
    description: 'Stealth charcoal backdrop with sharp titanium white contrast.',
    previewColor: '#1e293b',
    styling: {
      dotType: 'extra-rounded',
      dotColorType: 'solid',
      dotColor: '#e2e8f0',
      bgColor: '#0f172a',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#f8fafc',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#38bdf8',
      frameStyle: 'card-border',
      frameText: 'TAP TO SCAN',
      frameColor: '#334155',
      frameTextColor: '#f8fafc',
      frameBgColor: '#1e293b'
    }
  },
  {
    id: 'colorful-creative',
    name: 'Colorful Creative',
    category: 'Vibrant',
    description: 'Dynamic sunset spectrum blending warm orange, fuchsia, and purple.',
    previewColor: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)',
    styling: {
      dotType: 'dots',
      dotColorType: 'linear',
      dotGradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#ea580c' },
          { offset: 0.5, color: '#db2777' },
          { offset: 1, color: '#7c3aed' }
        ]
      },
      bgColor: '#ffffff',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#ea580c',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#7c3aed',
      frameStyle: 'bottom-banner',
      frameText: 'EXPERIENCE IT',
      frameColor: '#db2777',
      frameTextColor: '#ffffff',
      frameBgColor: '#ea580c'
    }
  },
  {
    id: 'social-media-style',
    name: 'Social Media Style',
    category: 'Social',
    description: 'Instagram-inspired radial sunrise glow with ultra-smooth rounded eyes.',
    previewColor: 'radial-gradient(circle, #f59e0b, #ec4899, #8b5cf6)',
    styling: {
      dotType: 'classy',
      dotColorType: 'radial',
      dotGradient: {
        type: 'radial',
        rotation: 0,
        colorStops: [
          { offset: 0, color: '#f59e0b' },
          { offset: 0.5, color: '#ec4899' },
          { offset: 1, color: '#7c3aed' }
        ]
      },
      bgColor: '#ffffff',
      cornerSquareType: 'extra-rounded',
      customCornerSquareColor: true,
      cornerSquareColor: '#d946ef',
      cornerDotType: 'dot',
      customCornerDotColor: true,
      cornerDotColor: '#f97316',
      frameStyle: 'pill-badge',
      frameText: 'CONNECT WITH US',
      frameColor: '#ec4899',
      frameTextColor: '#ffffff',
      frameBgColor: '#ec4899'
    }
  }
];

// High quality SVG data URIs for preset logos
export const PRESET_LOGOS = [
  {
    id: 'globe',
    name: 'Website',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%234f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/></svg>`
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%230ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01M2 8.82a15 15 0 0 1 20 0M5 12.86a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0"/></svg>`
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2322c55e"><path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.176.201-.351.226-.653.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.201-.301.301-.502.101-.201.05-.377-.025-.527s-.678-1.633-.929-2.235c-.244-.587-.492-.507-.678-.517l-.577-.01c-.201 0-.527.075-.803.377s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.123 3.242 5.143 4.547 3.02 1.305 3.02.87 3.572.815.552-.055 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.176L2 22l4.982-1.399A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>`
  },
  {
    id: 'instagram',
    name: 'Instagram',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23e1306c"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
  },
  {
    id: 'youtube',
    name: 'YouTube',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230f172a"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
  },
  {
    id: 'star',
    name: 'VIP Star',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23eab308"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  },
  {
    id: 'cart',
    name: 'Shop',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%236366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`
  }
];
