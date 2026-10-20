import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import { Check, Mail, Phone, Globe, MapPin, Zap, Shield, Cpu } from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateModernBento: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#10B981';

  return (
    <div
      className="w-full bg-[#0B0F17] text-[#E2E8F0] p-8 sm:p-12 font-sans relative overflow-hidden"
      style={{
        minHeight: '1050px',
      }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} />

      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      {/* Header Bento Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <div className="lg:col-span-2 bg-[#131926] border border-slate-800 rounded-2xl p-7 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: accent }}
          />
          <div className="flex items-center gap-2 text-xs font-mono mb-2" style={{ color: accent }}>
            <Cpu size={14} />
            <span>ENGINEERED ARCHITECTURE & CAPABILITIES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            {data.companyName}
          </h1>
          <p className="text-base text-slate-400 font-medium mt-1 mb-4">
            {data.tagline}
          </p>
          {data.introSummary && (
            <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
              {data.introSummary}
            </p>
          )}
        </div>

        {/* Contact Bento Card */}
        <div className="bg-[#131926] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
              <Zap size={13} style={{ color: accent }} />
              <span>Direct Comms</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              {data.email && (
                <div className="flex items-center gap-2">
                  <Mail size={13} style={{ color: accent }} />
                  <span className="truncate">{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={13} style={{ color: accent }} />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.website && (
                <div className="flex items-center gap-2">
                  <Globe size={13} style={{ color: accent }} />
                  <span className="truncate">{data.website}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={13} style={{ color: accent }} />
                  <span className="truncate">{data.location}</span>
                </div>
              )}
            </div>
          </div>

          <div
            className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono flex items-center justify-between"
            style={{ color: accent }}
          >
            <span>STATUS: ACTIVE</span>
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accent }} />
          </div>
        </div>
      </div>

      {/* Services Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {data.services.map((service, index) => {
          // Highlight first two cards with a slight accent touch
          const isTop = index === 0 || index === 1;

          return (
            <div
              key={service.id || index}
              className={`bg-[#131926] border ${
                isTop ? 'border-slate-700/80' : 'border-slate-800'
              } rounded-2xl p-5 flex flex-col justify-between relative group hover:border-slate-600 transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-800"
                    style={{
                      backgroundColor: `${accent}15`,
                      color: accent,
                    }}
                  >
                    <ServiceIcon name={service.icon} size={19} />
                  </div>
                  <div className="flex items-center gap-2">
                    {data.showPricing && service.price && (
                      <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {data.currency || '$'}{service.price}
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-slate-500 font-bold">
                      [0{index + 1}]
                    </span>
                  </div>
                </div>

                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight mb-2">
                  {service.title}
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {service.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bento Pricing Matrix */}
      {data.showPricing && data.pricingTiers && data.pricingTiers.length > 0 && (
        <div className="mb-6 pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                Modular Pricing & Engagement
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Transparent Engineering Tiers ({data.currencyCode || 'USD'})
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
              Sub-second Guarantee • Zero Technical Debt
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="bg-[#111726] border border-slate-800 p-5 rounded-2xl flex flex-col justify-between"
                style={{
                  borderColor: tier.isPopular ? accent : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase font-bold text-slate-300">
                      {tier.name}
                    </span>
                    {tier.isPopular && (
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                        style={{ backgroundColor: `${accent}20`, color: accent }}
                      >
                        {tier.badge || 'Popular'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 font-mono my-2">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {data.currency || '$'}{tier.price}
                    </span>
                    <span className="text-xs text-slate-400">{tier.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{tier.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {tier.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check size={12} className="mt-0.5 shrink-0" style={{ color: accent }} />
                        <span className="text-[11px]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {(data.pricingGuarantee || data.pricingNote) && (
            <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              {data.pricingGuarantee && (
                <div className="flex items-center gap-2">
                  <Shield size={14} style={{ color: accent }} />
                  <span>{data.pricingGuarantee}</span>
                </div>
              )}
              {data.pricingNote && (
                <span className="text-[11px] font-mono text-slate-400">{data.pricingNote}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bento Bottom Bar */}
      <div className="bg-[#131926] border border-slate-800 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Shield size={14} style={{ color: accent }} />
          <span>Enterprise Grade SLA · Clean Code Standard · Full IP Ownership</span>
        </div>
        <div className="font-mono text-[11px] text-white">
          Contact: <span style={{ color: accent }}>{data.email}</span>
        </div>
      </div>
    </div>
  );
};
