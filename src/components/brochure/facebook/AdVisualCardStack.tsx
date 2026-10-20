import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { ArrowRight, Sparkles, Layers, Check, ShieldCheck, Zap } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdVisualCardStack: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';
  const isPortrait = data.aspectRatio === '4:5';

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#080A0E] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-11' : isLandscape ? 'p-6 sm:p-7' : 'p-7 sm:p-9'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}
          >
            <Layers size={14} />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-300">
            {data.brandName}
          </span>
        </div>

        {data.badge && (
          <span
            className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border backdrop-blur-md"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
              borderColor: `${accent}40`,
            }}
          >
            {data.badge}
          </span>
        )}
      </div>

      {/* Middle: Layered Cards Visual */}
      {isLandscape ? (
        <div className="relative z-10 grid grid-cols-12 gap-6 my-auto items-center">
          <div className="col-span-7 space-y-3">
            <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
              {data.headline}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal">
              {data.subheadline}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <ShieldCheck size={14} style={{ color: accent }} />
              <span>{data.trustBadge}</span>
            </div>
          </div>

          <div className="col-span-5 relative">
            {/* Background Staggered Card 1 */}
            <div className="absolute -top-3 -right-2 w-full h-full bg-white/[0.02] border border-white/5 rounded-2xl transform rotate-2 pointer-events-none" />
            {/* Front Card */}
            <div className="relative bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-2xl space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                Included in Free Sprint Audit
              </div>
              {data.keyPoints.slice(0, 3).map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: accent, color: '#000' }}
                  >
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span className="truncate font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 my-auto py-2 flex flex-col justify-center">
          {/* Headline block */}
          <div className="mb-4">
            <h2
              className={`font-black tracking-tight text-white leading-tight ${
                isStory ? 'text-2xl sm:text-3xl' : isPortrait ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
              }`}
            >
              {data.headline}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-normal leading-relaxed">
              {data.subheadline}
            </p>
          </div>

          {/* 3D Staggered Stacked Cards */}
          <div className="relative mt-2">
            {/* Layer 1 (Bottom Backing Card) */}
            <div
              className="absolute -top-2 left-3 right-3 h-20 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-sm -rotate-1 pointer-events-none"
            />
            {/* Layer 2 (Middle Backing Card) */}
            <div
              className="absolute -top-1 left-1.5 right-1.5 h-20 bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm rotate-1 pointer-events-none"
            />

            {/* Layer 3 (Hero Foreground Card) */}
            <div className="relative bg-[#11141D]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase" style={{ color: accent }}>
                  Engineering Deliverables SLA
                </span>
                <span className="text-[10px] font-mono text-zinc-400">100% Quality Guaranteed</span>
              </div>

              <div className="space-y-2">
                {data.keyPoints.slice(0, isStory ? 4 : 3).map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                    <div
                      className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${accent}25`, border: `1px solid ${accent}40` }}
                    >
                      <Check size={10} style={{ color: accent }} />
                    </div>
                    <span className="font-medium text-zinc-200">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/5">
                <span>{data.ratingText}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-300 font-semibold">{data.trustBadge}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-zinc-400 font-mono">
          <span>{data.website}</span>
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
