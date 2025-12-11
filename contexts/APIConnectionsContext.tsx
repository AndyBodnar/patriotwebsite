'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define all available API services
export interface APIConnection {
  id: string;
  name: string;
  category: 'seo' | 'analytics' | 'notifications' | 'competitive' | 'local';
  authType: 'oauth' | 'apiKey';
  connected: boolean;
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  lastSynced?: string;
  config?: Record<string, string>;
}

export interface APIConnectionsState {
  // SEO Tools
  googleSearchConsole: APIConnection;
  googleAnalytics: APIConnection;
  semrush: APIConnection;
  ahrefs: APIConnection;
  moz: APIConnection;
  pageSpeedInsights: APIConnection;
  brightLocal: APIConnection;

  // Analytics Tools
  hotjar: APIConnection;
  fullStory: APIConnection;
  mixpanel: APIConnection;

  // Competitive Intelligence
  similarWeb: APIConnection;
  spyFu: APIConnection;

  // Visitor Intelligence
  ipGeolocation: APIConnection;
  deviceDetection: APIConnection;

  // Notifications
  sendgrid: APIConnection;
  twilio: APIConnection;
  slack: APIConnection;
  webhooks: APIConnection;
}

interface APIConnectionsContextType {
  connections: APIConnectionsState;
  updateConnection: (id: string, data: Partial<APIConnection>) => void;
  saveApiKey: (id: string, apiKey: string) => Promise<boolean>;
  disconnectService: (id: string) => Promise<boolean>;
  isConnected: (id: string) => boolean;
  getConnection: (id: string) => APIConnection | undefined;
  testConnection: (id: string) => Promise<boolean>;
}

const defaultConnection = (
  id: string,
  name: string,
  category: APIConnection['category'],
  authType: APIConnection['authType']
): APIConnection => ({
  id,
  name,
  category,
  authType,
  connected: false,
});

const initialState: APIConnectionsState = {
  // SEO Tools
  googleSearchConsole: defaultConnection('googleSearchConsole', 'Google Search Console', 'seo', 'oauth'),
  googleAnalytics: defaultConnection('googleAnalytics', 'Google Analytics 4', 'analytics', 'oauth'),
  semrush: defaultConnection('semrush', 'SEMrush', 'seo', 'apiKey'),
  ahrefs: defaultConnection('ahrefs', 'Ahrefs', 'seo', 'apiKey'),
  moz: defaultConnection('moz', 'Moz', 'seo', 'apiKey'),
  pageSpeedInsights: defaultConnection('pageSpeedInsights', 'PageSpeed Insights', 'seo', 'apiKey'),
  brightLocal: defaultConnection('brightLocal', 'BrightLocal', 'local', 'apiKey'),

  // Analytics Tools
  hotjar: defaultConnection('hotjar', 'Hotjar', 'analytics', 'apiKey'),
  fullStory: defaultConnection('fullStory', 'FullStory', 'analytics', 'apiKey'),
  mixpanel: defaultConnection('mixpanel', 'Mixpanel', 'analytics', 'apiKey'),

  // Competitive Intelligence
  similarWeb: defaultConnection('similarWeb', 'SimilarWeb', 'competitive', 'apiKey'),
  spyFu: defaultConnection('spyFu', 'SpyFu', 'competitive', 'apiKey'),

  // Visitor Intelligence
  ipGeolocation: defaultConnection('ipGeolocation', 'IP Geolocation (IPInfo)', 'analytics', 'apiKey'),
  deviceDetection: defaultConnection('deviceDetection', 'Device Detection', 'analytics', 'apiKey'),

  // Notifications
  sendgrid: defaultConnection('sendgrid', 'SendGrid', 'notifications', 'apiKey'),
  twilio: defaultConnection('twilio', 'Twilio', 'notifications', 'apiKey'),
  slack: defaultConnection('slack', 'Slack', 'notifications', 'oauth'),
  webhooks: defaultConnection('webhooks', 'Custom Webhooks', 'notifications', 'apiKey'),
};

const APIConnectionsContext = createContext<APIConnectionsContextType | undefined>(undefined);

// Use proxy in browser to avoid CORS, direct URL on server
const API_BASE_URL = typeof window !== 'undefined' ? '/api/proxy' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000');

export function APIConnectionsProvider({ children }: { children: ReactNode }) {
  const [connections, setConnections] = useState<APIConnectionsState>(initialState);

  // Fetch connections from backend on mount
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/patriot/settings/connections`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Update local state with backend data
            const updates: Partial<APIConnectionsState> = {};
            data.data.forEach((conn: any) => {
              if (conn.serviceId in initialState) {
                updates[conn.serviceId as keyof APIConnectionsState] = {
                  ...initialState[conn.serviceId as keyof APIConnectionsState],
                  connected: conn.isConnected,
                  lastSynced: conn.updatedAt,
                };
              }
            });
            setConnections(prev => ({
              ...prev,
              ...updates,
            }));
          }
        }
      } catch (e) {
        console.error('Failed to fetch connections from backend:', e);
      }
    };

    fetchConnections();
  }, []);

  const updateConnection = (id: string, data: Partial<APIConnection>) => {
    setConnections(prev => ({
      ...prev,
      [id]: {
        ...prev[id as keyof APIConnectionsState],
        ...data,
      },
    }));
  };

  const saveApiKey = async (id: string, apiKey: string): Promise<boolean> => {
    try {
      const conn = connections[id as keyof APIConnectionsState];
      const response = await fetch(`${API_BASE_URL}/patriot/settings/api-keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: id,
          serviceName: conn?.name || id,
          apiKey
        }),
      });

      if (response.ok) {
        updateConnection(id, {
          connected: true,
          apiKey: apiKey,
          lastSynced: new Date().toISOString(),
        });
        return true;
      }

      console.error('Failed to save API key to backend');
      return false;
    } catch (error) {
      console.error('Failed to save API key:', error);
      return false;
    }
  };

  const disconnectService = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/patriot/settings/connections/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        updateConnection(id, {
          connected: false,
          apiKey: undefined,
          accessToken: undefined,
          refreshToken: undefined,
          lastSynced: undefined,
        });
        return true;
      }

      console.error('Failed to disconnect service from backend');
      return false;
    } catch (error) {
      console.error('Failed to disconnect service:', error);
      return false;
    }
  };

  const isConnected = (id: string): boolean => {
    const conn = connections[id as keyof APIConnectionsState];
    return conn?.connected || false;
  };

  const getConnection = (id: string): APIConnection | undefined => {
    return connections[id as keyof APIConnectionsState];
  };

  const testConnection = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/patriot/settings/test-connection/${id}`, {
        method: 'POST',
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  return (
    <APIConnectionsContext.Provider
      value={{
        connections,
        updateConnection,
        saveApiKey,
        disconnectService,
        isConnected,
        getConnection,
        testConnection,
      }}
    >
      {children}
    </APIConnectionsContext.Provider>
  );
}

export function useAPIConnections() {
  const context = useContext(APIConnectionsContext);
  if (context === undefined) {
    throw new Error('useAPIConnections must be used within an APIConnectionsProvider');
  }
  return context;
}

// Helper hook to get connection status for specific services
export function useConnectionStatus() {
  const { connections } = useAPIConnections();

  return {
    // SEO
    googleSearchConsole: connections.googleSearchConsole.connected,
    googleAnalytics: connections.googleAnalytics.connected,
    semrush: connections.semrush.connected,
    ahrefs: connections.ahrefs.connected,
    moz: connections.moz.connected,
    pageSpeedInsights: connections.pageSpeedInsights.connected,
    brightLocal: connections.brightLocal.connected,

    // Analytics
    hotjar: connections.hotjar.connected,
    fullStory: connections.fullStory.connected,
    mixpanel: connections.mixpanel.connected,

    // Competitive
    similarWeb: connections.similarWeb.connected,
    spyFu: connections.spyFu.connected,

    // Visitor Intelligence
    ipGeolocation: connections.ipGeolocation.connected,
    deviceDetection: connections.deviceDetection.connected,

    // Notifications
    sendgrid: connections.sendgrid.connected,
    twilio: connections.twilio.connected,
    slack: connections.slack.connected,
    webhooks: connections.webhooks.connected,
  };
}
