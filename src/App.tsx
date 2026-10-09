import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QRDataInput } from './components/QRDataInput';
import { DesignControls } from './components/DesignControls';
import { QRPreview } from './components/QRPreview';
import { TemplatesGallery } from './components/TemplatesGallery';
import { CustomDesignerPage } from './components/CustomDesignerPage';
import { QRScannerView } from './components/QRScannerView';
import { HistorySection } from './components/HistorySection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { QRDataState, QRStylingConfig, QRHistoryItem, QRTemplate } from './types/qr';
import { DEFAULT_STYLING } from './utils/qrPresets';
import { generateQRPayload, getReadableSummary } from './utils/qrPayload';

const INITIAL_DATA_STATE: QRDataState = {
  type: 'url',
  url: 'https://google.com',
  text: 'Hello from QRCraft!',
  email: {
    to: 'hello@brandagency.com',
    subject: 'Inquiry',
    body: 'Hi, I would like to get in touch.'
  },
  phone: {
    number: '+15552345678'
  },
  sms: {
    number: '+15550192834',
    message: 'Hello! I am sending an inquiry.'
  },
  wifi: {
    ssid: 'Guest_WiFi_Network',
    password: 'Password1234',
    encryption: 'WPA',
    hidden: false
  },
  whatsapp: {
    phone: '14155552671',
    message: 'Hi! Reaching out via your QR code.'
  },
  vcard: {
    firstName: 'Alex',
    lastName: 'Morgan',
    organization: 'Creative Studio',
    jobTitle: 'Design Lead',
    phone: '+1 555 987 6543',
    email: 'alex@creativestudio.com',
    website: 'https://creativestudio.com',
    address: 'San Francisco, CA',
    note: 'Let us collaborate!'
  }
};

const STORAGE_KEY_HISTORY = 'qrcraft_history_items_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('generator');
  const [dataState, setDataState] = useState<QRDataState>(INITIAL_DATA_STATE);
  const [stylingConfig, setStylingConfig] = useState<QRStylingConfig>(DEFAULT_STYLING);
  const [historyItems, setHistoryItems] = useState<QRHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Keep history synced with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(historyItems));
    } catch (e) {
      console.error(e);
    }
  }, [historyItems]);

  // Generate current payload string from user input
  const currentPayload = useMemo(() => {
    return generateQRPayload(dataState);
  }, [dataState]);

  const summary = useMemo(() => {
    return getReadableSummary(dataState);
  }, [dataState]);

  // Reset all settings
  const handleReset = () => {
    if (window.confirm('Reset all styling and input back to default?')) {
      setDataState(INITIAL_DATA_STATE);
      setStylingConfig(DEFAULT_STYLING);
    }
  };

  // Quick generation from Hero
  const handleHeroGenerate = (url: string) => {
    setDataState((prev) => ({
      ...prev,
      type: 'url',
      url
    }));
    setActiveTab('generator');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Apply template preset
  const handleApplyTemplate = (template: QRTemplate) => {
    setStylingConfig((prev) => ({
      ...prev,
      ...template.styling
    }));
    setActiveTab('generator');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Save item to history
  const handleSaveHistory = (item: Omit<QRHistoryItem, 'id' | 'createdAt'>) => {
    const newItem: QRHistoryItem = {
      ...item,
      id: `qr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: Date.now()
    };
    setHistoryItems((prev) => [newItem, ...prev.slice(0, 49)]); // keep up to 50
  };

  // Load history item into generator
  const handleLoadHistory = (item: QRHistoryItem) => {
    setStylingConfig(item.styling);
    // Parse or load payload into dataState
    if (/^https?:\/\//i.test(item.payload)) {
      setDataState((prev) => ({ ...prev, type: 'url', url: item.payload }));
    } else if (/^WIFI:/i.test(item.payload)) {
      setDataState((prev) => ({ ...prev, type: 'wifi' }));
    } else {
      setDataState((prev) => ({ ...prev, type: 'text', text: item.payload }));
    }
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear your QR history?')) {
      setHistoryItems([]);
    }
  };

  // Load decoded data from scanner into generator
  const handleLoadScannerData = (decoded: string) => {
    if (/^https?:\/\//i.test(decoded)) {
      setDataState((prev) => ({ ...prev, type: 'url', url: decoded }));
    } else if (decoded.startsWith('mailto:')) {
      setDataState((prev) => ({
        ...prev,
        type: 'email',
        email: { ...prev.email, to: decoded.replace('mailto:', '') }
      }));
    } else if (decoded.startsWith('tel:')) {
      setDataState((prev) => ({
        ...prev,
        type: 'phone',
        phone: { number: decoded.replace('tel:', '') }
      }));
    } else {
      setDataState((prev) => ({ ...prev, type: 'text', text: decoded }));
    }
    setActiveTab('generator');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
        historyCount={historyItems.length}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* VIEW 1: Generator (Home) */}
        {activeTab === 'generator' && (
          <div>
            <HeroSection
              onQuickGenerate={handleHeroGenerate}
              currentUrl={dataState.url}
            />

            {/* Generator Core Layout */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 Columns: Input Forms & Styling Controls */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Content Inputs */}
                  <QRDataInput
                    dataState={dataState}
                    onChange={setDataState}
                    onGenerate={() => {
                      // Smooth scroll to preview on mobile
                      if (window.innerWidth < 1024) {
                        window.scrollTo({ top: 900, behavior: 'smooth' });
                      }
                    }}
                  />

                  {/* Design Controls */}
                  <DesignControls
                    config={stylingConfig}
                    onChange={setStylingConfig}
                  />
                </div>

                {/* Right 5 Columns: Live Preview & Export Action Center */}
                <div className="lg:col-span-5">
                  <QRPreview
                    payload={currentPayload}
                    config={stylingConfig}
                    onSaveHistory={handleSaveHistory}
                    summaryTitle={summary.title}
                  />
                </div>
              </div>
            </section>

            {/* Featured Templates Showcase */}
            <TemplatesGallery
              currentPayload={currentPayload}
              onApplyTemplate={handleApplyTemplate}
            />

            {/* Feature Highlights */}
            <FeaturesSection />
          </div>
        )}

        {/* VIEW 2: Dedicated Custom QR Designer */}
        {activeTab === 'designer' && (
          <CustomDesignerPage
            payload={currentPayload}
            dataState={dataState}
            config={stylingConfig}
            onChangeConfig={setStylingConfig}
            onResetConfig={() => setStylingConfig(DEFAULT_STYLING)}
            onSaveHistory={handleSaveHistory}
            onBackToGenerator={() => setActiveTab('generator')}
          />
        )}

        {/* VIEW 3: Templates Gallery Full Page */}
        {activeTab === 'templates' && (
          <div className="py-6">
            <TemplatesGallery
              currentPayload={currentPayload}
              onApplyTemplate={handleApplyTemplate}
            />
          </div>
        )}

        {/* VIEW 4: Scan & Test Tool */}
        {activeTab === 'scanner' && (
          <QRScannerView onLoadIntoGenerator={handleLoadScannerData} />
        )}

        {/* VIEW 5: History */}
        {activeTab === 'history' && (
          <HistorySection
            items={historyItems}
            onLoadItem={handleLoadHistory}
            onDeleteItem={handleDeleteHistory}
            onClearAll={handleClearAllHistory}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
