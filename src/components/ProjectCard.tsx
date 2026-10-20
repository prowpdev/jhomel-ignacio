import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Code2 } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  variant?: 'standard' | 'spotlight' | 'compact';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  variant = 'standard',
}) => {
  const [imgSrc, setImgSrc] = useState(project.image);
  const [imgFailed, setImgFailed] = useState(false);

  const handleImageError = () => {
    if (imgSrc === project.image && project.fallbackImage) {
      setImgSrc(project.fallbackImage);
    } else {
      setImgFailed(true);
    }
  };

  if (variant === 'compact') {
    return (
      <article
        onClick={() => onSelect(project)}
        className="group relative cursor-pointer bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/[0.08] hover:border-black/25 dark:hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl flex flex-col sm:flex-row items-stretch flex-1"
      >
        {/* Compact image side */}
        <div className="relative w-full sm:w-44 md:w-48 bg-zinc-100 dark:bg-[#161722] shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-black/[0.06] dark:border-white/[0.06] aspect-[16/10] sm:aspect-auto">
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt={project.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              loading="lazy"
              className="w-full h-full object-cover object-top opacity-95 dark:opacity-90 transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-[#12131C]">
              <Code2 size={20} className="text-zinc-400" />
            </div>
          )}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
            {project.category}
          </div>
        </div>

        {/* Compact content side */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mb-1.5">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year || '2024'}</span>
            </div>

            <h3 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-accent transition-colors flex items-center justify-between gap-2">
              <span className="line-clamp-1">{project.title}</span>
              <ArrowUpRight
                size={15}
                className="text-zinc-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
              />
            </h3>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="pt-3 mt-2 border-t border-black/[0.06] dark:border-white/[0.04] flex items-center justify-between text-xs">
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-black/[0.04] dark:bg-white/[0.03] px-1.5 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="Open live URL"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'spotlight') {
    return (
      <article
        onClick={() => onSelect(project)}
        className="group relative cursor-pointer bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/[0.08] hover:border-black/25 dark:hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl flex flex-col justify-between h-full"
      >
        <div>
          {/* Spotlight banner */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-[#161722] border-b border-black/[0.06] dark:border-white/[0.06]">
            {!imgFailed ? (
              <img
                src={imgSrc}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                loading="lazy"
                className="w-full h-full object-cover object-top opacity-95 dark:opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-100 dark:bg-[#12131C]">
                <Code2 size={32} className="text-zinc-400 mb-2" />
                <p className="font-display text-base font-semibold text-zinc-900 dark:text-white">
                  {project.title}
                </p>
              </div>
            )}

            {/* Hover overlay button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
              <span className="px-5 py-2.5 text-xs font-semibold text-accent-fg bg-accent rounded-md shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 uppercase tracking-wide">
                Inspect Architecture & Specs
              </span>
            </div>

            <div className="absolute top-3 left-3 px-3 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Flagship Delivery · {project.category}</span>
            </div>
          </div>

          {/* Spotlight body */}
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-2">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year || '2025'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-accent font-semibold">Featured Production</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-accent transition-colors flex items-center justify-between gap-3">
              <span>{project.title}</span>
              <ArrowUpRight
                size={20}
                className="text-zinc-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
              />
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Tech Stack Row */}
        <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-black/[0.06] dark:border-white/[0.04] flex items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 bg-black/[0.04] dark:bg-white/[0.04] px-2.5 py-0.5 rounded border border-black/[0.05] dark:border-white/[0.06]"
              >
                {t}
              </span>
            ))}
          </div>

          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
              title="Open live URL"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </article>
    );
  }

  // Standard Card for the 3-column grid
  return (
    <article
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer bg-white dark:bg-[#0F1017] border border-black/10 dark:border-white/[0.08] hover:border-black/25 dark:hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-2xl flex flex-col justify-between h-full"
    >
      <div>
        {/* Visual Media Container with 16:10 ratio */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-[#161722] border-b border-black/[0.06] dark:border-white/[0.06]">
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt={project.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              loading="lazy"
              className="w-full h-full object-cover object-top opacity-95 dark:opacity-90 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-[#12131C] dark:to-[#0A0B10]">
              <Code2 size={28} className="text-zinc-400 dark:text-zinc-500 mb-2" />
              <p className="font-display text-sm font-semibold text-zinc-900 dark:text-white">
                {project.title}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                {project.category}
              </p>
            </div>
          )}

          {/* Quick interactive hover reveal action */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
            <span className="px-4 py-2 text-xs font-semibold text-accent-fg bg-accent rounded-md shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
              View Case Study & Specs
            </span>
          </div>

          {/* Unboxed category label at top-left */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white">
            {project.category}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-2.5">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year || '2024'}</span>
            {project.featured && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-accent font-semibold">Featured Work</span>
              </>
            )}
          </div>

          {/* Card Title */}
          <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-accent transition-colors flex items-center justify-between gap-2">
            <span>{project.title}</span>
            <ArrowUpRight
              size={16}
              className="text-zinc-400 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
            />
          </h3>

          {/* Short Description */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Tech Stack Unboxed Row at Bottom */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-black/[0.06] dark:border-white/[0.04] flex items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
          {project.tech.slice(0, 3).map((t, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-black/[0.04] dark:bg-white/[0.03] px-2 py-0.5 rounded border border-black/[0.05] dark:border-white/[0.05]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {project.link && project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
            title="Open live site directly"
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </article>
  );
};
