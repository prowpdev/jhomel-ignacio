import React, { useState } from 'react';
import {
  FacebookAdData,
  FacebookAdTemplateId,
  FacebookAdAspectRatio,
  DEFAULT_FACEBOOK_AD_DATA,
} from '../types';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  Layout,
  Type,
  CheckCircle2,
  Palette,
  Maximize2,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';

interface FacebookAdFormProps {
  data: FacebookAdData;
  onChange: (data: FacebookAdData) => void;
  onOpenBackgroundModal: () => void;
}

const ASPECT_RATIOS: { id: FacebookAdAspectRatio; label: string; desc: string; iconSize: string }[] = [
  { id: '1:1', label: '1:1 Square', desc: 'FB/IG Feed', iconSize: 'w-4 h-4' },
  { id: '4:5', label: '4:5 Mobile', desc: 'Max Mobile Screen', iconSize: 'w-3.5 h-4.5' },
  { id: '9:16', label: '9:16 Story', desc: 'Stories & Reels', iconSize: 'w-3 h-5' },
  { id: '1.91:1', label: '1.91:1 Link', desc: 'Desktop & Feed Link', iconSize: 'w-5 h-3' },
];

const TEMPLATES: { id: FacebookAdTemplateId; label: string; desc: string }[] = [
  { id: 'ad-modern-bento', label: 'Modern Bento Grid', desc: 'Linear/Apple style frosted cards & metrics' },
  { id: 'ad-minimalist-studio', label: 'Swiss Studio Clean', desc: 'Ultra-clean architectural typography & SLA' },
  { id: 'ad-social-proof', label: 'Client Proof Spotlight', desc: 'Measurable ROI & endorsement case study' },
  { id: 'ad-card-stack', label: '3D Layered Card Stack', desc: 'Visual staggered deliverables stack' },
  { id: 'ad-dark-aurora', label: 'Dark Aurora Neo', desc: 'Obsidian with radiant aura glow' },
  { id: 'ad-high-impact', label: 'High-Impact Offer', desc: 'High conversion checklist + hook' },
  { id: 'ad-tech-glow', label: 'Tech & Dev Glow', desc: 'Cyber terminal + metric counters' },
  { id: 'ad-clean-editorial', label: 'Clean Editorial', desc: 'Executive agency magazine layout' },
  { id: 'ad-problem-solution', label: 'Problem vs Solution', desc: 'Side-by-side pain vs solution' },
  { id: 'ad-speed-metrics', label: 'Speed & Conversion', desc: 'Core Web Vitals gauge & speed SLA' },
];

const ACCENT_COLORS = [
  { name: 'Neon Volt', value: '#CEFF00' },
  { name: 'Electric Cyan', value: '#00F0FF' },
  { name: 'Emerald Glow', value: '#10B981' },
  { name: 'Amber Sunset', value: '#F59E0B' },
  { name: 'Violet Pulse', value: '#8B5CF6' },
  { name: 'Rose Red', value: '#F43F5E' },
  { name: 'Pure White', value: '#FFFFFF' },
];

export const FacebookAdForm: React.FC<FacebookAdFormProps> = ({
  data,
  onChange,
  onOpenBackgroundModal,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'layout' | 'design'>('content');
  const [newPoint, setNewPoint] = useState<string>('');
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);

  // Field update helper
  const updateField = <K extends keyof FacebookAdData>(field: K, value: FacebookAdData[K]) => {
    onChange({ ...data, [field]: value });
  };

  // Add bullet point
  const handleAddPoint = () => {
    if (newPoint.trim()) {
      updateField('keyPoints', [...data.keyPoints, newPoint.trim()]);
      setNewPoint('');
    }
  };

  // Remove bullet point
  const handleRemovePoint = (index: number) => {
    updateField(
      'keyPoints',
      data.keyPoints.filter((_, i) => i !== index)
    );
  };

  // Copy ad text for Facebook Ads Manager
  const handleCopyAdCopy = () => {
    const copyText = `🔥 ${data.badge}\n\n👉 ${data.headline}\n\n${data.subheadline}\n\nWhat you get:\n${data.keyPoints.map((p) => `✓ ${p}`).join('\n')}\n\n👉 ${data.ctaText}: ${data.website}\n\n${data.ratingText} | ${data.trustBadge}`;
    navigator.clipboard.writeText(copyText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  // Quick Preset Handlers
  const loadPreset = (presetName: 'shopify' | 'laravel' | 'audit' | 'bento' | 'swiss' | 'proof') => {
    if (presetName === 'shopify') {
      onChange({
        ...data,
        badge: '⚡ SHOPIFY PLUS UPGRADE • Q4 BOOKING',
        headline: 'Turn Bouncing Shoppers Into Buyers With a Sub-Second Store',
        subheadline: 'Bespoke Shopify theme engineering, custom Liquid checkout logic, and speed audits that lift sales.',
        keyPoints: [
          'Sub-second 90+ Lighthouse Mobile Score',
          'Custom Liquid & Storefront API Integration',
          'Zero-Bloat Section Architecture',
          'GA4 & Enhanced eCommerce Tracking',
        ],
        ctaText: 'Claim Free Shopify Store Audit',
        ctaSubtext: '48-hour delivery • Complete Lighthouse & Core Web Vitals breakdown',
        templateId: 'ad-speed-metrics',
      });
    } else if (presetName === 'laravel') {
      onChange({
        ...data,
        badge: '⚡ FULL-STACK ARCHITECT FOR HIRE',
        headline: 'Need a Scalable Laravel Web App Delivered On Time?',
        subheadline: 'Senior Full-Stack Developer specializing in enterprise APIs, reactive Vue/React dashboards, and clean architecture.',
        keyPoints: [
          'Enterprise PostgreSQL & MySQL Relational Models',
          'REST & GraphQL Microservices Architecture',
          'High-Throughput Redis Queue Processing',
          'Direct Senior Engineer Communication (No Middlemen)',
        ],
        ctaText: 'Book Architecture Strategy Call',
        ctaSubtext: 'Direct 1-on-1 engineer consult • Clear fixed-scope pricing',
        templateId: 'ad-tech-glow',
      });
    } else if (presetName === 'bento') {
      onChange({
        ...data,
        badge: '🚀 LINEAR/APPLE BENTO SHOWCASE',
        headline: 'High-Performance Web Engineering for High-Growth Startups',
        subheadline: 'Engineered for sub-second page loads, conversion velocity, and robust cloud microservices.',
        keyPoints: [
          'Sub-second 90+ Lighthouse Speed Guarantee',
          'Custom Shopify Liquid & Storefront APIs',
          'Enterprise Laravel & PostgreSQL Scalability',
          'GA4 Enhanced E-commerce Tracking',
        ],
        ctaText: 'Claim Free Technical Audit & Scope',
        ctaSubtext: '48-hour delivery • Direct senior engineer consultation',
        templateId: 'ad-modern-bento',
      });
    } else if (presetName === 'swiss') {
      onChange({
        ...data,
        badge: 'SWISS ARCHITECTURAL PRECISION',
        headline: 'Engineered Web Architecture Built for Measurable Revenue',
        subheadline: 'We design and build ultra-clean, high-velocity digital experiences that outperform cluttered themes.',
        keyPoints: [
          '01. Core Web Vitals & Sub-second LCP Engineering',
          '02. Custom API Integrations & Database Modeling',
          '03. GA4 Conversion Tracking & Attribution Verification',
        ],
        ctaText: 'Request Technical Consultation',
        ctaSubtext: 'Direct engineer review • 48-hr turnaround',
        templateId: 'ad-minimalist-studio',
      });
    } else if (presetName === 'proof') {
      onChange({
        ...data,
        badge: '★ PROVEN CLIENT RESULTS SPOTLIGHT',
        headline: 'How We Lifted Conversion by +38% with Sub-Second Liquid Code',
        subheadline: 'See the before & after benchmarks: Eliminating theme bloat to turn visitors into repeat customers.',
        keyPoints: [
          '+38% Checkout Conversion Lift in 30 Days',
          '0.8s Mobile First Contentful Paint SLA',
          '99/100 Google Lighthouse Speed Score',
        ],
        ctaText: 'View Case Study & Get Scoped',
        ctaSubtext: 'Free technical breakdown • No sales calls',
        templateId: 'ad-social-proof',
      });
    } else if (presetName === 'audit') {
      onChange({
        ...data,
        badge: '🔍 LIMITED: 5 AUDITS THIS MONTH',
        headline: 'Stop Losing Revenue to a 3-Second Loading Screen',
        subheadline: 'Get a comprehensive Core Web Vitals, Google Analytics 4, and technical SEO audit by an elite engineer.',
        keyPoints: [
          'Comprehensive PageSpeed & LCP Audit',
          'GA4 & Tag Manager Event Verification',
          'Technical SEO Schema & Crawl Budget Check',
          'Actionable 10-Point Optimization Roadmap',
        ],
        ctaText: 'Claim Your Free Audit Today',
        ctaSubtext: '100% Free • No sales pitch • Receive within 48 hours',
        templateId: 'ad-speed-metrics',
      });
    }
  };

  return (
    <div className="bg-[#12131A] border border-white/10 rounded-2xl overflow-hidden shadow-xl text-zinc-200">
      {/* Top Banner / Presets */}
      <div className="p-4 bg-[#171922] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black"
            style={{ backgroundColor: data.accentColor }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Facebook & Social Ads Editor
            </h3>
            <p className="text-[11px] text-zinc-400">
              Customize copy, aspect ratio, background, and templates for Meta Ads
            </p>
          </div>
        </div>

        {/* Copy for Ads Manager button */}
        <button
          type="button"
          onClick={handleCopyAdCopy}
          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-200 font-medium flex items-center gap-1.5 transition-colors"
          title="Copy ready-to-paste primary text & headline for Facebook Ads Manager"
        >
          {copiedCaption ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Ad Text Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy Ad Caption</span>
            </>
          )}
        </button>
      </div>

      {/* Preset Quick Loader */}
      <div className="px-4 py-2.5 bg-[#0E1017] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-zinc-500 font-mono text-[10px] uppercase shrink-0">1-Click Ad Presets:</span>
        <button
          type="button"
          onClick={() => loadPreset('bento')}
          className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white shrink-0 transition-colors"
        >
          🍏 Bento Grid
        </button>
        <button
          type="button"
          onClick={() => loadPreset('swiss')}
          className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white shrink-0 transition-colors"
        >
          ✨ Swiss Clean
        </button>
        <button
          type="button"
          onClick={() => loadPreset('proof')}
          className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white shrink-0 transition-colors"
        >
          🏆 +185% Proof
        </button>
        <button
          type="button"
          onClick={() => loadPreset('shopify')}
          className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white shrink-0 transition-colors"
        >
          🛍️ Shopify Speed
        </button>
        <button
          type="button"
          onClick={() => loadPreset('laravel')}
          className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white shrink-0 transition-colors"
        >
          ⚡ Laravel Dev
        </button>
        <button
          type="button"
          onClick={() => loadPreset('audit')}
          className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white shrink-0 transition-colors"
        >
          🔍 Free Audit Hook
        </button>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FACEBOOK_AD_DATA)}
          className="px-2 py-1 rounded-md text-zinc-500 hover:text-zinc-300 ml-auto shrink-0 transition-colors flex items-center gap-1 text-[11px]"
        >
          <RotateCcw size={11} /> Reset
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-[#151722] px-4">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'content'
              ? 'border-white text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Type size={14} /> Ad Copy & Offer
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('layout')}
          className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'layout'
              ? 'border-white text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Layout size={14} /> Aspect Ratio & Layout
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('design')}
          className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'design'
              ? 'border-white text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Palette size={14} /> Background & Theme
        </button>
      </div>

      {/* Form Body */}
      <div className="p-4 sm:p-5 space-y-5 max-h-[650px] overflow-y-auto">
        {/* TAB 1: CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* Promo Tag / Badge */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Ad Promo Tag / Badge (Top Banner)
              </label>
              <input
                type="text"
                value={data.badge}
                onChange={(e) => updateField('badge', e.target.value)}
                placeholder="e.g. ⚡ LIMITED TIME OFFER • 20% OFF"
                className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Hook Headline */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Scroll-Stopping Headline (The Hook)
              </label>
              <textarea
                rows={2}
                value={data.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                placeholder="e.g. Struggling With Slow Shopify Sales or Clunky Web Architecture?"
                className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 resize-none font-medium"
              />
            </div>

            {/* Subheadline / Value Proposition */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Primary Offer / Subheadline
              </label>
              <textarea
                rows={2}
                value={data.subheadline}
                onChange={(e) => updateField('subheadline', e.target.value)}
                placeholder="Brief explanation of what you do and the concrete result you deliver."
                className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 resize-none"
              />
            </div>

            {/* Bullet Points Checklist */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">
                Key Value Bullets / Deliverables ({data.keyPoints.length})
              </label>
              <div className="space-y-1.5">
                {data.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                      <CheckCircle2 size={13} />
                    </div>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const updated = [...data.keyPoints];
                        updated[index] = e.target.value;
                        updateField('keyPoints', updated);
                      }}
                      className="flex-1 bg-[#1A1D27] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-white/30"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePoint(index)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Delete bullet"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add bullet input */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPoint())}
                  placeholder="Add another high-value point..."
                  className="flex-1 bg-[#1A1D27] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                />
                <button
                  type="button"
                  onClick={handleAddPoint}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1 transition-colors"
                >
                  <Plus size={13} /> Add
                </button>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={data.ctaText}
                  onChange={(e) => updateField('ctaText', e.target.value)}
                  placeholder="e.g. Claim Free Tech Audit"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white font-bold focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  CTA Subtext (Guarantee / Speed)
                </label>
                <input
                  type="text"
                  value={data.ctaSubtext}
                  onChange={(e) => updateField('ctaSubtext', e.target.value)}
                  placeholder="e.g. Direct 1-on-1 engineer review • 48-hr turnaround"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            {/* Trust and Social Proof */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Rating / Social Proof Text
                </label>
                <input
                  type="text"
                  value={data.ratingText}
                  onChange={(e) => updateField('ratingText', e.target.value)}
                  placeholder="e.g. 5.0 ★★★★★ Trusted by 30+ Global Brands"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Experience / SLA Badge
                </label>
                <input
                  type="text"
                  value={data.trustBadge}
                  onChange={(e) => updateField('trustBadge', e.target.value)}
                  placeholder="e.g. 10+ Years Full-Stack Experience"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LAYOUT & TEMPLATES */}
        {activeTab === 'layout' && (
          <div className="space-y-5">
            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Facebook / Meta Ad Placement Format
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ASPECT_RATIOS.map((ratio) => {
                  const isSelected = data.aspectRatio === ratio.id;
                  return (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => updateField('aspectRatio', ratio.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-white bg-white/10 text-white shadow-lg'
                          : 'border-white/10 bg-[#161822] text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                      style={{
                        borderColor: isSelected ? data.accentColor : undefined,
                      }}
                    >
                      <div className="text-xs font-bold text-white mb-0.5">{ratio.label}</div>
                      <div className="text-[10px] text-zinc-400">{ratio.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Ad Style & Visual Template
              </label>
              <div className="space-y-2">
                {TEMPLATES.map((tmpl) => {
                  const isSelected = data.templateId === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => updateField('templateId', tmpl.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-white bg-white/10 text-white shadow-lg'
                          : 'border-white/10 bg-[#161822] text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                      style={{
                        borderColor: isSelected ? data.accentColor : undefined,
                      }}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{tmpl.label}</div>
                        <div className="text-[11px] text-zinc-400">{tmpl.desc}</div>
                      </div>
                      {isSelected && (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-black"
                          style={{ backgroundColor: data.accentColor }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DESIGN & BACKGROUND */}
        {activeTab === 'design' && (
          <div className="space-y-5">
            {/* Background Image Card / Picker Trigger */}
            <div className="p-4 rounded-xl bg-[#161822] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} style={{ color: data.accentColor }} />
                  <div>
                    <span className="text-xs font-bold text-white block">Background Image</span>
                    <span className="text-[10px] text-zinc-400">
                      {data.background?.enabled ? 'Active wallpaper applied' : 'Plain solid background'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenBackgroundModal}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5"
                  style={{ backgroundColor: data.accentColor, color: '#000000' }}
                >
                  <ImageIcon size={13} />
                  <span>Choose Background</span>
                </button>
              </div>

              {/* Background Thumbnail Preview */}
              {data.background?.enabled && data.background.imageUrl && (
                <div className="relative h-20 rounded-lg overflow-hidden border border-white/15">
                  <img
                    src={data.background.imageUrl}
                    alt="Background Preview"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: data.background.overlayOpacity / 100 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3 text-xs text-white">
                    <span className="font-mono text-[11px]">
                      Dimmer: {data.background.overlayOpacity}% • Blur: {data.background.blur}px
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateField('background', { ...data.background, enabled: false })
                      }
                      className="px-2 py-1 rounded bg-black/60 text-red-400 hover:text-red-300 text-[10px] font-mono border border-white/10"
                    >
                      Turn Off
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Accent Color Palette */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Brand Highlight & Accent Glow
              </label>
              <div className="flex items-center gap-2.5 flex-wrap">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => updateField('accentColor', c.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                      data.accentColor === c.value ? 'scale-110 ring-2 ring-white/50' : 'border-black/40'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  >
                    {data.accentColor === c.value && (
                      <Check size={14} className="text-black" strokeWidth={3} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Author / Brand Details */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="block text-xs font-semibold text-zinc-300">
                Watermark & Footer Links
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 block mb-1">Brand Name</span>
                  <input
                    type="text"
                    value={data.brandName}
                    onChange={(e) => updateField('brandName', e.target.value)}
                    className="w-full bg-[#1A1D27] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block mb-1">Website URL</span>
                  <input
                    type="text"
                    value={data.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    className="w-full bg-[#1A1D27] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block mb-1">Email / Handle</span>
                  <input
                    type="text"
                    value={data.contactHandle}
                    onChange={(e) => updateField('contactHandle', e.target.value)}
                    className="w-full bg-[#1A1D27] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
