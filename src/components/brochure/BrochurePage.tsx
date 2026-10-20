import React, { useState, useRef } from 'react';
import {
  DEFAULT_BROCHURE_DATA,
  DEFAULT_FACEBOOK_AD_DATA,
  BrochureData,
  BrochureTemplateId,
  FacebookAdData,
  BackgroundImageConfig,
} from './types';
import { BrochureForm } from './BrochureForm';
import { BrochureRenderer } from './BrochureRenderer';
import { FacebookAdForm } from './facebook/FacebookAdForm';
import { FacebookAdRenderer } from './facebook/FacebookAdRenderer';
import { BackgroundSelectorModal } from './BackgroundSelectorModal';
import {
  ArrowLeft,
  Download,
  Image as ImageIcon,
  Printer,
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Edit3,
  Loader2,
  CheckCircle2,
  Sliders,
  FileText,
  Megaphone,
  Check,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface BrochurePageProps {
  onBackToPortfolio: () => void;
  onOpenInquiry?: () => void;
}

const BROCHURE_TEMPLATES: { id: BrochureTemplateId; label: string; tag: string }[] = [
  { id: 'modern-pricing-matrix', label: 'SaaS & Pricing Matrix', tag: 'Linear Style' },
  { id: 'swiss-grid-catalog', label: 'Swiss Studio Grid', tag: 'Architectural' },
  { id: 'split-showcase-luxury', label: 'Split Luxury & Rates', tag: 'Asymmetric' },
  { id: 'cyber-developer-catalog', label: 'Cyber Tech Stack', tag: 'Developer HUD' },
  { id: 'minimalist-dark', label: 'Minimalist Dark', tag: 'High-Tech Studio' },
  { id: 'corporate-light', label: 'Corporate Light', tag: 'Executive Brief' },
  { id: 'creative-editorial', label: 'Creative Editorial', tag: 'Magazine Layout' },
  { id: 'modern-bento', label: 'Modern Bento', tag: 'SaaS & Architecture' },
  { id: 'trifold-sheet', label: 'Trifold Sheet', tag: 'Agency Collateral' },
];

export const BrochurePage: React.FC<BrochurePageProps> = ({
  onBackToPortfolio,
  onOpenInquiry,
}) => {
  // Mode switcher: 'brochure' (A4 Document catalog) | 'facebook-ad' (Social Media & Meta Ads)
  const [activeMode, setActiveMode] = useState<'brochure' | 'facebook-ad'>('facebook-ad');

  // Brochure document state
  const [brochureData, setBrochureData] = useState<BrochureData>(DEFAULT_BROCHURE_DATA);
  const [activeBrochureTemplate, setActiveBrochureTemplate] = useState<BrochureTemplateId>('modern-pricing-matrix');

  // Facebook Ad state
  const [adData, setAdData] = useState<FacebookAdData>(DEFAULT_FACEBOOK_AD_DATA);

  // Background modal state
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState<boolean>(false);

  // Canvas / UI states
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('preview');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);

  // Current active accent color for UI
  const currentAccent = activeMode === 'facebook-ad' ? adData.accentColor : brochureData.accentColor;

  // Background config to pass to modal
  const currentBackgroundConfig: BackgroundImageConfig =
    activeMode === 'facebook-ad'
      ? adData.background
      : brochureData.background || {
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
          overlayOpacity: 75,
          overlayColor: 'dark',
          blur: 0,
          enabled: true,
        };

  // Save background config from modal
  const handleSaveBackground = (config: BackgroundImageConfig) => {
    if (activeMode === 'facebook-ad') {
      setAdData({ ...adData, background: config });
    } else {
      setBrochureData({ ...brochureData, background: config });
    }
  };

  // Download PDF handler
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    try {
      setIsExporting(true);
      setExportMessage('Generating high-resolution PDF...');

      const element = previewRef.current;
      const originalTransform = element.style.transform;
      element.style.transform = 'none';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      element.style.transform = originalTransform;

      const imgData = canvas.toDataURL('image/png');

      if (activeMode === 'facebook-ad') {
        // Facebook Ad PDF sized to aspect ratio
        const orientation = adData.aspectRatio === '1.91:1' ? 'landscape' : 'portrait';
        const pdf = new jsPDF({
          orientation,
          unit: 'px',
          format: [canvas.width / 2, canvas.height / 2],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
        const fileName = `${adData.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-facebook-ad.pdf`;
        pdf.save(fileName);
      } else {
        // Standard A4 Brochure document PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const fileName = `${brochureData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-services-brochure.pdf`;
        pdf.save(fileName);
      }

      setExportMessage('PDF Download complete!');
      setTimeout(() => {
        setIsExporting(false);
        setExportMessage('');
      }, 2000);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      setIsExporting(false);
      setExportMessage('');
    }
  };

  // Download Image (PNG) handler
  const handleDownloadImage = async () => {
    if (!previewRef.current) return;
    try {
      setIsExporting(true);
      setExportMessage(
        activeMode === 'facebook-ad'
          ? 'Rendering high-res Meta Ad image (PNG)...'
          : 'Generating high-resolution PNG image...'
      );

      const element = previewRef.current;
      const originalTransform = element.style.transform;
      element.style.transform = 'none';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      element.style.transform = originalTransform;

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');

      if (activeMode === 'facebook-ad') {
        const ratioTag = adData.aspectRatio.replace(':', 'x');
        link.download = `${adData.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-facebook-ad-${ratioTag}.png`;
      } else {
        link.download = `${brochureData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-services-brochure.png`;
      }

      link.href = imgData;
      link.click();

      setExportMessage('Image Download complete!');
      setTimeout(() => {
        setIsExporting(false);
        setExportMessage('');
      }, 2000);
    } catch (err) {
      console.error('Failed to export Image:', err);
      setIsExporting(false);
      setExportMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#ECEEF2] font-sans selection:bg-[#CEFF00] selection:text-black">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#0E1017]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Back button & Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToPortfolio}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Portfolio</span>
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-400">
                  Collateral Studio
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border"
                  style={{
                    backgroundColor: `${currentAccent}15`,
                    color: currentAccent,
                    borderColor: `${currentAccent}30`,
                  }}
                >
                  {activeMode === 'facebook-ad' ? 'Meta Ads Mode' : 'A4 Document Mode'}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {activeMode === 'facebook-ad'
                  ? 'Facebook & Social Ads Generator'
                  : 'Services Brochure Generator'}
              </h1>
            </div>
          </div>

          {/* Center Mode Switcher: Brochure Catalog vs Facebook Ads */}
          <div className="flex items-center bg-[#151722] p-1 rounded-xl border border-white/10 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveMode('facebook-ad')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeMode === 'facebook-ad'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Megaphone size={14} />
              <span>Facebook & Social Ads</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('brochure')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeMode === 'brochure'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText size={14} />
              <span>Services Brochure (A4)</span>
            </button>
          </div>

          {/* Right Action Toolbar: Background Modal & Export Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Background Image Trigger */}
            <button
              type="button"
              onClick={() => setIsBackgroundModalOpen(true)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                currentBackgroundConfig.enabled
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10 hover:text-white'
              }`}
              title="Select or customize background wallpaper"
            >
              <ImageIcon size={14} style={{ color: currentBackgroundConfig.enabled ? '#34d399' : undefined }} />
              <span>Background</span>
              {currentBackgroundConfig.enabled && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Download PNG Button */}
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-200 bg-white/10 hover:bg-white/15 border border-white/10 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
              title="Download high-resolution PNG image"
            >
              <Download size={14} />
              <span>Download PNG</span>
            </button>

            {/* Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg active:scale-95 disabled:opacity-50"
              style={{
                backgroundColor: currentAccent,
                color: '#000000',
              }}
              title="Download high-resolution print-ready PDF"
            >
              <Download size={14} strokeWidth={2.5} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Sub-bar for Brochure Mode: Template Selector */}
        {activeMode === 'brochure' && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-3 overflow-x-auto text-xs">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                9 Modern Layouts:
              </span>
              {brochureData.showPricing && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  Rates: {brochureData.currencyCode || 'USD'} ({brochureData.currency || '$'})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {BROCHURE_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setActiveBrochureTemplate(tmpl.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeBrochureTemplate === tmpl.id
                      ? 'bg-white text-black font-bold shadow'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span>{tmpl.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sub-bar for Facebook Ad Mode: Quick Aspect Ratio Buttons & Style Selector */}
        {activeMode === 'facebook-ad' && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto text-zinc-400 py-0.5">
              <span className="font-mono text-[10px] uppercase tracking-wider shrink-0 text-zinc-400 mr-1">
                Format:
              </span>
              {(['1:1', '4:5', '9:16', '1.91:1'] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAdData({ ...adData, aspectRatio: ratio })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                    adData.aspectRatio === ratio
                      ? 'bg-white text-black font-bold shadow'
                      : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {ratio === '1:1' && '1:1 Square'}
                  {ratio === '4:5' && '4:5 Mobile'}
                  {ratio === '9:16' && '9:16 Story'}
                  {ratio === '1.91:1' && '1.91:1 Link'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto py-0.5">
              <span className="text-[10px] uppercase font-mono text-zinc-400 shrink-0">12 Ad Styles:</span>
              <select
                value={adData.templateId}
                onChange={(e) => setAdData({ ...adData, templateId: e.target.value as any })}
                aria-label="Select Ad Style"
                className="bg-[#171922] border border-white/15 text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-white/30 cursor-pointer font-medium"
              >
                <option value="ad-pricing-offer">💰 Direct Pricing & Sprint Offer</option>
                <option value="ad-split-showcase">💎 Modern Split Showcase & Rates</option>
                <option value="ad-modern-bento">🍏 Modern Bento Grid (Apple/Linear)</option>
                <option value="ad-minimalist-studio">✨ Swiss Studio Clean (Editorial)</option>
                <option value="ad-social-proof">🏆 Client Proof Spotlight (ROI)</option>
                <option value="ad-card-stack">📚 3D Layered Card Stack</option>
                <option value="ad-dark-aurora">🌌 Dark Aurora Neo (Glass)</option>
                <option value="ad-high-impact">⚡ High-Impact Offer (Direct Response)</option>
                <option value="ad-tech-glow">💻 Tech & Dev Glow (Code Terminal)</option>
                <option value="ad-clean-editorial">📰 Clean Editorial (Minimalist)</option>
                <option value="ad-problem-solution">⚖️ Problem vs Solution Split</option>
                <option value="ad-speed-metrics">⏱️ Speed & Lighthouse Metrics</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-[108px] z-30 bg-[#0A0B10] border-b border-white/10 p-2 flex">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'editor'
              ? 'bg-white/10 text-white shadow-xs'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Edit3 size={14} /> Edit Content & Settings
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'preview'
              ? 'bg-white/10 text-white shadow-xs'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Eye size={14} /> Live Canvas Preview
        </button>
      </div>

      {/* Main Split Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form Editor */}
          <div
            className={`lg:col-span-5 ${
              mobileTab === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            {activeMode === 'facebook-ad' ? (
              <FacebookAdForm
                data={adData}
                onChange={setAdData}
                onOpenBackgroundModal={() => setIsBackgroundModalOpen(true)}
              />
            ) : (
              <BrochureForm
                data={brochureData}
                onChange={setBrochureData}
                onOpenBackgroundModal={() => setIsBackgroundModalOpen(true)}
              />
            )}
          </div>

          {/* Right Column: Live High-Fidelity Canvas Preview */}
          <div
            className={`lg:col-span-7 flex flex-col items-center ${
              mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Canvas Toolbar */}
            <div className="w-full mb-3 flex items-center justify-between bg-[#13151E] border border-white/10 rounded-xl px-4 py-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">
                  {activeMode === 'facebook-ad'
                    ? `Live Meta Ad Preview (${adData.aspectRatio})`
                    : 'A4 Document Canvas'}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {activeMode === 'facebook-ad' ? 'High-Res 1080p Target' : 'Print Scale'}
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(50, prev - 10))}
                  className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="font-mono text-[11px] text-zinc-300 w-10 text-center">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(150, prev + 10))}
                  className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/5 transition-colors ml-1"
                  title="Reset Zoom to 100%"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>

            {/* Canvas Viewport Container */}
            <div className="w-full flex justify-center bg-[#07080D] border border-white/10 rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-2xl relative">
              <div
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out',
                }}
                className="w-full flex justify-center"
              >
                <div
                  ref={previewRef}
                  className="w-full max-w-[780px] shadow-2xl transition-all"
                >
                  {activeMode === 'facebook-ad' ? (
                    <FacebookAdRenderer data={adData} />
                  ) : (
                    <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                      <BrochureRenderer
                        templateId={activeBrochureTemplate}
                        data={brochureData}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Export Hint / Guide */}
            <div className="w-full mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>
                  {activeMode === 'facebook-ad'
                    ? 'Ready for direct upload to Meta / Facebook Ads Manager & Instagram Ads.'
                    : 'Print-ready A4 formatting with high-contrast text and crisp typography.'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleDownloadImage}
                className="font-bold underline hover:text-white transition-colors shrink-0"
              >
                Download PNG Now →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Background Selector Modal */}
      <BackgroundSelectorModal
        isOpen={isBackgroundModalOpen}
        config={currentBackgroundConfig}
        accentColor={currentAccent}
        onSave={handleSaveBackground}
        onClose={() => setIsBackgroundModalOpen(false)}
      />

      {/* Export Loading Overlay Modal */}
      {isExporting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#12141D] border border-white/10 p-6 rounded-2xl flex flex-col items-center max-w-sm text-center shadow-2xl">
            <Loader2 size={36} className="animate-spin text-[#CEFF00] mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">Generating High-Res Export</h3>
            <p className="text-xs text-zinc-400">{exportMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
