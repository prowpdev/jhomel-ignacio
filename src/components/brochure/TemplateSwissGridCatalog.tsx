import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import { Check, Mail, Phone, Globe, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateSwissGridCatalog: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const currency = data.currency || '$';

  return (
    <div
      className="w-full bg-[#0A0B0E] text-[#ECEEF2] p-8 sm:p-14 font-sans relative overflow-hidden"
      style={{ minHeight: '1100px' }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} />

      {/* Swiss Architectural Fine Grid */}
      <div className="absolute inset-0 border border-white/10 m-4 sm:m-8 pointer-events-none" />

      {/* Top Swiss Header Band */}
      <div className="relative z-10 border-b border-white/15 pb-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-400 block font-bold">
              Engineering Catalogue / Issue 2026
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              {data.companyName}
            </h1>
          </div>

          <div className="text-right sm:text-right font-mono text-xs">
            <div
              className="inline-block px-3 py-1 text-black font-bold text-xs uppercase tracking-wider mb-2"
              style={{ backgroundColor: accent }}
            >
              {data.showPricing ? `Rates in ${data.currencyCode || 'USD'} (${currency})` : 'Architecture Scope'}
            </div>
            <p className="text-zinc-400">{data.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div className="md:col-span-2">
            <p className="text-base sm:text-lg font-medium text-zinc-300 leading-snug">
              {data.tagline}
            </p>
            {data.introSummary && (
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2.5">
                {data.introSummary}
              </p>
            )}
          </div>

          <div className="flex flex-col justify-end space-y-1.5 font-mono text-xs text-zinc-400 border-l border-white/10 pl-6">
            {data.email && (
              <div className="flex items-center gap-2">
                <Mail size={12} style={{ color: accent }} />
                <span>{data.email}</span>
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
                <span>{data.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Grid (Swiss Asymmetric Cards) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-8">
        {data.services.map((service, index) => (
          <div
            key={service.id || index}
            className="bg-[#0D0E14]/95 p-6 sm:p-7 flex flex-col justify-between hover:bg-[#12141C] transition-colors"
          >
            <div>
              <div className="flex items-baseline justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-zinc-500">
                    № 0{index + 1}
                  </span>
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center"
                    style={{
                      backgroundColor: `${accent}20`,
                      color: accent,
                    }}
                  >
                    <ServiceIcon name={service.icon} size={15} />
                  </div>
                </div>

                {data.showPricing && service.price && (
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-base sm:text-lg font-bold text-white">
                      {currency}{service.price}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {service.pricingPeriod || ''}
                    </span>
                  </div>
                )}
              </div>

              <h2 className="text-lg font-bold text-white tracking-tight mb-2">
                {service.title}
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                {service.description}
              </p>
            </div>

            {service.deliverables && service.deliverables.length > 0 && (
              <div className="pt-3 border-t border-white/5 mt-auto">
                <ul className="space-y-1.5">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="mt-1" style={{ color: accent }}>
                        <ArrowUpRight size={11} strokeWidth={2.5} />
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
        <div className="relative z-10 border border-white/10 p-6 bg-white/[0.015] mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
              Engagement Tiers & Project Fixed Rates
            </span>
            <span className="font-mono text-[11px] text-zinc-400">
              Currency: {data.currencyCode || 'USD'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="p-4 border border-white/10 bg-[#0E1017] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase font-bold text-zinc-300">
                      {tier.name}
                    </span>
                    {tier.isPopular && (
                      <span
                        className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase"
                        style={{ backgroundColor: accent, color: '#000000' }}
                      >
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 font-mono mb-2">
                    <span className="text-2xl font-black text-white">
                      {currency}{tier.price}
                    </span>
                    <span className="text-xs text-zinc-400">{tier.period}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mb-3">{tier.description}</p>
                </div>

                <ul className="space-y-1 pt-3 border-t border-white/10 text-[11px] text-zinc-300">
                  {tier.features.slice(0, 3).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <span className="mt-0.5 text-zinc-500">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Architectural Bar */}
      <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} style={{ color: accent }} />
          <span>{data.pricingGuarantee || 'Code Ownership & 30-Day Hypercare Guarantee'}</span>
        </div>
        <div className="text-zinc-300">
          Inquiries: <span className="font-bold underline text-white">{data.email}</span>
        </div>
      </div>
    </div>
  );
};
