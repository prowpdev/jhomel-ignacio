import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { PhilosophySection } from './components/PhilosophySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVPage } from './components/CVPage';
import { BrochurePage } from './components/brochure/BrochurePage';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('lime');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState<'portfolio' | 'cv' | 'brochure'>('portfolio');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  useEffect(() => {
    // Check initial hash
    if (window.location.hash === '#cv') {
      setActivePage('cv');
    } else if (window.location.hash === '#brochure') {
      setActivePage('brochure');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#cv') {
        setActivePage('cv');
      } else if (window.location.hash === '#brochure') {
        setActivePage('brochure');
      } else if (window.location.hash === '#portfolio' || !window.location.hash) {
        setActivePage('portfolio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Apply theme data attribute to document element for global CSS variables
    if (currentTheme === 'lime') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    // Sync dark class on document element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigate = (page: 'portfolio' | 'cv' | 'brochure') => {
    setActivePage(page);
    if (page === 'cv') {
      window.location.hash = 'cv';
    } else if (page === 'brochure') {
      window.location.hash = 'brochure';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#08080B] text-zinc-900 dark:text-[#ECEEF2] selection:bg-accent selection:text-accent-fg relative transition-colors duration-200">
      {/* Top Bar Navigation */}
      <Navbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenInquiry={() => setInquiryModalOpen(true)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main>
        {activePage === 'cv' ? (
          /* Dedicated Curriculum Vitae Page */
          <CVPage
            onBackToPortfolio={() => handleNavigate('portfolio')}
            onOpenInquiry={() => setInquiryModalOpen(true)}
          />
        ) : activePage === 'brochure' ? (
          /* Dedicated Services Brochure Creator Page */
          <BrochurePage
            onBackToPortfolio={() => handleNavigate('portfolio')}
            onOpenInquiry={() => setInquiryModalOpen(true)}
          />
        ) : (
          /* Main Freelance Portfolio Views */
          <>
            {/* Split-Screen Hero with Freelancer Services Heading & Live Project Scope Estimator Form */}
            <Hero />

            {/* Selected Works & Case Studies (Bento Grid with 2 Rows on Col 2 + Table Directory) */}
            <ProjectShowcase />

            {/* Technical Domains & Freelance Services */}
            <CapabilitiesSection />

            {/* Engineering Philosophy & Delivery Methodology */}
            <PhilosophySection />

            {/* Profile, Background & Verified Track Record */}
            <AboutSection />

            {/* Interactive Consultation / Contact Section */}
            <ContactSection onOpenInquiry={() => setInquiryModalOpen(true)} />
          </>
        )}
      </main>

      {/* Quiet Footer */}
      <Footer
        onNavigateToCV={() => handleNavigate('cv')}
        onNavigateToBrochure={() => handleNavigate('brochure')}
      />

      {/* Interactive Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
