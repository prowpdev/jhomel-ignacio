import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowDown, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  Globe, 
  Compass, 
  FileText, 
  Activity, 
  Boxes, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Layers, 
  Zap,
  CheckCircle2,
  MousePointerClick
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onNavigate?: (page: 'portfolio' | 'cv' | 'brochure') => void;
  onOpenInquiry?: () => void;
}

// Curated flagship project slides for the 3D card carousel
interface ProjectSlide {
  id: string;
  title: string;
  client: string;
  category: string;
  badge: string;
  metrics: string;
  image: string;
  fallbackImage: string;
  url: string;
  description: string;
  tech: string[];
  role: string;
}

const PROJECT_SLIDES: ProjectSlide[] = [
  {
    id: 'max-brenner',
    title: 'Max Brenner Australia',
    client: 'Online Marketing Gurus (OMG)',
    category: 'Shopify Storefront',
    badge: 'Flagship Shopify',
    metrics: '99/100 Speed · Custom Theme',
    image: '/assets/portfolio/maxbrenner.jpg',
    fallbackImage: 'https://punisher08.github.io/vuejs/assets/images/portfolio/maxbrenner.jpg',
    url: 'https://max-brenner-cafe.myshopify.com/',
    description:
      'Fully customized Shopify store for Max Brenner Australia chocolate bar restaurant. Built from scratch with a custom brand theme, custom sections, Metaobjects for location directories, and dynamic Metafields.',
    tech: ['Shopify Liquid', 'Metaobjects', 'Metafields', 'Custom Theme'],
    role: 'Shopify Developer',
  },
  {
    id: 'bedsrus',
    title: 'Beds R Us Australia',
    client: 'Online Marketing Gurus (OMG)',
    category: 'WordPress Architecture',
    badge: 'Custom WP Architecture',
    metrics: '0.8s LCP · 100% Blocks',
    image: '/assets/portfolio/bedsrus.jpg',
    fallbackImage: 'https://punisher08.github.io/vuejs/assets/images/portfolio/bedsrus.jpg',
    url: 'https://bedsrus.com.au/',
    description:
      'Custom WordPress templates tailored to exact brand guidelines. Utilized ACF Pro dynamic fields for seamless product details, promotional hero banners, and modular page content.',
    tech: ['WordPress', 'ACF Pro', 'Custom Blocks', 'WooCommerce'],
    role: 'WordPress Developer',
  },
  {
    id: 'wcp',
    title: 'WordPress Comparison Plugin (WCP)',
    client: 'Netseek Pty Ltd.',
    category: 'Commercial AI Plugin',
    badge: 'Commercial Plugin & AI',
    metrics: 'OpenAI GPT-3 · Aggregator',
    image: '/assets/portfolio/wpcomparison.png',
    fallbackImage: 'https://punisher08.github.io/vuejs/assets/images/portfolio/wpcomparison.png',
    url: 'https://dev.wordpresscomparisonplugin.com/',
    description:
      'Lead full-stack developer of a major commercial aggregator plugin. Collects and compares content across disparate sources with automated unique content generation via OpenAI GPT-3 models.',
    tech: ['PHP (OOP)', 'OpenAI API', 'REST API', 'Data Aggregator'],
    role: 'Lead Plugin Developer',
  },
  {
    id: 'instant-brands',
    title: 'Instant Brands Australia',
    client: 'Online Marketing Gurus (OMG)',
    category: 'Shopify Plus Storefront',
    badge: 'Enterprise eCommerce',
    metrics: 'Corelle, Pyrex, Instant Pot',
    image: '/assets/portfolio/instantbrand.jpg',
    fallbackImage: 'https://punisher08.github.io/vuejs/assets/images/portfolio/instantbrand.jpg',
    url: 'https://instantbrands.com.au/',
    description:
      'Fully customized Shopify theme for multinational kitchenware powerhouse. Integrated Metafields to power dynamic product specifications and high-converting collection page layouts.',
    tech: ['Shopify Plus', 'Liquid', 'Metafields', 'Custom UI'],
    role: 'Shopify Developer',
  },
  {
    id: 'reality-events',
    title: 'Reality Events Australia',
    client: 'Online Marketing Gurus (OMG)',
    category: 'WooCommerce + Rental',
    badge: 'Booking & Rental Engine',
    metrics: 'Booqable Sync · Hire Products',
    image: '/assets/portfolio/realityevents.png',
    fallbackImage: 'https://punisher08.github.io/vuejs/assets/images/portfolio/pinoybuilders.png',
    url: 'https://realityevents.com.au/',
    description:
      'A bespoke WordPress WooCommerce platform with bookable equipment hire. Integrated Booqable rental software, customized product variations, and converted Figma designs into responsive templates.',
    tech: ['WooCommerce', 'Booqable Software', 'Figma to WP', 'Add-ons'],
    role: 'WordPress Developer',
  },
  {
    id: 'pinoy-builders',
    title: 'Pinoy Builders',
    client: 'iFormat Logic IT Solutions',
    category: 'Knowledge Hub',
    badge: 'Figma to Elementor',
    metrics: 'Mailchimp CRM · Lead Gen',
    image: '/assets/portfolio/pinoybuilders.png',
    fallbackImage: 'https://punisher08.github.io/vuejs/assets/images/portfolio/pinoybuilders.png',
    url: 'https://www.pinoybuilders.ph/',
    description:
      'Online construction knowledge hub for design-build experts. Converted Figma designs into WordPress pages and templates using Elementor, integrated Mailchimp CRM for lead generation, and optimized SEO meta elements.',
    tech: ['WordPress', 'Elementor', 'Mailchimp CRM', 'SEO Meta'],
    role: 'Full Stack Web Developer',
  },
  {
    id: 'nappy-co',
    title: 'The Nappy Co',
    client: 'Direct Enterprise Client',
    category: 'Laravel Web App',
    badge: 'Full-Stack Application',
    metrics: 'Custom DB · Subscriptions',
    image: '/assets/portfolio/nappy.jpg',
    fallbackImage: 'https://punisher08.github.io/vuejs/assets/images/portfolio/nappy.jpg',
    url: 'https://nappy.co/',
    description:
      'Full-scale custom Laravel web application with modular database architecture, subscription management, tailored backend reporting, and reactive Vue.js client dashboards.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Tailwind CSS'],
    role: 'Backend Architect',
  },
];

const ROTATING_TITLES = [
  'WordPress Theme & Custom Block Architect',
  'Shopify Liquid & Metaobjects Engineer',
  'Full-Stack Developer (PHP, Laravel & Vue/React)',
  'Commercial Plugin Lead (OpenAI GPT-3)',
  'Performance & Core Web Vitals Specialist (<1s LCP)',
];

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenInquiry }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentTitleIdx, setCurrentTitleIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = PROJECT_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay interval
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const timer = setInterval(() => {
      goToNext();
    }, 4600);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, goToNext]);

  // Rotate hero titles with smooth fade
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitleIdx((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 3800);
    return () => clearInterval(titleInterval);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  // Out-of-this-world constellation particle background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check dark mode
      const isDark = document.documentElement.classList.contains('dark');
      const baseColor = isDark ? '206, 255, 0' : '34, 197, 94'; // Dynamic accent

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Subtle pulse
        p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.1) * 0.005;
        p.alpha = Math.max(0.15, Math.min(0.7, p.alpha));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${p.alpha})`;
        ctx.fill();

        // Connect particles within proximity
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 115) * (isDark ? 0.14 : 0.08);
            ctx.strokeStyle = `rgba(${baseColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor if within interactive range
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          const mLineAlpha = (1 - mdist / 140) * (isDark ? 0.35 : 0.25);
          ctx.strokeStyle = `rgba(${baseColor}, ${mLineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Gentle pull toward cursor
          p.x -= (mdx / mdist) * 0.25;
          p.y -= (mdy / mdist) * 0.25;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Helper to calculate circular relative index difference (-3 to +3)
  const getSlideDiff = (index: number, current: number, total: number) => {
    let diff = index - current;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;
    return diff;
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 md:pt-36 md:pb-28 border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#08080B] flex flex-col justify-center">
      
      {/* 1. Out-of-this-world Animated Constellation Canvas Background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0 w-full h-full opacity-70 dark:opacity-90 z-0"
        aria-hidden="true"
      />

      {/* 2. Layered SVG Cosmic Circuit Grid & Radial Coordinates */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Orbital technical rings top-right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] md:w-[750px] md:h-[750px] rounded-full border border-black/[0.05] dark:border-white/[0.05] animate-spin-slow">
          <div className="absolute top-1/2 left-0 w-3 h-3 rounded-full bg-accent/80 blur-[2px] shadow-[0_0_12px_var(--accent)]" />
        </div>
        <div className="absolute -top-20 -right-20 w-[480px] h-[480px] md:w-[580px] md:h-[580px] rounded-full border border-dashed border-black/[0.06] dark:border-white/[0.08] animate-spin-reverse-slow" />
        
        {/* Ambient neon nebula glow */}
        <div 
          className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[140px] opacity-15 dark:opacity-25 animate-pulse-glow"
          style={{ background: 'var(--accent)' }}
        />

        {/* Futuristic SVG Circuit Lines with flowing electrical dashes */}
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cyberCircuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 0 120 Q 250 120 400 240 T 800 240 L 1440 240"
            fill="none"
            stroke="url(#cyberCircuitGrad)"
            strokeWidth="1.2"
            className="animate-circuit-dash"
          />
          <path
            d="M 1440 480 Q 1100 480 900 620 T 400 620 L 0 620"
            fill="none"
            stroke="url(#cyberCircuitGrad)"
            strokeWidth="1"
            className="animate-circuit-dash"
          />
        </svg>

        {/* Technical HUD Crosshairs & Micro-Coordinates */}
        <div className="absolute top-36 left-8 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 hidden xl:flex flex-col gap-1 select-none">
          <span className="flex items-center gap-1.5 text-accent/70">
            <Compass size={11} className="animate-spin-slow" />
            <span>LAT: 15.4828° N · LON: 120.5979° E</span>
          </span>
          <span>DEV_NODE: TARLAC_CITY_PH</span>
          <span>SYS_STATUS: PRODUCTION_READY</span>
        </div>
      </div>

      {/* 3. Main Hero Content Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Personal Engineer Identity & Manifesto (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Availability Radar Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] backdrop-blur-md mb-6 self-start shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">
                Available for Senior Web & eCommerce Contracts
              </span>
              <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                Tarlac City · Remote Global
              </span>
            </div>

            {/* Engineer Identity & Title */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                <span>Engineer Portfolio</span>
                <span aria-hidden="true">/</span>
                <span>Craft & Code</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08] text-balance">
                Hi, I&apos;m{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-white">
                  Jhomel Ignacio
                </span>
                <span className="text-accent">.</span>
              </h1>
            </div>

            {/* Kinetic Dynamic Role Cycler */}
            <div className="h-10 sm:h-12 flex items-center mb-6 overflow-hidden">
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-accent/10 border border-accent/25 text-accent font-mono text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(206,255,0,0.08)]">
                <Sparkles size={14} className="shrink-0 animate-spin-slow" />
                <span className="transition-all duration-300">
                  {ROTATING_TITLES[currentTitleIdx]}
                </span>
              </div>
            </div>

            {/* Manifesto / Portfolio Bio */}
            <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl mb-8">
              I architect high-performance websites and bespoke digital storefronts from scratch. Specializing in <span className="font-semibold text-zinc-900 dark:text-white">WordPress custom Gutenberg blocks & themes</span> (with minimal plugin reliance), <span className="font-semibold text-zinc-900 dark:text-white">Shopify Liquid with Metaobjects</span>, and <span className="font-semibold text-zinc-900 dark:text-white">commercial plugins with OpenAI APIs</span>.
            </p>

            {/* Verified Developer Impact Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 px-5 rounded-2xl bg-zinc-50/80 dark:bg-[#0F1017]/80 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md mb-8">
              <div>
                <div className="font-display text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  35<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
                  Production Sites
                </div>
              </div>

              <div>
                <div className="font-display text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  5<span className="text-accent">+</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
                  Years Crafting
                </div>
              </div>

              <div>
                <div className="font-display text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  &lt;1.0<span className="text-accent">s</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
                  Core Web Vitals
                </div>
              </div>

              <div>
                <div className="font-display text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  100<span className="text-accent">%</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
                  Custom Blocks
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-7">
              <a
                href="#works"
                className="px-6 py-3.5 text-xs font-semibold text-accent-fg bg-accent hover:opacity-90 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-accent/20 active:scale-95 uppercase tracking-wide"
              >
                <span>Explore Selected Works</span>
                <ArrowDown size={14} className="animate-bounce" />
              </a>

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('cv')}
                  className="px-5 py-3.5 text-xs font-semibold text-zinc-800 dark:text-white bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/10 dark:border-white/10 rounded-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  <FileText size={14} className="text-accent" />
                  <span>View Verified CV</span>
                </button>
              )}

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 rounded-lg transition-all"
                title="GitHub @punisher08"
              >
                <Code2 size={16} />
              </a>
            </div>

            {/* Core Tech Stack Micro Badges */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-zinc-400 dark:text-zinc-500 text-[11px] mr-1 uppercase">Stack:</span>
              {['WordPress & ACF Pro', 'Shopify Liquid', 'Metaobjects', 'PHP / Laravel', 'OpenAI API', 'Tailwind CSS'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 border border-black/[0.05] dark:border-white/[0.05] text-[11px] hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Project Card Slider with Prev, Active & Next Deck (6 cols) */}
          <div 
            className="lg:col-span-6 relative flex flex-col items-center justify-center pt-4 select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Ambient Background Backlight Glow */}
            <div 
              className="absolute w-[360px] h-[360px] rounded-full opacity-25 dark:opacity-35 blur-[120px] -z-10 animate-pulse-glow pointer-events-none"
              style={{ background: 'var(--accent)' }}
              aria-hidden="true"
            />

            {/* Floating Live Badge Top Left */}
            <div className="absolute -top-4 left-4 z-40 px-3 py-1 rounded-full bg-white/90 dark:bg-[#12131D]/90 border border-black/10 dark:border-white/15 shadow-lg backdrop-blur-md flex items-center gap-2 text-[11px] font-mono animate-float-slow">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-zinc-900 dark:text-white">Featured Production Works</span>
              <span className="text-zinc-400">·</span>
              <span className="text-accent font-semibold">Live Client Deployments</span>
            </div>

            {/* 3D Carousel Stage */}
            <div className="relative w-full h-[470px] sm:h-[490px] flex items-center justify-center overflow-visible">
              
              {PROJECT_SLIDES.map((slide, idx) => {
                const diff = getSlideDiff(idx, currentSlide, totalSlides);
                const isActive = diff === 0;
                const isPrev = diff === -1;
                const isNext = diff === 1;

                // Only render active, prev, and next slides for optimal performance and crisp 3D depth
                if (Math.abs(diff) > 1) {
                  return (
                    <div
                      key={slide.id}
                      className="absolute w-[300px] sm:w-[360px] opacity-0 pointer-events-none transition-all duration-500 ease-out"
                      style={{
                        transform: `translateX(${diff > 0 ? '80%' : '-80%'}) scale(0.7)`,
                        zIndex: 0,
                      }}
                      aria-hidden="true"
                    />
                  );
                }

                return (
                  <div
                    key={slide.id}
                    onClick={() => {
                      if (isPrev) goToPrev();
                      if (isNext) goToNext();
                    }}
                    className={`absolute w-[300px] sm:w-[365px] md:w-[385px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl ${
                      isActive
                        ? 'z-30 cursor-default scale-100 sm:scale-[1.03] opacity-100 shadow-2xl shadow-accent/20 ring-1 ring-accent/40'
                        : isPrev
                        ? 'z-20 cursor-pointer -translate-x-[52%] sm:-translate-x-[48%] scale-[0.88] opacity-45 hover:opacity-75 blur-[0.4px] shadow-lg hover:scale-[0.90]'
                        : 'z-20 cursor-pointer translate-x-[52%] sm:translate-x-[48%] scale-[0.88] opacity-45 hover:opacity-75 blur-[0.4px] shadow-lg hover:scale-[0.90]'
                    }`}
                    style={{
                      transformOrigin: 'center center',
                    }}
                  >
                    {/* Card Container */}
                    <div className="bg-white/95 dark:bg-[#0E0F17]/95 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col justify-between h-[450px] sm:h-[465px]">
                      
                      {/* 1. Preview Header & Image */}
                      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-900 group">
                        
                        {/* Project Preview Image */}
                        <img
                          src={slide.image}
                          alt={slide.title}
                          onError={(e) => {
                            // Fallback to online image if local asset path is missing
                            const target = e.currentTarget;
                            if (target.src !== slide.fallbackImage) {
                              target.src = slide.fallbackImage;
                            }
                          }}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Scrim Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
                            {slide.category}
                          </span>

                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-accent text-accent-fg font-bold shadow-xs">
                            {slide.badge}
                          </span>
                        </div>

                        {/* Bottom Image Overlay: Title & Verified Metric */}
                        <div className="absolute bottom-3 inset-x-3 z-10 flex items-end justify-between gap-2">
                          <div>
                            <h3 className="font-display text-lg sm:text-xl font-bold text-white drop-shadow-md leading-tight line-clamp-1">
                              {slide.title}
                            </h3>
                            <p className="text-[11px] font-mono text-zinc-300 drop-shadow-xs flex items-center gap-1.5 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              <span>{slide.client}</span>
                            </p>
                          </div>

                          {slide.url && (
                            <a
                              href={slide.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg bg-white/20 hover:bg-accent text-white hover:text-accent-fg transition-all backdrop-blur-md shrink-0 shadow-sm"
                              title="Visit live site"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>

                        {/* Interactive Hint on inactive slides */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <span className="px-3 py-1 rounded-full bg-accent text-accent-fg text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md">
                              <MousePointerClick size={13} />
                              <span>Click to View</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 2. Card Content Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Performance Metric Pill */}
                          <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-[#151622] border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between text-xs font-mono mb-3">
                            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                              <Activity size={13} className="text-accent shrink-0" />
                              <span className="text-[11px] font-semibold">{slide.metrics}</span>
                            </div>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          </div>

                          {/* Description */}
                          <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed mb-3">
                            {slide.description}
                          </p>

                          {/* Tech Stack Chips */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {slide.tech.map((t, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 border border-black/[0.04] dark:border-white/[0.04]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 3. Action Footer for Active Slide */}
                        <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                            Role: <span className="text-zinc-900 dark:text-white font-medium">{slide.role}</span>
                          </span>

                          {slide.url ? (
                            <a
                              href={slide.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-semibold font-mono text-accent hover:underline flex items-center gap-1"
                            >
                              <span>Open Live Site</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span className="text-[11px] font-mono text-accent">Production Verified</span>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* Carousel Navigation Bar & Slide Indicators */}
            <div className="mt-4 flex items-center justify-between w-full max-w-[380px] px-2 z-40">
              
              {/* Prev Button */}
              <button
                type="button"
                onClick={goToPrev}
                className="p-2.5 rounded-xl bg-white/80 dark:bg-[#12131D]/80 hover:bg-accent hover:text-accent-fg text-zinc-800 dark:text-white border border-black/10 dark:border-white/10 shadow-md backdrop-blur-md transition-all active:scale-95"
                title="Previous Project (Left Arrow)"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dots & Counter */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  {PROJECT_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentSlide
                          ? 'w-6 bg-accent shadow-[0_0_8px_var(--accent)]'
                          : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                      }`}
                      title={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  <span>0{currentSlide + 1} / 0{totalSlides}</span>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="hover:text-accent flex items-center gap-0.5"
                    title={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
                  >
                    {isAutoPlaying ? <Pause size={10} /> : <Play size={10} />}
                    <span>{isAutoPlaying ? 'Playing' : 'Paused'}</span>
                  </button>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={goToNext}
                className="p-2.5 rounded-xl bg-white/80 dark:bg-[#12131D]/80 hover:bg-accent hover:text-accent-fg text-zinc-800 dark:text-white border border-black/10 dark:border-white/10 shadow-md backdrop-blur-md transition-all active:scale-95"
                title="Next Project (Right Arrow)"
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
