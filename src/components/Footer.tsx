import React from 'react';
import { QrCode, Heart, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                QRCraft
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The modern web-first QR code generator and styling suite. Create branded, high-contrast QR codes with custom logos, frames, and guaranteed scan reliability.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Client-Side & Private</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Features & Studio
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  QR Code Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('designer')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Design Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('templates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Preset Templates Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scanner')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  QR Scanner & Verifier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Saved Codes History
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Content Types */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Supported Formats
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Website Links & URLs</li>
              <li>Wi-Fi Network Auto-Connect</li>
              <li>vCard Digital Contacts</li>
              <li>WhatsApp Direct Message</li>
              <li>SMS & Direct Phone Calling</li>
              <li>Plain Text & Secret Notes</li>
            </ul>
          </div>

          {/* Col 4: Print & Exports */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Export Quality
            </h4>
            <ul className="space-y-2 text-xs">
              <li>High-Resolution 4K PNG (4096px)</li>
              <li>Scalable Vector Graphics (SVG)</li>
              <li>WebP & Compressed JPG</li>
              <li>Copy Directly to Clipboard</li>
              <li>Error Correction L, M, Q, H (Up to 30%)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} QRCraft Studio. All rights reserved. Free and unlimited forever.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400">Privacy-First (No tracking)</span>
            <span>•</span>
            <span className="hover:text-slate-400">Zero Expiration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
