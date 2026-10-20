import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { ArrowRight, Star, Check } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdCleanEditorial: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#0F1117] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-12' : isLandscape ? 'p-6 sm:p-8' : 'p-8 sm:p-10'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Frame Border Line */}
      <div className="absolute inset-4 sm:inset-5 border border-white/10 pointer-events-none rounded-xl" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-zinc-400 block mb-0.5">
            ENGINEERING & ARCHITECTURE
          </span>
          <span className="text-sm font-bold tracking-tight text-white font-display">
            {data.brandName}
          </span>
        </div>

        {data.badge && (
          <span
            className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{
              borderColor: `${accent}50`,
              color: accent,
              backgroundColor: `${accent}10`,
            }}
          >
            {data.badge}
          </span>
        )}
      </div>

      {/* Center Editorial Quote & Hook */}
      {isLandscape ? (
        <div className="relative z-10 grid grid-cols-12 gap-6 my-auto items-center px-4">
          <div className="col-span-8 space-y-2">
            <h1 className="text-2xl font-serif italic text-white tracking-tight leading-tight">
              &ldquo;{data.headline}&rdquo;
            </h1>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              {data.subheadline}
            </p>
          </div>
          <div className="col-span-4 space-y-3 text-right">
            <div
              className="py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              <span>{data.ctaText}</span>
              <ArrowRight size={14} />
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">{data.website}</p>
          </div>
        </div>
      ) : (
        <div className={`relative z-10 my-auto px-2 ${isStory ? 'space-y-6' : 'space-y-4'}`}>
          <div className="text-4xl sm:text-5xl font-serif text-white/20 select-none -mb-3">
            &ldquo;
          </div>

          <h1
            className={`font-serif italic font-normal tracking-tight text-white leading-snug ${
              isStory ? 'text-3xl' : 'text-2xl sm:text-[26px]'
            }`}
          >
            {data.headline}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {data.subheadline}
          </p>

          {/* Minimal 3 Deliverable Rows */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            {data.keyPoints.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Social rating */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            <span className="text-[11px] font-mono">{data.ratingText}</span>
          </div>

          {/* Editorial Button */}
          <div className="pt-2">
            <div
              className="w-full py-3.5 px-6 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] cursor-pointer"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
            >
              <span>{data.ctaText}</span>
              <ArrowRight size={15} />
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
