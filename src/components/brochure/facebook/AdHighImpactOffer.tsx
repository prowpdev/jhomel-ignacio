import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { CheckCircle2, Star, ArrowRight, ShieldCheck, Sparkles, Globe, Mail } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdHighImpactOffer: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';
  const isPortrait = data.aspectRatio === '4:5';

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#0A0B10] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-12' : isLandscape ? 'p-6 sm:p-8' : 'p-7 sm:p-10'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Ambient Radial Glow */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-15"
        style={{ backgroundColor: accent }}
      />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        {data.badge ? (
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-bold uppercase border shadow-sm backdrop-blur-md"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
              borderColor: `${accent}40`,
            }}
          >
            <Sparkles size={12} style={{ color: accent }} />
            <span>{data.badge}</span>
          </div>
        ) : <div />}

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
          <ShieldCheck size={13} style={{ color: accent }} />
          <span className="font-semibold text-white">{data.brandName}</span>
        </div>
      </div>

      {/* Main Content Area */}
      {isLandscape ? (
        /* Landscape 1.91:1 Dual Column Layout */
        <div className="relative z-10 grid grid-cols-12 gap-6 my-auto items-center">
          <div className="col-span-7 space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white font-display">
              {data.headline}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
              {data.subheadline}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {data.keyPoints.slice(0, 4).map((pt, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-zinc-200">
                  <CheckCircle2 size={13} className="shrink-0" style={{ color: accent }} />
                  <span className="truncate">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center space-y-2.5">
            {data.showPrice && data.price && (
              <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-zinc-400 block uppercase font-bold">Limited Offer</span>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-lg font-black" style={{ color: accent }}>
                      {data.currency || '$'}{data.price}
                    </span>
                    {data.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through">
                        {data.currency || '$'}{data.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                {data.priceDiscountBadge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                    {data.priceDiscountBadge}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
              <span className="ml-1 text-white text-[11px] font-mono">5.0</span>
            </div>
            <button
              type="button"
              className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: accent, color: '#000000' }}
            >
              <span>{data.ctaText}</span>
              <ArrowRight size={15} />
            </button>
            <span className="text-[10px] text-zinc-400 font-mono">{data.ctaSubtext}</span>
          </div>
        </div>
      ) : (
        /* 1:1 Square, 4:5 Portrait, 9:16 Story Layout */
        <div className={`relative z-10 my-auto ${isStory ? 'space-y-6' : isPortrait ? 'space-y-5' : 'space-y-4'}`}>
          {/* Main Headline */}
          <h1
            className={`font-black tracking-tight leading-[1.1] text-white font-display ${
              isStory
                ? 'text-3xl sm:text-4xl'
                : isPortrait
                ? 'text-2xl sm:text-3xl'
                : 'text-2xl sm:text-[28px]'
            }`}
          >
            {data.headline}
          </h1>

          {/* Subheadline */}
          <p
            className={`text-zinc-300 font-medium leading-relaxed ${
              isStory ? 'text-base' : 'text-xs sm:text-sm'
            }`}
          >
            {data.subheadline}
          </p>

          {/* Value Checklist */}
          <div className="space-y-2.5 pt-1">
            {data.keyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${accent}25`, color: accent }}
                >
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-zinc-200">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Social Proof Bar */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="text-zinc-300 font-mono text-[11px] ml-1">{data.ratingText}</span>
            </div>
            <span className="font-mono text-[11px] text-zinc-400 truncate">{data.trustBadge}</span>
          </div>

          {/* Special Price Offer Block */}
          {data.showPrice && data.price && (
            <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                  Limited Time Rate
                </span>
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-2xl font-black" style={{ color: accent }}>
                    {data.currency || '$'}{data.price}
                  </span>
                  {data.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through">
                      {data.currency || '$'}{data.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-zinc-400">
                    • {data.pricingPeriod || 'Sprint'}
                  </span>
                </div>
              </div>
              {data.priceDiscountBadge && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {data.priceDiscountBadge}
                </span>
              )}
            </div>
          )}

          {/* Call to Action Button */}
          <div className="pt-1">
            <div
              className="w-full py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-all hover:brightness-110 cursor-pointer"
              style={{
                backgroundColor: accent,
                color: '#000000',
                boxShadow: `0 10px 25px -5px ${accent}50`,
              }}
            >
              <span>{data.ctaText}</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </div>
            {data.ctaSubtext && (
              <p className="text-center text-[11px] text-zinc-400 font-mono mt-2">
                {data.ctaSubtext}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Footer Branding & Watermark */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <Globe size={12} style={{ color: accent }} />
          <span className="text-zinc-300">{data.website}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={12} style={{ color: accent }} />
          <span>{data.contactHandle}</span>
        </div>
      </div>
    </div>
  );
};
