import React, { useState } from 'react';
import { 
  ArrowDown, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Calculator, 
  Clock, 
  Layers, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  BarChart3
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ScopeOption {
  id: string;
  label: string;
  baseDays: number;
  category: string;
}

const SERVICE_TYPES: ScopeOption[] = [
  { id: 'shopify', label: 'Shopify Plus / Custom Storefront', baseDays: 18, category: 'eCommerce' },
  { id: 'laravel', label: 'Custom Laravel / Web Application', baseDays: 24, category: 'Web App' },
  { id: 'wordpress', label: 'Bespoke WordPress & Headless', baseDays: 14, category: 'CMS Portal' },
  { id: 'plugin_ai', label: 'Custom Plugin / API / OpenAI Tool', baseDays: 12, category: 'Integration' },
];

const SCOPE_ADDONS = [
  { id: 'seo_technical', label: 'Technical SEO & Schema.org Markup', days: 3, icon: 'search' },
  { id: 'ga4_tracking', label: 'Google Analytics 4 & Conversion Tracking', days: 3, icon: 'chart' },
  { id: 'responsive_ux', label: 'Pixel-Perfect Custom UI/UX & Motion', days: 4, icon: 'layers' },
  { id: 'custom_api', label: 'Custom REST API & Webhooks', days: 5, icon: 'code' },
  { id: 'performance', label: 'Sub-Second Speed & Core Web Vitals 90+', days: 3, icon: 'zap' },
  { id: 'crm_sync', label: 'CRM / GHL / Zapier Workflows', days: 4, icon: 'zap' },
];

export const Hero: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ScopeOption>(SERVICE_TYPES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'seo_technical',
    'ga4_tracking',
    'responsive_ux',
    'performance',
  ]);
  const [timelineUrgency, setTimelineUrgency] = useState<'standard' | 'priority' | 'relaxed'>('standard');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculate dynamic turnaround timeline
  const totalDays = Math.round(
    (selectedService.baseDays +
      selectedAddons.reduce((acc, id) => {
        const addon = SCOPE_ADDONS.find((a) => a.id === id);
        return acc + (addon ? addon.days : 0);
      }, 0)) *
      (timelineUrgency === 'priority' ? 0.75 : timelineUrgency === 'relaxed' ? 1.25 : 1)
  );

  const selectedAddonsLabels = selectedAddons
    .map((id) => SCOPE_ADDONS.find((a) => a.id === id)?.label)
    .filter(Boolean);

  const formattedBrief = `FREELANCE PROJECT SCOPE & QUOTATION REQUEST
--------------------------------------------------
Client / Business: ${clientName || 'Prospective Client'}
Contact Email: ${clientEmail || 'Not specified'}
Primary Architecture: ${selectedService.label}
Included Scope Modules (${selectedAddonsLabels.length}):
${selectedAddonsLabels.map((l) => `  ✓ ${l}`).join('\n')}
Timeline Pacing: ${timelineUrgency.toUpperCase()} (~${totalDays} business days turnaround)
Engagement Model: Direct Senior Freelancer (Full Source Code & IP Handover)

Project Specifications & Notes:
${projectBrief || 'Ready to discuss requirements, project milestones, and kick-off date.'}
--------------------------------------------------
Generated via jhomelignacio.portfolio scope builder`;

  const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `Project Quotation Request: ${selectedService.label} (${clientName || 'New Client'})`
  )}&body=${encodeURIComponent(formattedBrief)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden bg-grid-pattern">
      {/* Subtle ambient light glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] opacity-15 dark:opacity-20 blur-[130px] rounded-full"
        style={{ background: 'var(--accent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Split Screen 2-Column Hero: Left Freelance Copy, Right Scope & Quotation Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* Left Column: Freelancer Services & Proposition (6 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between">
            <div>
              {/* Availability Line */}
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">Freelance Full-Stack Developer</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-500">Available for Q4/2026 & 2027</span>
              </div>

              {/* Headline for Freelancer Offering Services */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08] mb-6 text-balance">
                High-performance eCommerce & custom web engineering for growing businesses.
              </h1>

              {/* Subtitle / Freelance Value Proposition */}
              <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-xl mb-8">
                I&apos;m <span className="font-semibold text-zinc-900 dark:text-white">Jhomel Ignacio</span>. I build scalable digital platforms, custom <span className="text-zinc-900 dark:text-white font-medium">Shopify Plus</span> themes, robust <span className="text-zinc-900 dark:text-white font-medium">Laravel</span> backends, and conversion-focused <span className="text-zinc-900 dark:text-white font-medium">WordPress & Vue/React</span> storefronts. Complete with technical <span className="text-zinc-900 dark:text-white font-medium">SEO</span> and <span className="text-zinc-900 dark:text-white font-medium">Google Analytics 4</span> data tracking.
              </p>

              {/* Freelance Services Snapshot */}
              <div className="space-y-3 mb-9">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Core Freelance Services & Offerings:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-xs bg-accent shrink-0" />
                    <span>Custom Shopify Plus & Liquid Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-xs bg-accent shrink-0" />
                    <span>Full-Stack Laravel Web Applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-xs bg-accent shrink-0" />
                    <span>Technical SEO & Schema.org Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-xs bg-accent shrink-0" />
                    <span>Google Analytics 4 & Conversion Funnels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-xs bg-accent shrink-0" />
                    <span>Bespoke WordPress Themes & Custom Plugins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-xs bg-accent shrink-0" />
                    <span>OpenAI Integrations & Workflow Automation</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="#works"
                  className="px-6 py-3.5 text-xs font-semibold text-accent-fg bg-accent hover:opacity-90 rounded-md transition-all duration-200 flex items-center gap-2 shadow-md active:scale-95 uppercase tracking-wide"
                >
                  <span>Explore 31+ Past Projects</span>
                  <ArrowDown size={14} />
                </a>

                <a
                  href="#scope-builder"
                  className="px-5 py-3.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.09] border border-black/10 dark:border-white/10 rounded-md transition-all active:scale-95"
                >
                  Configure Quotation on Right
                </a>
              </div>
            </div>

            {/* Core Tech Stack Unboxed Row */}
            <div className="pt-5 border-t border-black/[0.08] dark:border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">Shopify Liquid</span>
                <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">·</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">Laravel PHP</span>
                <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">·</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">Vue.js & React</span>
                <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">·</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">Technical SEO</span>
                <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">·</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">Google Analytics 4</span>
                <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">·</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">OpenAI API</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Embedded Project Scope & Quotation Builder (6 cols) */}
          <div id="scope-builder" className="lg:col-span-6 xl:col-span-6 flex flex-col">
            <div className="bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden">
              
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] dark:border-white/[0.08] mb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-accent/15 text-accent">
                      <Calculator size={16} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-zinc-900 dark:text-white leading-tight">
                        Project Scope & Quotation Builder
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Configure project requirements, SEO & analytics modules for an instant spec brief
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-black/[0.05] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300">
                    Interactive
                  </span>
                </div>

                {/* Step 1: Select Service Category */}
                <div className="mb-4">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    1. Primary Platform Architecture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SERVICE_TYPES.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`p-2.5 text-xs text-left rounded-lg border transition-all flex flex-col justify-between ${
                          selectedService.id === service.id
                            ? 'bg-accent/15 border-accent text-zinc-900 dark:text-white font-medium'
                            : 'bg-zinc-50 dark:bg-[#151622] border-black/[0.06] dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20'
                        }`}
                      >
                        <span className="line-clamp-1 font-medium">{service.label}</span>
                        <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">
                          {service.category} · Est. base ~{service.baseDays} days
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Included Scope Modules (Includes SEO & GA4) */}
                <div className="mb-4">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    2. Add Specific Deliverables (SEO, Analytics & Features)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SCOPE_ADDONS.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-2 rounded-lg border text-xs text-left flex items-center justify-between transition-colors ${
                            isChecked
                              ? 'bg-black/[0.03] dark:bg-white/[0.06] border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-white font-medium'
                              : 'bg-transparent border-black/[0.06] dark:border-white/[0.06] text-zinc-500 dark:text-zinc-400 hover:border-black/20 dark:hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px] line-clamp-1">{addon.label}</span>
                          <span className="text-[11px] font-mono text-accent shrink-0 ml-1.5">
                            {isChecked ? '✓' : '+'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Timeline Urgency */}
                <div className="mb-4">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    3. Target Delivery Pacing
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'relaxed', label: 'Flexible', desc: 'Extended delivery' },
                      { id: 'standard', label: 'Standard', desc: 'Standard pacing' },
                      { id: 'priority', label: 'Priority Sprint', desc: 'Accelerated delivery' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTimelineUrgency(t.id as any)}
                        className={`p-2 rounded-lg text-center border text-xs transition-colors ${
                          timelineUrgency === t.id
                            ? 'bg-accent/15 border-accent text-zinc-900 dark:text-white font-medium'
                            : 'bg-zinc-50 dark:bg-[#151622] border-black/[0.06] dark:border-white/[0.06] text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        <span className="block font-medium">{t.label}</span>
                        <span className="text-[10px] text-zinc-400 block">{t.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope Summary Box (Turnaround & Deliverables Count - NO PRICE) */}
                <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-[#141520] border border-black/[0.08] dark:border-white/[0.08] mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                        Estimated Turnaround
                      </span>
                      <span className="font-display text-xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums">
                        ~{totalDays} business days
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                        Scope Deliverables
                      </span>
                      <span className="text-sm font-semibold font-mono text-accent tabular-nums">
                        {selectedAddons.length + 1} Modules Selected
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                  <input
                    type="text"
                    placeholder="Your Name / Company"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#151622] border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent"
                  />
                  <input
                    type="email"
                    placeholder="Work Email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-[#151622] border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2">
                  <a
                    href={mailtoLink}
                    className="flex-1 py-2.5 px-4 text-xs font-semibold text-accent-fg bg-accent hover:opacity-90 rounded-lg transition-all flex items-center justify-center gap-2 shadow uppercase tracking-wide"
                  >
                    <span>Request Quotation from Jhomel</span>
                    <Send size={13} />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="py-2.5 px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
                    title="Copy formatted scope brief to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-accent" />
                        <span className="text-accent">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Brief</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 px-1 font-mono">
                  <span>✓ Direct senior engineer</span>
                  <span>✓ Full IP transfer</span>
                  <span>✓ Guaranteed 24h response</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width Metric Row Below the Split */}
        <div className="mt-14 pt-8 border-t border-black/[0.08] dark:border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-mono tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {stat.context}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
