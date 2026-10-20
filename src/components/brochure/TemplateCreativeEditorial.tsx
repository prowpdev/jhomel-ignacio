import React from 'react';
import { BrochureData } from './types';
import { ServiceIcon } from './ServiceIcon';
import { Check, Mail, Phone, Globe, MapPin, Sparkles } from 'lucide-react';
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
