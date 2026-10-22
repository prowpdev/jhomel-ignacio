import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Layers, 
  Zap, 
  Sparkles, 
  Globe, 
  CheckCircle2, 
  Copy, 
  Check, 
  Laptop, 
  Cpu, 
  Compass, 
  Flame,
  FileText,
  Activity,
  Boxes,
  Maximize2
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface HeroProps {
  onNavigate?: (page: 'portfolio' | 'cv' | 'brochure') => void;
  onOpenInquiry?: () => void;
}

// Interactive flagship items for the hero spotlight reel
const HERO_FLAGSHIP_WORKS = [
  {
    id: 'max-brenner',
    title: 'Max Brenner Australia',
    type: 'Shopify Storefront',
    url: 'https://max-brenner-cafe.myshopify.com/',
    metrics: '99/100 Speed · Custom Theme',
    tech: ['Shopify Liquid', 'Metaobjects', 'Metafields', 'Custom Theme'],
    description:
      'Fully customized Shopify store for Max Brenner Australia chocolate bar restaurant. Built from scratch with a custom brand theme, custom sections, Metaobjects for location directories, and dynamic Metafields.',
    badge: 'Flagship Shopify',
    codeSnippet: `{% comment %} Max Brenner Custom Location Metaobject Loop {% endcomment %}
{% for location in shop.metaobjects.store_location.values %}
  <div class="location-card" data-suburb="{{ location.suburb | escape }}">
    <h3 class="location-title">{{ location.store_name }}</h3>
    <p class="location-hours">{{ location.trading_hours }}</p>
    <a href="{{ location.booking_url }}" class="btn-choc-bar">Book Table</a>
  </div>
{% endfor %}`,
    codeLang: 'liquid',
    codeFile: 'sections/locations-metaobject.liquid'
  },
  {
    id: 'bedsrus',
    title: 'Bedsrus Australia',
    type: 'WordPress Platform',
    url: 'https://bedsrus.com.au/',
    metrics: '0.8s LCP · Zero Bloat',
    tech: ['WordPress', 'Custom Templates', 'ACF Pro', 'WP Blocks'],
    description:
      'Custom WordPress templates tailored to exact brand guidelines. Utilized ACF Pro dynamic fields for seamless product details, promotional hero banners, and modular page content.',
    badge: 'Custom WP Architecture',
    codeSnippet: `<?php
/**
 * Bedsrus Modular ACF Block Renderer
 */
$promo_badge = get_field('promo_badge_text');
$mattress_specs = get_field('mattress_comfort_layers');

if (!empty($mattress_specs)): ?>
  <div class="bedsrus-spec-matrix">
    <?php foreach ($mattress_specs as $spec): ?>
      <div class="spec-row">
        <span class="spec-label"><?php echo esc_html($spec['layer_name']); ?></span>
        <span class="spec-density"><?php echo esc_html($spec['density_rating']); ?></span>
      </div>
    <?php endforeach; ?>
  </div>
<?php endif; ?>`,
    codeLang: 'php',
    codeFile: 'template-parts/acf-mattress-specs.php'
  },
  {
    id: 'wcp',
    title: 'WordPress Comparison Plugin (WCP)',
    type: 'Commercial AI Plugin',
    url: 'https://dev.wordpresscomparisonplugin.com/',
    metrics: 'OpenAI GPT-3 · Aggregator',
    tech: ['PHP (OOP)', 'OpenAI API', 'REST API', 'Data Aggregator'],
    description:
      'Lead full-stack developer of a major commercial aggregator plugin. Collects and compares content across disparate sources with automated unique content generation via OpenAI GPT-3 models.',
    badge: 'Commercial Plugin & AI',
    codeSnippet: `<?php
/**
 * WCP OpenAI Content Generation Engine
 */
class WCP_AI_Engine {
  public static function synthesize_comparison($item_a, $item_b) {
    $prompt = "Generate a technical comparison matrix between " . $item_a . " and " . $item_b;
    $response = wp_remote_post('https://api.openai.com/v1/completions', [
      'headers' => ['Authorization' => 'Bearer ' . WCP_API_KEY],
      'body'    => json_encode(['model' => 'text-davinci-003', 'prompt' => $prompt, 'max_tokens' => 350])
    ]);
    return json_decode(wp_remote_retrieve_body($response), true);
  }
}`,
    codeLang: 'php',
    codeFile: 'includes/class-wcp-ai-engine.php'
  },
  {
    id: 'instant-brands',
    title: 'Instant Brands Australia',
    type: 'Shopify Plus Storefront',
    url: 'https://instantbrands.com.au/',
    metrics: 'Corelle, Pyrex, Instant Pot',
    tech: ['Shopify Theme', 'Metafields', 'Liquid', 'Custom UI'],
    description:
      'Fully customized Shopify theme for multinational kitchenware powerhouse. Integrated Metafields to power dynamic product specifications and high-converting collection page layouts.',
    badge: 'Enterprise eCommerce',
    codeSnippet: `{% comment %} Instant Brands Dynamic Recipe & Feature Drawer {% endcomment %}
<div class="product-features-drawer">
  {% if product.metafields.instant.pressure_programs %}
    <ul class="smart-programs-grid">
      {% for program in product.metafields.instant.pressure_programs.value %}
        <li class="program-tag"><span class="icon-steam"></span> {{ program }}</li>
      {% endfor %}
    </ul>
  {% endif %}
</div>`,
    codeLang: 'liquid',
    codeFile: 'snippets/product-smart-specs.liquid'
  },
  {
    id: 'reality-events',
    title: 'Reality Events Australia',
    type: 'WooCommerce + Rental',
    url: 'https://realityevents.com.au/',
    metrics: 'Booqable Sync · Bookable Products',
    tech: ['WooCommerce', 'Booqable Integration', 'Figma to WP', 'Add-ons'],
    description:
      'A bespoke WordPress WooCommerce platform with bookable equipment hire. Integrated Booqable rental software, customized product variations, and converted Figma designs into responsive templates.',
    badge: 'Booking & Rental Engine',
    codeSnippet: `<?php
/**
 * Booqable Equipment Rental Hook Integration
 */
add_action('woocommerce_before_add_to_cart_button', function() {
  global $product;
  $booqable_id = get_post_meta($product->get_id(), '_booqable_rental_id', true);
  if ($booqable_id) {
    echo '<div class="booqable-date-picker" data-product-sku="' . esc_attr($booqable_id) . '"></div>';
  }
});`,
    codeLang: 'php',
    codeFile: 'functions/booqable-integration.php'
  }
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
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'preview' | 'code' | 'architecture'>('preview');
  const [currentTitleIdx, setCurrentTitleIdx] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeWork = HERO_FLAGSHIP_WORKS[activeProjectIdx];

  // Rotate hero titles with smooth fade
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitleIdx((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 3800);
    return () => clearInterval(titleInterval);
  }, []);

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
      setMousePos({ x: mouseX, y: mouseY });
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
      const baseColor = isDark ? '206, 255, 0' : '34, 197, 94'; // Accent dynamic color

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeWork.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Personal Engineer Identity & Manifesto (6.5 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
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

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08] text-balance">
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
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mb-8">
              I architect high-performance websites and bespoke digital storefronts from scratch. Specializing in <span className="font-semibold text-zinc-900 dark:text-white">WordPress custom Gutenberg blocks & themes</span> (with minimal plugin reliance), <span className="font-semibold text-zinc-900 dark:text-white">Shopify Liquid with Metaobjects</span>, and <span className="font-semibold text-zinc-900 dark:text-white">commercial plugins with OpenAI APIs</span>.
            </p>

            {/* Verified Developer Impact Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 px-6 rounded-2xl bg-zinc-50/80 dark:bg-[#0F1017]/80 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md mb-8">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  35<span className="text-accent">+</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
                  Production Sites
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  8<span className="text-accent">+</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
                  Years Crafting
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  &lt;1.0<span className="text-accent">s</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
                  Core Web Vitals
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  100<span className="text-accent">%</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase mt-0.5">
                  Custom Blocks
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
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
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-zinc-400 dark:text-zinc-500 text-[11px] mr-1 uppercase">Stack:</span>
              {['WordPress & ACF Pro', 'Shopify Liquid', 'Metaobjects', 'PHP / Laravel', 'OpenAI API', 'Tailwind CSS'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 border border-black/[0.05] dark:border-white/[0.05] text-[11px] hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Out-of-this-world Interactive Developer Spotlight & Terminal Cockpit (5.5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Background Backlight */}
            <div 
              className="absolute -inset-1 rounded-3xl opacity-20 dark:opacity-30 blur-2xl -z-10 animate-pulse-glow"
              style={{ background: 'var(--accent)' }}
              aria-hidden="true"
            />

            {/* Floating Achievement Capsule Top Left */}
            <div className="absolute -top-5 -left-4 z-20 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#12131D]/95 border border-black/10 dark:border-white/15 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-mono animate-float-slow hidden sm:flex">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-zinc-900 dark:text-white">Sub-Second LCP</span>
              <span className="text-zinc-400">·</span>
              <span className="text-accent font-semibold">99/100 Core Web Vitals</span>
            </div>

            {/* Floating Achievement Capsule Bottom Right */}
            <div className="absolute -bottom-5 -right-3 z-20 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#12131D]/95 border border-black/10 dark:border-white/15 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-mono animate-float-reverse hidden sm:flex">
              <Boxes size={13} className="text-accent" />
              <span className="font-semibold text-zinc-900 dark:text-white">Minimal Plugins</span>
              <span className="text-zinc-400">·</span>
              <span className="text-zinc-500 dark:text-zinc-400">100% Custom Blocks</span>
            </div>

            {/* Main Interactive Glass Console Terminal */}
            <div className="bg-white/90 dark:bg-[#0E0F17]/90 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col">
              
              {/* Terminal Window Header Bar */}
              <div className="px-4 py-3 bg-zinc-100/80 dark:bg-[#151622]/80 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
                
                {/* Window Traffic Lights */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 ml-2 font-medium">
                    jhomel@portfolio:~/flagship
                  </span>
                </div>

                {/* Console Navigation Tabs */}
                <div className="flex items-center gap-1 bg-black/[0.04] dark:bg-black/40 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab('preview')}
                    className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-md transition-all ${
                      activeConsoleTab === 'preview'
                        ? 'bg-white dark:bg-[#1F202E] text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    Live Spotlight
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab('code')}
                    className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-md transition-all ${
                      activeConsoleTab === 'code'
                        ? 'bg-white dark:bg-[#1F202E] text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    Code Under The Hood
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab('architecture')}
                    className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-md transition-all ${
                      activeConsoleTab === 'architecture'
                        ? 'bg-white dark:bg-[#1F202E] text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    Architecture Radar
                  </button>
                </div>
              </div>

              {/* Console Body Tab 1: Live Project Spotlight */}
              {activeConsoleTab === 'preview' && (
                <div className="p-6 flex flex-col justify-between">
                  
                  {/* Project Selector Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none border-b border-black/[0.06] dark:border-white/[0.06]">
                    {HERO_FLAGSHIP_WORKS.map((work, idx) => (
                      <button
                        key={work.id}
                        type="button"
                        onClick={() => setActiveProjectIdx(idx)}
                        className={`px-2.5 py-1 text-[11px] font-mono whitespace-nowrap rounded-md transition-all ${
                          activeProjectIdx === idx
                            ? 'bg-accent text-accent-fg font-semibold shadow-xs'
                            : 'bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        {work.title.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Active Project Highlight Card */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-accent/15 text-accent font-semibold border border-accent/25">
                            {activeWork.badge}
                          </span>
                          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            {activeWork.type}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                          {activeWork.title}
                        </h3>
                      </div>

                      {activeWork.url && (
                        <a
                          href={activeWork.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-accent hover:text-accent-fg text-zinc-800 dark:text-white text-xs font-mono flex items-center gap-1.5 transition-all group shrink-0"
                          title="Open live website"
                        >
                          <span>Live Site</span>
                          <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {activeWork.description}
                    </p>

                    {/* Live Metrics Line */}
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#151622] border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-accent" />
                        <span className="text-zinc-500 dark:text-zinc-400">Verified Metric:</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">{activeWork.metrics}</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeWork.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Quick Code Peek Switcher */}
                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>Source file: {activeWork.codeFile}</span>
                      <button
                        type="button"
                        onClick={() => setActiveConsoleTab('code')}
                        className="text-accent hover:underline flex items-center gap-1"
                      >
                        <Terminal size={12} />
                        <span>Inspect Code</span>
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* Console Body Tab 2: Syntax Highlighted Code Viewer */}
              {activeConsoleTab === 'code' && (
                <div className="p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                      <Code2 size={14} className="text-accent" />
                      <span className="font-semibold">{activeWork.codeFile}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-700 dark:text-zinc-300 flex items-center gap-1 transition-colors"
                      title="Copy code snippet"
                    >
                      {copiedCode ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                      <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-zinc-950 text-zinc-100 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[260px] scrollbar-thin">
                    <code>{activeWork.codeSnippet}</code>
                  </pre>

                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>Clean syntax · Hand-crafted implementation</span>
                    <button
                      type="button"
                      onClick={() => setActiveConsoleTab('preview')}
                      className="text-accent hover:underline"
                    >
                      Back to live view →
                    </button>
                  </div>
                </div>
              )}

              {/* Console Body Tab 3: Architecture Radar */}
              {activeConsoleTab === 'architecture' && (
                <div className="p-6 space-y-4">
                  <div className="text-xs font-mono text-accent font-semibold flex items-center gap-1.5">
                    <Layers size={14} />
                    <span>ZERO-BLOAT ARCHITECTURE PIPELINE</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#151622] border border-black/[0.06] dark:border-white/[0.06] flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        01
                      </div>
                      <div>
                        <div className="font-display font-bold text-zinc-900 dark:text-white">Figma to Native Blocks</div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                          Pixel-perfect conversion into bespoke Gutenberg blocks or Shopify Liquid sections with zero unnecessary DIV wrappers.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#151622] border border-black/[0.06] dark:border-white/[0.06] flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        02
                      </div>
                      <div>
                        <div className="font-display font-bold text-zinc-900 dark:text-white">ACF & Shopify Metaobjects</div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                          Structured dynamic schemas allowing store owners and editors to update products, locations, and banners with ease.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#151622] border border-black/[0.06] dark:border-white/[0.06] flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        03
                      </div>
                      <div>
                        <div className="font-display font-bold text-zinc-900 dark:text-white">Sub-Second Speed & Edge Caching</div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                          Aggressive asset optimization, responsive WebP/AVIF images, and minimal JavaScript for instant Lighthouse 95+ scores.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <a
                      href="#about"
                      className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Engineering Philosophy</span>
                      <ArrowDown size={12} />
                    </a>
                  </div>
                </div>
              )}

              {/* Terminal Footer Bar */}
              <div className="px-4 py-2 bg-zinc-50/70 dark:bg-[#12131D]/70 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>JHOMEL_CORE_V8.4</span>
                </span>
                <span>Active Stack: WordPress · Shopify · PHP · AI</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
