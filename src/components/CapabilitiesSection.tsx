import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Globe, 
  Layout, 
  Server, 
  Smartphone, 
  Sparkles, 
  Cloud, 
  Zap, 
  Check, 
  ArrowRight,
  Search,
  BarChart3
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const CapabilitiesSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const iconsMap: Record<string, React.ReactNode> = {
    ShoppingBag: <ShoppingBag size={20} className="text-accent" />,
    Globe: <Globe size={20} className="text-accent" />,
    Layout: <Layout size={20} className="text-accent" />,
    Server: <Server size={20} className="text-accent" />,
    Search: <Search size={20} className="text-accent" />,
    BarChart3: <BarChart3 size={20} className="text-accent" />,
    Smartphone: <Smartphone size={20} className="text-accent" />,
    Sparkles: <Sparkles size={20} className="text-accent" />,
    Cloud: <Cloud size={20} className="text-accent" />,
    Zap: <Zap size={20} className="text-accent" />,
  };

  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="capabilities" className="py-24 border-b border-black/[0.08] dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="text-accent font-semibold">02</span>
              <span aria-hidden="true">/</span>
              <span>Freelance Services & Stack</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
              End-to-End Technical Specializations
            </h2>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Hire direct expertise across the modern web stack. Whether migrating from Shopify to headless, optimizing WordPress databases, or building a bespoke SaaS from scratch.
          </p>
        </div>

        {/* 2-Column Interactive Capabilities Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Domain Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const isSelected = activeCategoryIndex === idx;
              return (
                <button
                  key={cat.title}
                  type="button"
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-[#151622] border-accent shadow-md dark:shadow-lg dark:shadow-black/40 ring-1 ring-accent/30'
                      : 'bg-zinc-50/70 dark:bg-[#0D0E15] border-black/[0.06] dark:border-white/[0.06] hover:bg-white dark:hover:bg-white/[0.02] hover:border-black/15 dark:hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-black/40 border border-black/[0.06] dark:border-white/10 shrink-0">
                      {iconsMap[cat.iconName]}
                    </div>
                    <div>
                      <h3 className={`font-display text-sm font-semibold tracking-wide transition-colors ${
                        isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'
                      }`}>
                        {cat.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                        {cat.shortDesc}
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-mono tabular-nums ${
                    isSelected ? 'text-accent font-semibold' : 'text-zinc-400'
                  }`}>
                    {String(cat.items.length).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Breakdown of Selected Domain (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg dark:shadow-2xl relative overflow-hidden">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  Service Specifications
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                  {activeCategory.title}
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-black/60 border border-black/[0.06] dark:border-white/10">
                {iconsMap[activeCategory.iconName]}
              </div>
            </div>

            {/* Scope explanation */}
            <p className="text-sm text-zinc-700 dark:text-zinc-300 my-6 leading-relaxed">
              {activeCategory.shortDesc}. Clean architectural design, adherence to official framework standards, and verified production performance benchmarks.
            </p>

            {/* Competency Checklist */}
            <div className="space-y-3.5 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Verified Deliverables & Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCategory.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.025] border border-black/[0.06] dark:border-white/[0.06] text-xs text-zinc-800 dark:text-zinc-200"
                  >
                    <Check size={14} className="text-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Guarantee Callout */}
            <div className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Production tested across 31+ real commercial projects</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="#brochure"
                  className="text-accent hover:underline font-mono inline-flex items-center gap-1 self-start sm:self-auto font-medium"
                >
                  <span>Build custom services brochure</span>
                  <ArrowRight size={13} />
                </a>
                <a
                  href="#works"
                  className="hover:text-zinc-900 dark:hover:text-white font-mono inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Case studies</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
