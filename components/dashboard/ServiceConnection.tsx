'use client';

import { ReactNode } from 'react';
import { Link2, ExternalLink, Key, CheckCircle, AlertCircle } from 'lucide-react';

interface ServiceConnectionProps {
  serviceName: string;
  serviceIcon: ReactNode;
  description: string;
  features: string[];
  docsUrl?: string;
  onConnect?: () => void;
  isConnected?: boolean;
  requiresApiKey?: boolean;
  requiresOAuth?: boolean;
}

export default function ServiceConnection({
  serviceName,
  serviceIcon,
  description,
  features,
  docsUrl,
  onConnect,
  isConnected = false,
  requiresApiKey = false,
  requiresOAuth = false,
}: ServiceConnectionProps) {
  if (isConnected) {
    return (
      <div className="bg-green-900/20 border-2 border-green-500/50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <span className="text-green-400 font-bold">{serviceName} Connected</span>
        </div>
        <p className="text-desert-sand text-sm">Data syncing automatically</p>
      </div>
    );
  }

  return (
    <div className="bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg p-8 text-center">
      <div className="w-20 h-20 bg-phoenix-gradient rounded-full flex items-center justify-center mx-auto mb-6">
        {serviceIcon}
      </div>

      <h3 className="text-2xl font-bold text-desert-tan mb-3">
        Connect {serviceName}
      </h3>

      <p className="text-desert-sand mb-6 max-w-md mx-auto">
        {description}
      </p>

      {/* Auth Method Badge */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {requiresOAuth && (
          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500 text-blue-300 text-xs rounded-full font-bold flex items-center gap-1">
            <Link2 className="w-3 h-3" />
            OAuth 2.0
          </span>
        )}
        {requiresApiKey && (
          <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-xs rounded-full font-bold flex items-center gap-1">
            <Key className="w-3 h-3" />
            API Key Required
          </span>
        )}
      </div>

      {/* Features List */}
      <div className="bg-patriot-navy rounded-lg p-4 mb-6 text-left max-w-sm mx-auto">
        <p className="text-desert-sand text-xs font-bold mb-3 uppercase tracking-wider">What you'll get:</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-desert-tan">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Connect Button */}
      <button
        onClick={onConnect}
        className="px-8 py-3 bg-phoenix-gradient text-white rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
      >
        <Link2 className="w-5 h-5" />
        Connect {serviceName}
      </button>

      {/* Docs Link */}
      {docsUrl && (
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-phoenix-coral hover:underline text-sm mt-4"
        >
          View Setup Guide
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

// Compact version for inline use in tables/cards
export function ServiceConnectionCompact({
  serviceName,
  serviceIcon,
  onConnect,
}: {
  serviceName: string;
  serviceIcon: ReactNode;
  onConnect?: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-patriot-darkNavy border-2 border-phoenix-coral/20 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-phoenix-gradient rounded-lg flex items-center justify-center">
          {serviceIcon}
        </div>
        <div>
          <p className="text-desert-tan font-bold">{serviceName}</p>
          <p className="text-desert-sand text-xs">Not connected</p>
        </div>
      </div>
      <button
        onClick={onConnect}
        className="px-4 py-2 bg-phoenix-coral/20 border border-phoenix-coral text-phoenix-coral rounded font-bold text-sm hover:bg-phoenix-coral hover:text-white transition-colors"
      >
        Connect
      </button>
    </div>
  );
}

// Empty state for charts/graphs when no data
export function ChartEmptyState({
  serviceName,
  serviceIcon,
  chartType,
  onConnect,
}: {
  serviceName: string;
  serviceIcon: ReactNode;
  chartType: string;
  onConnect?: () => void;
}) {
  return (
    <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-patriot-darkNavy/50 rounded-lg border-2 border-dashed border-phoenix-coral/30">
      <div className="w-16 h-16 bg-phoenix-coral/20 rounded-full flex items-center justify-center mb-4">
        {serviceIcon}
      </div>
      <p className="text-desert-tan font-bold mb-1">{chartType}</p>
      <p className="text-desert-sand text-sm mb-4">Connect {serviceName} to view data</p>
      <button
        onClick={onConnect}
        className="px-4 py-2 bg-phoenix-gradient text-white rounded font-bold text-sm hover:opacity-90"
      >
        Connect {serviceName}
      </button>
    </div>
  );
}

// Multi-service connection card
export function MultiServiceConnection({
  title,
  description,
  services,
}: {
  title: string;
  description: string;
  services: {
    name: string;
    icon: ReactNode;
    connected: boolean;
    onConnect?: () => void;
  }[];
}) {
  const connectedCount = services.filter(s => s.connected).length;

  return (
    <div className="bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-desert-tan">{title}</h3>
          <p className="text-desert-sand text-sm">{description}</p>
        </div>
        <div className="text-right">
          <p className="text-phoenix-coral font-bold text-2xl">{connectedCount}/{services.length}</p>
          <p className="text-desert-sand text-xs">Connected</p>
        </div>
      </div>

      <div className="space-y-3">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${
              service.connected
                ? 'bg-green-900/20 border border-green-500/50'
                : 'bg-patriot-navy border border-phoenix-coral/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                service.connected ? 'bg-green-500/20' : 'bg-phoenix-coral/20'
              }`}>
                {service.icon}
              </div>
              <span className={`font-bold ${service.connected ? 'text-green-400' : 'text-desert-tan'}`}>
                {service.name}
              </span>
            </div>
            {service.connected ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <button
                onClick={service.onConnect}
                className="text-phoenix-coral text-sm font-bold hover:underline"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
