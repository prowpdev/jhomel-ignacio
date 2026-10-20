import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { Terminal, Cpu, ArrowUpRight, Check, Zap, Code2, Globe } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdTechGlow: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';

  const stats = data.stats || [
    { value: '90+', label: 'Lighthouse' },
    { value: '< 1s', label: 'Load Speed' },
    { value: '100%', label: 'Clean Code' },
  ];

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#07080C] text-zinc-100 flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-12' : isLandscape ? 'p-6 sm:p-8' : 'p-7 sm:p-10'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Top Terminal Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <Terminal size={13} style={{ color: accent }} />
          <span className="text-white font-bold tracking-wider">{data.brandName}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 text-[11px]">solutions-architect</span>
        </div>

        {data.badge && (
          <div
            className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/60 border uppercase tracking-wider font-bold"
            style={{ color: accent, borderColor: `${accent}40` }}
          >
            {data.badge}
          </div>
        )}
      </div>

      {/* Main Body */}
      {isLandscape ? (
        <div className="relative z-10 grid grid-cols-12 gap-6 my-auto items-center">
          <div className="col-span-7 space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-tight">
              {data.headline}
            </h1>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {data.subheadline}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Shopify Plus', 'Laravel 11', 'GA4 & GTM', 'React/Vue', 'PostgreSQL'].map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] border border-white/10 text-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-5 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {stats.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-center">
                  <div className="text-base font-black font-mono" style={{ color: accent }}>{s.value}</div>
                  <div className="text-[9px] text-zinc-400 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            <div
              className="w-full py-3 px-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              style={{ backgroundColor: accent, color: '#000' }}
            >
              <span>{data.ctaText}</span>
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative z-10 my-auto ${isStory ? 'space-y-6' : 'space-y-4'}`}>
          {/* Tech Tag Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['SHOPIFY PLUS', 'LARAVEL 11', 'GA4 / SEO', 'REACT'].map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider bg-white/[0.04] border border-white/10 text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            className={`font-black text-white font-mono tracking-tight leading-tight ${
              isStory ? 'text-3xl' : 'text-2xl sm:text-[26px]'
            }`}
          >
            {data.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {data.subheadline}
          </p>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-center"
              >
                <div
                  className="text-lg sm:text-xl font-black font-mono"
                  style={{ color: accent }}
                >
                  {item.value}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5 font-mono">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key Deliverables Terminal List */}
          <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs space-y-2 backdrop-blur-md">
            {data.keyPoints.slice(0, 3).map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-zinc-300">
                <span style={{ color: accent }}>&gt;</span>
                <span className="truncate">{pt}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-1">
            <div
              className="w-full py-3.5 px-6 rounded-xl font-black font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 cursor-pointer"
              style={{
                backgroundColor: accent,
                color: '#000000',
                boxShadow: `0 8px 20px ${accent}40`,
              }}
            >
              <span>{data.ctaText}</span>
              <ArrowUpRight size={16} />
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
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <Globe size={12} style={{ color: accent }} /> {data.website}
        </span>
        <span className="text-zinc-500">ssh @ {data.contactHandle}</span>
      </div>
    </div>
  );
};
