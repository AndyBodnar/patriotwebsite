'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useAPIConnections } from '@/contexts/APIConnectionsContext';
import {
  Settings, Key, Eye, EyeOff, CheckCircle, XCircle, ExternalLink, RefreshCw,
  Search, BarChart3, Activity, Link as LinkIcon, Award, Zap, MapPin, Star,
  Layers, Video, Target, Globe, Mail, Smartphone, MessageSquare, Webhook,
  AlertTriangle, LogIn
} from 'lucide-react';

interface APIServiceConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  docsUrl: string;
  fields: { key: string; label: string; placeholder: string; type?: string }[];
}

const seoServices: APIServiceConfig[] = [
  {
    id: 'googleSearchConsole',
    name: 'Google Search Console',
    icon: <Search className="w-5 h-5" />,
    description: 'Track keyword rankings and search performance',
    docsUrl: 'https://search.google.com/search-console',
    fields: [{ key: 'note', label: 'OAuth Connection', placeholder: 'Click Connect to authenticate with Google', type: 'oauth' }],
  },
  {
    id: 'googleAnalytics',
    name: 'Google Analytics 4',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Traffic analytics and user behavior',
    docsUrl: 'https://analytics.google.com',
    fields: [{ key: 'note', label: 'OAuth Connection', placeholder: 'Click Connect to authenticate with Google', type: 'oauth' }],
  },
  {
    id: 'semrush',
    name: 'SEMrush',
    icon: <Activity className="w-5 h-5" />,
    description: 'Site audits and keyword research',
    docsUrl: 'https://www.semrush.com/api-analytics/',
    fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'Enter your SEMrush API key' }],
  },
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    icon: <LinkIcon className="w-5 h-5" />,
    description: 'Backlink analysis and monitoring',
    docsUrl: 'https://ahrefs.com/api',
    fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'Enter your Ahrefs API key' }],
  },
  {
    id: 'moz',
    name: 'Moz',
    icon: <Award className="w-5 h-5" />,
    description: 'Domain authority and link metrics',
    docsUrl: 'https://moz.com/products/api',
    fields: [
      { key: 'accessId', label: 'Access ID', placeholder: 'Enter your Moz Access ID' },
      { key: 'secretKey', label: 'Secret Key', placeholder: 'Enter your Moz Secret Key' },
    ],
  },
  {
    id: 'pageSpeedInsights',
    name: 'PageSpeed Insights',
    icon: <Zap className="w-5 h-5" />,
    description: 'Core Web Vitals and performance',
    docsUrl: 'https://developers.google.com/speed/docs/insights/v5/get-started',
    fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'Enter your Google API key' }],
  },
  {
    id: 'brightLocal',
    name: 'BrightLocal',
    icon: <MapPin className="w-5 h-5" />,
    description: 'Local SEO and citation tracking',
    docsUrl: 'https://www.brightlocal.com/api/',
    fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'Enter your BrightLocal API key' }],
  },
];

const analyticsServices: APIServiceConfig[] = [
  {
    id: 'hotjar',
    name: 'Hotjar',
    icon: <Layers className="w-5 h-5" />,
    description: 'Heatmaps and user recordings',
    docsUrl: 'https://www.hotjar.com',
    fields: [
      { key: 'siteId', label: 'Site ID', placeholder: 'Enter your Hotjar Site ID' },
      { key: 'apiKey', label: 'API Key', placeholder: 'Enter your Hotjar API key' },
    ],
  },
  {
    id: 'fullStory',
    name: 'FullStory',
    icon: <Video className="w-5 h-5" />,
    description: 'Session recordings and analytics',
    docsUrl: 'https://www.fullstory.com',
    fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'Enter your FullStory API key' }],
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    icon: <Activity className="w-5 h-5" />,
    description: 'Product analytics and events',
    docsUrl: 'https://mixpanel.com',
    fields: [
      { key: 'projectToken', label: 'Project Token', placeholder: 'Enter your Mixpanel project token' },
      { key: 'apiSecret', label: 'API Secret', placeholder: 'Enter your Mixpanel API secret' },
    ],
  },
  {
    id: 'ipGeolocation',
    name: 'IP Geolocation (IPInfo)',
    icon: <Globe className="w-5 h-5" />,
    description: 'Visitor location and VPN detection',
    docsUrl: 'https://ipinfo.io',
    fields: [{ key: 'apiKey', label: 'API Token', placeholder: 'Enter your IPInfo token' }],
  },
];

const competitiveServices: APIServiceConfig[] = [
  {
    id: 'similarWeb',
    name: 'SimilarWeb',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Traffic estimates and market analysis',
    docsUrl: 'https://www.similarweb.com/corp/developer/',
    fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'Enter your SimilarWeb API key' }],
  },
  {
    id: 'spyFu',
    name: 'SpyFu',
    icon: <Target className="w-5 h-5" />,
    description: 'Competitor keyword analysis',
    docsUrl: 'https://www.spyfu.com/api',
    fields: [{ key: 'apiKey', label: 'API Key', placeholder: 'Enter your SpyFu API key' }],
  },
];

const notificationServices: APIServiceConfig[] = [
  {
    id: 'sendgrid',
    name: 'SendGrid',
    icon: <Mail className="w-5 h-5" />,
    description: 'Email notifications and alerts',
    docsUrl: 'https://sendgrid.com/docs/api-reference/',
    fields: [
      { key: 'apiKey', label: 'API Key', placeholder: 'Enter your SendGrid API key' },
      { key: 'fromEmail', label: 'From Email', placeholder: 'alerts@yourdomain.com' },
    ],
  },
  {
    id: 'twilio',
    name: 'Twilio',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'SMS notifications for critical alerts',
    docsUrl: 'https://www.twilio.com/docs/sms',
    fields: [
      { key: 'accountSid', label: 'Account SID', placeholder: 'Enter your Twilio Account SID' },
      { key: 'authToken', label: 'Auth Token', placeholder: 'Enter your Twilio Auth Token' },
      { key: 'fromNumber', label: 'From Number', placeholder: '+1234567890' },
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'Team notifications via Slack',
    docsUrl: 'https://api.slack.com/messaging/webhooks',
    fields: [{ key: 'webhookUrl', label: 'Webhook URL', placeholder: 'https://hooks.slack.com/services/...' }],
  },
  {
    id: 'webhooks',
    name: 'Custom Webhooks',
    icon: <Webhook className="w-5 h-5" />,
    description: 'Send alerts to custom endpoints',
    docsUrl: '',
    fields: [
      { key: 'url', label: 'Webhook URL', placeholder: 'https://your-api.com/webhook' },
      { key: 'secret', label: 'Secret Key (optional)', placeholder: 'For webhook signature verification' },
    ],
  },
];

function APIServiceCard({ service }: { service: APIServiceConfig }) {
  const { connections, saveApiKey, disconnectService, updateConnection } = useAPIConnections();
  const connection = connections[service.id as keyof typeof connections];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const mainKey = service.fields[0]?.key === 'note' ? '' : formData[service.fields[0].key] || '';
    await saveApiKey(service.id, mainKey);
    setSaving(false);
  };

  const handleDisconnect = async () => {
    await disconnectService(service.id);
    setFormData({});
  };

  const handleTest = async () => {
    setTesting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTesting(false);
  };

  const handleOAuthConnect = () => {
    // Redirect to OAuth endpoint
    window.location.href = `/api/auth/google?service=${service.id}`;
  };

  const isOAuth = service.fields[0]?.type === 'oauth';

  return (
    <div className={`p-4 bg-patriot-darkNavy rounded-lg border-2 ${connection?.connected ? 'border-green-500/50' : 'border-phoenix-coral/30'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${connection?.connected ? 'bg-green-500/20 text-green-400' : 'bg-phoenix-coral/20 text-phoenix-coral'}`}>
            {service.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-desert-tan font-bold">{service.name}</p>
              {connection?.connected && <CheckCircle className="w-4 h-4 text-green-400" />}
            </div>
            <p className="text-desert-sand text-xs">{service.description}</p>
          </div>
        </div>
        {service.docsUrl && (
          <a href={service.docsUrl} target="_blank" rel="noopener noreferrer" className="text-phoenix-coral hover:underline text-xs flex items-center gap-1">
            Docs <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {connection?.connected ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-900/20 rounded">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-bold">Connected</span>
            </div>
            {connection.lastSynced && (
              <span className="text-desert-sand text-xs">
                Last synced: {new Date(connection.lastSynced).toLocaleDateString()}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={handleTest} disabled={testing} className="flex-1 px-3 py-2 bg-patriot-navy border border-phoenix-coral/30 text-desert-tan rounded text-sm font-bold hover:border-phoenix-coral transition-colors flex items-center justify-center gap-2">
              {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Test
            </button>
            <button onClick={handleDisconnect} className="flex-1 px-3 py-2 bg-red-900/20 border border-red-500 text-red-400 rounded text-sm font-bold hover:bg-red-500 hover:text-white transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      ) : isOAuth ? (
        <button
          onClick={handleOAuthConnect}
          className="w-full px-4 py-3 bg-phoenix-gradient text-white rounded font-bold hover:opacity-90 flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Connect with Google
        </button>
      ) : (
        <div className="space-y-3">
          {service.fields.map(field => (
            <div key={field.key}>
              <label className="text-desert-sand text-xs font-bold block mb-1">{field.label}</label>
              <div className="relative">
                <input
                  type={showKeys[field.key] ? 'text' : 'password'}
                  placeholder={field.placeholder}
                  value={formData[field.key] || ''}
                  onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full bg-patriot-navy border-2 border-phoenix-coral/30 rounded px-3 py-2 text-desert-tan text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKeys(prev => ({ ...prev, [field.key]: !prev[field.key] }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-desert-sand hover:text-phoenix-coral"
                >
                  {showKeys[field.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleSave}
            disabled={saving || !service.fields.some(f => formData[f.key])}
            className="w-full px-4 py-2 bg-phoenix-gradient text-white rounded font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
            Save & Connect
          </button>
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const { connections, updateConnection } = useAPIConnections();
  const connectedCount = Object.values(connections).filter(c => c.connected).length;
  const totalCount = Object.keys(connections).length;
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Handle OAuth callback
  useEffect(() => {
    const oauthSuccess = searchParams.get('oauth_success');
    const error = searchParams.get('error');
    const service = searchParams.get('service');

    if (oauthSuccess) {
      // Check for token data in hash
      if (window.location.hash) {
        try {
          const tokenData = JSON.parse(decodeURIComponent(window.location.hash.slice(1)));
          updateConnection(tokenData.serviceId, {
            connected: true,
            accessToken: tokenData.accessToken,
            refreshToken: tokenData.refreshToken,
            expiresAt: tokenData.expiresAt,
            lastSynced: new Date().toISOString(),
          });
          setNotification({ type: 'success', message: `Successfully connected ${oauthSuccess}!` });
          // Clear hash
          window.history.replaceState(null, '', window.location.pathname + window.location.search.replace(/oauth_success=[^&]*&?/, ''));
        } catch (e) {
          console.error('Failed to parse OAuth tokens:', e);
        }
      }
    }

    if (error) {
      const errorMessages: Record<string, string> = {
        oauth_not_configured: 'OAuth is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your environment.',
        oauth_denied: 'OAuth authorization was denied.',
        no_code: 'No authorization code received.',
        token_exchange_failed: 'Failed to exchange authorization code for tokens.',
        oauth_failed: 'OAuth authentication failed.',
      };
      setNotification({ type: 'error', message: errorMessages[error] || 'OAuth failed.' });
      // Clear error from URL
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [searchParams, updateConnection]);

  // Auto-hide notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-desert-tan mb-2">API Configuration</h1>
            <p className="text-desert-sand">Connect your SEO and analytics tools</p>
          </div>
          <div className="text-right">
            <p className="text-phoenix-coral font-bold text-2xl">{connectedCount}/{totalCount}</p>
            <p className="text-desert-sand text-sm">Connected</p>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`p-4 rounded-lg border-2 ${notification.type === 'success' ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              )}
              <p className={`font-bold ${notification.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {notification.message}
              </p>
            </div>
          </div>
        )}

        {connectedCount === 0 && (
          <div className="bg-yellow-900/20 border-2 border-yellow-500/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-yellow-400 font-bold mb-1">No APIs Connected</h3>
                <p className="text-desert-sand text-sm">
                  Connect your SEO and analytics tools below to start tracking real data in your dashboard.
                </p>
              </div>
            </div>
          </div>
        )}

        <DashboardCard title="SEO Tools">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seoServices.map(service => (
              <APIServiceCard key={service.id} service={service} />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Analytics & Behavior">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsServices.map(service => (
              <APIServiceCard key={service.id} service={service} />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Competitive Intelligence">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitiveServices.map(service => (
              <APIServiceCard key={service.id} service={service} />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Notifications & Alerts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notificationServices.map(service => (
              <APIServiceCard key={service.id} service={service} />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Data Management">
          <div className="space-y-4">
            <div className="p-4 bg-patriot-darkNavy rounded-lg">
              <p className="text-desert-tan font-bold mb-2">Data Retention</p>
              <p className="text-desert-sand text-sm mb-3">How long to keep visitor and analytics data</p>
              <select className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded px-4 py-2 text-desert-tan">
                <option>30 days</option>
                <option>90 days</option>
                <option>180 days</option>
                <option>1 year</option>
                <option>Forever</option>
              </select>
            </div>
            <div className="p-4 bg-red-900/20 border-2 border-red-500 rounded-lg">
              <p className="text-red-300 font-bold mb-2">Danger Zone</p>
              <p className="text-red-400 text-sm mb-3">Reset all API connections and delete stored keys</p>
              <button className="px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600">
                Reset All Connections
              </button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
