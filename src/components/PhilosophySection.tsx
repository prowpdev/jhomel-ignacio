import React from 'react';
import { PHILOSOPHY_PRINCIPLES } from '../data/portfolioData';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="methodology" className="py-24 border-b border-black/[0.08] dark:border-white/[0.08] relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="text-accent font-semibold">03</span>
              <span aria-hidden="true">/</span>
              <span>Freelance Methodology</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
              How I Deliver Projects Successfully
            </h2>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Writing maintainable code that scales, converts customers, and provides long-term commercial ROI without technical debt.
          </p>
        </div>

        {/* 4-Column Methodology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHILOSOPHY_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-none flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-6 font-semibold">
                  Principle {principle.number}
                </span>

                <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-3">
                  {principle.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span>Standardized</span>
                <span>Production Grade</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
