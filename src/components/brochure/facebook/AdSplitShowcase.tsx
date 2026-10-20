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
  TrendingUp,
} from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdSplitShowcase: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const currency = data.currency || '$';
  const price = data.price || '1,490';
  const pricingPeriod = data.pricingPeriod || 'Flat fee';

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-9 select-none bg-[#090A12] text-[#ECEEF2] font-sans">
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Decorative gradient glow */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: accent, color: '#000000' }}
          >
            {data.brandName.charAt(0) || 'J'}
          </div>
          <span className="font-bold text-xs uppercase tracking-tight text-white">
            {data.brandName}
          </span>
        </div>

        {data.showPrice && (
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-xs text-zinc-400">Starting at</span>
            <span
              className="text-base font-extrabold px-2 py-0.5 rounded bg-white/10 border border-white/10"
              style={{ color: accent }}
            >
              {currency}{price}
            </span>
          </div>
        )}
      </div>

      {/* Center 2-Column Split Showcase */}
      <div className="relative z-10 my-auto py-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left Column: Hook, Headline & Star Rating (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
              borderColor: `${accent}35`,
            }}
          >
            <Sparkles size={11} />
            <span>{data.badge || 'PRO SERVICES'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
            {data.headline}
          </h2>

          <p className="text-xs text-zinc-300 leading-relaxed">
            {data.subheadline}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <div className="flex text-amber-400">
              <Star size={11} fill="#fbbf24" />
              <Star size={11} fill="#fbbf24" />
              <Star size={11} fill="#fbbf24" />
              <Star size={11} fill="#fbbf24" />
              <Star size={11} fill="#fbbf24" />
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              {data.ratingText || '5.0 Trusted by Founders'}
            </span>
          </div>
        </div>

        {/* Right Column: Key Deliverables Card (5 cols) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 space-y-2.5 shadow-xl">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
            Core Scope Deliverables:
          </span>

          <ul className="space-y-2">
            {data.keyPoints.slice(0, 4).map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[11px] text-zinc-200">
                <span className="mt-0.5 shrink-0" style={{ color: accent }}>
                  <Check size={12} strokeWidth={2.5} />
                </span>
                <span className="line-clamp-2">{pt}</span>
              </li>
            ))}
          </ul>

          {data.stats && data.stats.length > 0 && (
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-center">
              {data.stats.slice(0, 2).map((st, sIdx) => (
                <div key={sIdx}>
                  <div className="font-mono text-xs font-bold text-white" style={{ color: accent }}>
                    {st.value}
                  </div>
                  <div className="text-[9px] text-zinc-400">{st.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA & Trust Bar */}
      <div className="relative z-10 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
          <ShieldCheck size={14} style={{ color: accent }} />
          <span>{data.trustBadge}</span>
        </div>

        <div
          className="w-full sm:w-auto py-2.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:brightness-110 active:scale-98 transition-all"
          style={{
            backgroundColor: accent,
            color: '#000000',
          }}
        >
          <span>{data.ctaText}</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};
