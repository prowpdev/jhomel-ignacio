import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, MapPin, Terminal, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-black/[0.08] dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="text-accent font-semibold">04</span>
              <span aria-hidden="true">/</span>
              <span>About the Freelancer</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
              Developer by craft. Problem solver by nature.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <MapPin size={14} className="text-accent" />
            <span>Care Zone#5 Tarlac City 2300, Philippines (Available Globally / Remote)</span>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
            <p className="text-lg text-zinc-900 dark:text-white font-normal leading-relaxed">
              I specialize in turning ambitious project roadmaps into clean, performant, and reliable digital products. For more than 5 years, I&apos;ve worked closely with founder-led startups, eCommerce retailers, and agencies across Australia, the United States, and the Philippines.
            </p>

            <p>
              My expertise spans the entire full-stack lifecycle: from designing clean relational database schemas in Laravel and configuring secure REST APIs, to engineering bespoke Shopify Liquid themes that load under a second.
            </p>

            <p>
              When you hire me, you don&apos;t get account managers or junior delegates. You get direct, transparent engineering from day one, backed by rigorous version control, continuous communication, and clear deliverable milestones.
            </p>

            {/* Core Competencies Grid */}
            <div className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#0F1017] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-accent font-semibold block mb-1">Architecture</span>
                <span className="text-zinc-700 dark:text-zinc-300">Clean MVC, REST APIs, Microservices & Custom DB Schemas</span>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#0F1017] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-accent font-semibold block mb-1">eCommerce Focus</span>
                <span className="text-zinc-700 dark:text-zinc-300">Shopify Plus, Liquid, Storefront API & Custom Cart Logic</span>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#0F1017] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-accent font-semibold block mb-1">Performance Standards</span>
                <span className="text-zinc-700 dark:text-zinc-300">Google Lighthouse 90+, Sub-second LCP & Zero CLS</span>
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#0F1017] border border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-accent font-semibold block mb-1">Automation & AI</span>
                <span className="text-zinc-700 dark:text-zinc-300">OpenAI API pipelines, Zapier hooks & GHL workflows</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details Box & Links (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md dark:shadow-2xl">
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white tracking-wide border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
              Freelancer Profile & Track Record
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono">Specialist</span>
                <span className="text-zinc-900 dark:text-white font-medium">{PERSONAL_INFO.name}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono">Core Focus</span>
                <span className="text-zinc-900 dark:text-white font-medium">eCommerce & Full-Stack Apps</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono">Industry Experience</span>
                <span className="text-zinc-900 dark:text-white font-medium font-mono tabular-nums">5+ Years Full-Stack</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono">Production Works</span>
                <span className="text-zinc-900 dark:text-white font-medium font-mono tabular-nums">31 Commercial Platforms</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono">Current Status</span>
                <span className="text-accent font-semibold">Available for Contract & Build</span>
              </div>
            </div>

            {/* Verified External Profiles */}
            <div className="pt-2 space-y-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.03] hover:bg-zinc-100 dark:hover:bg-white/[0.07] border border-black/[0.06] dark:border-white/[0.08] text-xs transition-colors group"
              >
                <div className="flex items-center gap-2.5 text-zinc-800 dark:text-zinc-300">
                  <Github size={16} className="text-zinc-900 dark:text-white" />
                  <span>github.com/punisher08</span>
                </div>
                <ArrowRightAlt />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.03] hover:bg-zinc-100 dark:hover:bg-white/[0.07] border border-black/[0.06] dark:border-white/[0.08] text-xs transition-colors group"
              >
                <div className="flex items-center gap-2.5 text-zinc-800 dark:text-zinc-300">
                  <Linkedin size={16} className="text-blue-500" />
                  <span>LinkedIn Profile</span>
                </div>
                <ArrowRightAlt />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

const ArrowRightAlt: React.FC = () => (
  <ExternalLink size={13} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
);
