import React from 'react';
import { BrochureData, BrochureTemplateId } from './types';
import { TemplateMinimalistDark } from './TemplateMinimalistDark';
import { TemplateCorporateLight } from './TemplateCorporateLight';
import { TemplateCreativeEditorial } from './TemplateCreativeEditorial';
import { TemplateModernBento } from './TemplateModernBento';
import { TemplateTrifoldSheet } from './TemplateTrifoldSheet';

interface BrochureRendererProps {
  templateId: BrochureTemplateId;
  data: BrochureData;
}

export const BrochureRenderer: React.FC<BrochureRendererProps> = ({
  templateId,
  data,
}) => {
  switch (templateId) {
    case 'minimalist-dark':
      return <TemplateMinimalistDark data={data} />;
    case 'corporate-light':
      return <TemplateCorporateLight data={data} />;
    case 'creative-editorial':
      return <TemplateCreativeEditorial data={data} />;
    case 'modern-bento':
      return <TemplateModernBento data={data} />;
    case 'trifold-sheet':
      return <TemplateTrifoldSheet data={data} />;
    default:
      return <TemplateMinimalistDark data={data} />;
  }
};
