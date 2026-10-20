import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import { Check, Mail, Phone, Globe, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateCreativeEditorial: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#E11D48';

  return (
    <div
      className="w-full bg-[#111216] text-[#F3F4F6] p-8 sm:p-12 font-sans relative overflow-hidden"
      style={{
        minHeight: '1050px',
      }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} />

      {/* Editorial Top Index & Title */}
      <div className="border-b border-zinc-700/60 pb-8 mb-8">
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-zinc-400 mb-6">
          <span className="flex items-center gap-1.5" style={{ color: accent }}>
            <Sparkles size={13} />
            STUDIO FOLIO / VOL. 2026
          </span>
          <span>SERVICES & SOLUTIONS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase font-display text-white leading-none mb-3">
              {data.companyName}
            </h1>
            <p className="text-lg sm:text-xl font-light text-zinc-300 italic">
              "{data.tagline}"
            </p>
          </div>

          <div className="lg:col-span-4 border-l border-zinc-800 pl-6 space-y-2 text-xs font-mono text-zinc-400">
            {data.email && (
              <div className="flex items-center gap-2">
                <Mail size={12} style={{ color: accent }} />
                <span className="text-zinc-200">{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-2">
                <Phone size={12} style={{ color: accent }} />
                <span>{data.phone}</span>
              </div>
            )}
            {data.website && (
              <div className="flex items-center gap-2">
                <Globe size={12} style={{ color: accent }} />
                <span className="text-zinc-200">{data.website}</span>
              </div>
            )}
            {data.location && (
              <div className="flex items-center gap-2">
                <MapPin size={12} style={{ color: accent }} />
                <span>{data.location}</span>
              </div>
            )}
          </div>
        </div>

        {data.introSummary && (
          <div className="mt-6 pt-6 border-t border-zinc-800/80 text-sm text-zinc-300 max-w-3xl leading-relaxed">
            {data.introSummary}
          </div>
        )}
      </div>

      {/* Editorial Service Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7 mb-10">
        {data.services.map((service, index) => (
          <div
            key={service.id || index}
            className="border-b border-zinc-800 pb-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-2xl font-black font-display tracking-tighter"
                  style={{ color: accent }}
                >
                  0{index + 1}.
                </span>
                <div className="flex items-center gap-2">
                  {data.showPricing && service.price && (
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${accent}15`,
                        color: accent,
                        borderColor: `${accent}30`,
                      }}
                    >
                      {data.currency || '$'}{service.price}
                    </span>
                  )}
                  <div
                    className="p-1.5 rounded bg-zinc-900 border border-zinc-800"
                    style={{ color: accent }}
                  >
                    <ServiceIcon name={service.icon} size={16} />
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-bold text-white tracking-tight uppercase mb-2 font-display">
                {service.title}
              </h2>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {service.description}
              </p>
            </div>

            {service.deliverables && service.deliverables.length > 0 && (
              <div className="mt-auto pt-2 bg-zinc-900/40 p-3 rounded border border-zinc-800/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[10px] text-zinc-300">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Editorial Pricing & Rates Matrix */}
      {data.showPricing && data.pricingTiers && data.pricingTiers.length > 0 && (
        <div className="mb-8 pt-6 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block">
                [ SECTION 02 : ENGAGEMENT ARCHITECTURE ]
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight uppercase">
                Fixed Investment Tiers ({data.currencyCode || 'USD'})
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-400">
              Direct Senior Execution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between"
                style={{
                  borderColor: tier.isPopular ? accent : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase font-bold text-zinc-300">
                      {tier.name}
                    </span>
                    {tier.isPopular && (
                      <span
                        className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded border"
                        style={{
                          backgroundColor: `${accent}20`,
                          color: accent,
                          borderColor: `${accent}40`,
                        }}
                      >
                        {tier.badge || 'Popular'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 font-mono my-2">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {data.currency || '$'}{tier.price}
                    </span>
                    <span className="text-xs text-zinc-500">{tier.period}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-3">{tier.description}</p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80">
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {tier.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
                        <span className="text-[11px]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {(data.pricingGuarantee || data.pricingNote) && (
            <div className="mt-4 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 font-mono">
              {data.pricingGuarantee && (
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} style={{ color: accent }} />
                  <span>{data.pricingGuarantee}</span>
                </div>
              )}
              {data.pricingNote && (
                <span className="text-[11px] text-zinc-500">{data.pricingNote}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom Editorial Bar */}
      <div className="border-t border-zinc-800 pt-6 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div className="uppercase">
          [ {data.companyName} ] ALL RIGHTS RESERVED
        </div>
        <div>
          DIRECT INQUIRY: <span className="font-bold text-white">{data.email}</span>
        </div>
      </div>
    </div>
  );
};
