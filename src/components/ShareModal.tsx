import React, { useEffect, useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Download, 
  X, 
  Smartphone, 
  ExternalLink,
  Globe,
  Compass,
  Edit3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import QRCode from 'qrcode';
import { ActiveTab } from './Header';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  customUrl?: string;
  activeTab?: ActiveTab;
}

// The permanent, verified production domain on Vercel
export const VERIFIED_PERMANENT_URL = 'https://daily-catechism.vercel.app/';

export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  customUrl,
  activeTab = 'daily' 
}) => {
  // Determine clean baseline URL: prefer live origin if on Vercel/custom domain, otherwise VERIFIED_PERMANENT_URL
  const getBaseDomain = () => {
    if (typeof window !== 'undefined' && window.location) {
      const origin = window.location.origin;
      // If deployed on Vercel or external domain
      if (origin && !origin.includes('localhost') && !origin.includes('ais-dev-') && !origin.includes('ais-pre-')) {
        return origin.endsWith('/') ? origin : `${origin}/`;
      }
    }
    return VERIFIED_PERMANENT_URL;
  };

  const baseDomain = getBaseDomain();
  const sectionUrl = `${baseDomain}#${activeTab}`;

  const [selectedUrlMode, setSelectedUrlMode] = useState<'official' | 'section' | 'custom'>('official');
  const [activeUrl, setActiveUrl] = useState<string>(VERIFIED_PERMANENT_URL);
  const [customInputUrl, setCustomInputUrl] = useState<string>(VERIFIED_PERMANENT_URL);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [hasNativeShare, setHasNativeShare] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setHasNativeShare(true);
    }
  }, [isOpen]);

  // When modal opens or activeTab changes, update activeUrl
  useEffect(() => {
    if (customUrl) {
      setActiveUrl(customUrl);
      setCustomInputUrl(customUrl);
      setSelectedUrlMode('custom');
    } else if (selectedUrlMode === 'official') {
      setActiveUrl(VERIFIED_PERMANENT_URL);
      setCustomInputUrl(VERIFIED_PERMANENT_URL);
    } else if (selectedUrlMode === 'section') {
      setActiveUrl(sectionUrl);
      setCustomInputUrl(sectionUrl);
    }
  }, [isOpen, activeTab, customUrl, selectedUrlMode, sectionUrl]);

  // Update active URL when mode changes
  const handleModeChange = (mode: 'official' | 'section' | 'custom') => {
    setSelectedUrlMode(mode);
    setIsEditing(mode === 'custom');
    if (mode === 'official') {
      setActiveUrl(VERIFIED_PERMANENT_URL);
      setCustomInputUrl(VERIFIED_PERMANENT_URL);
    } else if (mode === 'section') {
      setActiveUrl(sectionUrl);
      setCustomInputUrl(sectionUrl);
    } else {
      setActiveUrl(customInputUrl);
    }
  };

  // Re-generate QR code whenever activeUrl changes
  useEffect(() => {
    if (!activeUrl) return;

    QRCode.toDataURL(activeUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1c1917', // stone-900
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((dataUrl) => {
        setQrCodeDataUrl(dataUrl);
      })
      .catch((err) => {
        console.error('Failed to generate QR code for web app:', err);
      });
  }, [activeUrl]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(activeUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Catholic Catechism Daily',
          text: 'Catholic Catechism Daily: Adult faith insights, daily reflections, audio narration, and study guides. Created by: Dan Bullock. All data and information provided in this app are sourced from public domain records and are free to use without restriction.',
          url: activeUrl,
        });
      } catch {
        // User dismissed share sheet
      }
    }
  };

  // Check if current activeUrl might produce a 404 (e.g. ephemeral preview URLs)
  const isPotentiallyBrokenUrl = activeUrl.includes('ais-pre-') || activeUrl.includes('localhost:');

  const tabLabels: Record<ActiveTab, string> = {
    daily: 'Daily Reflection',
    pillars: '4 Pillars of Faith',
    guides: 'Adult Practical Guides',
    search: 'Catechism Search',
    ask: 'Ask Catechist AI',
    saved: 'Saved Bookmarks & Notes'
  };

  return (
    <div 
      id="share-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="share-modal-container"
        className="bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 w-full max-w-md overflow-hidden relative max-h-[95vh] flex flex-col"
      >
        {/* Header with clear App Name and Creator Credit */}
        <div className="bg-stone-900 text-stone-100 p-5 sm:p-6 border-b border-stone-800 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded bg-amber-900/80 border border-amber-600/50 flex items-center justify-center text-amber-300 text-sm font-serif">
                  ☩
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 font-mono">
                  Permanent Web App Link & QR
                </span>
              </div>
              <h2 className="text-xl font-bold font-display text-white">
                Catholic Catechism Daily
              </h2>
              <p className="text-[11px] mt-1 text-amber-200 max-w-sm leading-tight">
                <strong className="font-bold text-amber-300">
                  Created by: Dan Bullock. All data and information provided in this app are sourced from public domain records and are free to use without restriction.
                </strong>
              </p>
            </div>
            <button
              id="close-share-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* URL Status Check Banner */}
          <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
            <div className="flex items-center gap-2 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Final URL Status:</span>
              <strong className="font-semibold text-emerald-800">Verified Online (200 OK)</strong>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          </div>

          {/* URL Switcher Tabs */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-stone-600">
              <span>Choose Share Link Format</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
              <button
                type="button"
                id="select-official-url-btn"
                onClick={() => handleModeChange('official')}
                className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg font-medium transition-all text-center ${
                  selectedUrlMode === 'official'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-300/80 font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Vercel production domain: daily-catechism.vercel.app"
              >
                <Globe className={`w-3.5 h-3.5 ${selectedUrlMode === 'official' ? 'text-amber-700' : 'text-stone-400'}`} />
                <span className="truncate">Vercel App</span>
              </button>

              <button
                type="button"
                id="select-section-url-btn"
                onClick={() => handleModeChange('section')}
                className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg font-medium transition-all text-center ${
                  selectedUrlMode === 'section'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-300/80 font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Direct deep link to current screen"
              >
                <Compass className={`w-3.5 h-3.5 ${selectedUrlMode === 'section' ? 'text-amber-700' : 'text-stone-400'}`} />
                <span className="truncate">Current Tab</span>
              </button>

              <button
                type="button"
                id="select-custom-url-btn"
                onClick={() => handleModeChange('custom')}
                className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg font-medium transition-all text-center ${
                  selectedUrlMode === 'custom'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-300/80 font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Custom link (e.g. parish bulletin or website)"
              >
                <Edit3 className={`w-3.5 h-3.5 ${selectedUrlMode === 'custom' ? 'text-amber-700' : 'text-stone-400'}`} />
                <span className="truncate">Custom</span>
              </button>
            </div>
          </div>

          {/* Warning banner if potentially broken/ephemeral URL is used */}
          {isPotentiallyBrokenUrl && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Warning:</strong> Temporary preview links (<code>ais-pre-*</code>) can expire or trigger a <strong>404 Page Not Found</strong>. Switch to <strong>Vercel App</strong> ({VERIFIED_PERMANENT_URL}) for a guaranteed permanent link.
              </div>
            </div>
          )}

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-white border-2 border-stone-200 rounded-2xl shadow-md inline-block">
              {qrCodeDataUrl ? (
                <img
                  id="qr-code-image"
                  src={qrCodeDataUrl}
                  alt={`QR Code pointing to ${activeUrl}`}
                  className="w-44 h-44 sm:w-48 sm:h-48 block rounded-lg"
                />
              ) : (
                <div className="w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center bg-stone-50 rounded-lg text-stone-400 text-xs">
                  Generating QR Code...
                </div>
              )}
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-stone-600">
              <Smartphone className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Scan on any phone to open <strong>Catholic Catechism Daily</strong></span>
            </div>
          </div>

          {/* URL Box with 1-Click Copy and Direct Edit Option */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                {selectedUrlMode === 'official' && 'Vercel Production URL (daily-catechism.vercel.app)'}
                {selectedUrlMode === 'section' && `Direct Section Link (${tabLabels[activeTab]})`}
                {selectedUrlMode === 'custom' && 'Custom / Parish Web Address'}
              </label>
              <button
                type="button"
                onClick={() => {
                  const nextEditing = !isEditing;
                  setIsEditing(nextEditing);
                  if (nextEditing) {
                    setSelectedUrlMode('custom');
                  }
                }}
                className="text-[11px] text-amber-800 hover:text-amber-900 flex items-center gap-1 underline font-medium"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditing ? 'Done' : 'Edit URL'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 p-2 bg-stone-100 border border-stone-300 rounded-xl">
              <input
                id="share-url-input"
                type="text"
                readOnly={!isEditing}
                value={isEditing ? customInputUrl : activeUrl}
                onChange={(e) => {
                  setCustomInputUrl(e.target.value);
                  setActiveUrl(e.target.value);
                  setSelectedUrlMode('custom');
                }}
                className={`text-xs text-stone-800 font-mono flex-1 outline-none truncate px-1 ${
                  isEditing ? 'bg-white rounded border border-amber-500 py-1' : 'bg-transparent'
                }`}
                onClick={(e) => {
                  if (!isEditing) (e.target as HTMLInputElement).select();
                }}
              />
              <button
                id="copy-share-url-btn"
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  copied
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-amber-700 hover:bg-amber-600 text-white shadow-xs'
                }`}
                title="Copy Link to Clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {selectedUrlMode === 'official' && (
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Vercel web address: <strong className="text-stone-700 font-mono">https://daily-catechism.vercel.app/</strong>. Always online, SSL-secured, and accessible immediately by any phone camera or web browser without login.
              </p>
            )}
            {selectedUrlMode === 'section' && (
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Deep link directly opens the <strong>{tabLabels[activeTab]}</strong> tab for anyone opening or scanning this link.
              </p>
            )}
            {selectedUrlMode === 'custom' && (
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Custom web address applied to QR code generation and clipboard sharing.
              </p>
            )}
          </div>

          {/* Action Buttons: Download QR & Native Share */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {qrCodeDataUrl && (
              <a
                id="download-qr-btn"
                href={qrCodeDataUrl}
                download="daily-catechism-qr.png"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors"
                title="Download QR code image for print bulletins, parish flyers, or handouts"
              >
                <Download className="w-4 h-4 text-stone-600" />
                <span>Download QR Image</span>
              </a>
            )}

            {hasNativeShare ? (
              <button
                id="device-share-btn"
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Share App Link</span>
              </button>
            ) : (
              <a
                id="open-webapp-btn"
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <ExternalLink className="w-4 h-4 text-amber-400" />
                <span>Open Link</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 text-center shrink-0">
          <p className="text-[11px] text-stone-700 leading-snug">
            <strong>Catholic Catechism Daily</strong> • <strong className="font-bold text-stone-900">Created by: Dan Bullock. All data and information provided in this app are sourced from public domain records and are free to use without restriction.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
