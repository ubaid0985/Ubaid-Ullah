import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ArrowRight, Palette } from 'lucide-react';
import { QRTemplate, QRStylingConfig } from '../types/qr';
import { QR_TEMPLATES, DEFAULT_STYLING } from '../utils/qrPresets';
import { renderCompositeCanvas } from '../utils/qrRenderer';

interface TemplatesGalleryProps {
  currentPayload: string;
  onApplyTemplate: (template: QRTemplate) => void;
}

export const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({
  currentPayload,
  onApplyTemplate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const categories = ['All', 'Essential', 'Popular', 'Modern', 'Business', 'Luxury', 'Social'];

  const filteredTemplates = selectedCategory === 'All'
    ? QR_TEMPLATES
    : QR_TEMPLATES.filter((t) => t.category.toLowerCase() === selectedCategory.toLowerCase());

  // Generate lightweight thumbnails for templates
  useEffect(() => {
    let isCancelled = false;

    const generateThumbs = async () => {
      const map: Record<string, string> = {};
      for (const t of QR_TEMPLATES) {
        if (isCancelled) return;
        try {
          const config: QRStylingConfig = {
            ...DEFAULT_STYLING,
            ...t.styling
          };
          const canvas = await renderCompositeCanvas(currentPayload || 'https://google.com', config, 240);
          map[t.id] = canvas.toDataURL('image/png');
        } catch (e) {
          console.error(e);
        }
      }
      if (!isCancelled) {
        setThumbnails(map);
      }
    };

    generateThumbs();

    return () => {
      isCancelled = true;
    };
  }, [currentPayload]);

  const handleApply = (template: QRTemplate) => {
    onApplyTemplate(template);
    setAppliedId(template.id);
    setTimeout(() => setAppliedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
          <Palette className="w-3.5 h-3.5" />
          <span>Curated Design Presets</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          QR Style Templates
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          Choose from professionally designed color schemes and geometric patterns tailored for corporate branding, retail, events, and social media.
        </p>

        {/* Categories */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => {
          const isApplied = appliedId === template.id;
          const thumb = thumbnails[template.id];

          return (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {template.category}
                  </span>
                  <div
                    className="w-4 h-4 rounded-full border border-slate-200 shadow-xs"
                    style={{ background: template.previewColor }}
                  />
                </div>

                {/* Live Preview Thumbnail Container */}
                <div className="w-full aspect-square rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 mb-4 relative overflow-hidden group-hover:bg-indigo-50/20 transition-colors">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={template.name}
                      className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-slate-400 text-xs">
                      <Sparkles className="w-4 h-4 animate-spin text-indigo-500" />
                      <span>Rendering...</span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {template.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleApply(template)}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  isApplied
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-xs group-hover:shadow-md'
                }`}
              >
                {isApplied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Applied to Studio!</span>
                  </>
                ) : (
                  <>
                    <span>Use This Style</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
