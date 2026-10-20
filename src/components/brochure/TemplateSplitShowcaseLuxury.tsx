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
  Star,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateSplitShowcaseLuxury: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#CEFF00';
  const currency = data.currency || '$';

  return (
    <div
      className="w-full bg-[#08090D] text-[#ECEEF2] p-6 sm:p-10 font-sans relative overflow-hidden"
      style={{ minHeight: '1100px' }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} />

      {/* Decorative luxury gradient ribbons */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Brand, Bio, Guarantees & Terms) - 4 cols */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-r lg:border-white/10 lg:pr-6">
          <div className="space-y-6">
            {/* Brand Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: accent }}
                />
                <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 font-bold">
                  Solutions Architecture
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                {data.companyName}
              </h1>
              <p
                className="text-xs sm:text-sm font-semibold tracking-wide uppercase mt-1"
                style={{ color: accent }}
              >
                {data.tagline}
              </p>
            </div>

            {/* Intro Narrative */}
            {data.introSummary && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-300 leading-relaxed">
                {data.introSummary}
              </div>
            )}

            {/* Direct Contact Card */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 font-mono text-xs text-zinc-400">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                Direct Contact Line
              </span>
              {data.email && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <Mail size={13} style={{ color: accent }} />
                  <span className="truncate">{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <Phone size={13} style={{ color: accent }} />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.website && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <Globe size={13} style={{ color: accent }} />
                  <span className="truncate">{data.website}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin size={13} style={{ color: accent }} />
                  <span>{data.location}</span>
                </div>
              )}
            </div>

            {/* Currency & SLA Badge */}
            {data.showPricing && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider block">
                  Active Price Currency
                </span>
                <p className="text-sm font-bold text-white font-mono">
                  {data.currencyCode || 'USD'} ({currency}) • Transparent Fixed Rates
                </p>
                <p className="text-[10px] text-zinc-400 font-mono">
                  Milestone-based invoicing • Zero surprise charges
                </p>
              </div>
            )}

            {/* Trust Seals */}
            <div className="space-y-2 font-mono text-[11px] text-zinc-400">
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck size={14} style={{ color: accent }} />
                <span>Full Source Code Ownership</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Award size={14} style={{ color: accent }} />
                <span>Sub-second 90+ Lighthouse SLA</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Sparkles size={14} style={{ color: accent }} />
                <span>10+ Years Enterprise Experience</span>
              </div>
            </div>
          </div>

          {/* Bottom Review Rating */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-amber-400 mb-1">
              <Star size={12} fill="#fbbf24" />
              <Star size={12} fill="#fbbf24" />
              <Star size={12} fill="#fbbf24" />
              <Star size={12} fill="#fbbf24" />
              <Star size={12} fill="#fbbf24" />
              <span className="text-white text-xs font-mono font-bold ml-1">5.0 / 5.0</span>
            </div>
            <p className="text-[10px] font-mono text-zinc-500">
              Verified client reviews worldwide
            </p>
          </div>
        </div>

        {/* Right Column (Services List & Investment Packages) - 8 cols */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-300">
                Service Catalog & Engineering Scope
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {data.services.length} Specialized Deliverables
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.services.map((service, index) => (
                <div
                  key={service.id || index}
                  className="p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.08] flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
                        style={{
                          backgroundColor: `${accent}15`,
                          color: accent,
                        }}
                      >
                        <ServiceIcon name={service.icon} size={16} />
                      </div>

                      {data.showPricing && service.price && (
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
                            {currency}{service.price}
                          </span>
                          {service.pricingPeriod && (
                            <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">
                              {service.pricingPeriod}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                      {service.description}
                    </p>
                  </div>

                  {service.deliverables && service.deliverables.length > 0 && (
                    <ul className="space-y-1 pt-2 border-t border-white/5 mt-auto">
                      {service.deliverables.slice(0, 3).map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-300">
                          <span className="mt-0.5" style={{ color: accent }}>
                            <Check size={10} strokeWidth={2.5} />
                          </span>
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Tiers Section */}
          {data.showPricing && data.pricingTiers && data.pricingTiers.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <div className="mb-4">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-300 block">
                  Investment Tiers & Engagement Options
                </span>
                <p className="text-xs text-zinc-400">
                  Fixed pricing packages with transparent scope deliverables.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {data.pricingTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      tier.isPopular
                        ? 'bg-white/[0.06] border-white/30 shadow-lg'
                        : 'bg-white/[0.02] border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold uppercase text-white">
                          {tier.name}
                        </span>
                        {tier.isPopular && (
                          <span
                            className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold uppercase"
                            style={{ backgroundColor: accent, color: '#000000' }}
                          >
                            Hot
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1 font-mono mb-2">
                        <span className="text-xl font-black text-white">
                          {currency}{tier.price}
                        </span>
                        <span className="text-[10px] text-zinc-400">{tier.period}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mb-2 leading-relaxed">
                        {tier.description}
                      </p>
                    </div>

                    <ul className="space-y-1 pt-2 border-t border-white/10 text-[10px] text-zinc-300">
                      {tier.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1">
                          <CheckCircle2 size={10} className="mt-0.5 text-emerald-400 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Note */}
          {data.pricingNote && (
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>{data.pricingNote}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
