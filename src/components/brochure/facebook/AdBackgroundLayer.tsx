import React from 'react';
import { BackgroundImageConfig } from '../types';

interface BackgroundLayerProps {
  background?: BackgroundImageConfig;
  accentColor?: string;
  defaultOverlayColor?: 'dark' | 'light';
}

export const AdBackgroundLayer: React.FC<BackgroundLayerProps> = ({
  background,
  accentColor = '#CEFF00',
  defaultOverlayColor = 'dark',
}) => {
  if (!background || !background.enabled || !background.imageUrl) {
    return null;
  }

  const overlayBg =
    background.overlayColor === 'dark'
      ? '#05060A'
      : background.overlayColor === 'light'
      ? '#FFFFFF'
      : background.overlayColor === 'blue'
      ? '#060B18'
      : accentColor;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <img
        src={background.imageUrl}
        alt="Backdrop"
        className="w-full h-full object-cover select-none"
        style={{
          filter: background.blur > 0 ? `blur(${background.blur}px)` : 'none',
          transform: background.blur > 0 ? 'scale(1.08)' : 'scale(1)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayBg,
          opacity: background.overlayOpacity / 100,
        }}
      />
    </div>
  );
};

export const BrochureBackgroundLayer = AdBackgroundLayer;
