import React from 'react';
import {
  ShoppingBag,
  Code2,
  Globe,
  Search,
  BarChart3,
  Server,
  Smartphone,
  Zap,
  Sparkles,
  ShieldCheck,
  Database,
  Cpu,
  Layers,
  Rocket,
  Workflow,
  Target,
  Monitor,
  Layout,
  CheckCircle,
  TrendingUp,
  Box,
  Terminal,
  Cloud,
  Compass,
  FileCode,
  Key,
  Shield,
  Palette,
  Briefcase,
  LucideProps,
} from 'lucide-react';

export const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  ShoppingBag,
  Code2,
  Globe,
  Search,
  BarChart3,
  Server,
  Smartphone,
  Zap,
  Sparkles,
  ShieldCheck,
  Database,
  Cpu,
  Layers,
  Rocket,
  Workflow,
  Target,
  Monitor,
  Layout,
  CheckCircle,
  TrendingUp,
  Box,
  Terminal,
  Cloud,
  Compass,
  FileCode,
  Key,
  Shield,
  Palette,
  Briefcase,
};

interface ServiceIconProps extends LucideProps {
  name: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, ...props }) => {
  const IconComponent = ICON_MAP[name] || Sparkles;
  return <IconComponent {...props} />;
};
