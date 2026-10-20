import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { Sparkles, ArrowRight, ShieldCheck, Check, Zap, Star } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdDarkAuroraNeo: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';
  const isPortrait = data.aspectRatio === '4:5';

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#06080F] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-11' : isLandscape ? 'p-6 sm:p-7' : 'p-7 sm:p-10'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Dynamic Multi-Color Aurora Mesh Orbs */}
      <div
        className="absolute -top-10 -left-10 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-25"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute top-1/2 -right-16 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-20 bg-indigo-500" />
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20 bg-cyan-500" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        {data.badge ? (
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-bold uppercase border backdrop-blur-xl"
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

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-black/40 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
          <span className="font-semibold">{data.brandName}</span>
        </div>
      </div>

      {/* Middle Content */}
      {isLandscape ? (
        <div className="relative z-10 grid grid-cols-12 gap-6 my-auto items-center">
          <div className="col-span-7 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {data.headline}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              {data.subheadline}
            </p>
          </div>

          <div className="col-span-5 bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-5 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Why High-Growth Brands Switch
            </div>
            {data.keyPoints.slice(0, 3).map((pt, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${accent}30` }}
                >
                  <Check size={10} style={{ color: accent }} />
                </div>
                <span className="truncate">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 my-auto py-2 space-y-4">
          <div>
            <h2
              className={`font-black tracking-tight text-white leading-tight ${
                isStory ? 'text-2xl sm:text-3xl' : isPortrait ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
              }`}
            >
              {data.headline}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 font-normal leading-relaxed">
              {data.subheadline}
            </p>
          </div>

          {/* Translucent Aurora Feature Card */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xl">
            <div className="grid grid-cols-1 gap-2.5">
              {data.keyPoints.slice(0, isStory ? 4 : 3).map((pt, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: accent, color: '#000' }}
                  >
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span className="font-medium text-zinc-100">{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-zinc-200 font-semibold">{data.ratingText}</span>
              </span>
              <span>{data.trustBadge}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Bar */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <ShieldCheck size={13} style={{ color: accent }} />
          <span>{data.website}</span>
          <span className="text-zinc-600">•</span>
          <span>{data.contactHandle}</span>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-xl transition-all hover:scale-[1.02]"
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
