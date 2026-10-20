import React, { useState } from 'react';
import {
  FacebookAdData,
  FacebookAdAspectRatio,
  FacebookAdTemplateId,
  DEFAULT_FACEBOOK_AD_DATA,
  CURRENCY_OPTIONS,
} from '../types';
import {
  Sparkles,
  Layout,
  Type,
  CheckCircle2,
  Palette,
  Maximize2,
  Copy,
  Check,
  RotateCcw,
  Coins,
  DollarSign,
  Tag,
  Clock,
  ArrowRight,
  Plus,
  Trash2,
  Image as ImageIcon,
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
  { id: 'ad-pricing-offer', label: '💰 Direct Pricing & Sprint Offer', desc: 'Flat-rate price, discount strikethrough & deliverables' },
  { id: 'ad-split-showcase', label: '💎 Modern Split Showcase & Rates', desc: 'Asymmetrical modern split with price tag & checklist' },
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
  const [activeTab, setActiveTab] = useState<'content' | 'pricing' | 'layout' | 'design'>('content');
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
    const copyText = `🔥 ${data.badge}\n\n👉 ${data.headline}\n\n${data.subheadline}\n\n${data.showPrice ? `💰 Special Rate: ${data.currency || '$'}${data.price || '1,490'} (${data.pricingPeriod || 'Flat fee'})\n\n` : ''}What you get:\n${data.keyPoints.map((p) => `✓ ${p}`).join('\n')}\n\n👉 ${data.ctaText}: ${data.website}\n\n${data.ratingText} | ${data.trustBadge}`;
    navigator.clipboard.writeText(copyText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  // Quick Preset Handlers
  const loadPreset = (
    presetName: 'pricing' | 'shopify' | 'laravel' | 'audit' | 'bento' | 'swiss' | 'proof'
  ) => {
    if (presetName === 'pricing') {
      onChange({
        ...data,
        badge: '⚡ LIMITED AVAILABILITY • FLAT-RATE SPRINT',
        headline: 'Need a Senior Full-Stack Engineer Without Agency Markup?',
        subheadline: 'Sub-second Shopify store or enterprise Laravel web app delivered with 100% clean code and direct senior engineer access.',
        keyPoints: [
          'Sub-second 90+ Google Lighthouse Speed Guarantee',
          'Custom Shopify Liquid & Storefront API Integration',
          'Enterprise Laravel & PostgreSQL Scalable Backends',
          'Full Source Code Handover & 30-Day Hypercare',
        ],
        showPrice: true,
        currency: '$',
        price: '1,490',
        originalPrice: '2,490',
        pricingPeriod: 'Flat-Rate Sprint',
        priceDiscountBadge: 'Save $1,000 • Only 3 Slots Left',
        ctaText: 'Claim Your Sprint Slot',
        ctaSubtext: 'Direct 1-on-1 architect consultation • 48-hr turnaround',
        templateId: 'ad-pricing-offer',
      });
    } else if (presetName === 'shopify') {
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
        showPrice: true,
        price: '1,490',
        pricingPeriod: '/ store',
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
        headline: 'Engineered for Radical Simplicity, Raw Speed & Zero Bloat',
        subheadline: 'Precision web applications and bespoke eCommerce storefronts built without third-party bloat.',
        keyPoints: [
          'Core Web Vitals Pass Guaranteed (LCP < 1.2s)',
          'Modular Component Systems with Tailwind & React',
          'Clean Laravel & PostgreSQL RESTful Backends',
          'Strict Code Ownership & 1-on-1 Direct Access',
        ],
        ctaText: 'Request Technical Prospectus',
        ctaSubtext: 'Available for Q4/Q1 engagements worldwide',
        templateId: 'ad-minimalist-studio',
      });
    } else if (presetName === 'proof') {
      onChange({
        ...data,
        badge: 'PROVEN CLIENT OUTCOMES • 2026',
        headline: 'How We Replaced 14 Slow Apps With 1 Sub-Second Custom Build',
        subheadline: 'Our client boosted their mobile conversion rate by +185% while slashing server costs by 60%.',
        keyPoints: [
          '+185% Increase in Mobile eCommerce Checkout Rate',
          'Lighthouse Performance Jumped From 28 to 98',
          'Server Response Time Reduced from 1.8s to 120ms',
          'Zero Unscheduled Downtime Across 500k+ Visitors',
        ],
        ctaText: 'Read the Technical Case Study',
        ctaSubtext: 'Full architectural breakdown + code walkthrough',
        templateId: 'ad-social-proof',
      });
    } else if (presetName === 'audit') {
      onChange({
        ...data,
        badge: 'FREE ARCHITECTURAL AUDIT • 5 SPOTS',
        headline: 'Get Your Shopify or Web Platform Audited by a Senior Engineer',
        subheadline: 'I will personally inspect your codebase, database queries, and Core Web Vitals to uncover conversion leaks.',
        keyPoints: [
          'Full Speed & Lighthouse Diagnostic Video',
          'Identified Memory Leaks & Bloated 3rd-Party Scripts',
          'Specific Code Recommendations You Can Implement Today',
          'Zero Sales Pressure • 100% Technical Value',
        ],
        ctaText: 'Claim 1 of 5 Free Audits',
        ctaSubtext: 'Delivered in 48 hours to your inbox',
        templateId: 'ad-problem-solution',
      });
    }
  };

  return (
    <div className="bg-[#10121A] border border-white/10 rounded-2xl flex flex-col h-full shadow-2xl overflow-hidden">
      {/* Form Top Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-[#161823] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-accent" />
            <span>Facebook Ad Creative Studio</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Design high-converting Meta Ads with custom prices, currencies, and modern visual layouts
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Ready Ad Text */}
          <button
            type="button"
            onClick={handleCopyAdCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-zinc-200 border border-white/10 transition-colors"
            title="Copy primary caption & text for Facebook Ads Manager"
          >
            {copiedCaption ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Caption</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Quick Loader Strip */}
      <div className="px-4 py-2 bg-[#12141F] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider shrink-0">
          Quick Offers:
        </span>
        <button
          type="button"
          onClick={() => loadPreset('pricing')}
          className="px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold shrink-0 transition-colors"
        >
          💰 Sprint Offer
        </button>
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
      <div className="flex border-b border-white/10 bg-[#151722] px-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            activeTab === 'content'
              ? 'border-white text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Type size={14} /> Ad Copy & Offer
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pricing')}
          className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            activeTab === 'pricing'
              ? 'border-white text-white'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Coins size={14} /> Price & Offer
          {data.showPrice && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('layout')}
          className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
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
          className={`py-2.5 px-3.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
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
                Primary Hook Headline (Attention Grabber)
              </label>
              <textarea
                rows={2}
                value={data.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                placeholder="What is the high-converting hook or question?"
                className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 resize-none font-bold"
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
                  placeholder="e.g. 48-hr turnaround • No sales calls"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            {/* Social Proof & Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Rating / Social Proof Text
                </label>
                <input
                  type="text"
                  value={data.ratingText}
                  onChange={(e) => updateField('ratingText', e.target.value)}
                  placeholder="e.g. 5.0 ★★★★★ Trusted by 30+ Brands"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Trust Badge (Bottom Authority)
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

        {/* TAB 2: PRICE & OFFER */}
        {activeTab === 'pricing' && (
          <div className="space-y-5">
            {/* Show Price Toggle */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#161822] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  Display Price Badge on Ad
                </span>
                <p className="text-[11px] text-zinc-400">
                  Renders pricing pill and investment box for direct conversion
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.showPrice || false}
                  onChange={(e) => updateField('showPrice', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
              </label>
            </div>

            {/* Quick Currency Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">
                Ad Currency ({data.currency || '$'})
              </label>
              <div className="grid grid-cols-5 gap-2">
                {CURRENCY_OPTIONS.slice(0, 5).map((cur) => (
                  <button
                    key={cur.code}
                    type="button"
                    onClick={() => updateField('currency', cur.symbol)}
                    className={`py-2 px-1 rounded-lg border text-center transition-all ${
                      data.currency === cur.symbol
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'border-white/10 bg-[#1A1D27] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold font-mono block">{cur.symbol}</span>
                    <span className="text-[9px] font-mono text-zinc-500">{cur.code}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 pt-1">
                {CURRENCY_OPTIONS.slice(5, 10).map((cur) => (
                  <button
                    key={cur.code}
                    type="button"
                    onClick={() => updateField('currency', cur.symbol)}
                    className={`py-2 px-1 rounded-lg border text-center transition-all ${
                      data.currency === cur.symbol
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'border-white/10 bg-[#1A1D27] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold font-mono block">{cur.symbol}</span>
                    <span className="text-[9px] font-mono text-zinc-500">{cur.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Numbers & Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Offer Price ({data.currency || '$'})
                </label>
                <input
                  type="text"
                  value={data.price || ''}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder="e.g. 1,490"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Original Price (Strikethrough)
                </label>
                <input
                  type="text"
                  value={data.originalPrice || ''}
                  onChange={(e) => updateField('originalPrice', e.target.value)}
                  placeholder="e.g. 2,490"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-400 font-mono focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Pricing Period / Billing Type
                </label>
                <input
                  type="text"
                  value={data.pricingPeriod || ''}
                  onChange={(e) => updateField('pricingPeriod', e.target.value)}
                  placeholder="e.g. Flat-Rate Sprint or / month"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Urgency / Discount Pill
                </label>
                <input
                  type="text"
                  value={data.priceDiscountBadge || ''}
                  onChange={(e) => updateField('priceDiscountBadge', e.target.value)}
                  placeholder="e.g. Save $1,000 • 3 Slots Left"
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            {/* Quick Switch to Pricing Ad Template */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  Switch to Pricing Offer Layout
                </span>
                <span className="text-[11px] text-zinc-400">
                  Optimized specifically for high-converting pricing campaigns
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateField('templateId', 'ad-pricing-offer')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                Apply Layout →
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: LAYOUT & TEMPLATES */}
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
                Ad Style & Visual Template ({TEMPLATES.length} Styles)
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

        {/* TAB 4: DESIGN & BACKGROUND */}
        {activeTab === 'design' && (
          <div className="space-y-5">
            {/* Background Image Card / Picker Trigger */}
            <div className="p-4 rounded-xl bg-[#161822] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} style={{ color: data.accentColor }} />
                  <span className="text-xs font-bold text-white">Background Visual</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenBackgroundModal}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-colors"
                >
                  Choose Wallpaper →
                </button>
              </div>

              {/* Background Status Indicator */}
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1 border-t border-white/5">
                <span>
                  Status:{' '}
                  <strong className="text-white">
                    {data.background.enabled ? 'Enabled' : 'Disabled'}
                  </strong>
                </span>
                <span>Dimmer: {data.background.overlayOpacity}%</span>
              </div>
            </div>

            {/* Accent Color Picker */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Brand Highlight Accent Color
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {ACCENT_COLORS.map((col) => {
                  const isSelected = data.accentColor === col.value;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => updateField('accentColor', col.value)}
                      className={`w-7 h-7 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
                      }`}
                      style={{ backgroundColor: col.value }}
                      title={col.name}
                    >
                      {isSelected && <Check size={12} className="text-black font-bold" />}
                    </button>
                  );
                })}
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) => updateField('accentColor', e.target.value)}
                  className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                />
              </div>
            </div>

            {/* Brand Handles & Identity */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <label className="block text-xs font-semibold text-zinc-300">
                Brand Identity Info
              </label>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={data.brandName}
                  onChange={(e) => updateField('brandName', e.target.value)}
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Website URL</label>
                <input
                  type="text"
                  value={data.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Contact Handle / Email</label>
                <input
                  type="text"
                  value={data.contactHandle}
                  onChange={(e) => updateField('contactHandle', e.target.value)}
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
