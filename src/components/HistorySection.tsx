import React from 'react';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  Download, 
  Clock, 
  QrCode, 
  ExternalLink 
} from 'lucide-react';
import { QRHistoryItem, QRStylingConfig } from '../types/qr';
import { downloadQRCode } from '../utils/qrRenderer';

interface HistorySectionProps {
  items: QRHistoryItem[];
  onLoadItem: (item: QRHistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  items,
  onLoadItem,
  onDeleteItem,
  onClearAll
}) => {
  const handleQuickDownload = async (item: QRHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await downloadQRCode(
        item.payload,
        item.styling,
        'png',
        1024,
        `qrcraft-${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Saved QR Library</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Generated QR Code History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Revisit, re-export, or tweak any previously generated QR code from this browser session.
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No QR Codes in History Yet
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto">
            Codes you generate or download will automatically appear here for quick access and re-editing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => {
            const timeAgo = formatTime(item.createdAt);

            return (
              <div
                key={item.id}
                onClick={() => onLoadItem(item)}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-400 p-4 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="w-full aspect-square rounded-xl bg-slate-50 border border-slate-100 p-3 mb-3 flex items-center justify-center group-hover:bg-indigo-50/20 transition-colors">
                    {item.previewDataUrl ? (
                      <img
                        src={item.previewDataUrl}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <QrCode className="w-12 h-12 text-slate-300" />
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {item.type}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{timeAgo}</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm truncate mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate font-mono">
                    {item.payload}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                    <span>Load & Edit</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={(e) => handleQuickDownload(item, e)}
                      title="Quick download PNG"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                      }}
                      title="Delete from history"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

function formatTime(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
}
