import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, ListFilter, ExternalLink, ArrowUpRight, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';

type CategoryFilter = 'All' | 'E-commerce' | 'Web Application' | 'Website' | 'Plugin';
type ViewMode = 'grid' | 'table';

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: { label: string; value: CategoryFilter; count: number }[] = [
    { label: 'All Works', value: 'All', count: PROJECTS.length },
    {
      label: 'eCommerce & Shopify',
      value: 'E-commerce',
      count: PROJECTS.filter((p) => p.category === 'E-commerce').length,
    },
    {
      label: 'Web Applications',
      value: 'Web Application',
      count: PROJECTS.filter((p) => p.category === 'Web Application').length,
    },
    {
      label: 'WordPress & Portals',
      value: 'Website',
      count: PROJECTS.filter((p) => p.category === 'Website').length,
    },
    {
      label: 'Plugins & AI',
      value: 'Plugin',
      count: PROJECTS.filter((p) => p.category === 'Plugin').length,
    },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // When on "All" and no search query, split into Featured Bento (1 on left, 2 stacked on right) + remaining grid
  const isDefaultView = selectedCategory === 'All' && !searchQuery.trim();
  const spotlightProject = isDefaultView ? filteredProjects[1] || filteredProjects[0] : null; // Instant Brands Australia
  const stackedProject1 = isDefaultView ? filteredProjects[2] : null; // Nappy Co
  const stackedProject2 = isDefaultView ? filteredProjects[3] : null; // WordPress Comparison Engine
  const remainingProjects = isDefaultView
    ? filteredProjects.filter(
        (p) =>
          p.id !== spotlightProject?.id &&
          p.id !== stackedProject1?.id &&
          p.id !== stackedProject2?.id
      )
    : filteredProjects;

  return (
    <section id="works" className="py-24 border-b border-black/[0.08] dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="text-accent font-semibold">01</span>
              <span aria-hidden="true">/</span>
              <span>Freelance Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
              Verified Client Platforms & Case Studies
            </h2>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Browse through 31 production stores, SaaS applications, and custom plugins delivered for commercial brands across Australia, the US, and Asia.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="bg-white dark:bg-[#0D0E15] border border-black/10 dark:border-white/[0.08] rounded-xl p-3 sm:p-4 mb-10 space-y-4 shadow-sm dark:shadow-none">
          
          {/* Row 1: Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategory === cat.value
                      ? 'bg-accent text-accent-fg font-semibold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      selectedCategory === cat.value
                        ? 'bg-black/20 text-current'
                        : 'bg-black/[0.05] dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-[#151620] p-1 rounded-lg border border-black/[0.06] dark:border-white/[0.06]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm dark:shadow-none'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
                title="Grid visual view"
                aria-label="Grid visual view"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm dark:shadow-none'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
                title="Directory table view"
                aria-label="Directory table view"
              >
                <ListFilter size={15} />
              </button>
            </div>
          </div>

          {/* Row 2: Search input + Results summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.05]">
            <div className="relative w-full sm:w-80">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by tech (e.g. Shopify, Laravel, SEO, GA4)..."
                className="w-full bg-zinc-50 dark:bg-[#151622] border border-black/10 dark:border-white/10 rounded-md pl-9 pr-8 py-1.5 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-accent transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 self-end sm:self-center">
              Displaying <span className="text-zinc-900 dark:text-white font-semibold tabular-nums">{filteredProjects.length}</span> of{' '}
              <span className="tabular-nums">{PROJECTS.length}</span> projects
            </div>
          </div>
        </div>

        {/* Content Display: Grid or Table View */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#0D0E15]">
            <p className="font-display text-lg text-zinc-900 dark:text-white font-semibold">
              No matching projects found
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              Try searching with another keyword or reset your filter selection.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/15 text-zinc-900 dark:text-white rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="space-y-8">
            {/* Featured Bento Section: Column 1 (Left spotlight) + Column 2 (2 Rows of stacked cards) */}
            {isDefaultView && spotlightProject && stackedProject1 && stackedProject2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Column 1: Grand Featured Spotlight Card (7 cols) */}
                <div className="lg:col-span-7 flex flex-col">
                  <ProjectCard
                    project={spotlightProject}
                    onSelect={setActiveProject}
                    variant="spotlight"
                  />
                </div>

                {/* Column 2: Exactly 2 Rows stacked vertically to match left column height! (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  <div className="flex-1 flex flex-col">
                    <ProjectCard
                      project={stackedProject1}
                      onSelect={setActiveProject}
                      variant="compact"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <ProjectCard
                      project={stackedProject2}
                      onSelect={setActiveProject}
                      variant="compact"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Symmetrical 3-Column Grid for All Remaining Projects */}
            {remainingProjects.length > 0 && (
              <div>
                {isDefaultView && (
                  <div className="flex items-center gap-3 pt-4 pb-4 mb-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      All Production Projects & Implementations
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      ({remainingProjects.length} items)
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                  {remainingProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={setActiveProject}
                      variant="standard"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Technical Monograph Directory Table */
          <div className="overflow-x-auto border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#0D0E15] shadow-sm dark:shadow-none">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-[#14151F] text-zinc-500 dark:text-zinc-400 font-mono uppercase text-[11px] border-b border-black/[0.08] dark:border-white/[0.08]">
                <tr>
                  <th className="py-3.5 px-6 font-medium">Index</th>
                  <th className="py-3.5 px-6 font-medium">Project Name</th>
                  <th className="py-3.5 px-6 font-medium">Classification</th>
                  <th className="py-3.5 px-6 font-medium hidden md:table-cell">Technologies</th>
                  <th className="py-3.5 px-6 font-medium hidden sm:table-cell">Year</th>
                  <th className="py-3.5 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.05] text-zinc-700 dark:text-zinc-300">
                {filteredProjects.map((project, idx) => (
                  <tr
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-mono text-zinc-400 dark:text-zinc-500 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="py-4 px-6 font-medium text-zinc-900 dark:text-white group-hover:text-accent transition-colors">
                      <div className="flex items-center gap-2">
                        <span>{project.title}</span>
                        {project.featured && (
                          <span className="text-[10px] font-mono text-accent">★</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-zinc-500 dark:text-zinc-400">
                      {project.category}
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="font-mono text-[10px] text-zinc-600 dark:text-zinc-400 bg-black/[0.04] dark:bg-white/[0.04] px-1.5 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-zinc-500 hidden sm:table-cell">
                      {project.year || '2024'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProject(project);
                          }}
                          className="px-2.5 py-1 text-[11px] font-medium bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 text-zinc-900 dark:text-white rounded transition-colors"
                        >
                          Specs
                        </button>
                        {project.link && project.link !== '#' && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            title="Open live URL"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Lightbox / Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
