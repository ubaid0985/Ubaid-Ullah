import { QRDataState } from '../types/qr';

export function generateQRPayload(state: QRDataState): string {
  switch (state.type) {
    case 'url': {
      let url = state.url.trim();
      if (!url) return 'https://google.com';
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      return url;
    }

    case 'text': {
      return state.text.trim() || 'Welcome to QRCraft!';
    }

    case 'email': {
      const { to, subject, body } = state.email;
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (body) params.append('body', body);
      const query = params.toString();
      return `mailto:${to.trim()}${query ? `?${query}` : ''}`;
    }

    case 'phone': {
      const num = state.phone.number.trim().replace(/\s+/g, '');
      return `tel:${num || '+1234567890'}`;
    }

    case 'sms': {
      const num = state.sms.number.trim().replace(/\s+/g, '');
      const body = encodeURIComponent(state.sms.message.trim());
      return `sms:${num}${body ? `?body=${body}` : ''}`;
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = state.wifi;
      // Format: WIFI:S:MySSID;T:WPA;P:MyPassword;H:false;;
      const s = ssid.replace(/([\\;,:"])/g, '\\$1');
      const p = password.replace(/([\\;,:"])/g, '\\$1');
      const t = encryption === 'nopass' ? 'nopass' : encryption;
      const h = hidden ? 'true' : 'false';
      return `WIFI:S:${s};T:${t};P:${p};H:${h};;`;
    }

    case 'whatsapp': {
      const phone = state.whatsapp.phone.replace(/[^0-9]/g, '');
      const text = encodeURIComponent(state.whatsapp.message.trim());
      if (phone) {
        return `https://wa.me/${phone}${text ? `?text=${text}` : ''}`;
      }
      return `https://wa.me/?text=${text || 'Hello'}`;
    }

    case 'vcard': {
      const { firstName, lastName, organization, jobTitle, phone, email, website, address, note } = state.vcard;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName || ''};${firstName || ''};;;`,
        `FN:${[firstName, lastName].filter(Boolean).join(' ') || 'Contact Person'}`,
        organization ? `ORG:${organization}` : '',
        jobTitle ? `TITLE:${jobTitle}` : '',
        phone ? `TEL;TYPE=CELL:${phone}` : '',
        email ? `EMAIL;TYPE=INTERNET:${email}` : '',
        website ? `URL:${website}` : '',
        address ? `ADR;TYPE=WORK:;;${address};;;;` : '',
        note ? `NOTE:${note}` : '',
        'END:VCARD'
      ].filter(Boolean).join('\n');
    }

    default:
      return 'https://google.com';
  }
}

export function getReadableSummary(state: QRDataState): { title: string; subtitle: string } {
  switch (state.type) {
    case 'url':
      return {
        title: state.url ? state.url : 'Default Web Link',
        subtitle: 'Website URL'
      };
    case 'text':
      return {
        title: state.text ? (state.text.slice(0, 32) + (state.text.length > 32 ? '...' : '')) : 'Plain Text',
        subtitle: 'Plain text note'
      };
    case 'email':
      return {
        title: state.email.to || 'recipient@example.com',
        subtitle: `Email${state.email.subject ? `: ${state.email.subject}` : ''}`
      };
    case 'phone':
      return {
        title: state.phone.number || 'Phone number',
        subtitle: 'Direct Phone Call'
      };
    case 'sms':
      return {
        title: state.sms.number || 'SMS Recipient',
        subtitle: 'Text Message'
      };
    case 'wifi':
      return {
        title: state.wifi.ssid || 'Wi-Fi Network',
        subtitle: `${state.wifi.encryption} Security`
      };
    case 'whatsapp':
      return {
        title: state.whatsapp.phone ? `+${state.whatsapp.phone}` : 'WhatsApp Link',
        subtitle: 'WhatsApp Chat'
      };
    case 'vcard':
      return {
        title: [state.vcard.firstName, state.vcard.lastName].filter(Boolean).join(' ') || 'Business Card',
        subtitle: state.vcard.jobTitle || state.vcard.organization || 'Contact Profile'
      };
    default:
      return { title: 'QR Code', subtitle: 'General' };
  }
}
