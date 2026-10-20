import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/[0.08] dark:border-white/[0.08] bg-zinc-100 dark:bg-[#07070A] py-12 text-xs text-zinc-600 dark:text-zinc-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left: Copyright */}
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-xs bg-accent" />
            <p>
              © {new Date().getFullYear()} {PERSONAL_INFO.name} (
              <span className="font-mono text-zinc-700 dark:text-zinc-400">@{PERSONAL_INFO.handle}</span>). All rights reserved.
            </p>
          </div>

          {/* Center / Right: Social Links & Back to top */}
          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Send Email"
            >
              Email
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1.5 font-mono text-[11px]"
              aria-label="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
