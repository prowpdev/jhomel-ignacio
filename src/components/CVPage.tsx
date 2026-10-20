import React, { useState } from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  UserCheck, 
  Code, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

interface CVPageProps {
  onBackToPortfolio: () => void;
  onOpenInquiry: () => void;
}

export const CVPage: React.FC<CVPageProps> = ({ onBackToPortfolio, onOpenInquiry }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const experienceHistory = [
    {
      role: 'Senior Full-Stack Developer & Solutions Architect',
      company: 'Independent Technical Consultant / Freelance',
      period: '2021 – Present',
      location: 'Remote (Clients across Australia, US, and Asia)',
      summary:
        'Deliver end-to-end web engineering, custom Shopify Plus themes, bespoke Laravel web applications, and automated integrations for high-growth direct-to-consumer brands and digital agencies.',
      achievements: [
        'Architected and delivered custom Shopify Plus storefronts for high-profile Australian retailers including Instant Brands (Corelle, Pyrex, Instant Pot) and Beds R Us Australia with sub-second page performance.',
        'Engineered full-stack Laravel enterprise platforms (e.g. Nappy Co, Supermpower) with tailored relational database schemas, queue processing, and reactive Vue.js client dashboards.',
        'Developed custom WordPress plugins integrating OpenAI API, Zapier webhooks, and Google Analytics 4 Data APIs for automated catalog comparisons and internal reporting.',
        'Implemented comprehensive Google Analytics 4 (GA4) with Google Tag Manager (GTM) enhanced eCommerce tracking, conversion funnels, and technical SEO schema architecture.',
        'Reduced Core Web Vitals Largest Contentful Paint (LCP) from 3.8s to <1.2s across 15+ client platforms via code splitting, asset optimization, and edge caching.',
      ],
      technologies: ['Shopify Plus', 'Liquid', 'Laravel', 'PHP', 'Vue.js', 'React', 'MySQL', 'GA4', 'Technical SEO', 'Docker'],
    },
    {
      role: 'Lead Web Developer & Systems Architect',
      company: 'Digital Agencies & Enterprise Contracts',
      period: '2018 – 2021',
      location: 'Manila, Philippines (Global Client Base)',
      summary:
        'Led front-end and full-stack development initiatives for over 25 commercial portals, eCommerce businesses, and corporate web platforms.',
      achievements: [
        'Supervised end-to-end theme development and CMS migrations for major regional clients including Norweld Australia, Active Air Solutions, and Rivergum Homes.',
        'Engineered custom REST API endpoints linking headless content management systems to external CRM pipelines and enterprise ERP inventory systems.',
        'Spearheaded modern responsive UI standards using modular CSS and vanilla JavaScript, eliminating heavy third-party plugin dependencies.',
        'Standardized Git workflows, code reviews, staging environments, and Cloudflare security deployments across development squads.',
      ],
      technologies: ['WordPress', 'PHP', 'WooCommerce', 'JavaScript', 'REST APIs', 'Cloudflare', 'Linux', 'Git'],
    },
    {
      role: 'Full-Stack Developer & Trainee Lead',
      company: 'Web Systems & Agency Trainee Program',
      period: '2016 – 2018',
      location: 'Philippines',
      summary:
        'Developed custom PHP/MySQL data-driven applications, created interactive web modules, and mentored emerging web developers.',
      achievements: [
        'Built full-stack CRUD applications using PHP, AJAX, and relational databases for corporate intranets and client reporting portals.',
        'Led technical workshops and created instructional materials covering Vue.js components, Vuetify Material Design, and Firebase realtime integrations.',
        'Authored and maintained multiple open-source repositories and utility libraries on GitHub (@punisher08).',
      ],
      technologies: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'Vue.js', 'HTML5/CSS3', 'Firebase'],
    },
  ];

  const featuredCVProjects = PROJECTS.filter((p) => p.featured).slice(0, 6);

  const references = [
    {
      name: 'Agency Technical Lead',
      relationship: 'Managing Partner & Technical Director',
      organization: 'Digital Performance & Growth Agency (Australia)',
      context: 'Collaborated on 10+ high-profile Australian client builds including Online Marketing Gurus and Norweld.',
      contactStatus: 'Contact details and letter of recommendation available on request.',
    },
    {
      name: 'eCommerce Operations Lead',
      relationship: 'Director of Digital Products',
      organization: 'Direct-to-Consumer Retail Group (Australia / Global)',
      context: 'Direct collaboration on Shopify Plus storefront architecture, custom theme sections, and checkout optimization.',
      contactStatus: 'Direct contact phone & email available upon request.',
    },
    {
      name: 'Software Engineering Manager',
      relationship: 'Senior Engineering Peer & Client Lead',
      organization: 'Web Systems & Enterprise Solutions (Manila / Remote)',
      context: 'Long-term peer collaboration on custom Laravel applications, RESTful microservices, and database migrations.',
      contactStatus: 'Verified LinkedIn recommendation available at linkedin.com/in/jhomel-ignacio-67b298203.',
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
            </div>

            {/* Contact Details Column */}
            <div className="space-y-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 self-start">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-zinc-400 shrink-0" />
                <span>Manila, Philippines (Available Globally / Remote)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-zinc-400 shrink-0" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-zinc-900 dark:text-white hover:text-accent font-medium underline"
                >
                  {PERSONAL_INFO.email}
                </a>
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
            Senior Full-Stack Engineer and Solutions Architect with over <span className="font-semibold text-zinc-900 dark:text-white">8+ years</span> of verified production experience architecting high-volume eCommerce platforms, custom Laravel web applications, bespoke WordPress portals, and automated data pipelines. Recognized for bridging high-scale backend logic with fluid, accessible frontends. Proven track record collaborating directly with founders, CTOs, and agencies across Australia, the United States, and Asia on 31+ production commercial launches.
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
                E-Commerce & CMS
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Shopify Plus, Liquid, Storefront API, Custom Checkout, WooCommerce, WordPress Architecture, Oxygen Builder, ACF Pro, Headless CMS.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                Backend & Databases
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                PHP (7/8), Laravel Framework, RESTful APIs, MySQL, PostgreSQL, Python, Django, Elixir/Phoenix, Queue Workers, Redis.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                Frontend & UI Engineering
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Vue.js (2/3), React, TypeScript, JavaScript (ES6+), Vite, Tailwind CSS v4, Motion, Responsive Mobile-First UX, Web Accessibility (WCAG).
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                SEO & Analytics
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Google Analytics 4 (GA4), Google Tag Manager (GTM), Technical SEO Audits, Schema.org JSON-LD, Core Web Vitals (LCP/CLS/INP), Looker Studio.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                AI & Workflow Automation
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                OpenAI API, Custom Comparison Engines, Prompt Engineering, Zapier Webhooks, GoHighLevel (GHL) CRM Pipelines & SMS/Email sequences.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <h3 className="font-mono text-xs uppercase text-accent font-semibold mb-2">
                DevOps & Infrastructure
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Linux Server Admin, Docker, Git/GitHub, Cloudflare CDN, DNS & SSL Routing, Nginx/Apache Tuning, Pantheon.io, CI/CD pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Professional Experience History */}
        <section className="mb-10 print:mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.06] pb-2 font-semibold">
            <span className="text-accent">03.</span> Professional Experience
          </h2>

          <div className="space-y-8">
            {experienceHistory.map((exp, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-accent/40">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {exp.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-accent mb-3">
                  <span>{exp.company}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-500 dark:text-zinc-400">{exp.location}</span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 italic">
                  {exp.summary}
                </p>

                <ul className="space-y-1.5 mb-4 text-xs text-zinc-700 dark:text-zinc-300 list-disc list-outside ml-4">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/[0.04] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400"
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
            {featuredCVProjects.map((p) => (
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
            <span className="text-accent">05.</span> Education & Continuous Learning
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <div>
                <h3 className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                  Bachelor of Science in Information Technology (BSIT)
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
                  Tertiary Degree in Software Engineering, Databases & Web Architecture · Philippines
                </p>
              </div>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-1 sm:mt-0">
                Graduated
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg bg-zinc-50 dark:bg-[#141520] border border-black/[0.06] dark:border-white/[0.06]">
              <div>
                <h3 className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                  Specialized Industry Training & Architecture Audits
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
                  Shopify Plus Theme Engineering · Advanced Laravel Domain Patterns · Google Analytics 4 (GA4) Analytics · Web Performance Audits
                </p>
              </div>
              <span className="font-mono text-xs text-accent font-semibold mt-1 sm:mt-0">
                Continuous Professional Development
              </span>
            </div>
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
          <span>Curriculum Vitae · Jhomel Ignacio (punisher08)</span>
          <span>Verified Online: jhomelignacio.portfolio</span>
        </footer>

      </article>

    </div>
  );
};
