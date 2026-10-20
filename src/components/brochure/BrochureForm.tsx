import React, { useState } from 'react';
import {
  BrochureData,
  BrochureServiceItem,
  DEFAULT_BROCHURE_DATA,
  CURRENCY_OPTIONS,
  DEFAULT_PRICING_PACKAGES,
  PricingPackage,
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
  DollarSign,
  Coins,
  ShieldCheck,
  CheckCircle2,
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
  const [activeTab, setActiveTab] = useState<
    'services' | 'pricing' | 'profile' | 'contact' | 'style'
  >('services');
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

  // Currency Selection
  const handleSelectCurrency = (code: string, symbol: string) => {
    onChange({
      ...data,
      currencyCode: code,
      currency: symbol,
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
      price: '1,200',
      pricingPeriod: '/ project',
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

  // Pricing Packages Management
  const currentPackages = data.pricingTiers || DEFAULT_PRICING_PACKAGES;

  const handleAddPackage = () => {
    const newTier: PricingPackage = {
      id: Date.now().toString(),
      name: 'Custom Package Tier',
      price: '1,950',
      period: '/ sprint',
      description: 'Comprehensive deliverable sprint tailored to client roadmap.',
      features: ['Core Scope Implementation', 'Dedicated QA & Review', '14-Day Warranty'],
      isPopular: false,
      badge: 'Sprint Plan',
      ctaText: 'Book Package',
    };
    onChange({
      ...data,
      pricingTiers: [...currentPackages, newTier],
    });
  };

  const handleUpdatePackage = (index: number, field: keyof PricingPackage, value: any) => {
    const updated = [...currentPackages];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange({
      ...data,
      pricingTiers: updated,
    });
  };

  const handleDeletePackage = (index: number) => {
    const updated = currentPackages.filter((_, i) => i !== index);
    onChange({
      ...data,
      pricingTiers: updated,
    });
  };

  const handleAddPackageFeature = (tierIndex: number) => {
    const updated = [...currentPackages];
    const features = [...(updated[tierIndex].features || [])];
    features.push('New Included Deliverable');
    updated[tierIndex] = { ...updated[tierIndex], features };
    onChange({ ...data, pricingTiers: updated });
  };

  const handleUpdatePackageFeature = (tierIndex: number, fIdx: number, val: string) => {
    const updated = [...currentPackages];
    const features = [...(updated[tierIndex].features || [])];
    features[fIdx] = val;
    updated[tierIndex] = { ...updated[tierIndex], features };
    onChange({ ...data, pricingTiers: updated });
  };

  const handleDeletePackageFeature = (tierIndex: number, fIdx: number) => {
    const updated = [...currentPackages];
    const features = (updated[tierIndex].features || []).filter((_, i) => i !== fIdx);
    updated[tierIndex] = { ...updated[tierIndex], features };
    onChange({ ...data, pricingTiers: updated });
  };

  const handleResetToDefault = () => {
    if (confirm('Reset brochure to default template data?')) {
      onChange(DEFAULT_BROCHURE_DATA);
    }
  };

  const handleLoadPreset = (preset: 'ecommerce' | 'seo') => {
    if (preset === 'ecommerce') {
      onChange({
        ...data,
        tagline: 'Specialized Shopify Plus & eCommerce Architect',
        introSummary:
          'Engineering revenue-generating Shopify storefronts with sub-second page speeds, custom Liquid sections, and checkout conversion logic.',
        services: [
          {
            id: 'e1',
            title: 'Shopify Plus Theme Engineering',
            description: 'Custom Liquid themes built strictly from scratch with zero app clutter and sub-second load times.',
            icon: 'ShoppingBag',
            price: '2,200',
            pricingPeriod: '/ store',
            deliverables: ['Custom Section Architecture', 'Mobile UX Optimization', 'Lighthouse 90+ Score SLA'],
          },
          {
            id: 'e2',
            title: 'Storefront API & Custom Cart Logic',
            description: 'Headless Shopify architecture using GraphQL Storefront API, custom upsells, and subscription flows.',
            icon: 'Code2',
            price: '1,800',
            pricingPeriod: '/ module',
            deliverables: ['GraphQL Storefront Endpoints', 'Slide-out Cart with Bundles', 'Post-purchase 1-Click Upsells'],
          },
          {
            id: 'e3',
            title: 'eCommerce GA4 & Server-side GTM',
            description: 'Accurate purchase attribution, server-side tagging via Cloudflare/AWS, and Facebook CAPI pipeline.',
            icon: 'BarChart3',
            price: '950',
            pricingPeriod: '/ setup',
            deliverables: ['Server-Side GTM Container', 'Meta Conversions API (CAPI)', 'Looker Studio Revenue Dashboards'],
          },
        ],
      });
    } else if (preset === 'seo') {
      onChange({
        ...data,
        tagline: 'Technical SEO Engineer & Web Performance Architect',
        introSummary:
          'Deep architectural audits, structured data generation, and Core Web Vitals remediation that turn technical compliance into #1 rankings.',
        services: [
          {
            id: 's1',
            title: 'Full Technical SEO Audit',
            description: 'Complete inspection of crawl budget, indexability bottlenecks, canonical traps, and internal link equity.',
            icon: 'Search',
            price: '950',
            pricingPeriod: '/ audit',
            deliverables: ['Deep Screaming Frog Crawl Audit', 'Log File Analysis', 'Actionable Dev Remediation Matrix'],
          },
          {
            id: 's2',
            title: 'Schema.org & Rich Snippet Architecture',
            description: 'Custom JSON-LD graphs for organization, eCommerce products, articles, FAQs, and local entity signals.',
            icon: 'Globe',
            price: '650',
            pricingPeriod: '/ site',
            deliverables: ['Dynamic JSON-LD Injection', 'Google Rich Results Validation', 'Knowledge Graph Entity Binding'],
          },
          {
            id: 's3',
            title: 'Core Web Vitals Remediation',
            description: 'Deep code-level optimization of Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and INP.',
            icon: 'Zap',
            price: '1,400',
            pricingPeriod: '/ sprint',
            deliverables: ['CSS Critical Path Inlining', 'Font Subsetting & Display Swap', 'Third-Party Script Isolation'],
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
            <span>Brochure Content & Pricing Editor</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Edit services, pricing tiers, currency, and company branding
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
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'pricing'
              ? 'border-accent text-zinc-900 dark:text-white'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <Coins size={14} />
          <span>Price & Currency</span>
          {data.showPricing && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          )}
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
        {/* TAB 1: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Service Offerings List
                </h3>
                <p className="text-[11px] text-zinc-500">
                  Add, edit, rearrange or add deliverables and price tags
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddService}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black shadow hover:opacity-90 transition-opacity"
              >
                <Plus size={14} />
                <span>Add Service</span>
              </button>
            </div>

            {/* Services Accordion List */}
            <div className="space-y-3">
              {data.services.map((service, index) => {
                const isExpanded = !!expandedServices[service.id || index.toString()];

                return (
                  <div
                    key={service.id || index}
                    className="border border-black/10 dark:border-white/10 rounded-xl bg-zinc-50/50 dark:bg-white/[0.02] p-3.5 transition-all"
                  >
                    {/* Collapsed Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="flex items-center gap-3 flex-1 cursor-pointer select-none"
                        onClick={() => toggleExpand(service.id || index.toString())}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-black/10 dark:border-white/10"
                          style={{
                            backgroundColor: `${data.accentColor}15`,
                            color: data.accentColor,
                          }}
                        >
                          <ServiceIcon name={service.icon} size={16} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                              {service.title || `Service 0${index + 1}`}
                            </span>
                            {service.price && data.showPricing && (
                              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                                {data.currency || '$'}{service.price}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-500 block truncate">
                            {service.description || 'No description provided'}
                          </span>
                        </div>
                      </div>

                      {/* Controls (Reorder & Delete) */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveService(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveService(index, 'down')}
                          disabled={index === data.services.length - 1}
                          className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteService(index)}
                          className="p-1 rounded text-zinc-400 hover:text-red-500 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleExpand(service.id || index.toString())}
                          className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 ml-1"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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

                        {/* Price & Period for this Service */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                              Price ({data.currency || '$'})
                            </label>
                            <input
                              type="text"
                              value={service.price || ''}
                              onChange={(e) =>
                                handleUpdateService(index, 'price', e.target.value)
                              }
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-mono"
                              placeholder="e.g. 1,490"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                              Billing Period / Type
                            </label>
                            <input
                              type="text"
                              value={service.pricingPeriod || ''}
                              onChange={(e) =>
                                handleUpdateService(index, 'pricingPeriod', e.target.value)
                              }
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-mono"
                              placeholder="e.g. / project or / month"
                            />
                          </div>
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

        {/* TAB 2: PRICE SECTION & CURRENCY */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            {/* Toggle showPricing */}
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                  Show Pricing & Currency Section
                </span>
                <p className="text-[11px] text-zinc-500">
                  Displays rates on service cards and unlocks the full Pricing Matrix section
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.showPricing}
                  onChange={(e) => handleFieldChange('showPricing', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
              </label>
            </div>

            {/* Currency Option Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Select Currency
                </span>
                <span className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400">
                  Active: {data.currencyCode || 'USD'} ({data.currency || '$'})
                </span>
              </div>

              {/* Currency Quick Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {CURRENCY_OPTIONS.map((cur) => {
                  const isSelected = data.currencyCode === cur.code;
                  return (
                    <button
                      key={cur.code}
                      type="button"
                      onClick={() => handleSelectCurrency(cur.code, cur.symbol)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold shadow'
                          : 'border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#1A1C24] text-zinc-700 dark:text-zinc-300 hover:border-white/30'
                      }`}
                    >
                      <span className="text-base font-black font-mono block">
                        {cur.symbol}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 block">
                        {cur.code}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Currency Symbol & Code Input */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 mb-1">
                    Custom Symbol (e.g. $, €, ₱, kr, R$)
                  </label>
                  <input
                    type="text"
                    value={data.currency || '$'}
                    onChange={(e) => handleFieldChange('currency', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 mb-1">
                    Currency ISO Code (e.g. USD, EUR, PHP)
                  </label>
                  <input
                    type="text"
                    value={data.currencyCode || 'USD'}
                    onChange={(e) => handleFieldChange('currencyCode', e.target.value.toUpperCase())}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Packages / Tiers Management */}
            <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Pricing Packages & Tiers ({currentPackages.length})
                  </span>
                  <p className="text-[11px] text-zinc-500">
                    Rendered in the Modern Pricing Matrix and Split Luxury layouts
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPackage}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black shadow hover:opacity-90"
                >
                  <Plus size={13} />
                  <span>Add Tier</span>
                </button>
              </div>

              <div className="space-y-4">
                {currentPackages.map((tier, tIdx) => (
                  <div
                    key={tier.id || tIdx}
                    className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50/50 dark:bg-white/[0.02] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">
                          Tier #{tIdx + 1}:
                        </span>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => handleUpdatePackage(tIdx, 'name', e.target.value)}
                          className="px-2 py-1 text-xs font-bold rounded bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                          placeholder="Tier Name (e.g. Starter Sprint)"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-[11px] flex items-center gap-1.5 cursor-pointer text-zinc-600 dark:text-zinc-400">
                          <input
                            type="checkbox"
                            checked={tier.isPopular || false}
                            onChange={(e) => handleUpdatePackage(tIdx, 'isPopular', e.target.checked)}
                            className="rounded"
                          />
                          <span>Most Popular</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleDeletePackage(tIdx)}
                          className="p-1 text-zinc-400 hover:text-red-500"
                          title="Delete package"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">
                          Price ({data.currency || '$'})
                        </label>
                        <input
                          type="text"
                          value={tier.price}
                          onChange={(e) => handleUpdatePackage(tIdx, 'price', e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-mono"
                          placeholder="e.g. 1,490"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">
                          Period
                        </label>
                        <input
                          type="text"
                          value={tier.period}
                          onChange={(e) => handleUpdatePackage(tIdx, 'period', e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white font-mono"
                          placeholder="e.g. / project or / month"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          value={tier.badge || ''}
                          onChange={(e) => handleUpdatePackage(tIdx, 'badge', e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                          placeholder="e.g. Fast Turnaround"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 mb-1">
                        Tier Description
                      </label>
                      <input
                        type="text"
                        value={tier.description}
                        onChange={(e) => handleUpdatePackage(tIdx, 'description', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs rounded bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                        placeholder="Brief overview of tier focus..."
                      />
                    </div>

                    {/* Features list */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          Included Features & SLA
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddPackageFeature(tIdx)}
                          className="text-[10px] text-accent font-bold hover:underline"
                        >
                          + Add Feature
                        </button>
                      </div>
                      <div className="space-y-1">
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => handleUpdatePackageFeature(tIdx, fIdx, e.target.value)}
                              className="flex-1 px-2 py-0.5 text-xs rounded bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeletePackageFeature(tIdx, fIdx)}
                              className="p-1 text-zinc-400 hover:text-red-500"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms, Guarantee & Payment Note */}
            <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                Guarantees & Commercial Terms
              </span>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  Pricing Guarantee Statement
                </label>
                <input
                  type="text"
                  value={data.pricingGuarantee || ''}
                  onChange={(e) => handleFieldChange('pricingGuarantee', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                  placeholder="e.g. 100% Satisfaction Guarantee • 30 Days Free Warranty • Source Code Ownership"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  Payment Terms / Installment Milestone Note
                </label>
                <textarea
                  rows={2}
                  value={data.pricingNote || ''}
                  onChange={(e) => handleFieldChange('pricingNote', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                  placeholder="e.g. Custom scopes and flexible installment milestones available. 50% upon kickoff, 50% on verified production deployment."
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE INFO */}
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
                placeholder="Describe your capabilities, high-level client outcomes, and experience..."
              />
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT INFO */}
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
                placeholder="e.g. name@domain.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Phone Number
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
                Physical / Remote Location
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:outline-hidden focus:border-accent"
                placeholder="e.g. Manila, Philippines (Available Worldwide)"
              />
            </div>
          </div>
        )}

        {/* TAB 5: STYLE & PRESETS */}
        {activeTab === 'style' && (
          <div className="space-y-5">
            {/* Accent Color Palette */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Brand Accent Color
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => handleFieldChange('accentColor', swatch.hex)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 border border-black/20 dark:border-white/20"
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  >
                    {data.accentColor.toLowerCase() === swatch.hex.toLowerCase() && (
                      <span className="w-2 h-2 rounded-full bg-black/80" />
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Hex Input */}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                  className="w-8 h-8 rounded border-0 cursor-pointer p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={data.accentColor}
                  onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                  className="w-28 px-2 py-1 text-xs font-mono rounded bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white"
                  placeholder="#CEFF00"
                />
              </div>
            </div>

            {/* Background Image Launcher */}
            <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block">
                Background Wallpaper Image
              </span>
              <button
                type="button"
                onClick={onOpenBackgroundModal}
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-50 dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 hover:border-accent text-zinc-700 dark:text-zinc-300 flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon size={15} className="text-accent" />
                  <span>Choose Background Wallpaper</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {data.background?.enabled ? 'Active Wallpaper' : 'Disabled'} →
                </span>
              </button>

              {data.background?.enabled && (
                <div className="relative rounded-lg overflow-hidden h-14 border border-black/10 dark:border-white/10 mt-2">
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
