import React, { useState, useRef } from 'react';
import { X, Upload, Link2, Sliders, Image as ImageIcon, Trash2, Check, Sparkles } from 'lucide-react';
import { BackgroundImageConfig } from './types';
import { BACKGROUND_PRESETS, BackgroundPreset } from './backgroundPresets';

interface BackgroundSelectorModalProps {
  isOpen: boolean;
  config: BackgroundImageConfig;
  accentColor: string;
  onSave: (config: BackgroundImageConfig) => void;
  onClose: () => void;
}

export const BackgroundSelectorModal: React.FC<BackgroundSelectorModalProps> = ({
  isOpen,
  config,
  accentColor,
  onSave,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [imageUrl, setImageUrl] = useState<string>(config.imageUrl);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(config.overlayOpacity);
  const [overlayColor, setOverlayColor] = useState<'dark' | 'light' | 'accent' | 'blue'>(config.overlayColor);
  const [blur, setBlur] = useState<number>(config.blur);
  const [enabled, setEnabled] = useState<boolean>(config.enabled);
  const [urlInput, setUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'url' | 'settings'>('presets');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const categories = [
    'All',
    'Modern & Clean',
    'Tech & 3D',
    'Cyber & Neon',
    'Dark Textures',
    'Minimalist Luxury',
    'Workspace',
  ];

  const filteredPresets = selectedCategory === 'All'
    ? BACKGROUND_PRESETS
    : BACKGROUND_PRESETS.filter((p) => p.category === selectedCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
          setEnabled(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      setImageUrl(urlInput.trim());
      setEnabled(true);
      setUrlInput('');
    }
  };

  const handleSelectPreset = (preset: BackgroundPreset) => {
    setImageUrl(preset.url);
    setEnabled(true);
  };

  const handleSaveAndClose = () => {
    onSave({
      imageUrl,
      overlayOpacity,
      overlayColor,
      blur,
      enabled,
    });
    onClose();
  };

  const handleRemoveBackground = () => {
    setEnabled(false);
    onSave({
      imageUrl,
      overlayOpacity,
      overlayColor,
      blur,
      enabled: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#12131A] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#171922]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              <ImageIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Background Image Selection
                {enabled && (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                )}
              </h3>
              <p className="text-xs text-zinc-400">
                Choose a curated wallpaper, upload your own graphic, or customize overlay contrast
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Mini Preview Bar */}
        <div className="px-5 py-3 bg-[#0E1017] border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">Preview:</span>
            <div className="relative w-28 h-12 rounded-lg overflow-hidden border border-white/15 shadow-inner">
              {enabled && imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="Current Background"
                    className="w-full h-full object-cover"
                    style={{ filter: blur > 0 ? `blur(${blur}px)` : 'none' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor:
                        overlayColor === 'dark'
                          ? '#000000'
                          : overlayColor === 'light'
                          ? '#ffffff'
                          : overlayColor === 'blue'
                          ? '#050c1e'
                          : accentColor,
                      opacity: overlayOpacity / 100,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider drop-shadow">
                      Text Sample
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-[#181A24] flex items-center justify-center text-[10px] text-zinc-500">
                  Solid Color
                </div>
              )}
            </div>
            <div className="text-xs text-zinc-400">
              {enabled ? (
                <span>
                  Overlay Dimmer: <strong className="text-white">{overlayOpacity}%</strong> • Blur:{' '}
                  <strong className="text-white">{blur}px</strong>
                </span>
              ) : (
                <span className="text-zinc-500 italic">No background active (plain theme background)</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                enabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-zinc-800 text-zinc-400 border border-white/5 hover:text-white'
              }`}
            >
              {enabled ? 'Background Enabled' : 'Enable Background'}
            </button>
            {enabled && (
              <button
                type="button"
                onClick={handleRemoveBackground}
                className="px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all flex items-center gap-1.5"
                title="Remove background"
              >
                <Trash2 size={13} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#141620] px-5">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'presets'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles size={14} /> Presets Gallery
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'upload'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Upload size={14} /> Upload Custom
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'url'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Link2 size={14} /> Image URL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'settings'
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sliders size={14} /> Overlay & Contrast
          </button>
        </div>

        {/* Body content based on tab */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'presets' && (
            <div className="space-y-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-white text-black font-bold shadow'
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid of Backgrounds */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredPresets.map((preset) => {
                  const isSelected = enabled && imageUrl === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`group relative rounded-xl overflow-hidden aspect-video border text-left transition-all ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-offset-[#12131A] border-transparent shadow-lg'
                          : 'border-white/10 hover:border-white/30 hover:scale-[1.02]'
                      }`}
                      style={{
                        borderColor: isSelected ? accentColor : undefined,
                        boxShadow: isSelected ? `0 0 15px ${accentColor}40` : undefined,
                      }}
                    >
                      <img
                        src={preset.thumbnail}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
                        <span className="font-semibold text-white drop-shadow truncate text-[11px]">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: accentColor, color: '#000' }}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 hover:border-white/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  <Upload size={26} />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Upload Your Custom Image</h4>
                <p className="text-xs text-zinc-400 max-w-md">
                  Choose any high-resolution image (JPG, PNG, WebP) from your computer. It will be loaded directly into your ad & brochure.
                </p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  Browse Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {imageUrl && imageUrl.startsWith('data:') && (
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Check size={15} className="text-emerald-400" />
                    <span className="text-zinc-300">Custom image uploaded successfully</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl('');
                      setEnabled(false);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Paste Image Web Address (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ backgroundColor: accentColor, color: '#000' }}
                  >
                    Apply URL
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Tip: Use high-resolution direct links (Unsplash, Imgur, or your cloud storage).
                </p>
              </div>

              {imageUrl && !imageUrl.startsWith('data:') && (
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 truncate max-w-sm">Current URL: {imageUrl}</span>
                  <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold">Active</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Overlay Opacity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-200">Overlay Dimmer (Contrast Guard)</span>
                  <span className="font-mono text-white font-bold">{overlayOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-full accent-white h-2 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-zinc-500">
                  Higher opacity darkens the wallpaper to guarantee sharp, readable typography for ad conversions.
                </p>
              </div>

              {/* Overlay Tint Color */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-200">Overlay Tint Style</label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setOverlayColor('dark')}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-all ${
                      overlayColor === 'dark'
                        ? 'border-white bg-zinc-900 text-white shadow'
                        : 'border-white/10 bg-zinc-900/40 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="w-5 h-5 mx-auto mb-1.5 rounded-full bg-black border border-white/20" />
                    Pure Dark
                  </button>

                  <button
                    type="button"
                    onClick={() => setOverlayColor('blue')}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-all ${
                      overlayColor === 'blue'
                        ? 'border-white bg-zinc-900 text-white shadow'
                        : 'border-white/10 bg-zinc-900/40 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="w-5 h-5 mx-auto mb-1.5 rounded-full bg-[#0a1128] border border-blue-400/30" />
                    Cyber Navy
                  </button>

                  <button
                    type="button"
                    onClick={() => setOverlayColor('accent')}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-all ${
                      overlayColor === 'accent'
                        ? 'border-white bg-zinc-900 text-white shadow'
                        : 'border-white/10 bg-zinc-900/40 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div
                      className="w-5 h-5 mx-auto mb-1.5 rounded-full border border-white/20"
                      style={{ backgroundColor: accentColor }}
                    />
                    Brand Accent
                  </button>

                  <button
                    type="button"
                    onClick={() => setOverlayColor('light')}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-all ${
                      overlayColor === 'light'
                        ? 'border-white bg-zinc-900 text-white shadow'
                        : 'border-white/10 bg-zinc-900/40 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="w-5 h-5 mx-auto mb-1.5 rounded-full bg-white border border-black/20" />
                    Frosted Light
                  </button>
                </div>
              </div>

              {/* Blur Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-200">Wallpaper Blur Effect</span>
                  <span className="font-mono text-white font-bold">{blur}px</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 2, 4, 8].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBlur(b)}
                      className={`py-2 rounded-lg text-xs font-mono font-medium border transition-all ${
                        blur === b
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {b === 0 ? 'Sharp (0px)' : `${b}px Blur`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#171922] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-zinc-400">
            {enabled ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Check size={14} /> Ready to apply to templates & ads
              </span>
            ) : (
              <span className="text-zinc-500">Solid color background</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5"
              style={{ backgroundColor: accentColor, color: '#000' }}
            >
              <Check size={14} /> Apply Background
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
