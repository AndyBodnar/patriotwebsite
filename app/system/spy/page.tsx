'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Eye, AlertTriangle, Shield, Wifi, MapPin, Clock, Activity, Fingerprint, Network, Server } from 'lucide-react';

const suspiciousVisitors = [
  {
    id: 1,
    timestamp: '2:45 PM',
    ip: '192.0.2.146',
    organization: 'Waste Management Inc.',
    location: 'Scottsdale, AZ',
    confidence: 95,
    reason: 'Corporate IP match + Competitor domain referrer',
    pages: ['/pricing', '/services/commercial', '/about/fleet', '/contact'],
    duration: '18:34',
    deviceFingerprint: 'fp_a7b3c9d2e1f4',
    vpn: false,
    behaviors: ['Rapid page viewing', 'Price page focus', 'Right-click detected'],
  },
  {
    id: 2,
    timestamp: '1:20 PM',
    ip: '198.51.100.42',
    organization: 'Republic Services',
    location: 'Phoenix, AZ',
    confidence: 88,
    reason: 'Known competitor IP range + Systematic browsing',
    pages: ['/services', '/pricing', '/residential', '/commercial'],
    duration: '12:15',
    deviceFingerprint: 'fp_x8y9z0a1b2c3',
    vpn: true,
    behaviors: ['Multiple tab opens', 'View source event', 'Screenshot attempt'],
  },
  {
    id: 3,
    timestamp: '11:30 AM',
    ip: '203.0.113.88',
    organization: 'Unknown (VPN)',
    location: 'Mesa, AZ',
    confidence: 72,
    reason: 'VPN detected + Competitor behavior pattern',
    pages: ['/pricing', '/services', '/about'],
    duration: '8:42',
    deviceFingerprint: 'fp_d4e5f6g7h8i9',
    vpn: true,
    behaviors: ['Price comparison behavior', 'Extended dwell time'],
  },
];

const networkClusters = [
  {
    network: '192.0.2.0/24',
    organization: 'Waste Management Inc.',
    visits: 15,
    uniqueDevices: 7,
    lastSeen: '10 min ago',
    threatLevel: 'high',
  },
  {
    network: '198.51.100.0/24',
    organization: 'Republic Services',
    visits: 8,
    uniqueDevices: 4,
    lastSeen: '2 hours ago',
    threatLevel: 'medium',
  },
  {
    network: '203.0.113.0/24',
    organization: 'VPN Pool (NordVPN)',
    visits: 23,
    uniqueDevices: 18,
    lastSeen: '5 min ago',
    threatLevel: 'low',
  },
];

const behavioralFlags = [
  { behavior: 'Rapid Page Viewing (>10 pages/min)', count: 3, severity: 'high' },
  { behavior: 'Price Page Focus (>60% time)', count: 5, severity: 'high' },
  { behavior: 'Right-Click/View Source', count: 2, severity: 'medium' },
  { behavior: 'Screenshot Detection', count: 1, severity: 'medium' },
  { behavior: 'Developer Tools Open', count: 4, severity: 'medium' },
  { behavior: 'VPN/Proxy Detected', count: 12, severity: 'low' },
];

export default function SpyModePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-red-400" />
            <h1 className="text-3xl font-bold text-desert-tan">SPY MODE</h1>
          </div>
          <p className="text-desert-sand">Competitive intelligence & suspicious activity monitoring</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4 flex items-center gap-3 animate-pulse">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <div>
            <p className="text-red-300 font-bold text-lg">🚨 HIGH THREAT ACTIVITY DETECTED</p>
            <p className="text-red-400">3 competitor visits in the last hour • 15 total visits from known competitor networks today</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-patriot-navy border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Competitor Visits (24h)</p>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-4xl font-bold text-red-400">15</p>
            <p className="text-xs text-red-300 mt-1">+8 from yesterday</p>
          </div>

          <div className="bg-patriot-navy border-2 border-yellow-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">VPN Detections</p>
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-4xl font-bold text-yellow-400">23</p>
            <p className="text-xs text-yellow-300 mt-1">18 unique devices</p>
          </div>

          <div className="bg-patriot-navy border-2 border-orange-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Behavioral Flags</p>
              <Activity className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-4xl font-bold text-orange-400">27</p>
            <p className="text-xs text-orange-300 mt-1">12 high severity</p>
          </div>

          <div className="bg-patriot-navy border-2 border-purple-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Network Clusters</p>
              <Network className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-4xl font-bold text-purple-400">7</p>
            <p className="text-xs text-purple-300 mt-1">3 high threat</p>
          </div>
        </div>

        {/* Suspicious Visitors */}
        <DashboardCard title="Suspicious Activity - Real-Time">
          <div className="space-y-4">
            {suspiciousVisitors.map((visitor) => (
              <div
                key={visitor.id}
                className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-4 hover:border-red-500 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-300 font-bold text-lg">{visitor.organization}</span>
                      <span className="px-3 py-1 bg-red-500/30 border border-red-500 text-red-200 text-xs rounded-full font-bold">
                        {visitor.confidence}% CONFIDENCE
                      </span>
                      {visitor.vpn && (
                        <span className="px-3 py-1 bg-yellow-500/30 border border-yellow-500 text-yellow-200 text-xs rounded-full font-bold">
                          VPN
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-2 text-desert-sand">
                        <Clock className="w-4 h-4 text-red-400" />
                        <span>{visitor.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-desert-sand">
                        <MapPin className="w-4 h-4 text-red-400" />
                        <span>{visitor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-desert-sand">
                        <Server className="w-4 h-4 text-red-400" />
                        <span>{visitor.ip}</span>
                      </div>
                      <div className="flex items-center gap-2 text-desert-sand">
                        <Activity className="w-4 h-4 text-red-400" />
                        <span>{visitor.duration}</span>
                      </div>
                    </div>

                    <div className="bg-red-950/50 border border-red-500/30 rounded p-3 mb-3">
                      <p className="text-red-200 font-bold text-sm mb-1">🎯 Detection Reason:</p>
                      <p className="text-red-300 text-sm">{visitor.reason}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-desert-sand text-sm font-bold">Pages Viewed:</p>
                      <div className="flex flex-wrap gap-2">
                        {visitor.pages.map((page, idx) => (
                          <span key={idx} className="px-2 py-1 bg-patriot-navy border border-phoenix-coral/30 rounded text-desert-tan text-xs">
                            {page}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 space-y-1">
                      <p className="text-desert-sand text-sm font-bold">Suspicious Behaviors:</p>
                      <div className="flex flex-wrap gap-2">
                        {visitor.behaviors.map((behavior, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-500/20 border border-orange-500 rounded text-orange-300 text-xs">
                            ⚠️ {behavior}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-desert-sand">
                      <Fingerprint className="w-4 h-4 text-purple-400" />
                      <span className="font-mono">{visitor.deviceFingerprint}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Network Clusters & Behavioral Flags */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Network Clusters">
            <div className="space-y-3">
              {networkClusters.map((cluster, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${
                  cluster.threatLevel === 'high' ? 'bg-red-900/20 border-red-500/50' :
                  cluster.threatLevel === 'medium' ? 'bg-orange-900/20 border-orange-500/50' :
                  'bg-yellow-900/20 border-yellow-500/50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-desert-tan font-bold">{cluster.organization}</p>
                      <p className="text-desert-sand text-sm font-mono">{cluster.network}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      cluster.threatLevel === 'high' ? 'bg-red-500/30 text-red-300' :
                      cluster.threatLevel === 'medium' ? 'bg-orange-500/30 text-orange-300' :
                      'bg-yellow-500/30 text-yellow-300'
                    }`}>
                      {cluster.threatLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-desert-sand">
                    <div>
                      <p className="text-xs">Visits</p>
                      <p className="text-phoenix-coral font-bold">{cluster.visits}</p>
                    </div>
                    <div>
                      <p className="text-xs">Devices</p>
                      <p className="text-phoenix-coral font-bold">{cluster.uniqueDevices}</p>
                    </div>
                    <div>
                      <p className="text-xs">Last Seen</p>
                      <p className="text-phoenix-coral font-bold">{cluster.lastSeen}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Behavioral Red Flags">
            <div className="space-y-3">
              {behavioralFlags.map((flag, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-patriot-darkNavy rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      flag.severity === 'high' ? 'bg-red-500 animate-pulse' :
                      flag.severity === 'medium' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`} />
                    <span className="text-desert-tan text-sm">{flag.behavior}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      flag.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                      flag.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {flag.severity.toUpperCase()}
                    </span>
                    <span className="text-phoenix-coral font-bold text-lg">{flag.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
