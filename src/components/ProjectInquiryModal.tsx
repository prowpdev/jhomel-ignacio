import React, { useState, useEffect } from 'react';
import { X, Send, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  'Shopify Plus / Custom Storefront',
  'Custom Laravel / Full-Stack Web Application',
  'Technical SEO & Schema Optimization',
  'Google Analytics 4 & Conversion Tracking',
  'Headless WordPress / Corporate Portal',
  'Custom WordPress Plugin / API Integration',
  'AI Integration / OpenAI Automation',
];

const TIMELINES = [
  'Immediate Kick-off (Ready Now)',
  'Within 2-4 Weeks',
  '1-2 Months Out',
  'Flexible / Planning Phase',
];

const ENGAGEMENT_SCOPES = [
  'Full End-to-End Build & Launch',
  'Architecture & Code Migration',
  'Feature Sprint & API Integration',
  'Technical SEO & GA4 Setup',
  'Ongoing Technical Freelance Support',
];

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[0]);
  const [selectedScope, setSelectedScope] = useState(ENGAGEMENT_SCOPES[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const briefText = `FREELANCE PROJECT INQUIRY FOR JHOMEL IGNACIO
------------------------------------------
Client / Contact: ${name || 'Prospective Client'}
Email: ${email || 'Not specified'}
Project Scope: ${selectedType}
Target Timeline: ${selectedTimeline}
Engagement Model: ${selectedScope}

Project Overview & Specifications:
${notes || 'Ready to discuss requirements, technical architecture, and milestones.'}
------------------------------------------
Submitted via jhomelignacio.portfolio builder`;

  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${selectedType} (${name || 'New Client'})`
  )}&body=${encodeURIComponent(briefText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#0F1017]/95 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] px-6 py-4 flex items-center justify-between z-20">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
              Project Scoping Engine
            </span>
            <h2 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
              Initiate Project Quotation & Scope
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2.5">
              1. What service or platform are you looking to build?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`p-2.5 text-xs text-left rounded-lg border transition-all ${
                    selectedType === type
                      ? 'bg-accent/15 border-accent text-zinc-900 dark:text-white font-medium'
                      : 'bg-zinc-50 dark:bg-[#151622] border-black/[0.06] dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-black/15 dark:hover:border-white/15'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Timeline & Engagement Model Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                2. Target Timeline
              </label>
              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#151622] border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-accent"
              >
                {TIMELINES.map((t) => (
                  <option key={t} value={t} className="bg-white dark:bg-[#0F1017] text-zinc-900 dark:text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                3. Engagement Scope
              </label>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#151622] border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-accent"
              >
                {ENGAGEMENT_SCOPES.map((b) => (
                  <option key={b} value={b} className="bg-white dark:bg-[#0F1017] text-zinc-900 dark:text-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Your Name / Company
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#151622] border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#151622] border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Step 4: Notes */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Project Goals, SEO/Analytics & Features
            </label>
            <textarea
              rows={3}
              placeholder="Tell me briefly about what you want to achieve, SEO/Analytics requirements, or existing stack..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#151622] border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-accent" />
                  <span className="text-accent">Scope Brief Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Formatted Brief</span>
                </>
              )}
            </button>

            <a
              href={mailtoUrl}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-accent-fg bg-accent hover:opacity-90 rounded-lg transition-all flex items-center justify-center gap-2 shadow"
            >
              <span>Send Quotation Request</span>
              <Send size={13} />
            </a>
          </div>

          <p className="text-center text-[11px] text-zinc-500 font-mono">
            Direct dispatch to {PERSONAL_INFO.email} · Guaranteed response within 24 hours
          </p>

        </div>

      </div>
    </div>
  );
};
