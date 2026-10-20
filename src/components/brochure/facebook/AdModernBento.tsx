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
  Globe,
  TrendingUp,
  Cpu,
} from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdModernBento: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';
  const isPortrait = data.aspectRatio === '4:5';

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#07090E] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-10' : isLandscape ? 'p-6 sm:p-7' : 'p-7 sm:p-9'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Subtle Aurora Spotlights */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-15 bg-blue-600" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-300 font-mono">
            {data.brandName}
          </span>
        </div>

        {data.badge && (
          <div
            className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border backdrop-blur-md"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
              borderColor: `${accent}35`,
            }}
          >
            {data.badge}
          </div>
        )}
      </div>

      {/* Middle: Bento Grid Structure */}
      {isLandscape ? (
        /* Landscape 1.91:1 Layout */
        <div className="relative z-10 grid grid-cols-12 gap-4 my-auto items-stretch">
          {/* Main Hero Bento Card */}
          <div className="col-span-7 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                {data.headline}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                {data.subheadline}
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4 mt-2 border-t border-white/5">
              <span className="text-xs font-semibold text-zinc-400">
                {data.trustBadge}
              </span>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="col-span-5 flex flex-col gap-3 justify-between">
            {/* Checklist Card */}
            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-2 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                Core Deliverables
              </span>
              {data.keyPoints.slice(0, 3).map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accent}25` }}
                  >
                    <Check size={10} style={{ color: accent }} />
                  </div>
                  <span className="truncate">{pt}</span>
                </div>
              ))}
            </div>

            {/* Metric & Pricing Strip */}
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-3 flex items-center justify-between">
              {data.showPrice && data.price ? (
                <div>
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-lg font-black text-white" style={{ color: accent }}>
                      {data.currency || '$'}{data.price}
                    </span>
                    {data.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through">
                        {data.currency || '$'}{data.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    {data.pricingPeriod || 'Flat Sprint'} {data.priceDiscountBadge ? `• ${data.priceDiscountBadge}` : ''}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-lg font-black text-white font-mono">
                    {data.stats?.[0]?.value || '90+'}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    {data.stats?.[0]?.label || 'Lighthouse Speed'}
                  </div>
                </div>
              )}
              <div className="text-right">
                <div className="text-xs font-bold text-amber-400 flex items-center justify-end gap-1">
                  <Star size={11} className="fill-amber-400" />
                  <span>5.0</span>
                </div>
                <div className="text-[10px] text-zinc-400">Verified Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Square 1:1, Portrait 4:5, Story 9:16 Bento Layout */
        <div className="relative z-10 flex-1 my-4 flex flex-col justify-center gap-3">
          {/* Bento Card 1: Primary Headline */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
            <h2
              className={`font-extrabold tracking-tight text-white leading-tight ${
                isStory ? 'text-2xl sm:text-3xl' : isPortrait ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
              }`}
            >
              {data.headline}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 leading-relaxed font-normal">
              {data.subheadline}
            </p>
          </div>

          {/* Bento Card 2: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.keyPoints.slice(0, 4).map((pt, i) => (
              <div
                key={i}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-xl p-3 flex items-center gap-2.5"
              >
                <div
                  className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${accent}20`,
                    borderColor: `${accent}40`,
                  }}
                >
                  <Check size={11} style={{ color: accent }} />
                </div>
                <span className="text-xs text-zinc-200 font-medium leading-snug">
                  {pt}
                </span>
              </div>
            ))}
          </div>

          {/* Bento Card 3: Metrics & Pricing Bar */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3">
            {data.showPrice && data.price ? (
              <div className="flex items-center gap-3">
                <div className="pr-3 border-r border-white/10">
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-xl sm:text-2xl font-black text-white" style={{ color: accent }}>
                      {data.currency || '$'}{data.price}
                    </span>
                    {data.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through">
                        {data.currency || '$'}{data.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    {data.pricingPeriod || 'Flat Sprint'}
                  </div>
                </div>
                {data.priceDiscountBadge && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {data.priceDiscountBadge}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {data.stats?.slice(0, 2).map((st, i) => (
                  <div key={i} className="border-r border-white/10 pr-4 last:border-0 last:pr-0">
                    <div className="text-base font-black font-mono tracking-tight" style={{ color: accent }}>
                      {st.value}
                    </div>
                    <div className="text-[10px] text-zinc-400">{st.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-right shrink-0">
              <div className="text-xs font-bold text-amber-400 flex items-center justify-end gap-1">
                <Star size={11} className="fill-amber-400" />
                <Star size={11} className="fill-amber-400" />
                <Star size={11} className="fill-amber-400" />
                <Star size={11} className="fill-amber-400" />
                <Star size={11} className="fill-amber-400" />
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{data.ratingText}</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Block */}
      <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Globe size={13} style={{ color: accent }} />
          <span className="font-mono text-zinc-300">{data.website}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">{data.contactHandle}</span>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-transform hover:scale-[1.02]"
          style={{
            backgroundColor: accent,
            color: '#000',
            boxShadow: `0 8px 24px ${accent}40`,
          }}
        >
          <span>{data.ctaText}</span>
          <ArrowRight size={14} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
