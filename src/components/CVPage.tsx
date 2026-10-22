import React, { useState } from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Phone,
  Github, 
  Linkedin, 
  ExternalLink, 
  Copy, 
  Check, 
  Briefcase, 
  GraduationCap, 
  UserCheck, 
  Code2, 
  Sparkles,
  Layers,
  Globe
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, CV_EXPERIENCES, CV_EDUCATION } from '../data/portfolioData';

interface CVPageProps {
  onBackToPortfolio: () => void;
  onOpenInquiry: () => void;
}

export const CVPage: React.FC<CVPageProps> = ({ onBackToPortfolio, onOpenInquiry }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const references = [
    {
      name: 'Technical Director & Delivery Lead',
      relationship: 'Agency Supervisor & Direct Client Lead',
      organization: 'Online Marketing Gurus (OMG) / Australian Brands',
      context: 'Direct collaboration on high-traffic Shopify stores (Max Brenner, Instant Brands, Rapha Herbals) and custom WordPress projects (Bedsrus, Reality Events).',
      contactStatus: 'Direct contact details and reference check available upon request.',
    },
    {
      name: 'Commercial Software & Lead Engineer',
      relationship: 'Engineering Supervisor & Plugin Architect',
      organization: 'Netseek Pty Ltd. (Australia)',
      context: 'Led development on commercial WordPress Comparison Plugin (WCP) with OpenAI API GPT-3 integration, Proof Alert Plugin, and bespoke Australian client portals.',
      contactStatus: 'Letter of recommendation and verification available on request.',
    },
    {
      name: 'Engineering Director & Senior Mentor',
      relationship: 'Former Technical Lead & Department Head',
      organization: 'iFormat Logic IT Solutions',
      context: 'Supervised full-stack web builds across Laravel, Shopify, Magento, OpenCart, and WordPress, resulting in promotion to lead a small squad of developers.',
      contactStatus: 'Verified endorsement and references available upon request.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#08080B] text-zinc-900 dark:text-[#ECEEF2] pt-28 pb-20 transition-colors duration-200">
      
      {/* Top Action Bar (Screen Only - Hidden on Print) */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-8 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/10 shadow-sm">
          
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.09] border border-black/10 dark:border-white/10 rounded-md transition-colors flex items-center gap-1.5"
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-4 py-2 text-xs font-semibold text-accent-fg bg-accent hover:opacity-90 rounded-md transition-all shadow-sm flex items-center gap-1.5 uppercase tracking-wide"
            >
              <span>Hire Jhomel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main CV Document Container (A4 / Printable Monograph Layout) */}
      <article className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-16 bg-white dark:bg-[#0E0F16] border border-black/10 dark:border-white/[0.09] rounded-2xl shadow-xl print:shadow-none print:border-none print:p-0 print:bg-white print:text-black">
        
        {/* CV Header */}
        <header className="border-b border-black/[0.08] dark:border-white/[0.08] pb-8 mb-8 print:pb-4 print:mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Curriculum Vitae</span>
                <span aria-hidden="true">·</span>
                <span>Verified Technical Record</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>

              <p className="font-display text-lg sm:text-xl font-medium text-accent mt-1">
                {PERSONAL_INFO.role}
              </p>

              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">
                Specializing in WordPress (Custom Blocks & Themes) & Shopify (Liquid, Metafields & Metaobjects)
              </p>
            </div>

            {/* Contact Details Column */}
            <div className="space-y-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 self-start bg-zinc-50/70 dark:bg-[#141520]/70 p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] print:bg-transparent print:p-0 print:border-none">
              
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-accent shrink-0" />
                <span>{PERSONAL_INFO.address}, Philippines</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-accent shrink-0" />
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-zinc-900 dark:text-white hover:text-accent font-semibold"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="print:hidden text-zinc-400 hover:text-accent"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-accent shrink-0" />
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-zinc-900 dark:text-white hover:text-accent font-medium underline"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="print:hidden text-zinc-400 hover:text-accent"
                  title="Copy email"
                >
                  {copiedEmail ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Github size={13} className="text-zinc-400 shrink-0" />
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-900 dark:text-white hover:underline"
                >
                  github.com/punisher08
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Linkedin size={13} className="text-blue-500 shrink-0" />
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-900 dark:text-white hover:underline"
                >
                  linkedin.com/in/jhomel-ignacio-67b298203
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Section 1: Executive Summary */}
        <section className="mb-10 print:mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-2 font-semibold">
            <span className="text-accent">01.</span> Executive Technical Summary
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
            Web Designer and WordPress / Shopify Developer with extensive commercial experience designing, developing, and deploying high-performance eCommerce platforms, custom WordPress themes & blocks, bespoke Elementor widgets, and commercial WordPress plugins. Proven track record across <span className="font-semibold text-zinc-900 dark:text-white">Summit Web Solutions</span>, <span className="font-semibold text-zinc-900 dark:text-white">Online Marketing Gurus (OMG)</span>, <span className="font-semibold text-zinc-900 dark:text-white">Netseek Pty Ltd.</span>, and <span className="font-semibold text-zinc-900 dark:text-white">iFormat Logic</span>—handling full-cycle development from Figma UI/UX to server infrastructure, ACF, Shopify Metafields & Metaobjects, OpenAI GPT-3 API integrations, and leading development teams.
          </p>
        </section>

        {/* Section 2: Core Technical Competencies */}
        <section className="mb-10 print:mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-2 font-semibold">
            <span className="text-accent">02.</span> Technical Skills & Stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            
            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                WordPress & Block Architecture
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Custom In-House WP Themes, Custom Gutenberg Blocks, Elementor (Custom Widgets), Advanced Custom Fields (ACF Pro), Minimal Plugin Architecture, WooCommerce.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                Shopify Development
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Custom Shopify Themes from scratch, Liquid Sections & Templates, Metafields & Metaobjects, Storefront Customization, PayMongo & Payment Integrations.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                Figma to Web & UI/UX
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Pixel-perfect Figma to WordPress blocks conversion, Figma to Shopify liquid, UI/UX prototyping, responsive design across mobile/desktop, cross-browser QA.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                Full-Stack & Commercial Plugins
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Commercial WordPress Plugin Development (WCP Aggregator, Proof Alert), PHP (OOP), Laravel, Magento, OpenCart, RESTful APIs, MySQL, Booqable Rental Software.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                AI & Workflow Integrations
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                OpenAI API Engine (GPT-3: ada, babbage, curie, davinci) for automated unique content generation, Zapier Webhooks, Mailchimp CRM, Lead Capture Funnels.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                Infrastructure & Performance
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Page Speed & Core Web Vitals optimization, Server & Hosting Management, DNS Routing, SSL Configuration, Technical SEO Meta elements & Google Ads setup.
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: Professional Experience History */}
        <section className="mb-10 print:mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-2 font-semibold">
            <span className="text-accent">03.</span> Professional Experience
          </h2>

          <div className="space-y-10">
            {CV_EXPERIENCES.map((exp, idx) => (
              <div 
                key={idx} 
                className="relative pl-6 border-l-2 border-accent/40 break-inside-avoid print:mb-6"
              >
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />

                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                      {exp.role}
                    </h3>
                    {exp.employmentType && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-accent/15 text-accent border border-accent/20">
                        {exp.employmentType}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {exp.period}
                  </span>
                </div>

                {/* Company & Location */}
                <div className="flex items-center gap-2 text-xs font-mono text-accent mb-3 font-semibold">
                  <span>{exp.company}</span>
                  <span aria-hidden="true" className="text-zinc-400">·</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">{exp.location}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-700 dark:text-zinc-300 mb-3 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Key Achievements Bullet Points */}
                <ul className="space-y-1.5 mb-4 text-xs text-zinc-700 dark:text-zinc-300 list-disc list-outside ml-4">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Delivered Client Projects (if any) */}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="mb-4 mt-3 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 mb-2.5">
                      <Globe size={13} className="text-accent" />
                      <span>Delivered Client Projects & Implementations:</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {exp.projects.map((proj, pIdx) => (
                        <div 
                          key={pIdx} 
                          className="p-3 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.05] dark:border-white/[0.05] text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <span className="font-semibold text-zinc-900 dark:text-white font-display">
                              {proj.name}
                            </span>
                            {proj.link && (
                              <a
                                href={proj.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent hover:underline flex items-center gap-1 font-mono text-[11px]"
                              >
                                <span>{proj.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                                <ExternalLink size={10} />
                              </a>
                            )}
                          </div>

                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-1.5 italic">
                            {proj.description}
                          </p>

                          <ul className="space-y-1 list-disc list-outside ml-4 text-[11px] text-zinc-700 dark:text-zinc-300">
                            {proj.highlights.map((hl, hIdx) => (
                              <li key={hIdx} className="leading-snug">
                                {hl}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/[0.04] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border border-black/[0.05] dark:border-white/[0.05]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Key Featured Case Studies */}
        <section className="mb-10 print:mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-2 font-semibold">
            <span className="text-accent">04.</span> Selected Flagship Production Deliverables
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {PROJECTS.filter((p) => p.featured).slice(0, 6).map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                    <span>{p.category}</span>
                    <span>{p.year || '2024'}</span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-zinc-900 dark:text-white flex items-center justify-between">
                    <span>{p.title}</span>
                    {p.link && p.link !== '#' && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline flex items-center gap-0.5 text-[11px]"
                      >
                        <span>Live Site</span>
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-2">
                    {p.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                  {p.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-black/40 px-1.5 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Education & Credentials */}
        <section className="mb-10 print:mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-2 font-semibold">
            <span className="text-accent">05.</span> Education & Campus Leadership
          </h2>

          <div className="space-y-3 text-xs">
            {CV_EDUCATION.map((edu, eIdx) => (
              <div 
                key={eIdx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-0.5 font-medium">
                      {edu.institution} · {edu.location}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-accent font-semibold mt-1 sm:mt-0">
                    {edu.period}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                  {edu.description}
                </p>

                <ul className="space-y-1 mt-2.5 list-disc list-outside ml-4 text-xs text-zinc-700 dark:text-zinc-300">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Professional References */}
        <section className="mb-8 print:mb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-2 font-semibold">
            <span className="text-accent">06.</span> Professional References & Client Verification
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {references.map((ref, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="w-6 h-6 rounded-md bg-accent/15 text-accent flex items-center justify-center mb-2">
                    <UserCheck size={14} />
                  </div>
                  <h3 className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                    {ref.name}
                  </h3>
                  <p className="font-mono text-[11px] text-accent mt-0.5">
                    {ref.relationship}
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                    {ref.organization}
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    {ref.context}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  {ref.contactStatus}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Document Footer */}
        <footer className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-3">
          <span>Curriculum Vitae · {PERSONAL_INFO.name} ({PERSONAL_INFO.handle})</span>
          <span>Contact: {PERSONAL_INFO.phone} · {PERSONAL_INFO.email}</span>
        </footer>

      </article>

    </div>
  );
};
