import React, { useState } from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenInquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiry }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Call to action card */}
        <div className="bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/10 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl dark:shadow-2xl relative overflow-hidden">
          {/* Subtle accent corner glow */}
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 opacity-15 dark:opacity-20 blur-[100px] rounded-full"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 7 cols: Copy */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
                <span className="text-accent font-semibold">05</span>
                <span aria-hidden="true">/</span>
                <span>Collaboration</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 text-balance">
                Have a project or platform you need engineered right?
              </h2>

              <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl mb-8">
                Currently taking on select web application builds, custom Shopify themes, and full-stack contracts for Q4 2026 and 2027.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="px-6 py-3.5 text-xs font-semibold text-accent-fg bg-accent hover:opacity-90 rounded-md transition-all duration-200 flex items-center gap-2 shadow-md active:scale-95 uppercase tracking-wide"
                >
                  <span>Open Project Scope Builder</span>
                  <ArrowUpRight size={14} />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="px-4 py-3.5 text-xs font-medium text-zinc-800 dark:text-white bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.09] border border-black/10 dark:border-white/10 rounded-md transition-all duration-200"
                  >
                    Direct Email
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-3.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.09] border border-black/10 dark:border-white/10 rounded-md transition-all duration-200"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Verified channels */}
            <div className="lg:col-span-5 bg-zinc-50 dark:bg-[#141520] border border-black/[0.08] dark:border-white/[0.08] rounded-xl p-6 space-y-4">
              <h3 className="font-display text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                Direct Contacts & Profiles
              </h3>

              <div className="space-y-3 text-xs">
                {/* Email line */}
                <div className="flex items-center justify-between p-2.5 rounded bg-white dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.05]">
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">Primary:</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-zinc-900 dark:text-white hover:text-accent font-mono transition-colors font-medium"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                {/* Secondary email line */}
                <div className="flex items-center justify-between p-2.5 rounded bg-white dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.05]">
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">Direct:</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.secondaryEmail}`}
                    className="text-zinc-900 dark:text-white hover:text-accent font-mono transition-colors font-medium"
                  >
                    {PERSONAL_INFO.secondaryEmail}
                  </a>
                </div>

                {/* GitHub */}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-white dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.05] hover:border-black/20 dark:hover:border-white/20 transition-colors text-zinc-900 dark:text-white group"
                >
                  <div className="flex items-center gap-2">
                    <Github size={14} />
                    <span className="font-mono">github.com/punisher08</span>
                  </div>
                  <ArrowUpRight size={13} className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-white dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.05] hover:border-black/20 dark:hover:border-white/20 transition-colors text-zinc-900 dark:text-white group"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin size={14} className="text-blue-500" />
                    <span className="font-mono">Jhomel Ignacio LinkedIn</span>
                  </div>
                  <ArrowUpRight size={13} className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
