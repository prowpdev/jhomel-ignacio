import React from 'react';
import { FacebookAdData } from '../types';
import { AdHighImpactOffer } from './AdHighImpactOffer';
import { AdTechGlow } from './AdTechGlow';
import { AdCleanEditorial } from './AdCleanEditorial';
import { AdProblemSolution } from './AdProblemSolution';
import { AdSpeedMetrics } from './AdSpeedMetrics';
import { AdModernBento } from './AdModernBento';
import { AdMinimalistStudio } from './AdMinimalistStudio';
import { AdSocialProofCaseStudy } from './AdSocialProofCaseStudy';
import { AdVisualCardStack } from './AdVisualCardStack';
import { AdDarkAuroraNeo } from './AdDarkAuroraNeo';
import { AdPricingOffer } from './AdPricingOffer';
import { AdSplitShowcase } from './AdSplitShowcase';

interface FacebookAdRendererProps {
  data: FacebookAdData;
}

export const FacebookAdRenderer: React.FC<FacebookAdRendererProps> = ({ data }) => {
  // Dimension styling map for aspect ratios (crisp vector scale)
  const getDimensions = () => {
    switch (data.aspectRatio) {
      case '1:1':
        return {
          width: '600px',
          height: '600px',
          aspectRatio: '1 / 1',
        };
      case '4:5':
        return {
          width: '560px',
          height: '700px',
          aspectRatio: '4 / 5',
        };
      case '9:16':
        return {
          width: '450px',
          height: '800px',
          aspectRatio: '9 / 16',
        };
      case '1.91:1':
        return {
          width: '764px',
          height: '400px',
          aspectRatio: '1.91 / 1',
        };
      default:
        return {
          width: '600px',
          height: '600px',
          aspectRatio: '1 / 1',
        };
    }
  };

  const dims = getDimensions();

  const renderTemplate = () => {
    switch (data.templateId) {
      case 'ad-high-impact':
        return <AdHighImpactOffer data={data} />;
      case 'ad-tech-glow':
        return <AdTechGlow data={data} />;
      case 'ad-clean-editorial':
        return <AdCleanEditorial data={data} />;
      case 'ad-problem-solution':
        return <AdProblemSolution data={data} />;
      case 'ad-speed-metrics':
        return <AdSpeedMetrics data={data} />;
      case 'ad-modern-bento':
        return <AdModernBento data={data} />;
      case 'ad-minimalist-studio':
        return <AdMinimalistStudio data={data} />;
      case 'ad-social-proof':
        return <AdSocialProofCaseStudy data={data} />;
      case 'ad-card-stack':
        return <AdVisualCardStack data={data} />;
      case 'ad-dark-aurora':
        return <AdDarkAuroraNeo data={data} />;
      case 'ad-pricing-offer':
        return <AdPricingOffer data={data} />;
      case 'ad-split-showcase':
        return <AdSplitShowcase data={data} />;
      default:
        return <AdPricingOffer data={data} />;
    }
  };

  return (
    <div
      id="facebook-ad-canvas"
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 mx-auto"
      style={{
        width: dims.width,
        height: dims.height,
        maxWidth: '100%',
        maxHeight: '85vh',
      }}
    >
      {renderTemplate()}
    </div>
  );
};
