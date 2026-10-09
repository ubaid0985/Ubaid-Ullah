import React, { useState, useRef } from 'react';
import { 
  Palette, 
  Shapes, 
  Image as ImageIcon, 
  Frame, 
  Sliders, 
  Upload, 
  Trash2, 
  RotateCw,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  QRStylingConfig, 
  DotPattern, 
  CornerSquareType, 
  CornerDotType, 
  FrameStyle, 
  ColorType 
} from '../types/qr';
import { PRESET_LOGOS } from '../utils/qrPresets';

interface DesignControlsProps {
  config: QRStylingConfig;
  onChange: (newConfig: QRStylingConfig) => void;
}

type TabType = 'colors' | 'patterns' | 'logo' | 'frame' | 'advanced';

export const DesignControls: React.FC<DesignControlsProps> = ({
  config,
  onChange
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('colors');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (partial: Partial<QRStylingConfig>) => {
    onChange({ ...config, ...partial });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      update({
        logoUrl: result,
        errorCorrectionLevel: 'H' // High error correction when logo is added ensures scannability
      });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    update({ logoUrl: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const selectPresetLogo = (svgData: string) => {
    update({
      logoUrl: svgData,
      errorCorrectionLevel: 'H'
    });
  };

  const FRAME_SUGGESTIONS = [
    'SCAN ME',
    'VISIT OUR WEBSITE',
    'FOLLOW US',
    'CONNECT TO WI-FI',
    'ORDER ONLINE',
    'GET VIP DISCOUNT',
    'SAVE CONTACT'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 transition-all">
      {/* Studio Category Tabs */}
      <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl mb-6 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'colors'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('patterns')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'patterns'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shapes className="w-3.5 h-3.5" />
          <span>Patterns & Eyes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logo')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'logo'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Logo & Icon</span>
          {config.logoUrl && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('frame')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'frame'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Frame className="w-3.5 h-3.5" />
          <span>Frames & Text</span>
          {config.frameStyle !== 'none' && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('advanced')}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'advanced'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Quality & Margins</span>
        </button>
      </div>

      {/* 1. COLORS TAB */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          {/* Fill Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              QR Foreground Fill Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['solid', 'linear', 'radial'] as ColorType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update({ dotColorType: type })}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center capitalize transition-all cursor-pointer ${
                    config.dotColorType === type
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Solid Color */}
          {config.dotColorType === 'solid' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Foreground Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.dotColor}
                  onChange={(e) => update({ dotColor: e.target.value })}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                />
                <input
                  type="text"
                  value={config.dotColor}
                  onChange={(e) => update({ dotColor: e.target.value })}
                  className="w-28 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 uppercase"
                />
                {/* Quick Color presets */}
                <div className="flex items-center space-x-1.5 flex-wrap">
                  {['#000000', '#4f46e5', '#0284c7', '#059669', '#db2777', '#d97706', '#7c3aed'].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => update({ dotColor: col })}
                      style={{ backgroundColor: col }}
                      className="w-6 h-6 rounded-full border border-white ring-1 ring-slate-200 hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Gradient Controls */
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gradient Start Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.dotGradient.colorStops[0]?.color || '#4f46e5'}
                      onChange={(e) => {
                        const stops = [...config.dotGradient.colorStops];
                        stops[0] = { offset: 0, color: e.target.value };
                        update({
                          dotGradient: { ...config.dotGradient, colorStops: stops }
                        });
                      }}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={config.dotGradient.colorStops[0]?.color || '#4f46e5'}
                      onChange={(e) => {
                        const stops = [...config.dotGradient.colorStops];
                        stops[0] = { offset: 0, color: e.target.value };
                        update({
                          dotGradient: { ...config.dotGradient, colorStops: stops }
                        });
                      }}
                      className="w-24 px-2 py-1 text-xs font-mono rounded border border-slate-300 uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gradient End Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.dotGradient.colorStops[1]?.color || '#9333ea'}
                      onChange={(e) => {
                        const stops = [...config.dotGradient.colorStops];
                        stops[1] = { offset: 1, color: e.target.value };
                        update({
                          dotGradient: { ...config.dotGradient, colorStops: stops }
                        });
                      }}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={config.dotGradient.colorStops[1]?.color || '#9333ea'}
                      onChange={(e) => {
                        const stops = [...config.dotGradient.colorStops];
                        stops[1] = { offset: 1, color: e.target.value };
                        update({
                          dotGradient: { ...config.dotGradient, colorStops: stops }
                        });
                      }}
                      className="w-24 px-2 py-1 text-xs font-mono rounded border border-slate-300 uppercase"
                    />
                  </div>
                </div>
              </div>

              {config.dotGradient.type === 'linear' && (
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Gradient Angle</span>
                    <span className="font-mono text-indigo-600">{config.dotGradient.rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={config.dotGradient.rotation}
                    onChange={(e) =>
                      update({
                        dotGradient: {
                          ...config.dotGradient,
                          rotation: Number(e.target.value)
                        }
                      })
                    }
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}

          {/* Background Color */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700">
                Canvas Background Color
              </label>
              <label className="flex items-center space-x-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.bgTransparent}
                  onChange={(e) => update({ bgTransparent: e.target.checked })}
                  className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Transparent Background</span>
              </label>
            </div>

            {!config.bgTransparent && (
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={config.bgColor}
                  onChange={(e) => update({ bgColor: e.target.value })}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
                />
                <input
                  type="text"
                  value={config.bgColor}
                  onChange={(e) => update({ bgColor: e.target.value })}
                  className="w-28 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 uppercase"
                />
                <div className="flex items-center space-x-1.5">
                  {['#ffffff', '#f8fafc', '#fff1f2', '#f0fdf4', '#0f172a', '#18181b'].map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => update({ bgColor: bg })}
                      style={{ backgroundColor: bg }}
                      className="w-6 h-6 rounded-full border border-slate-300 shadow-xs hover:scale-110 transition-transform"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Custom Corner Eye Colors */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Corner Eye Accent Colors
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Corner Square */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700">Outer Eye Square</span>
                  <input
                    type="checkbox"
                    checked={config.customCornerSquareColor}
                    onChange={(e) => update({ customCornerSquareColor: e.target.checked })}
                    className="w-3.5 h-3.5 text-indigo-600 rounded"
                  />
                </div>
                {config.customCornerSquareColor && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.cornerSquareColor}
                      onChange={(e) => update({ cornerSquareColor: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-700">{config.cornerSquareColor}</span>
                  </div>
                )}
              </div>

              {/* Corner Dot */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700">Inner Eye Dot</span>
                  <input
                    type="checkbox"
                    checked={config.customCornerDotColor}
                    onChange={(e) => update({ customCornerDotColor: e.target.checked })}
                    className="w-3.5 h-3.5 text-indigo-600 rounded"
                  />
                </div>
                {config.customCornerDotColor && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.cornerDotColor}
                      onChange={(e) => update({ cornerDotColor: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-mono text-slate-700">{config.cornerDotColor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PATTERNS & SHAPES TAB */}
      {activeTab === 'patterns' && (
        <div className="space-y-6">
          {/* Dot Patterns */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              QR Body Dot Pattern
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'square', label: 'Classic Square', desc: 'Standard crisp blocks' },
                { id: 'rounded', label: 'Smooth Rounded', desc: 'Slightly rounded curves' },
                { id: 'dots', label: 'Circle Dots', desc: 'Modern circular matrix' },
                { id: 'classy', label: 'Classy Diamond', desc: 'Elegant stylized tips' },
                { id: 'classy-rounded', label: 'Classy Rounded', desc: 'Refined soft geometry' },
                { id: 'extra-rounded', label: 'Extra Rounded', desc: 'Bubble pill capsules' }
              ].map(({ id, label, desc }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => update({ dotType: id as DotPattern })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    config.dotType === id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">{label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Corner Square Shapes */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Corner Square Outer Shape
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'square', label: 'Square' },
                { id: 'extra-rounded', label: 'Rounded' },
                { id: 'dot', label: 'Circular' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => update({ cornerSquareType: id as CornerSquareType })}
                  className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                    config.cornerSquareType === id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Dot Shapes */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Corner Inner Dot Shape
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'square', label: 'Square Dot' },
                { id: 'dot', label: 'Round Dot' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => update({ cornerDotType: id as CornerDotType })}
                  className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                    config.cornerDotType === id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. LOGO & BRAND TAB */}
      {activeTab === 'logo' && (
        <div className="space-y-5">
          {/* Logo Upload Box */}
          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 text-center transition-all bg-slate-50/50">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="qr-logo-upload"
            />
            
            {config.logoUrl ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-white p-2 shadow-sm border border-slate-200 flex items-center justify-center mb-3">
                  <img
                    src={config.logoUrl}
                    alt="Uploaded Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="qr-logo-upload"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Replace Image
                  </label>
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 cursor-pointer"
                    title="Remove logo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="qr-logo-upload"
                className="cursor-pointer flex flex-col items-center py-2"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Upload Custom Logo / Brand Icon
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  PNG, JPG, or SVG with transparent background works best
                </span>
              </label>
            )}
          </div>

          {/* Preset Brand Icons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Or Choose a Popular Preset Icon
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PRESET_LOGOS.map((logo) => (
                <button
                  key={logo.id}
                  type="button"
                  onClick={() => selectPresetLogo(logo.svg)}
                  title={logo.name}
                  className="h-12 rounded-xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/50 flex flex-col items-center justify-center p-2 transition-all cursor-pointer group"
                >
                  <img
                    src={logo.svg}
                    alt={logo.name}
                    className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Logo Sizing & Padding */}
          {config.logoUrl && (
            <div className="space-y-4 pt-3 border-t border-slate-100 bg-slate-50 p-4 rounded-xl">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Logo Center Scale</span>
                  <span className="font-mono text-indigo-600">{Math.round(config.logoSize * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.32"
                  step="0.02"
                  value={config.logoSize}
                  onChange={(e) => update({ logoSize: Number(e.target.value) })}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  High Error Correction is enabled automatically to protect scan integrity.
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Logo Margin / Padding</span>
                  <span className="font-mono text-indigo-600">{config.logoMargin}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="2"
                  value={config.logoMargin}
                  onChange={(e) => update({ logoMargin: Number(e.target.value) })}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="hide-dots"
                  checked={config.hideBackgroundDots}
                  onChange={(e) => update({ hideBackgroundDots: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="hide-dots" className="text-xs text-slate-700 select-none cursor-pointer">
                  Clear QR dots behind logo area (Clean cutout)
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. FRAMES & TEXT TAB */}
      {activeTab === 'frame' && (
        <div className="space-y-5">
          {/* Frame Style Selectors */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Frame Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'none', label: 'No Frame', badge: 'Clean' },
                { id: 'bottom-banner', label: 'Bottom Banner', badge: 'Standard' },
                { id: 'top-banner', label: 'Top Banner', badge: 'Header' },
                { id: 'pill-badge', label: 'Floating Pill', badge: 'Modern' },
                { id: 'phone-frame', label: 'Phone Mockup', badge: 'Digital' },
                { id: 'card-border', label: 'Card Border', badge: 'Minimal' },
                { id: 'glow-border', label: 'Neon Glow', badge: 'Cyber' }
              ].map(({ id, label, badge }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => update({ frameStyle: id as FrameStyle })}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    config.frameStyle === id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Frame Text and Customizations */}
          {config.frameStyle !== 'none' && (
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Call-to-Action Text
                </label>
                <input
                  type="text"
                  value={config.frameText}
                  maxLength={30}
                  onChange={(e) => update({ frameText: e.target.value })}
                  placeholder="SCAN ME"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white font-bold tracking-wide"
                />

                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {FRAME_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => update({ frameText: sug })}
                      className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Frame Accent Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.frameColor}
                      onChange={(e) => update({ frameColor: e.target.value, frameBgColor: config.frameBgColor })}
                      className="w-8 h-8 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-mono">{config.frameColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Banner Text Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.frameTextColor}
                      onChange={(e) => update({ frameTextColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-mono">{config.frameTextColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Card Background
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.frameBgColor}
                      onChange={(e) => update({ frameBgColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-mono">{config.frameBgColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. ADVANCED & CALIBRATION */}
      {activeTab === 'advanced' && (
        <div className="space-y-5">
          {/* Error Correction Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700">
                Error Correction Level (Redundancy)
              </label>
              <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                <Info className="w-3 h-3" />
                <span>Damage resistance</span>
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'L', label: 'Low (7%)', desc: 'Dense, compact' },
                { id: 'M', label: 'Medium (15%)', desc: 'Standard scan' },
                { id: 'Q', label: 'Quartile (25%)', desc: 'High resilience' },
                { id: 'H', label: 'High (30%)', desc: 'Best with logos' }
              ].map(({ id, label, desc }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => update({ errorCorrectionLevel: id as any })}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    config.errorCorrectionLevel === id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">{id}</p>
                  <p className="text-[10px] text-slate-500">{label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quiet Zone Margin */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Quiet Zone Margin</span>
              <span className="font-mono text-indigo-600">{config.margin}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={config.margin}
              onChange={(e) => update({ margin: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Adequate quiet zone margin ensures instant recognition by phone cameras in real-world lighting.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
