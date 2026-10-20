export interface BrochureServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface BackgroundImageConfig {
  imageUrl: string;
  overlayOpacity: number; // 0 to 95
  overlayColor: 'dark' | 'light' | 'accent' | 'blue';
  blur: number; // 0, 2, 4, 8
  enabled: boolean;
}

export const DEFAULT_BACKGROUND_CONFIG: BackgroundImageConfig = {
  imageUrl: '/src/assets/images/bg_dark_liquid_mesh_1792466527701.jpg',
  overlayOpacity: 75,
  overlayColor: 'dark',
  blur: 0,
  enabled: true,
};

export interface BrochureData {
  companyName: string;
  tagline: string;
  introSummary: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  accentColor: string;
  services: BrochureServiceItem[];
  background?: BackgroundImageConfig;
}

export type BrochureTemplateId = 
  | 'minimalist-dark'
  | 'corporate-light'
  | 'creative-editorial'
  | 'modern-bento'
  | 'trifold-sheet';

export type FacebookAdAspectRatio = '1:1' | '4:5' | '9:16' | '1.91:1';

export type FacebookAdTemplateId = 
  | 'ad-high-impact'
  | 'ad-tech-glow'
  | 'ad-clean-editorial'
  | 'ad-problem-solution'
  | 'ad-speed-metrics'
  | 'ad-modern-bento'
  | 'ad-minimalist-studio'
  | 'ad-social-proof'
  | 'ad-card-stack'
  | 'ad-dark-aurora';

export interface FacebookAdData {
  badge: string;
  headline: string;
  subheadline: string;
  keyPoints: string[];
  ctaText: string;
  ctaSubtext: string;
  ratingText: string;
  trustBadge: string;
  brandName: string;
  website: string;
  contactHandle: string;
  accentColor: string;
  aspectRatio: FacebookAdAspectRatio;
  templateId: FacebookAdTemplateId;
  background: BackgroundImageConfig;
  stats?: { value: string; label: string }[];
  problemBefore?: string[];
  solutionAfter?: string[];
}

export const DEFAULT_FACEBOOK_AD_DATA: FacebookAdData = {
  badge: '⚡ LIMITED AVAILABILITY • Q4 CLIENT SPRINT',
  headline: 'Struggling With Slow Shopify Sales or Clunky Web Architecture?',
  subheadline: 'Partner with a Senior Full-Stack Engineer & Solutions Architect to build lightning-fast web apps that convert.',
  keyPoints: [
    'Sub-second 90+ Google Lighthouse Speed Guarantee',
    'Custom Shopify Liquid & Storefront API Integration',
    'Enterprise Laravel & PostgreSQL Scalable Backends',
    'Google Analytics 4 Tracking & Technical SEO Included',
  ],
  ctaText: 'Claim Free Technical Audit & Scope',
  ctaSubtext: 'Direct 1-on-1 engineer review • No sales reps • 48-hr turnaround',
  ratingText: '5.0 ★★★★★ Trusted by 30+ Global Brands',
  trustBadge: '10+ Years Full-Stack Experience • Available Worldwide',
  brandName: 'Jhomel Ignacio',
  website: 'github.com/punisher08',
  contactHandle: 'jhomignacio08@gmail.com',
  accentColor: '#CEFF00',
  aspectRatio: '1:1',
  templateId: 'ad-high-impact',
  background: {
    imageUrl: '/src/assets/images/bg_dark_liquid_mesh_1792466527701.jpg',
    overlayOpacity: 78,
    overlayColor: 'dark',
    blur: 0,
    enabled: true,
  },
  stats: [
    { value: '90+', label: 'Lighthouse Score' },
    { value: '< 1s', label: 'Page Load Speed' },
    { value: '100%', label: 'Clean Code SLA' },
  ],
  problemBefore: [
    'Bloated themes dropping mobile shoppers',
    'Unreliable freelance contractors ghosting mid-project',
    'No conversion tracking or GA4 eCommerce visibility',
  ],
  solutionAfter: [
    'Sub-second bespoke Liquid theme built to scale',
    'Direct Senior Engineer access with daily transparent updates',
    'Full GA4 attribution & Google Tag Manager tracking',
  ],
};

export const AVAILABLE_ICONS = [
  'ShoppingBag',
  'Code2',
  'Globe',
  'Search',
  'BarChart3',
  'Server',
  'Smartphone',
  'Zap',
  'Sparkles',
  'ShieldCheck',
  'Database',
  'Cpu',
  'Layers',
  'Rocket',
  'Workflow',
  'Target',
] as const;

export const DEFAULT_BROCHURE_DATA: BrochureData = {
  companyName: 'Jhomel Ignacio',
  tagline: 'Senior Full-Stack Developer & Solutions Architect',
  introSummary:
    'Delivering scalable digital products, custom Shopify storefronts, robust Laravel web applications, technical SEO, and automated data pipelines for high-growth brands globally.',
  email: 'jhomignacio08@gmail.com',
  phone: '+63 900 000 0000',
  website: 'github.com/punisher08',
  location: 'Manila, Philippines (Available Globally)',
  accentColor: '#CEFF00',
  background: {
    imageUrl: '/src/assets/images/bg_dark_liquid_mesh_1792466527701.jpg',
    overlayOpacity: 80,
    overlayColor: 'dark',
    blur: 0,
    enabled: false,
  },
  services: [
    {
      id: '1',
      title: 'Shopify Plus & Custom Stores',
      description:
        'High-converting bespoke Liquid theme architecture, Storefront API integrations, custom checkout workflows, and sub-second speed optimization.',
      icon: 'ShoppingBag',
      deliverables: [
        'Custom Theme & Sections Architecture',
        'Liquid & Storefront API Integration',
        'Custom Cart & Checkout Logic',
        'Google Lighthouse 90+ Speed Audit',
      ],
    },
    {
      id: '2',
      title: 'Full-Stack Laravel Web Apps',
      description:
        'Enterprise web platforms, secure relational database design, REST/GraphQL microservices, queue workers, and reactive Vue/React interfaces.',
      icon: 'Server',
      deliverables: [
        'Relational Database Modeling (MySQL/Postgres)',
        'Authentication, RBAC & API Endpoints',
        'Reactive Dashboards with Vue / React',
        'High-Scale Background Job Processing',
      ],
    },
    {
      id: '3',
      title: 'Technical SEO & Search Performance',
      description:
        'Engineered search visibility with structured data, indexation audits, Core Web Vitals remediation, and semantic crawl budget architecture.',
      icon: 'Search',
      deliverables: [
        'JSON-LD Schema.org Structured Markup',
        'Core Web Vitals Remediation (LCP/CLS/INP)',
        'Crawl Budget & Sitemap Optimization',
        'Technical Audits & Canonicalization',
      ],
    },
    {
      id: '4',
      title: 'Google Analytics 4 & Conversion Tracking',
      description:
        'Comprehensive GA4 setup, GTM container architecture, enhanced eCommerce event attribution, and executive Looker Studio performance dashboards.',
      icon: 'BarChart3',
      deliverables: [
        'GA4 & Google Tag Manager (GTM) Setup',
        'Enhanced eCommerce Funnel Tracking',
        'User Journey & Conversion Attribution',
        'Custom Looker Studio Live Dashboards',
      ],
    },
    {
      id: '5',
      title: 'Headless WordPress & Custom Plugins',
      description:
        'Bespoke WordPress theme engineering, tailored plugin development, headless REST API endpoints, and zero-bloat modular code.',
      icon: 'Globe',
      deliverables: [
        'Bespoke Theme Development (No Bloat)',
        'Custom WordPress Plugins & API Hooks',
        'WooCommerce Customization',
        'Decoupled Headless Implementations',
      ],
    },
    {
      id: '6',
      title: 'AI Integrations & Workflow Automation',
      description:
        'Practical intelligence integrated into core business operations, OpenAI API model integration, Zapier webhooks, and CRM lead pipelines.',
      icon: 'Sparkles',
      deliverables: [
        'OpenAI API & Model Integrations',
        'Custom Comparison Software Engines',
        'Zapier & Webhook Automated Pipelines',
        'GoHighLevel (GHL) CRM & Funnel Sync',
      ],
    },
  ],
};
