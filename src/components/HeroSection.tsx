import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

interface HeroSectionProps {
  onQuickGenerate: (url: string) => void;
  currentUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onQuickGenerate,
  currentUrl
}) => {
  const [inputVal, setInputVal] = useState(currentUrl || '');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      onQuickGenerate('https://google.com');
    } else {
      onQuickGenerate(inputVal.trim());
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-8 sm:pt-14 sm:pb-12 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200/60">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute top-16 right-1/4 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Professional Custom QR Studio & Vector Exports</span>
          <span className="w-1 h-1 rounded-full bg-indigo-400" />
          <span className="text-indigo-600/80">No Expiration Ever</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Create Stunning{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            QR Codes
          </span>{' '}
          in Seconds
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Generate, customize, and download beautiful QR codes for your brand. Add custom logos, frames, gradients, and verify 100% scan reliability in real time.
        </p>

        {/* Quick URL Input Bar */}
        <form
          onSubmit={handleQuickSubmit}
          className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-indigo-500/10 border border-slate-200/80 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all"
        >
          <div className="relative flex-1 w-full flex items-center pl-3">
            <span className="text-slate-400 font-mono text-sm select-none pr-1">https://</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="yourwebsite.com or any link..."
              className="w-full py-2.5 px-2 text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 active:scale-98 transition-all shrink-0 cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Generate QR</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </form>

        {/* Feature Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 font-medium">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>High-Res PNG, SVG & 4K</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Built-in Scan Reliability Verifier</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
            <span>Custom Center Logo & Frames</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-500" />
            <span>100% Free & Unlimited</span>
          </div>
        </div>
      </div>
    </section>
  );
};
