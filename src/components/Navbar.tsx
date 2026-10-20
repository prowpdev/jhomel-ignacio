import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenInquiry: () => void;
  activePage: 'portfolio' | 'cv';
  onNavigate: (page: 'portfolio' | 'cv') => void;
}

const THEMES = [
  { id: 'lime', name: 'Acid Lime', color: '#CEFF00' },
  { id: 'tangerine', name: 'Solar Orange', color: '#FF5500' },
  { id: 'cyan', name: 'Cyan Ice', color: '#00F0FF' },
  { id: 'gold', name: 'Auric Gold', color: '#E6C687' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  isDarkMode,
  onToggleDarkMode,
  onOpenInquiry,
  activePage,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    if (activePage !== 'portfolio') {
      onNavigate('portfolio');
      // allow state to update then scroll
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#090A0F]/90 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.07] py-3.5 shadow-sm dark:shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-white whitespace-nowrap shrink-0 transition-transform duration-200 active:scale-98 text-left"
          >
            <span className="w-2.5 h-2.5 rounded-xs bg-accent transition-transform duration-300 group-hover:rotate-45" />
            <span className="tracking-wider uppercase text-[15px]">JHOMEL IGNACIO</span>
          </button>

          {/* Zone 2: Clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <button
              type="button"
              onClick={() => handleLinkClick('#works')}
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 dark:hover:text-white transition-colors py-1 text-[13px] tracking-wide uppercase"
            >
              Selected Works
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('#capabilities')}
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 dark:hover:text-white transition-colors py-1 text-[13px] tracking-wide uppercase"
            >
              Services & Stack
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('#methodology')}
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 dark:hover:text-white transition-colors py-1 text-[13px] tracking-wide uppercase"
            >
              Methodology
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('#about')}
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 dark:hover:text-white transition-colors py-1 text-[13px] tracking-wide uppercase"
            >
              About
            </button>

            {/* Dedicated CV / Resume Link */}
            <button
              type="button"
              onClick={() => onNavigate('cv')}
              className={`whitespace-nowrap shrink-0 py-1 text-[13px] tracking-wide uppercase font-semibold flex items-center gap-1.5 transition-colors ${
                activePage === 'cv'
                  ? 'text-accent border-b-2 border-accent'
                  : 'hover:text-zinc-900 dark:hover:text-white text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <FileText size={14} className={activePage === 'cv' ? 'text-accent' : ''} />
              <span>CV / Resume</span>
            </button>

            <button
              type="button"
              onClick={() => handleLinkClick('#contact')}
              className="whitespace-nowrap shrink-0 hover:text-zinc-900 dark:hover:text-white transition-colors py-1 text-[13px] tracking-wide uppercase"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Actions + Theme & Light/Dark Toggles */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 rounded-md transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Accent Palette Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/[0.08] rounded-md transition-colors"
                title="Change accent color palette"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      THEMES.find((t) => t.id === currentTheme)?.color || '#CEFF00',
                  }}
                />
                <span className="hidden sm:inline font-mono text-[11px]">Color</span>
              </button>

              {themeDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#12131A] border border-black/10 dark:border-white/10 rounded-lg shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setThemeDropdownOpen(false)}
                >
                  <p className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-black/[0.06] dark:border-white/[0.06] mb-1">
                    Theme Accent
                  </p>
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onThemeChange(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-colors text-left ${
                        currentTheme === t.id
                          ? 'bg-black/[0.06] dark:bg-white/10 text-zinc-900 dark:text-white font-medium'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: t.color }}
                        />
                        {t.name}
                      </span>
                      {currentTheme === t.id && (
                        <span className="text-[10px] text-accent font-mono">active</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-4 py-2 text-xs font-semibold text-accent-fg bg-accent hover:opacity-90 rounded-md transition-all duration-200 shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 group active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0D0E15] border-b border-black/10 dark:border-white/10 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick('#works');
              }}
              className="text-left text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors py-1"
            >
              Selected Works
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick('#capabilities');
              }}
              className="text-left text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors py-1"
            >
              Services & Stack
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick('#methodology');
              }}
              className="text-left text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors py-1"
            >
              Methodology
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick('#about');
              }}
              className="text-left text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors py-1"
            >
              About
            </button>
            
            {/* Mobile CV Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('cv');
              }}
              className="text-left text-base font-semibold text-accent transition-colors py-1 flex items-center gap-2"
            >
              <FileText size={16} />
              <span>View Full CV & References</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLinkClick('#contact');
              }}
              className="text-left text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors py-1"
            >
              Contact
            </button>
          </nav>

          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Appearance:</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleDarkMode}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 border border-black/10 dark:border-white/10 rounded-md"
              >
                {isDarkMode ? <Sun size={13} /> : <Moon size={13} />}
                <span>{isDarkMode ? 'Light' : 'Dark'}</span>
              </button>

              <div className="flex gap-1.5">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange(t.id)}
                    aria-label={t.name}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      currentTheme === t.id ? 'border-zinc-900 dark:border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: t.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
