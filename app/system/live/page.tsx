'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ServiceConnection, { ChartEmptyState, MultiServiceConnection } from '@/components/dashboard/ServiceConnection';
import { Users, MapPin, Monitor, Globe, Clock, Activity, Wifi, Shield, Eye, ArrowUpRight } from 'lucide-react';

const connections = {
  visitorIntelligence: false,
  ipGeolocation: false,
  deviceDetection: false,
};

export default function LiveVisitorsPage() {
  const handleConnect = (service: string) => {
    console.log(`Connect ${service}`);
  };

  const connectedCount = Object.values(connections).filter(Boolean).length;
  const totalServices = Object.keys(connections).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-desert-tan mb-2">Live Visitor Intelligence</h1>
            <p className="text-desert-sand">Real-time monitoring of active sessions</p>
          </div>
          <div className="text-right">
            <p className="text-phoenix-coral font-bold text-2xl">{connectedCount}/{totalServices}</p>
            <p className="text-desert-sand text-sm">Integrations Active</p>
          </div>
        </div>

        {connectedCount === 0 && (
          <div className="bg-gradient-to-r from-phoenix-coral/20 to-patriot-blue/20 border-2 border-phoenix-coral/50 rounded-lg p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-phoenix-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-desert-tan font-bold text-2xl mb-2">Enable Live Visitor Tracking</h3>
                <p className="text-desert-sand mb-6 max-w-2xl">
                  See who is on your site right now with real-time visitor intelligence, including location, device info, and session activity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button onClick={() => handleConnect('Visitor Intelligence API')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Eye className="w-4 h-4" />Visitor API
                  </button>
                  <button onClick={() => handleConnect('IP Geolocation')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <MapPin className="w-4 h-4" />IP Geolocation
                  </button>
                  <button onClick={() => handleConnect('Device Detection')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Monitor className="w-4 h-4" />Device Detection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-patriot-navy border-2 border-green-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Active Visitors</p>
              <div className="w-3 h-3 bg-green-500/30 rounded-full" />
            </div>
            <p className="text-4xl font-bold text-desert-tan/30">--</p>
            <button onClick={() => handleConnect('Visitor Intelligence API')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1 mt-2">
              Connect API<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-patriot-navy border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Competitor Visits</p>
              <Shield className="w-5 h-5 text-red-400/30" />
            </div>
            <p className="text-4xl font-bold text-desert-tan/30">--</p>
            <button onClick={() => handleConnect('Visitor Intelligence API')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1 mt-2">
              Connect API<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-patriot-navy border-2 border-yellow-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">VPN Detected</p>
              <Wifi className="w-5 h-5 text-yellow-400/30" />
            </div>
            <p className="text-4xl font-bold text-desert-tan/30">--</p>
            <button onClick={() => handleConnect('IP Geolocation')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1 mt-2">
              Connect API<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-patriot-navy border-2 border-phoenix-coral/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Avg Session</p>
              <Clock className="w-5 h-5 text-phoenix-coral/30" />
            </div>
            <p className="text-4xl font-bold text-desert-tan/30">--</p>
            <button onClick={() => handleConnect('Visitor Intelligence API')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1 mt-2">
              Connect API<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <DashboardCard title="Active Sessions">
          <ServiceConnection serviceName="Visitor Intelligence API" serviceIcon={<Eye className="w-10 h-10 text-white" />} description="Connect the Visitor Intelligence API to see real-time visitor sessions, including pages viewed, time on site, and referral sources." features={['Real-time session tracking', 'Page view history', 'Referral source identification', 'Session duration tracking', 'Competitor visit detection', 'Bot filtering']} requiresApiKey onConnect={() => handleConnect('Visitor Intelligence API')} docsUrl="/system/settings" />
        </DashboardCard>

        {/* Geographic & Device */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Geographic Distribution">
            <ServiceConnection serviceName="IP Geolocation" serviceIcon={<MapPin className="w-10 h-10 text-white" />} description="Connect an IP geolocation service to see visitor locations, detect VPNs, and identify suspicious traffic patterns." features={['City-level location data', 'Country & region mapping', 'VPN/Proxy detection', 'ISP identification', 'Timezone detection', 'Interactive map view']} requiresApiKey onConnect={() => handleConnect('IP Geolocation')} docsUrl="https://ipinfo.io" />
          </DashboardCard>

          <DashboardCard title="Device & Browser Info">
            <ServiceConnection serviceName="Device Detection" serviceIcon={<Monitor className="w-10 h-10 text-white" />} description="Connect device detection to understand what devices, browsers, and operating systems your visitors use." features={['Device type detection', 'Browser identification', 'OS version tracking', 'Screen resolution', 'Mobile vs desktop split', 'Bot detection']} requiresApiKey onConnect={() => handleConnect('Device Detection')} docsUrl="https://www.devicedetect.com" />
          </DashboardCard>
        </div>

        {/* Integration Status */}
        <MultiServiceConnection title="Live Tracking Integrations" description="Connect these services to enable real-time visitor intelligence" services={[
          { name: 'Visitor Intelligence API', icon: <Eye className="w-4 h-4 text-phoenix-coral" />, connected: connections.visitorIntelligence, onConnect: () => handleConnect('Visitor Intelligence API') },
          { name: 'IP Geolocation (IPInfo/MaxMind)', icon: <MapPin className="w-4 h-4 text-phoenix-coral" />, connected: connections.ipGeolocation, onConnect: () => handleConnect('IP Geolocation') },
          { name: 'Device Detection', icon: <Monitor className="w-4 h-4 text-phoenix-coral" />, connected: connections.deviceDetection, onConnect: () => handleConnect('Device Detection') },
        ]} />

        {/* Setup Note */}
        <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
          <h4 className="text-desert-tan font-bold mb-2">How Live Tracking Works</h4>
          <p className="text-desert-sand text-sm mb-4">
            Live visitor tracking requires a backend API that collects and streams visitor data in real-time. Configure your tracking endpoints in Settings to enable this feature.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-patriot-darkNavy rounded p-3">
              <p className="text-desert-tan font-bold mb-1">1. Install Tracker</p>
              <p className="text-desert-sand text-xs">Add tracking script to your site</p>
            </div>
            <div className="bg-patriot-darkNavy rounded p-3">
              <p className="text-desert-tan font-bold mb-1">2. Configure API</p>
              <p className="text-desert-sand text-xs">Set up your backend endpoints</p>
            </div>
            <div className="bg-patriot-darkNavy rounded p-3">
              <p className="text-desert-tan font-bold mb-1">3. Add Enrichment</p>
              <p className="text-desert-sand text-xs">Connect IP & device APIs</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
