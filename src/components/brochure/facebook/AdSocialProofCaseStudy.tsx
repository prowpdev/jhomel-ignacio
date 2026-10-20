import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { Star, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Quote, Sparkles } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdSocialProofCaseStudy: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';
  const isPortrait = data.aspectRatio === '4:5';

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#090C12] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-11' : isLandscape ? 'p-6 sm:p-7' : 'p-7 sm:p-10'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Ambient Glow */}
      <div
        className="absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-[110px] pointer-events-none opacity-20"
        style={{ backgroundColor: accent }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            <Star size={13} className="fill-amber-400" />
            <Star size={13} className="fill-amber-400" />
            <Star size={13} className="fill-amber-400" />
            <Star size={13} className="fill-amber-400" />
            <Star size={13} className="fill-amber-400" />
          </div>
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            {data.ratingText}
          </span>
        </div>

        <div className="text-[11px] font-mono text-zinc-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
          {data.brandName}
        </div>
      </div>

      {/* Middle: Case Study & Proof */}
      {isLandscape ? (
        <div className="relative z-10 grid grid-cols-12 gap-6 my-auto items-center">
          <div className="col-span-7 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              {data.headline}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {data.subheadline}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {data.keyPoints.slice(0, 2).map((pt, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-300 bg-white/5 px-2.5 py-1 rounded-md">
                  <CheckCircle2 size={12} style={{ color: accent }} />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 bg-white/[0.05] border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Proven ROI Lift</span>
              <TrendingUp size={16} style={{ color: accent }} />
            </div>
            <div className="text-3xl font-black font-mono tracking-tight" style={{ color: accent }}>
              +38% Conversion
            </div>
            <p className="text-xs text-zinc-300 italic">
              "Working with Jhomel turned our slow Shopify store into a sub-second revenue engine within 3 weeks."
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 my-auto py-2 space-y-4">
          {/* Big Headline */}
          <div>
            <h2
              className={`font-black tracking-tight text-white leading-tight ${
                isStory ? 'text-2xl sm:text-3xl' : isPortrait ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
              }`}
            >
              {data.headline}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
              {data.subheadline}
            </p>
          </div>

          {/* Featured Proof / Testimonial Box */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 relative shadow-xl">
            <Quote size={20} className="text-white/20 absolute top-3 right-3" />
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: accent, color: '#000' }}
              >
                JI
              </div>
              <div>
                <div className="text-xs font-bold text-white">Verified Client Case Study</div>
                <div className="text-[10px] text-zinc-400">Global E-Commerce & SaaS Brands</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 text-center font-mono">
              <div>
                <div className="text-base sm:text-lg font-black" style={{ color: accent }}>0.8s</div>
                <div className="text-[9px] text-zinc-400">Load Speed</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-white">99/100</div>
                <div className="text-[9px] text-zinc-400">Lighthouse</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-emerald-400">+38%</div>
                <div className="text-[9px] text-zinc-400">Checkout Lift</div>
              </div>
            </div>

            <div className="mt-3 space-y-1.5">
              {data.keyPoints.slice(0, isStory ? 3 : 2).map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                  <CheckCircle2 size={12} className="shrink-0" style={{ color: accent }} />
                  <span className="truncate">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Bar */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <ShieldCheck size={14} style={{ color: accent }} />
          <span>{data.trustBadge}</span>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: accent,
            color: '#000',
            boxShadow: `0 8px 24px ${accent}40`,
          }}
        >
          <span>{data.ctaText}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
