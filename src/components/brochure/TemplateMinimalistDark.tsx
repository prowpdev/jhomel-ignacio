import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import { Check, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateMinimalistDark: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';

  return (
    <div
      className="w-full bg-[#090A10] text-[#ECEEF2] p-8 sm:p-12 font-sans relative overflow-hidden selection:bg-white/20"
      style={{
        minHeight: '1050px',
      }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} />

      {/* Background Subtle Gradient & Lines */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header / Brand Zone */}
      <div className="relative z-10 border-b border-white/10 pb-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest uppercase mb-3" style={{ color: accent }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
              Professional Services Catalog
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display uppercase">
              {data.companyName}
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 font-medium mt-1">
              {data.tagline}
            </p>
          </div>

          {/* Quick Contact Box */}
          <div className="flex flex-col gap-1.5 text-xs text-zinc-400 font-mono bg-white/[0.02] border border-white/10 p-3.5 rounded-lg shrink-0">
            {data.email && (
              <span className="flex items-center gap-2">
                <Mail size={13} style={{ color: accent }} /> {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-2">
                <Phone size={13} style={{ color: accent }} /> {data.phone}
              </span>
            )}
            {data.website && (
              <span className="flex items-center gap-2">
                <Globe size={13} style={{ color: accent }} /> {data.website}
              </span>
            )}
            {data.location && (
              <span className="flex items-center gap-2">
                <MapPin size={13} style={{ color: accent }} /> {data.location}
              </span>
            )}
          </div>
        </div>

        {/* Intro Executive Summary */}
        {data.introSummary && (
          <div className="mt-6 p-4 rounded-lg bg-white/[0.03] border-l-2 border-white/10 text-sm text-zinc-300 leading-relaxed" style={{ borderLeftColor: accent }}>
            {data.introSummary}
          </div>
        )}
      </div>

      {/* Services Grid (2 Columns on tablet/desktop) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {data.services.map((service, index) => (
          <div
            key={service.id || index}
            className="flex flex-col justify-between bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 transition-colors relative overflow-hidden group"
          >
            {/* Top Accent Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: accent }}
            />

            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
                  style={{
                    backgroundColor: `${accent}15`,
                    color: accent,
                  }}
                >
                  <ServiceIcon name={service.icon} size={20} />
                </div>
                <div className="flex items-center gap-2">
                  {data.showPricing && service.price && (
                    <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-white/10 border border-white/10">
                      {data.currency || '$'}{service.price}
                    </span>
                  )}
                  <span className="text-[11px] font-mono font-bold text-zinc-500">
                    0{index + 1}
                  </span>
                </div>
              </div>

              <h2 className="text-base font-bold text-white tracking-tight mb-2">
                {service.title}
              </h2>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {service.description}
              </p>
            </div>

            {/* Deliverables / Scope Checklist */}
            {service.deliverables && service.deliverables.length > 0 && (
              <div className="pt-3 border-t border-white/[0.06] mt-auto">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2 font-semibold">
                  Key Deliverables
                </p>
                <ul className="space-y-1.5">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                      <span className="mt-0.5" style={{ color: accent }}>
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pricing Packages Row if enabled */}
      {data.showPricing && data.pricingTiers && data.pricingTiers.length > 0 && (
        <div className="relative z-10 mb-8 border border-white/10 rounded-xl p-5 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-300">
              Fixed Rates & Engagement Packages ({data.currencyCode || 'USD'})
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              Transparent Milestones
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="p-4 rounded-lg bg-black/40 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      {tier.name}
                    </span>
                    {tier.isPopular && (
                      <span
                        className="px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase"
                        style={{ backgroundColor: accent, color: '#000' }}
                      >
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 font-mono my-2">
                    <span className="text-2xl font-black text-white">
                      {data.currency || '$'}{tier.price}
                    </span>
                    <span className="text-xs text-zinc-400">{tier.period}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mb-3">{tier.description}</p>
                </div>

                <ul className="space-y-1 pt-2 border-t border-white/10 text-[10px] text-zinc-300">
                  {tier.features.slice(0, 3).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1">
                      <span className="text-emerald-400">✓</span>
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer / Call to Action Strip */}
      <div className="relative z-10 border-t border-white/10 pt-6 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <div>
          <span className="font-semibold text-white uppercase">{data.companyName}</span>
          <span className="mx-2 text-zinc-600">·</span>
          <span>Verified Client Solutions & Engineering Catalog</span>
        </div>
        <div className="text-right font-mono text-[11px]">
          Ready to initiate project? <span style={{ color: accent }}>{data.email}</span>
        </div>
      </div>
    </div>
  );
};
