import React from 'react';
import { 
  Globe, 
  FileText, 
  Mail, 
  Phone, 
  Wifi, 
  MessageSquare, 
  Contact, 
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import { QRDataType, QRDataState } from '../types/qr';

interface QRDataInputProps {
  dataState: QRDataState;
  onChange: (newState: QRDataState) => void;
  onGenerate: () => void;
}

const DATA_TYPES: { id: QRDataType; label: string; icon: React.ElementType }[] = [
  { id: 'url', label: 'URL / Link', icon: Globe },
  { id: 'text', label: 'Plain Text', icon: FileText },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone Call', icon: Phone },
  { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'vcard', label: 'vCard Contact', icon: Contact },
  { id: 'sms', label: 'SMS Message', icon: Send }
];

export const QRDataInput: React.FC<QRDataInputProps> = ({
  dataState,
  onChange,
  onGenerate
}) => {
  const currentType = dataState.type;

  const setType = (type: QRDataType) => {
    onChange({
      ...dataState,
      type
    });
  };

  const fillSample = () => {
    switch (currentType) {
      case 'url':
        onChange({ ...dataState, url: 'https://github.com' });
        break;
      case 'text':
        onChange({ ...dataState, text: 'Hello from QRCraft! Scan me to reveal this secret note.' });
        break;
      case 'email':
        onChange({
          ...dataState,
          email: {
            to: 'hello@brandagency.com',
            subject: 'Partnership Inquiry',
            body: 'Hi team, I would love to connect regarding your recent project.'
          }
        });
        break;
      case 'phone':
        onChange({
          ...dataState,
          phone: { number: '+1 (555) 234-5678' }
        });
        break;
      case 'wifi':
        onChange({
          ...dataState,
          wifi: {
            ssid: 'Guest_HighSpeed_5G',
            password: 'SuperSecretPassword2026',
            encryption: 'WPA',
            hidden: false
          }
        });
        break;
      case 'whatsapp':
        onChange({
          ...dataState,
          whatsapp: {
            phone: '14155552671',
            message: 'Hi! I scanned your QR code and would like more information.'
          }
        });
        break;
      case 'vcard':
        onChange({
          ...dataState,
          vcard: {
            firstName: 'Alex',
            lastName: 'Morgan',
            organization: 'Starlight Studio Ltd',
            jobTitle: 'Creative Director',
            phone: '+1 (555) 987-6543',
            email: 'alex.morgan@starlight.design',
            website: 'https://starlight.design',
            address: '742 Evergreen Terrace, San Francisco, CA',
            note: 'Connect with me for branding & digital design projects.'
          }
        });
        break;
      case 'sms':
        onChange({
          ...dataState,
          sms: {
            number: '+15550192834',
            message: 'CONFIRM: RSVP for Annual Gala 2026'
          }
        });
        break;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 transition-all">
      {/* Type Switcher Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Step 1: Select QR Content Type
          </label>
          <button
            type="button"
            onClick={fillSample}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/70 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fill Sample Data</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DATA_TYPES.map(({ id, label, icon: Icon }) => {
            const isActive = currentType === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setType(id)}
                className={`flex items-center space-x-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 ring-2 ring-indigo-500/20 font-semibold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Form */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Step 2: Enter Content Details
        </label>

        {/* 1. URL */}
        {currentType === 'url' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Website or Landing Page URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={dataState.url}
                onChange={(e) => onChange({ ...dataState, url: e.target.value })}
                placeholder="https://example.com/my-page"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white transition-all"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Paste full link with https:// or http://. Users will be redirected directly on scan.
            </p>
          </div>
        )}

        {/* 2. Text */}
        {currentType === 'text' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Plain Text or Message
            </label>
            <textarea
              rows={4}
              value={dataState.text}
              onChange={(e) => onChange({ ...dataState, text: e.target.value })}
              placeholder="Enter text, instructions, serial number, or secret notes..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white transition-all resize-y"
            />
            <div className="flex justify-between mt-1 text-xs text-slate-500">
              <span>Plain text will display directly on the user's screen upon scanning.</span>
              <span>{dataState.text.length} chars</span>
            </div>
          </div>
        )}

        {/* 3. Email */}
        {currentType === 'email' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recipient Email Address *
              </label>
              <input
                type="email"
                value={dataState.email.to}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    email: { ...dataState.email, to: e.target.value }
                  })
                }
                placeholder="contact@company.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject Line (Optional)
              </label>
              <input
                type="text"
                value={dataState.email.subject}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    email: { ...dataState.email, subject: e.target.value }
                  })
                }
                placeholder="Inquiry / Feedback"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pre-filled Message Body (Optional)
              </label>
              <textarea
                rows={3}
                value={dataState.email.body}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    email: { ...dataState.email, body: e.target.value }
                  })
                }
                placeholder="Hello, I would like to learn more..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
              />
            </div>
          </div>
        )}

        {/* 4. Phone */}
        {currentType === 'phone' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone Number (with Country Code)
            </label>
            <input
              type="tel"
              value={dataState.phone.number}
              onChange={(e) =>
                onChange({
                  ...dataState,
                  phone: { number: e.target.value }
                })
              }
              placeholder="+1 555 123 4567"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              When scanned, phones will immediately prompt to dial this number.
            </p>
          </div>
        )}

        {/* 5. Wi-Fi */}
        {currentType === 'wifi' && (
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Network Name (SSID) *
              </label>
              <input
                type="text"
                value={dataState.wifi.ssid}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    wifi: { ...dataState.wifi, ssid: e.target.value }
                  })
                }
                placeholder="Office_Guest_WiFi"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Wi-Fi Password
                </label>
                <input
                  type="text"
                  value={dataState.wifi.password}
                  onChange={(e) =>
                    onChange({
                      ...dataState,
                      wifi: { ...dataState.wifi, password: e.target.value }
                    })
                  }
                  placeholder="Network password"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Security Encryption
                </label>
                <select
                  value={dataState.wifi.encryption}
                  onChange={(e) =>
                    onChange({
                      ...dataState,
                      wifi: {
                        ...dataState.wifi,
                        encryption: e.target.value as 'WPA' | 'WEP' | 'nopass'
                      }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                  <option value="WEP">WEP (Legacy)</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="wifi-hidden"
                checked={dataState.wifi.hidden}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    wifi: { ...dataState.wifi, hidden: e.target.checked }
                  })
                }
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <label htmlFor="wifi-hidden" className="text-xs text-slate-700 select-none cursor-pointer">
                This is a hidden Wi-Fi network (SSID broadcast disabled)
              </label>
            </div>
          </div>
        )}

        {/* 6. WhatsApp */}
        {currentType === 'whatsapp' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="tel"
                value={dataState.whatsapp.phone}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    whatsapp: { ...dataState.whatsapp, phone: e.target.value }
                  })
                }
                placeholder="14155552671 (digits only, e.g. 1 for US)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Chat Message (Optional)
              </label>
              <textarea
                rows={3}
                value={dataState.whatsapp.message}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    whatsapp: { ...dataState.whatsapp, message: e.target.value }
                  })
                }
                placeholder="Hi, I am reaching out from your QR code..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
              />
            </div>
          </div>
        )}

        {/* 7. vCard Contact */}
        {currentType === 'vcard' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={dataState.vcard.firstName}
                  onChange={(e) =>
                    onChange({
                      ...dataState,
                      vcard: { ...dataState.vcard, firstName: e.target.value }
                    })
                  }
                  placeholder="Jane"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={dataState.vcard.lastName}
                  onChange={(e) =>
                    onChange({
                      ...dataState,
                      vcard: { ...dataState.vcard, lastName: e.target.value }
                    })
                  }
                  placeholder="Doe"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / Company</label>
                <input
                  type="text"
                  value={dataState.vcard.organization}
                  onChange={(e) =>
                    onChange({
                      ...dataState,
                      vcard: { ...dataState.vcard, organization: e.target.value }
                    })
                  }
                  placeholder="Acme Corp"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={dataState.vcard.jobTitle}
                  onChange={(e) =>
                    onChange({
                      ...dataState,
                      vcard: { ...dataState.vcard, jobTitle: e.target.value }
                    })
                  }
                  placeholder="Product Lead"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={dataState.vcard.phone}
                  onChange={(e) =>
                    onChange({
                      ...dataState,
                      vcard: { ...dataState.vcard, phone: e.target.value }
                    })
                  }
                  placeholder="+1 555 333 4444"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={dataState.vcard.email}
                  onChange={(e) =>
                    onChange({
                      ...dataState,
                      vcard: { ...dataState.vcard, email: e.target.value }
                    })
                  }
                  placeholder="jane@acme.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL</label>
              <input
                type="text"
                value={dataState.vcard.website}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    vcard: { ...dataState.vcard, website: e.target.value }
                  })
                }
                placeholder="https://acme.com"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
              />
            </div>
          </div>
        )}

        {/* 8. SMS */}
        {currentType === 'sms' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={dataState.sms.number}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    sms: { ...dataState.sms, number: e.target.value }
                  })
                }
                placeholder="+1 555 789 0123"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">SMS Message</label>
              <textarea
                rows={3}
                value={dataState.sms.message}
                onChange={(e) =>
                  onChange({
                    ...dataState,
                    sms: { ...dataState.sms, message: e.target.value }
                  })
                }
                placeholder="Type pre-composed SMS message..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 bg-white"
              />
            </div>
          </div>
        )}

        {/* Generate / Update Trigger Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onGenerate}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Generate & Update QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
