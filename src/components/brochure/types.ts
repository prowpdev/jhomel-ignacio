export interface BrochureServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  price?: string;
  pricingPeriod?: string;
  popular?: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  period: string; // e.g. "/ project", "/ mo", "fixed sprint"
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string; // e.g. "Most Popular", "High ROI", "Enterprise"
  ctaText?: string;
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

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'USD', symbol: '$', name: 'USD ($)' },
  { code: 'EUR', symbol: '€', name: 'EUR (€)' },
  { code: 'GBP', symbol: '£', name: 'GBP (£)' },
  { code: 'PHP', symbol: '₱', name: 'PHP (₱)' },
  { code: 'AUD', symbol: 'A$', name: 'AUD (A$)' },
  { code: 'CAD', symbol: 'C$', name: 'CAD (C$)' },
  { code: 'SGD', symbol: 'S$', name: 'SGD (S$)' },
  { code: 'JPY', symbol: '¥', name: 'JPY (¥)' },
  { code: 'AED', symbol: 'AED', name: 'AED' },
  { code: 'CHF', symbol: 'CHF', name: 'CHF' },
];

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
  // Pricing & Currency Section
  currency: string;
  currencyCode: string;
  showPricing: boolean;
  pricingTiers?: PricingPackage[];
  pricingNote?: string;
  pricingGuarantee?: string;
}

export type BrochureTemplateId = 
  | 'minimalist-dark'
  | 'corporate-light'
  | 'creative-editorial'
  | 'modern-bento'
  | 'trifold-sheet'
  | 'modern-pricing-matrix'
  | 'swiss-grid-catalog'
  | 'split-showcase-luxury'
  | 'cyber-developer-catalog';

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
  | 'ad-dark-aurora'
  | 'ad-pricing-offer'
  | 'ad-split-showcase';

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
  // Price Section & Currency
  showPrice?: boolean;
  currency?: string;
  price?: string;
  originalPrice?: string;
  pricingPeriod?: string;
  priceDiscountBadge?: string;
}

export const DEFAULT_PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter Sprint',
    price: '1,490',
    period: '/ project',
    description: 'Targeted single-service sprint for speed optimization, bug remediation, or custom landing page launch.',
    features: [
      'Single core milestone deliverable',
      '48-hour turn-around SLA',
      'Lighthouse 90+ speed guarantee',
      '14 days post-launch warranty',
      'Source code handover with docs',
    ],
    isPopular: false,
    badge: 'Fast Turnaround',
    ctaText: 'Book Starter Sprint',
  },
  {
    id: 'growth',
    name: 'Full Growth Architecture',
    price: '3,850',
    period: '/ project',
    description: 'Complete bespoke Shopify store or Laravel web application built from ground up to convert.',
    features: [
      'Complete end-to-end bespoke development',
      'Custom theme, checkout logic & APIs',
      'GA4 eCommerce tracking & Schema SEO',
      'Direct senior engineer Slack channel',
      '30 days dedicated warranty & hypercare',
    ],
    isPopular: true,
    badge: 'Most Popular',
    ctaText: 'Claim Growth Slot',
  },
  {
    id: 'retainer',
    name: 'Fractional CTO & Retainer',
    price: '2,900',
    period: '/ month',
    description: 'Dedicated monthly engineering bandwidth for continuous iterations, features, and optimizations.',
    features: [
      'Dedicated weekly sprint deliverables',
      'Same-day critical bug response',
      'Continuous performance & security monitoring',
      'Weekly architectural review call',
      'Priority roadmap execution',
    ],
    isPopular: false,
    badge: 'Best Long-Term Value',
    ctaText: 'Discuss Retainer',
  },
];

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
  templateId: 'ad-modern-bento',
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
  showPrice: true,
  currency: '$',
  price: '1,490',
  originalPrice: '2,490',
  pricingPeriod: 'Flat-Rate Sprint',
  priceDiscountBadge: 'Save $1,000 • Only 3 Slots Left',
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
  // Pricing & Currency Defaults
  currency: '$',
  currencyCode: 'USD',
  showPricing: true,
  pricingNote: 'Custom scopes and flexible installment milestones available. 50% upon kickoff, 50% on verified production deployment.',
  pricingGuarantee: '100% Satisfaction Guarantee • 30 Days Free Warranty • Source Code Ownership',
  pricingTiers: DEFAULT_PRICING_PACKAGES,
  services: [
    {
      id: '1',
      title: 'Shopify Plus & Custom Stores',
      description:
        'High-converting bespoke Liquid theme architecture, Storefront API integrations, custom checkout workflows, and sub-second speed optimization.',
      icon: 'ShoppingBag',
      price: '1,490',
      pricingPeriod: '/ project',
      popular: true,
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
      price: '2,800',
      pricingPeriod: '/ project',
      popular: true,
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
      price: '890',
      pricingPeriod: '/ audit',
      popular: false,
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
      price: '750',
      pricingPeriod: '/ setup',
      popular: false,
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
      price: '1,200',
      pricingPeriod: '/ project',
      popular: false,
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
      price: '1,650',
      pricingPeriod: '/ workflow',
      popular: false,
      deliverables: [
        'OpenAI API & Model Integrations',
        'Custom Comparison Software Engines',
        'Zapier & Webhook Automated Pipelines',
        'GoHighLevel (GHL) CRM & Funnel Sync',
      ],
    },
  ],
};
