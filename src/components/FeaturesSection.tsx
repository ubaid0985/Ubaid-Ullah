import React from 'react';
import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  DownloadCloud, 
  Infinity, 
  Palette, 
  Smartphone,
  Zap
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Infinity,
      color: 'from-blue-600 to-indigo-600',
      title: 'Never Expire & 100% Free',
      description: 'Standard static QR codes directly embed your destination data. They work permanently without subscription fees or dead redirect links.'
    },
    {
      icon: Palette,
      color: 'from-indigo-600 to-purple-600',
      title: 'Deep Design Customization',
      description: 'Personalize body dot shapes, corner eye geometries, smooth radial or linear color gradients, and custom brand logos with transparent cutouts.'
    },
    {
      icon: ShieldCheck,
      color: 'from-emerald-600 to-teal-600',
      title: 'Client-Side Scan Verification',
      description: 'Built-in real-time computer vision engine analyzes contrast and redundancy levels to guarantee 100% camera readability before you print.'
    },
    {
      icon: DownloadCloud,
      color: 'from-pink-600 to-rose-600',
      title: 'Ultra High-Res & Vector SVG',
      description: 'Export in crisp 4096px Ultra 4K PNG, WebP, JPG, or infinite scalable vector SVG ready for bill-boards, signage, and packaging.'
    },
    {
      icon: Layers,
      color: 'from-amber-600 to-orange-600',
      title: 'Call-to-Action Frames',
      description: 'Add attention-grabbing badges like “SCAN ME”, “VISIT OUR STORE”, or “FOLLOW US” to increase user engagement and scan conversion rates.'
    },
    {
      icon: Smartphone,
      color: 'from-cyan-600 to-blue-600',
      title: 'Multi-Format Content Support',
      description: 'Effortlessly encode Website URLs, Wi-Fi credentials with auto-connect, vCard digital business contacts, WhatsApp chats, and direct calls.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Built For Creators & Enterprise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Professionals Choose QRCraft
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Combine stunning aesthetic appeal with rock-solid scanning reliability. No accounts required, no tracking scripts, and zero watermarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center mb-5 shadow-md shadow-indigo-500/10 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
