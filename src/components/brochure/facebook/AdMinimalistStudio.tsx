import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { ArrowUpRight, Check, Star, ShieldCheck, Mail } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdMinimalistStudio: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';
  const isPortrait = data.aspectRatio === '4:5';

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#0A0B0E] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-12' : isLandscape ? 'p-6 sm:p-8' : 'p-8 sm:p-11'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Top Header - Swiss Editorial Restraint */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-sm font-semibold tracking-tight text-white block">
            {data.brandName}
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            Solutions Architecture & Dev
          </span>
        </div>

        {data.badge && (
          <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-300 flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: accent }}
            />
            <span>{data.badge}</span>
          </div>
        )}
      </div>

      {/* Main Focus Area */}
      {isLandscape ? (
        <div className="relative z-10 grid grid-cols-12 gap-8 my-auto items-center">
          <div className="col-span-7">
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white leading-tight">
              {data.headline}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-normal leading-relaxed">
              {data.subheadline}
            </p>
          </div>

          <div className="col-span-5 space-y-3 border-l border-white/10 pl-6">
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
              Deliverables SLA
            </div>
            {data.keyPoints.slice(0, 3).map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="font-mono text-zinc-500 text-[11px]">0{i + 1}</span>
                <span className="font-medium leading-snug">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 my-auto py-4 space-y-5 sm:space-y-6">
          <div>
            <h1
              className={`font-light tracking-tight text-white leading-tight ${
                isStory ? 'text-3xl sm:text-4xl' : isPortrait ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
              }`}
              style={{ textWrap: 'balance' }}
            >
              {data.headline}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-3.5 max-w-xl font-normal leading-relaxed">
              {data.subheadline}
            </p>
          </div>

          {/* Clean Deliverable Rows */}
          <div className="border-t border-b border-white/10 py-3 divide-y divide-white/5 space-y-2">
            {data.keyPoints.slice(0, isStory ? 4 : 3).map((pt, i) => (
              <div key={i} className="pt-2 first:pt-0 flex items-center justify-between text-xs text-zinc-200">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-zinc-500">0{i + 1}</span>
                  <span className="font-medium">{pt}</span>
                </div>
                <Check size={13} style={{ color: accent }} />
              </div>
            ))}
          </div>

          {/* Trust Footnote */}
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-zinc-200 font-semibold">{data.ratingText}</span>
            </div>
            <span className="text-[11px] text-zinc-400">{data.trustBadge}</span>
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-zinc-400 font-mono flex items-center gap-2">
          <span>{data.website}</span>
          <span className="text-zinc-600">/</span>
          <span>{data.contactHandle}</span>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wide border transition-all hover:bg-white hover:text-black"
          style={{
            borderColor: accent,
            color: accent,
            backgroundColor: `${accent}10`,
          }}
        >
          <span>{data.ctaText}</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};
