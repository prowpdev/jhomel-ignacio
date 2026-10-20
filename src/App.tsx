import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { PhilosophySection } from './components/PhilosophySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('lime');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#08080B] text-zinc-900 dark:text-[#ECEEF2] selection:bg-accent selection:text-accent-fg relative transition-colors duration-200">
      {/* Top Bar Navigation */}
      <Navbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenInquiry={() => setInquiryModalOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* Split-Screen Hero with Freelancer Services Heading & Live Project Scope Estimator Form */}
        <Hero />

        {/* Selected Works & Case Studies (Bento Grid + Table Directory) */}
        <ProjectShowcase />

        {/* Technical Domains & Freelance Services */}
        <CapabilitiesSection />

        {/* Engineering Philosophy & Delivery Methodology */}
        <PhilosophySection />

        {/* Profile, Background & Verified Track Record */}
        <AboutSection />

        {/* Interactive Consultation / Contact Section */}
        <ContactSection onOpenInquiry={() => setInquiryModalOpen(true)} />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* Interactive Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
