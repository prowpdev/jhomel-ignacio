import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import { Check, Mail, Phone, Globe, MapPin, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BrochureBackgroundLayer } from './facebook/AdBackgroundLayer';

interface TemplateProps {
  data: BrochureData;
}

export const TemplateTrifoldSheet: React.FC<TemplateProps> = ({ data }) => {
  const accent = data.accentColor || '#6366F1';

  return (
    <div
      className="w-full bg-[#FAFAFA] text-zinc-800 p-8 sm:p-12 font-sans relative overflow-hidden"
      style={{
        minHeight: '1050px',
      }}
    >
      <BrochureBackgroundLayer background={data.background} accentColor={accent} defaultOverlayColor="light" />

      {/* Decorative Tri-Tone Border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="w-1/3" style={{ backgroundColor: accent }} />
        <div className="w-1/3 bg-zinc-800" />
        <div className="w-1/3 opacity-50" style={{ backgroundColor: accent }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column (Agency Profile & Guarantee) */}
        <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            {/* Brand Wordmark */}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4 shadow-sm" style={{ backgroundColor: accent }}>
              {data.companyName.charAt(0)}
            </div>

            <h1 className="text-2xl font-black text-zinc-900 tracking-tight font-display mb-1">
              {data.companyName}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
              {data.tagline}
            </p>

            <div className="border-t border-zinc-100 pt-4 mb-4 text-xs text-zinc-600 leading-relaxed">
              {data.introSummary}
            </div>

            {/* Quality Commitment Card */}
            <div className="bg-zinc-50 rounded-lg p-3.5 border border-zinc-200/80 mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 mb-1.5">
                <ShieldCheck size={14} style={{ color: accent }} />
                <span>Delivery Guarantee</span>
              </div>
              <ul className="space-y-1 text-[11px] text-zinc-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={11} style={{ color: accent }} /> 100% On-time sprint completion
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={11} style={{ color: accent }} /> Full source code handover & IP
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={11} style={{ color: accent }} /> Post-launch bug warranty
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="border-t border-zinc-200 pt-4 text-xs space-y-2 text-zinc-600">
            {data.email && (
              <div className="flex items-center gap-2">
                <Mail size={13} style={{ color: accent }} />
                <span className="font-medium text-zinc-900 truncate">{data.email}</span>
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
                <span>{data.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Columns (Services Grid) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-5">
              <h2 className="text-base font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <Award size={16} style={{ color: accent }} />
                <span>Core Service Offerings & Scope</span>
              </h2>
              <span className="text-xs font-mono font-medium text-zinc-400">
                {data.services.length} ACTIVE PRACTICES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.services.map((service, index) => (
                <div
                  key={service.id || index}
                  className="bg-white border border-zinc-200 rounded-xl p-4.5 flex flex-col justify-between shadow-xs hover:border-zinc-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${accent}15`,
                          color: accent,
                        }}
                      >
                        <ServiceIcon name={service.icon} size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-zinc-400">
                        OFFERING 0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-zinc-900 tracking-tight mb-1.5">
                      {service.title}
                    </h3>

                    <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                      {service.description}
                    </p>
                  </div>

                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="pt-2.5 border-t border-zinc-100 mt-auto">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                        Scope Includes:
                      </span>
                      <ul className="space-y-1">
                        {service.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-700">
                            <Check size={11} className="mt-0.5 shrink-0" style={{ color: accent }} />
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

          {/* Tri-fold Bottom Banner */}
          <div className="mt-6 bg-zinc-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold">Ready to discuss your project requirements?</p>
              <p className="text-zinc-400 text-[11px]">Free architectural audit and milestone breakdown included.</p>
            </div>
            <a
              href={`mailto:${data.email}`}
              className="px-4 py-2 rounded-lg font-semibold text-xs text-white shrink-0 shadow-sm"
              style={{ backgroundColor: accent }}
            >
              Contact Direct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
