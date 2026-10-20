import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import { Check, Mail, Phone, Globe, MapPin, Award, ShieldCheck } from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateCorporateLight: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#0284C7';

  return (
    <div
      className="w-full bg-[#FFFFFF] text-slate-800 p-8 sm:p-12 font-sans relative overflow-hidden"
      style={{
        minHeight: '1050px',
      }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} defaultOverlayColor="light" />

      {/* Decorative Architectural Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: accent }} />

      {/* Corporate Letterhead Header */}
      <div className="border-b-2 border-slate-200 pb-7 mb-8 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: accent }}>
              <Award size={14} />
              <span>Official Capabilities & Services Brief</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
              {data.companyName}
            </h1>
            <p className="text-base text-slate-600 font-medium mt-1">
              {data.tagline}
            </p>
          </div>

          {/* Clean Contact Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 p-3.5 rounded-md">
            {data.email && (
              <span className="flex items-center gap-1.5 font-medium">
                <Mail size={13} style={{ color: accent }} /> {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-1.5 font-medium">
                <Phone size={13} style={{ color: accent }} /> {data.phone}
              </span>
            )}
            {data.website && (
              <span className="flex items-center gap-1.5 font-medium">
                <Globe size={13} style={{ color: accent }} /> {data.website}
              </span>
            )}
            {data.location && (
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin size={13} style={{ color: accent }} /> {data.location}
              </span>
            )}
          </div>
        </div>

        {/* Executive Summary Block */}
        {data.introSummary && (
          <div className="mt-5 p-4 rounded bg-slate-50 border-l-4 text-sm text-slate-700 leading-relaxed font-normal" style={{ borderLeftColor: accent }}>
            {data.introSummary}
          </div>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {data.services.map((service, index) => (
          <div
            key={service.id || index}
            className="flex flex-col justify-between bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 shadow-xs transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${accent}15`,
                    color: accent,
                  }}
                >
                  <ServiceIcon name={service.icon} size={18} />
                </div>
                <div className="flex items-center gap-2">
                  {data.showPricing && service.price && (
                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      {data.currency || '$'}{service.price}
                    </span>
                  )}
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${accent}10`,
                      color: accent,
                    }}
                  >
                    PART 0{index + 1}
                  </span>
                </div>
              </div>

              <h2 className="text-base font-bold text-slate-900 tracking-tight mb-1.5">
                {service.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {service.description}
              </p>
            </div>

            {/* Deliverables */}
            {service.deliverables && service.deliverables.length > 0 && (
              <div className="pt-3 border-t border-slate-100 mt-auto">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Standard Deliverables
                </span>
                <ul className="space-y-1.5">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-[11px] text-slate-700 font-medium">
                      <span className="mt-0.5" style={{ color: accent }}>
                        <Check size={12} strokeWidth={2.5} />
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

      {/* Corporate Pricing & Engagement Matrix */}
      {data.showPricing && data.pricingTiers && data.pricingTiers.length > 0 && (
        <div className="mb-8 pt-6 border-t-2 border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Standard Commercial Packages
              </span>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Transparent Engagement Tiers ({data.currencyCode || 'USD'})
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-200">
              Direct Senior Engineer · Fixed Milestones
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`p-5 rounded-xl border flex flex-col justify-between ${
                  tier.isPopular
                    ? 'bg-slate-50 border-slate-400 shadow-md ring-1 ring-slate-300'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 uppercase">
                      {tier.name}
                    </span>
                    {tier.isPopular && (
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                        style={{ backgroundColor: `${accent}15`, color: accent }}
                      >
                        {tier.badge || 'Recommended'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 font-mono my-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {data.currency || '$'}{tier.price}
                    </span>
                    <span className="text-xs text-slate-500">{tier.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{tier.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {tier.features.slice(0, 4).map((feat, fIdx) => (
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
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              {data.pricingGuarantee && (
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck size={14} style={{ color: accent }} />
                  <span>{data.pricingGuarantee}</span>
                </div>
              )}
              {data.pricingNote && (
                <span className="text-[11px] font-mono text-slate-500">{data.pricingNote}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-5 mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          <span className="font-bold text-slate-800">{data.companyName}</span> · Commercial Proposal & Service Brochure
        </div>
        <div className="font-mono text-[11px] text-slate-600">
          Inquiries: <span className="font-semibold" style={{ color: accent }}>{data.email}</span>
        </div>
      </div>
    </div>
  );
};
