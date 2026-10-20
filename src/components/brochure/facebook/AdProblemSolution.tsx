import React from 'react';
import { FacebookAdData } from '../types';
import { AdBackgroundLayer } from './AdBackgroundLayer';
import { XCircle, CheckCircle2, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AdProps {
  data: FacebookAdData;
}

export const AdProblemSolution: React.FC<AdProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const isLandscape = data.aspectRatio === '1.91:1';
  const isStory = data.aspectRatio === '9:16';

  const problems = data.problemBefore || [
    'Bloated themes dropping mobile shoppers',
    'Unreliable contractors ghosting mid-project',
    'Zero conversion tracking or GA4 analytics',
  ];

  const solutions = data.solutionAfter || [
    'Sub-second bespoke code guaranteed 90+ Lighthouse',
    'Direct Senior Engineer access with daily updates',
    'Full GA4 attribution & Google Tag Manager setup',
  ];

  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-[#0A0B11] text-white flex flex-col justify-between select-none ${
        isStory ? 'p-8 sm:p-12' : isLandscape ? 'p-6 sm:p-8' : 'p-7 sm:p-10'
      }`}
    >
      <AdBackgroundLayer background={data.background} accentColor={accent} />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: accent }}
          />
          <span className="text-xs font-mono font-bold tracking-wider text-white">
            {data.brandName}
          </span>
        </div>

        {data.badge && (
          <span
            className="text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold border"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: '#f87171',
            }}
          >
            {data.badge}
          </span>
        )}
      </div>

      {/* Main Headline */}
      <div className="relative z-10 text-center my-auto space-y-3">
        <h1
          className={`font-black tracking-tight leading-tight text-white font-display ${
            isStory
              ? 'text-3xl'
              : isLandscape
              ? 'text-2xl'
              : 'text-2xl sm:text-[26px]'
          }`}
        >
          {data.headline}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
          {data.subheadline}
        </p>

        {/* Comparison Boxes: Problem vs Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
          {/* The Old Way / Problem */}
          <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20 backdrop-blur-sm space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              <XCircle size={14} />
              <span>Current Common Issues</span>
            </div>
            <div className="space-y-1.5">
              {problems.slice(0, 3).map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-300">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span className="line-through text-zinc-400">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The New Way / Solution */}
          <div
            className="p-3.5 rounded-xl bg-black/40 border backdrop-blur-sm space-y-2"
            style={{ borderColor: `${accent}40` }}
          >
            <div
              className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: accent }}
            >
              <CheckCircle2 size={14} />
              <span>With Jhomel Ignacio</span>
            </div>
            <div className="space-y-1.5">
              {solutions.slice(0, 3).map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-200 font-medium">
                  <span className="shrink-0 font-bold" style={{ color: accent }}>✓</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
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
            <p className="text-center text-[10px] text-zinc-400 font-mono mt-1.5">
              {data.ctaSubtext}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-3">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <ShieldCheck size={13} style={{ color: accent }} /> Guaranteed Technical SLA
        </span>
        <span>{data.website}</span>
      </div>
    </div>
  );
};
