import React from 'react';
import { Palette, Sparkles, RotateCcw, ArrowLeft, Wand2 } from 'lucide-react';
import { QRStylingConfig, QRDataState, QRHistoryItem, QRTemplate } from '../types/qr';
import { DesignControls } from './DesignControls';
import { QRPreview } from './QRPreview';
import { QR_TEMPLATES } from '../utils/qrPresets';
import { getReadableSummary } from '../utils/qrPayload';

interface CustomDesignerPageProps {
  payload: string;
  dataState: QRDataState;
  config: QRStylingConfig;
  onChangeConfig: (newConfig: QRStylingConfig) => void;
  onResetConfig: () => void;
  onSaveHistory: (item: Omit<QRHistoryItem, 'id' | 'createdAt'>) => void;
  onBackToGenerator: () => void;
}

export const CustomDesignerPage: React.FC<CustomDesignerPageProps> = ({
  payload,
  dataState,
  config,
  onChangeConfig,
  onResetConfig,
  onSaveHistory,
  onBackToGenerator
}) => {
  const summary = getReadableSummary(dataState);

  const applyTemplateQuick = (template: QRTemplate) => {
    onChangeConfig({
      ...config,
      ...template.styling
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Designer Studio Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToGenerator}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Return to standard generator"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold text-slate-900">
                  Custom QR Design Studio
                </h1>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                  Visual Editor
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-sm">
                Target: {summary.title} ({summary.subtitle})
              </p>
            </div>
          </div>

          {/* Quick Presets Strip */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1 shrink-0">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Presets:</span>
            </span>
            {QR_TEMPLATES.slice(0, 5).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => applyTemplateQuick(t)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 shrink-0 transition-colors cursor-pointer"
              >
                {t.name}
              </button>
            ))}

            <button
              type="button"
              onClick={onResetConfig}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              title="Reset designer settings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Customization Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100/80 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                  Real-Time Style Inspector
                </h4>
                <p className="text-xs text-indigo-800/80 leading-relaxed">
                  Fine-tune eye corners, gradient trajectories, center badges, and custom frame banners with live scannability checks.
                </p>
              </div>
            </div>

            <DesignControls
              config={config}
              onChange={onChangeConfig}
            />
          </div>

          {/* Right Column: Live QR Preview & High-Res Export Stage */}
          <div className="lg:col-span-5">
            <QRPreview
              payload={payload}
              config={config}
              onSaveHistory={onSaveHistory}
              summaryTitle={summary.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
