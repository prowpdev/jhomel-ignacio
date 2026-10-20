import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import {
  Check,
  Mail,
  Phone,
  Globe,
  MapPin,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateModernPricingMatrix: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const currency = data.currency || '$';

  return (
    <div
      className="w-full bg-[#08090E] text-[#ECEEF2] p-8 sm:p-12 font-sans relative overflow-hidden selection:bg-white/20"
      style={{ minHeight: '1100px' }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} />

      {/* Decorative ambient radial glows */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute top-1/2 -left-48 w-80 h-80 rounded-full blur-[140px] opacity-15 bg-blue-600 pointer-events-none" />

      {/* Subtle isometric grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 border-b border-white/10 pb-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5"
                style={{
                  backgroundColor: `${accent}15`,
                  color: accent,
                  borderColor: `${accent}35`,
                }}
              >
                <Sparkles size={11} />
                <span>Enterprise & Growth Solutions</span>
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10">
                SLA 90+ Lighthouse
              </span>
              {data.showPricing && (
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  Currency: {data.currencyCode || 'USD'} ({currency})
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase">
              {data.companyName}
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 font-medium max-w-2xl">
              {data.tagline}
            </p>
          </div>

          {/* Contact Strip */}
          <div className="flex flex-col gap-1.5 text-xs text-zinc-400 font-mono bg-white/[0.03] backdrop-blur-md border border-white/10 p-4 rounded-xl shrink-0">
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

        {data.introSummary && (
          <div
            className="mt-6 p-4 rounded-xl bg-white/[0.02] border-l-2 text-sm text-zinc-300 leading-relaxed max-w-4xl"
            style={{ borderLeftColor: accent }}
          >
            {data.introSummary}
          </div>
        )}
      </div>

      {/* Services Section with Price Pills */}
      <div className="relative z-10 mb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              Core Engineering & Architecture Capabilities
            </h2>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            {data.services.length} Specialized Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.services.map((service, index) => (
            <div
              key={service.id || index}
              className="flex flex-col justify-between bg-white/[0.025] hover:bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] hover:border-white/20 rounded-xl p-4 sm:p-5 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
                    style={{
                      backgroundColor: `${accent}15`,
                      color: accent,
                    }}
                  >
                    <ServiceIcon name={service.icon} size={18} />
                  </div>

                  {data.showPricing && service.price ? (
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-white/10 border border-white/10">
                        {currency}{service.price}
                      </span>
                      {service.pricingPeriod && (
                        <p className="text-[9px] font-mono text-zinc-500 mt-0.5">
                          {service.pricingPeriod}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-500">
                      MOD-0{index + 1}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight mb-1.5 flex items-center gap-1.5">
                  <span>{service.title}</span>
                  {service.popular && (
                    <span
                      className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase border"
                      style={{
                        backgroundColor: `${accent}15`,
                        color: accent,
                        borderColor: `${accent}30`,
                      }}
                    >
                      Top Pick
                    </span>
                  )}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  {service.description}
                </p>
              </div>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="pt-2.5 border-t border-white/[0.06] mt-auto">
                  <ul className="space-y-1">
                    {service.deliverables.slice(0, 3).map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                        <span className="mt-0.5 shrink-0" style={{ color: accent }}>
                          <Check size={10} strokeWidth={2.5} />
                        </span>
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dedicated Pricing & Investment Matrix Section */}
      {data.showPricing && data.pricingTiers && data.pricingTiers.length > 0 && (
        <div className="relative z-10 mb-10 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <Zap size={13} />
                <span>Investment & Engagement Packages</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Transparent Engineering Tiers & Scope
              </h2>
            </div>
            <div className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              No hidden fees • Direct Senior Architect
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative overflow-hidden ${
                  tier.isPopular
                    ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-2 shadow-2xl'
                    : 'bg-white/[0.02] border border-white/10'
                }`}
                style={{
                  borderColor: tier.isPopular ? accent : undefined,
                }}
              >
                {tier.isPopular && (
                  <div
                    className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-bl-lg tracking-wider"
                    style={{ backgroundColor: accent, color: '#000000' }}
                  >
                    {tier.badge || 'Recommended'}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-mono font-semibold uppercase text-zinc-400">
                      {tier.name}
                    </span>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                        {currency}{tier.price}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {tier.period}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mb-6">
                    <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                      Included Scope & SLA
                    </p>
                    <ul className="space-y-2">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2
                            size={14}
                            className="mt-0.5 shrink-0"
                            style={{ color: tier.isPopular ? accent : '#34d399' }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor: tier.isPopular ? accent : 'rgba(255,255,255,0.08)',
                    color: tier.isPopular ? '#000000' : '#ECEEF2',
                  }}
                >
                  <span>{tier.ctaText || 'Select Tier'}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Guarantee & Note Banner */}
          {(data.pricingGuarantee || data.pricingNote) && (
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              {data.pricingGuarantee && (
                <div className="flex items-center gap-2 text-zinc-300 font-medium">
                  <ShieldCheck size={16} style={{ color: accent }} />
                  <span>{data.pricingGuarantee}</span>
                </div>
              )}
              {data.pricingNote && (
                <p className="text-right text-[11px] text-zinc-400 sm:max-w-md font-mono">
                  {data.pricingNote}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer / SLA & Verification */}
      <div className="relative z-10 border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={13} fill="#fbbf24" />
            <Star size={13} fill="#fbbf24" />
            <Star size={13} fill="#fbbf24" />
            <Star size={13} fill="#fbbf24" />
            <Star size={13} fill="#fbbf24" />
          </div>
          <span className="font-semibold text-white uppercase">{data.companyName}</span>
          <span className="text-zinc-600">·</span>
          <span>Verified Client Solutions & Technical Architecture</span>
        </div>

        <div className="font-mono text-[11px]">
          Direct Inquiry: <span style={{ color: accent }}>{data.email}</span>
        </div>
      </div>
    </div>
  );
};
