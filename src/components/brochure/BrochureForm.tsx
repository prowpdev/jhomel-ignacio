import React, { useState } from 'react';
import {
  BrochureData,
  BrochureServiceItem,
  DEFAULT_BROCHURE_DATA,
} from './types';
import { ServiceIcon } from './ServiceIcon';
import { IconSelectorModal } from './IconSelectorModal';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  Layers,
  User,
  PhoneCall,
  Palette,
  ChevronDown,
  ChevronUp,
  Package,
  Image as ImageIcon,
} from 'lucide-react';

interface BrochureFormProps {
  data: BrochureData;
  onChange: (updated: BrochureData) => void;
  onOpenBackgroundModal?: () => void;
}

const COLOR_SWATCHES = [
  { name: 'Acid Lime', hex: '#CEFF00' },
  { name: 'Solar Orange', hex: '#FF5500' },
  { name: 'Cyber Cyan', hex: '#00F0FF' },
  { name: 'Auric Gold', hex: '#E6C687' },
  { name: 'Sapphire', hex: '#0284C7' },
  { name: 'Emerald', hex: '#10B981' },
  { name: 'Rose', hex: '#E11D48' },
  { name: 'Indigo', hex: '#6366F1' },
];

export const BrochureForm: React.FC<BrochureFormProps> = ({
  data,
  onChange,
  onOpenBackgroundModal,
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'profile' | 'contact' | 'style'>('services');
  const [iconPickerIndex, setIconPickerIndex] = useState<number | null>(null);
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({
    '1': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFieldChange = (field: keyof BrochureData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Services Management
  const handleAddService = () => {
    const newId = Date.now().toString();
    const newService: BrochureServiceItem = {
      id: newId,
      title: 'New Custom Service',
      description: 'Describe the key business outcome and architectural solution provided for your clients.',
      icon: 'Sparkles',
      deliverables: ['Custom Implementation', 'Quality Assurance & Testing', 'Source Code Handover'],
    };

    onChange({
      ...data,
      services: [...data.services, newService],
    });

    setExpandedServices((prev) => ({ ...prev, [newId]: true }));
  };

  const handleUpdateService = (
    index: number,
    field: keyof BrochureServiceItem,
    value: any
  ) => {
    const updatedServices = [...data.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    };
    onChange({
      ...data,
      services: updatedServices,
    });
  };

  const handleDeleteService = (index: number) => {
    if (data.services.length <= 1) {
      alert('You must have at least one service in your brochure.');
      return;
    }
    const updated = data.services.filter((_, i) => i !== index);
    onChange({
      ...data,
      services: updated,
    });
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.services.length) return;
    const updated = [...data.services];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange({
      ...data,
      services: updated,
    });
  };

  // Deliverables Management
  const handleAddDeliverable = (serviceIndex: number) => {
    const updatedServices = [...data.services];
    const currentDeliverables = updatedServices[serviceIndex].deliverables || [];
    updatedServices[serviceIndex] = {
      ...updatedServices[serviceIndex],
      deliverables: [...currentDeliverables, 'New Deliverable or Scope Item'],
    };
    onChange({
      ...data,
      services: updatedServices,
    });
  };

  const handleUpdateDeliverable = (
    serviceIndex: number,
    dIndex: number,
    text: string
  ) => {
    const updatedServices = [...data.services];
    const newDeliverables = [...(updatedServices[serviceIndex].deliverables || [])];
    newDeliverables[dIndex] = text;
    updatedServices[serviceIndex] = {
      ...updatedServices[serviceIndex],
      deliverables: newDeliverables,
    };
    onChange({
      ...data,
      services: updatedServices,
    });
  };

  const handleDeleteDeliverable = (serviceIndex: number, dIndex: number) => {
    const updatedServices = [...data.services];
    const newDeliverables = (updatedServices[serviceIndex].deliverables || []).filter(
      (_, i) => i !== dIndex
    );
    updatedServices[serviceIndex] = {
      ...updatedServices[serviceIndex],
      deliverables: newDeliverables,
    };
    onChange({
      ...data,
      services: updatedServices,
    });
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all brochure content to Jhomel Ignacio defaults?')) {
      onChange(JSON.parse(JSON.stringify(DEFAULT_BROCHURE_DATA)));
    }
  };

  const handleLoadPreset = (presetName: string) => {
    if (presetName === 'ecommerce') {
      onChange({
        ...data,
        tagline: 'Specialized E-Commerce Engineering & Conversion Optimization',
        introSummary:
          'Transforming retail brands into high-converting digital storefronts. Expert in Shopify Plus, custom headless checkouts, ERP synchronization, and speed architecture.',
        services: [
          {
            id: 'e1',
            title: 'Shopify Plus Custom Themes',
            description: 'Custom Liquid themes built strictly to design specs without heavy pre-made theme bloat.',
            icon: 'ShoppingBag',
            deliverables: ['Custom Liquid & Theme Architecture', 'Section & Block Reusable Schemas', 'Full Responsive Audit'],
          },
          {
            id: 'e2',
            title: 'Checkout & Cart Customization',
            description: 'Advanced Shopify Checkout Extensibility, custom discounts, bundles, and upsell logic.',
            icon: 'Zap',
            deliverables: ['Checkout UI Extensions', 'Tiered Pricing & Volume Discounts', 'One-Click Post-Purchase Upsell'],
          },
          {
            id: 'e3',
            title: 'eCommerce Analytics & Funnels',
            description: 'Accurate revenue attribution, enhanced e-commerce Google Analytics 4, and Facebook Pixel/CAPI.',
            icon: 'BarChart3',
            deliverables: ['GA4 Enhanced eCommerce Tracking', 'Server-Side Conversions API (CAPI)', 'Looker Studio Dashboard'],
          },
          {
            id: 'e4',
            title: 'Store Speed & Core Web Vitals',
            description: 'Dramatic load time improvements to maximize mobile conversion rates.',
            icon: 'Rocket',
            deliverables: ['Lighthouse 90+ Score Guarantee', 'JavaScript & App Script Pruning', 'Image & Asset CDN Optimization'],
          },
        ],
      });
    } else if (presetName === 'seo') {
      onChange({
        ...data,
        tagline: 'Technical Search Engine Optimization & Growth Architecture',
        introSummary:
          'Solving deep technical indexation, crawling, and Core Web Vitals bottlenecks that prevent high-value organic rankings and qualified traffic.',
        services: [
          {
            id: 's1',
            title: 'Technical SEO Infrastructure Audit',
            description: 'Exhaustive audit of crawl budget, status codes, JavaScript rendering, and robots directives.',
            icon: 'Search',
            deliverables: ['Full Screaming Frog Crawl Review', 'Internal PageRank & Link Architecture', 'Robots.txt & XML Sitemaps Hierarchy'],
          },
          {
            id: 's2',
            title: 'JSON-LD Structured Data & Rich Snippets',
            description: 'Semantic Schema.org implementations for Product, FAQ, Article, Organization, and LocalBusiness markup.',
            icon: 'Code2',
            deliverables: ['Rich Snippets Eligibility', 'Google Merchant Feed Schema', 'Breadcrumb & Sitename Entity Markup'],
          },
          {
            id: 's3',
            title: 'Core Web Vitals Remediation',
            description: 'Deep code-level optimization of Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and INP.',
            icon: 'Zap',
            deliverables: ['CSS Critical Path Inlining', 'Font Subsetting & Display Swap', 'Third-Party Script Isolation'],
          },
          {
            id: 's4',
            title: 'GA4 & BigQuery Analytics Pipelines',
            description: 'Enterprise event-stream pipelines from web properties directly to Google BigQuery for unfiltered BI insights.',
            icon: 'Database',
            deliverables: ['Automated BigQuery Export Stream', 'Customer Lifetime Value (LTV) Queries', 'Custom Executive Dashboard'],
          },
        ],
      });
    }
  };

  return (
    <div className="bg-white dark:bg-[#12131A] border border-black/10 dark:border-white/10 rounded-2xl flex flex-col h-full shadow-sm overflow-hidden">
      {/* Editor Header */}
      <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-black/20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Package size={17} className="text-accent" />
            <span>Brochure Content Form</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Edit details, add or reorder dynamic services and pick icons
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetToDefault}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/10 dark:border-white/10 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          title="Reset back to default values"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-black/10 dark:border-white/10 text-xs font-medium px-4 pt-2 bg-zinc-50/30 dark:bg-black/10 overflow-x-auto gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'services'
              ? 'border-accent text-zinc-900 dark:text-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <Layers size={14} />
          <span>Services ({data.services.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-accent text-zinc-900 dark:text-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <User size={14} />
          <span>Profile Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'contact'
              ? 'border-accent text-zinc-900 dark:text-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <PhoneCall size={14} />
          <span>Contact</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'style'
              ? 'border-accent text-zinc-900 dark:text-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <Palette size={14} />
          <span>Style & Presets</span>
        </button>
      </div>

      {/* Form Content Area */}
      <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-1 max-h-[calc(100vh-280px)]">
        {/* TAB 1: DYNAMIC SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Manage Services & Deliverables
              </span>
              <button
                type="button"
                onClick={handleAddService}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-accent text-accent-fg hover:opacity-90 rounded-lg shadow-xs transition-opacity"
              >
                <Plus size={14} />
                <span>Add Service</span>
              </button>
            </div>

            {/* List of dynamic services */}
            <div className="space-y-3">
              {data.services.map((service, index) => {
                const isExpanded = expandedServices[service.id || index.toString()] ?? true;

                return (
                  <div
                    key={service.id || index}
                    className="border border-black/10 dark:border-white/10 rounded-xl bg-zinc-50/70 dark:bg-white/[0.02] p-4 transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {/* Icon Button */}
                        <button
                          type="button"
                          onClick={() => setIconPickerIndex(index)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10 bg-white dark:bg-black/30 hover:border-accent text-zinc-800 dark:text-white transition-colors"
                          title="Click to change icon"
                        >
                          <ServiceIcon name={service.icon} size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleExpand(service.id || index.toString())}
                          className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white truncate text-left hover:text-accent transition-colors flex items-center gap-2"
                        >
                          <span>{index + 1}. {service.title || 'Untitled Service'}</span>
                          {isExpanded ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
                        </button>
                      </div>

                      {/* Action buttons (Move Up, Down, Delete) */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveService(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveService(index, 'down')}
                          disabled={index === data.services.length - 1}
                          className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteService(index)}
                          className="p-1 text-red-500/70 hover:text-red-500 transition-colors ml-1"
                          title="Delete Service"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 space-y-3.5">
                        {/* Title Input */}
                        <div>
                          <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                            Service Title
                          </label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) =>
                              handleUpdateService(index, 'title', e.target.value)
                            }
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                            placeholder="e.g. Shopify Plus Custom Development"
                          />
                        </div>

                        {/* Description Input */}
                        <div>
                          <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                            Description & Value Proposition
                          </label>
                          <textarea
                            rows={2}
                            value={service.description}
                            onChange={(e) =>
                              handleUpdateService(index, 'description', e.target.value)
                            }
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                            placeholder="Briefly describe what makes this service unique..."
                          />
                        </div>

                        {/* Icon Quick Selector */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-[11px] text-zinc-500 font-medium">
                            Icon: <span className="font-mono text-zinc-800 dark:text-zinc-200">{service.icon}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setIconPickerIndex(index)}
                            className="text-xs text-accent font-semibold hover:underline"
                          >
                            Browse Icons →
                          </button>
                        </div>

                        {/* Deliverables / Scope Bullet Points */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                              Deliverables / Scope Items
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddDeliverable(index)}
                              className="text-[11px] font-semibold text-accent flex items-center gap-1 hover:underline"
                            >
                              <Plus size={12} />
                              <span>Add Bullet</span>
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            {service.deliverables.map((item, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-1.5">
                                <span className="text-[10px] text-zinc-400 font-mono w-4 text-center">
                                  {dIdx + 1}.
                                </span>
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) =>
                                    handleUpdateDeliverable(index, dIdx, e.target.value)
                                  }
                                  className="flex-1 px-2.5 py-1 text-xs rounded bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                                  placeholder="e.g. 100% Core Web Vitals pass"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDeleteDeliverable(index, dIdx)}
                                  className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                                  title="Remove Deliverable"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE INFO */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Company / Freelancer Name
              </label>
              <input
                type="text"
                value={data.companyName}
                onChange={(e) => handleFieldChange('companyName', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                placeholder="e.g. Jhomel Ignacio"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Tagline / Title
              </label>
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => handleFieldChange('tagline', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                placeholder="e.g. Senior Full-Stack Developer & Solutions Architect"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Executive Intro / Value Proposition Summary
              </label>
              <textarea
                rows={4}
                value={data.introSummary}
                onChange={(e) => handleFieldChange('introSummary', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                placeholder="State your unique value proposition, enterprise track record, and core focus..."
              />
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT INFO */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                placeholder="e.g. jhomignacio08@gmail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="text"
                value={data.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                placeholder="e.g. +63 900 000 0000"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Website / Portfolio Link
              </label>
              <input
                type="text"
                value={data.website}
                onChange={(e) => handleFieldChange('website', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                placeholder="e.g. github.com/punisher08"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Location & Availability
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                placeholder="e.g. Manila, Philippines (Available Globally)"
              />
            </div>
          </div>
        )}

        {/* TAB 4: STYLE & PRESETS */}
        {activeTab === 'style' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Brochure Accent Color
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => handleFieldChange('accentColor', swatch.hex)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium transition-all ${
                      data.accentColor === swatch.hex
                        ? 'border-zinc-900 dark:border-white bg-zinc-100 dark:bg-white/10 shadow-xs'
                        : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="truncate text-[11px] text-zinc-700 dark:text-zinc-300">
                      {swatch.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Color Input */}
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-black/10 dark:border-white/10 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={data.accentColor}
                  onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                  className="px-3 py-1.5 text-xs font-mono uppercase rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white w-32 focus:outline-hidden focus:border-accent"
                  placeholder="#CEFF00"
                />
              </div>
            </div>

            {/* Background Image Selection */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Brochure Background Image
                  </label>
                  <p className="text-[11px] text-zinc-500">
                    {data.background?.enabled ? 'Active wallpaper applied' : 'Solid color background'}
                  </p>
                </div>
                {onOpenBackgroundModal && (
                  <button
                    type="button"
                    onClick={onOpenBackgroundModal}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5"
                    style={{ backgroundColor: data.accentColor, color: '#000000' }}
                  >
                    <ImageIcon size={14} />
                    <span>Choose Background</span>
                  </button>
                )}
              </div>

              {data.background?.enabled && data.background.imageUrl && (
                <div className="relative h-16 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                  <img
                    src={data.background.imageUrl}
                    alt="Current Background"
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
                        onChange({
                          ...data,
                          background: { ...data.background!, enabled: false },
                        })
                      }
                      className="px-2 py-0.5 rounded bg-black/60 text-red-400 hover:text-red-300 text-[10px] font-mono border border-white/10"
                    >
                      Turn Off
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Ready-made Service Packs */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block">
                Quick-Load Curated Packs
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleLoadPreset('ecommerce')}
                  className="text-left p-3 rounded-xl border border-black/10 dark:border-white/10 hover:border-accent hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
                >
                  <p className="font-bold text-xs text-zinc-900 dark:text-white mb-0.5">
                    🛍️ E-Commerce Specialization
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Loads Shopify Plus, Cart Logic, GA4 Funnels & Web Vitals
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoadPreset('seo')}
                  className="text-left p-3 rounded-xl border border-black/10 dark:border-white/10 hover:border-accent hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
                >
                  <p className="font-bold text-xs text-zinc-900 dark:text-white mb-0.5">
                    🔍 Technical SEO & Analytics
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Loads Crawl Audit, Schema.org, Core Web Vitals & BigQuery
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Icon Picker Modal */}
      {iconPickerIndex !== null && (
        <IconSelectorModal
          isOpen={true}
          selectedIcon={data.services[iconPickerIndex]?.icon || 'Sparkles'}
          onSelect={(iconName) => {
            handleUpdateService(iconPickerIndex, 'icon', iconName);
            setIconPickerIndex(null);
          }}
          onClose={() => setIconPickerIndex(null)}
        />
      )}
    </div>
  );
};
