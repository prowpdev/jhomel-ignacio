import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, Code, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#0F1017]/95 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year || '2024'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Visual Image Frame */}
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-[#161722]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = project.fallbackImage;
              }}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Title & External Link CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {project.title}
              </h2>
              {project.role && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1">
                  Deliverable Role: {project.role}
                </p>
              )}
            </div>

            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-accent-fg bg-accent hover:opacity-90 rounded-md transition-all whitespace-nowrap shrink-0 shadow uppercase tracking-wide"
              >
                <span>Visit Live Platform</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Narrative Overview */}
          <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Project Architecture & Commercial Scope
            </h3>
            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Stack Overview */}
          <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Technologies & Frameworks Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((techItem, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 rounded-md"
                >
                  {techItem}
                </span>
              ))}
            </div>
          </div>

          {/* Key Deliverables Highlights */}
          <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-700 dark:text-zinc-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
              <span>Full responsive adaptation across desktop, tablet, and mobile</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
              <span>Speed & Core Web Vitals optimization for maximum conversions</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
              <span>Tailored backend data integration and clean modular custom code</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
              <span>Semantic accessibility and search engine structured data</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-black/[0.08] dark:border-white/[0.08] px-6 py-4 bg-zinc-50 dark:bg-[#0A0B10] flex items-center justify-between text-xs text-zinc-500">
          <span className="font-mono">Engineered by Jhomel Ignacio</span>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Press ESC to close
          </button>
        </div>

      </div>
    </div>
  );
};
