import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import {
  Terminal,
  Cpu,
  Check,
  Mail,
  Phone,
  Globe,
  MapPin,
  ShieldAlert,
  Zap,
  Code2,
} from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateCyberDeveloperCatalog: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#00F0FF';
  const currency = data.currency || '$';

  return (
    <div
      className="w-full bg-[#07090E] text-[#ECEEF2] p-6 sm:p-12 font-mono relative overflow-hidden"
      style={{ minHeight: '1100px' }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} />

      {/* Cyber Grid Lines & Corner Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="relative z-10 border border-white/10 rounded-xl overflow-hidden bg-[#0C0F17]/90 backdrop-blur-md mb-8">
        <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
              <Terminal size={12} style={{ color: accent }} />
              <span>sys://engineering-manifest.sh --exec</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: READY
            </span>
            <span className="text-zinc-500">|</span>
            <span className="text-cyan-400">CURRENCY: {data.currencyCode || 'USD'} ({currency})</span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider mb-2 border"
                style={{
                  backgroundColor: `${accent}15`,
                  color: accent,
                  borderColor: `${accent}30`,
                }}
              >
                <Cpu size={12} />
                <span>Full-Stack Engineering & System Architecture</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
                {data.companyName}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                {data.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-zinc-400 p-3 rounded-lg bg-black/40 border border-white/10 shrink-0">
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
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={12} style={{ color: accent }} />
                  <span>{data.location}</span>
                </div>
              )}
            </div>
          </div>

          {data.introSummary && (
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-zinc-300 font-sans leading-relaxed">
              <span className="font-mono text-zinc-500 mr-2">&gt;</span>
              {data.introSummary}
            </div>
          )}
        </div>
      </div>

      {/* Cyber Service Modules */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {data.services.map((service, index) => (
          <div
            key={service.id || index}
            className="p-5 rounded-xl bg-[#0B0E17]/80 border border-white/10 hover:border-cyan-500/50 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500">[{index + 1}]</span>
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${accent}15`, color: accent }}
                  >
                    <ServiceIcon name={service.icon} size={15} />
                  </div>
                </div>

                {data.showPricing && service.price && (
                  <div className="text-right">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-bold font-mono border"
                      style={{
                        backgroundColor: `${accent}15`,
                        color: accent,
                        borderColor: `${accent}30`,
                      }}
                    >
                      {currency}{service.price}
                    </span>
                    {service.pricingPeriod && (
                      <span className="text-[9px] text-zinc-500 block">
                        {service.pricingPeriod}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                {service.description}
              </p>
            </div>

            {service.deliverables && service.deliverables.length > 0 && (
              <div className="pt-2 border-t border-white/5 mt-auto">
                <ul className="space-y-1 text-[11px] text-zinc-300">
                  {service.deliverables.slice(0, 3).map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-mono">→</span>
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cyber Pricing Tiers Section */}
      {data.showPricing && data.pricingTiers && data.pricingTiers.length > 0 && (
        <div className="relative z-10 mb-8 border border-white/10 rounded-xl p-5 bg-[#0A0D15]/90">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-cyan-400 flex items-center gap-1.5">
              <Zap size={13} />
              <span>PRICING MATRIX // FIXED RATE PACKAGES</span>
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              CURRENCY: {data.currencyCode || 'USD'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="p-4 rounded-lg bg-black/50 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs uppercase font-bold text-zinc-200">
                      {tier.name}
                    </span>
                    {tier.isPopular && (
                      <span
                        className="px-1.5 py-0.5 rounded text-[8px] uppercase font-bold"
                        style={{ backgroundColor: accent, color: '#000000' }}
                      >
                        Active SLA
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-2xl font-black text-white">
                      {currency}{tier.price}
                    </span>
                    <span className="text-[10px] text-zinc-400">{tier.period}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans mb-3">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-1 pt-2 border-t border-white/10 text-[10px] text-zinc-300">
                  {tier.features.slice(0, 3).map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <Check size={11} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cyber Footer */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <Code2 size={13} style={{ color: accent }} />
          <span>SLA: 90+ Core Web Vitals • Clean Architecture</span>
        </div>
        <div>
          PING: <span className="text-white">{data.email}</span>
        </div>
      </div>
    </div>
  );
};
