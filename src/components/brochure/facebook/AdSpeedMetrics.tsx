import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { Gauge, Zap, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdSpeedMetrics: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#08090E] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-12' : isLandscape ? 'p-6 sm:p-8' : 'p-7 sm:p-10'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-black text-xs"
            style={{ backgroundColor: accent }}
          >
            <Zap size={15} />
          </div>
          <div>
            <span className="text-xs font-bold font-mono text-white block">{data.brandName}</span>
            <span className="text-[10px] text-zinc-400 font-mono">Performance Engineering</span>
          </div>
        </div>

        {data.badge && (
          <div
            className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-sm"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
              borderColor: `${accent}40`,
            }}
          >
            {data.badge}
          </div>
        )}
      </div>

      {/* Main Content */}
      {isLandscape ? (
        <div className="relative z-10 grid grid-cols-12 gap-6 my-auto items-center">
          <div className="col-span-7 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-tight">
              {data.headline}
            </h1>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {data.subheadline}
            </p>
          </div>

          <div className="col-span-5 space-y-3">
            {/* Speed Badge Card */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider block">Target Speed</span>
                <span className="text-2xl font-black font-mono text-white">&lt; 0.9s</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider block">Google Lighthouse</span>
                <span className="text-2xl font-black font-mono" style={{ color: accent }}>98/100</span>
              </div>
            </div>

            <div
              className="w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 cursor-pointer"
              style={{ backgroundColor: accent, color: '#000000' }}
            >
              <span>{data.ctaText}</span>
              <ArrowRight size={15} />
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative z-10 my-auto ${isStory ? 'space-y-6' : 'space-y-4'}`}>
          {/* Big Headline */}
          <h1
            className={`font-black text-white font-display tracking-tight leading-tight ${
              isStory ? 'text-3xl' : 'text-2xl sm:text-[27px]'
            }`}
          >
            {data.headline}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {data.subheadline}
          </p>

          {/* Large Speedometer / Metric Card */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1.5">
                <Gauge size={14} style={{ color: accent }} /> Google Core Web Vitals Audit
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PASSED
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xl sm:text-2xl font-black font-mono" style={{ color: accent }}>98</div>
                <div className="text-[9px] text-zinc-400 uppercase font-mono mt-0.5">Performance</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">0.8s</div>
                <div className="text-[9px] text-zinc-400 uppercase font-mono mt-0.5">LCP Speed</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xl sm:text-2xl font-black font-mono text-white">0.00</div>
                <div className="text-[9px] text-zinc-400 uppercase font-mono mt-0.5">CLS Shift</div>
              </div>
            </div>
          </div>

          {/* Value Bullet Points */}
          <div className="space-y-1.5 text-xs text-zinc-200">
            {data.keyPoints.slice(0, 3).map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 size={13} className="shrink-0" style={{ color: accent }} />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <div
              className="w-full py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl hover:brightness-110 cursor-pointer"
              style={{
                backgroundColor: accent,
                color: '#000000',
                boxShadow: `0 10px 25px -5px ${accent}40`,
              }}
            >
              <span>{data.ctaText}</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </div>
            {data.ctaSubtext && (
              <p className="text-center text-[10px] text-zinc-400 font-mono mt-2">
                {data.ctaSubtext}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-3">
        <span>{data.website}</span>
        <span>{data.contactHandle}</span>
      </div>
    </div>
  );
};
