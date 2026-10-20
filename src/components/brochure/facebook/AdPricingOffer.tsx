import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Star,
  Zap,
  Tag,
  Clock,
} from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdPricingOffer: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const currency = data.currency || '$';
  const price = data.price || '1,490';
  const originalPrice = data.originalPrice;
  const pricingPeriod = data.pricingPeriod || 'Flat-Rate Sprint';
  const discountBadge = data.priceDiscountBadge || 'LIMITED SLOTS';

  const isLandscape = data.aspectRatio === '1.91:1';

  return (
    <div
      className={`w-full h-full relative overflow-hidden flex flex-col justify-between ${
        isLandscape ? 'p-5 sm:p-7' : 'p-6 sm:p-10'
      } select-none bg-[#090A10] text-[#ECEEF2] font-sans`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Ambient Radial Lighting */}
      <div
        className="absolute top-1/4 -right-16 w-80 h-80 rounded-full blur-[130px] opacity-25 pointer-events-none"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-[140px] opacity-20 bg-indigo-600 pointer-events-none" />

      {/* Top Bar: Brand, Rating & Limited Urgency Badge */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shadow-md"
            style={{ backgroundColor: accent, color: '#000000' }}
          >
            {data.brandName.charAt(0) || 'J'}
          </div>
          <div>
            <span className="font-bold text-xs tracking-tight text-white block uppercase">
              {data.brandName}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block">
              {data.website}
            </span>
          </div>
        </div>

        {/* Limited Offer Badge */}
        <div
          className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 shadow-sm"
          style={{
            backgroundColor: `${accent}18`,
            color: accent,
            borderColor: `${accent}40`,
          }}
        >
          <Clock size={11} />
          <span>{discountBadge}</span>
        </div>
      </div>

      {isLandscape ? (
        /* Landscape 1.91:1 Split Grid Layout */
        <div className="relative z-10 my-auto grid grid-cols-12 gap-5 items-center">
          <div className="col-span-6 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
              {data.badge || 'TRANSPARENT CLIENT PRICING'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              {data.headline}
            </h2>
            {data.subheadline && (
              <p className="text-xs text-zinc-300 font-normal leading-relaxed line-clamp-2">
                {data.subheadline}
              </p>
            )}
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <ShieldCheck size={14} style={{ color: accent }} />
              <span>{data.trustBadge || '100% Satisfaction Guarantee'}</span>
            </div>
          </div>

          <div className="col-span-6 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <span className="text-[9px] font-mono uppercase text-zinc-400 block font-semibold">
                  Direct Rate
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black font-mono" style={{ color: accent }}>
                    {currency}{price}
                  </span>
                  {originalPrice && (
                    <span className="text-xs font-mono text-zinc-500 line-through">
                      {currency}{originalPrice}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-zinc-300">
                    • {pricingPeriod}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                <Star size={11} fill="#fbbf24" />
                <span className="text-white font-bold">5.0</span>
              </div>
            </div>

            <div className="py-2.5 grid grid-cols-2 gap-1.5 text-[10px] text-zinc-300">
              {data.keyPoints.slice(0, 4).map((point, idx) => (
                <div key={idx} className="flex items-center gap-1 truncate">
                  <Check size={10} style={{ color: accent }} className="shrink-0" />
                  <span className="truncate">{point}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl transition-transform hover:scale-[1.01]"
              style={{ backgroundColor: accent, color: '#000000' }}
            >
              <span>{data.ctaText}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      ) : (
        /* Square 1:1, Portrait 4:5, Story 9:16 Layout */
        <>
          {/* Center Zone: Headline, Massive Price Box, and Deliverables */}
          <div className="relative z-10 my-auto py-3 space-y-3 sm:space-y-4">
            {/* Headline */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                {data.badge || 'TRANSPARENT CLIENT PRICING'}
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-[1.15]">
                {data.headline}
              </h2>
              {data.subheadline && (
                <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mt-1 max-w-xl">
                  {data.subheadline}
                </p>
              )}
            </div>

            {/* Price & Offer Card */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                    Investment / Direct Rate
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span
                      className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight"
                      style={{ color: accent }}
                    >
                      {currency}{price}
                    </span>
                    {originalPrice && (
                      <span className="text-sm sm:text-base font-mono text-zinc-500 line-through">
                        {currency}{originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-mono text-zinc-300 font-medium">
                      • {pricingPeriod}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl text-xs font-mono self-start sm:self-auto">
                  <div className="flex text-amber-400">
                    <Star size={11} fill="#fbbf24" />
                    <Star size={11} fill="#fbbf24" />
                    <Star size={11} fill="#fbbf24" />
                    <Star size={11} fill="#fbbf24" />
                    <Star size={11} fill="#fbbf24" />
                  </div>
                  <span className="text-zinc-300 text-[11px] ml-1">5.0 (30+ Brands)</span>
                </div>
              </div>

              {/* Key Deliverables in 2 Columns */}
              <div className="pt-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1.5 font-bold">
                  What's Included in This Scope:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {data.keyPoints.slice(0, 4).map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-zinc-200"
                    >
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-black font-bold"
                        style={{ backgroundColor: accent }}
                      >
                        <Check size={10} strokeWidth={3} />
                      </span>
                      <span className="leading-snug text-[11px] sm:text-xs">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Zone */}
          <div className="relative z-10 pt-2 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Main CTA Button */}
              <div
                className="flex-1 py-3 px-6 rounded-xl font-extrabold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl cursor-pointer hover:brightness-110 active:scale-98 transition-all"
                style={{
                  backgroundColor: accent,
                  color: '#000000',
                }}
              >
                <span>{data.ctaText}</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </div>

              {/* Trust Seal */}
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono shrink-0">
                <ShieldCheck size={16} style={{ color: accent }} />
                <span>{data.trustBadge || '100% Satisfaction Guarantee'}</span>
              </div>
            </div>

            {data.ctaSubtext && (
              <p className="text-center sm:text-left text-[11px] font-mono text-zinc-400">
                {data.ctaSubtext}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
