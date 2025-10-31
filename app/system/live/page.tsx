'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useState } from 'react';
import { Users, MapPin, Monitor, Smartphone, Tablet, Globe, Clock, Activity, Wifi, AlertTriangle, Shield } from 'lucide-react';

const liveVisitors = [
  {
    id: 1,
    ip: '192.168.1.45',
    location: 'Phoenix, AZ',
    page: '/services/commercial-dumpsters',
    device: 'iPhone 14 Pro',
    browser: 'Safari 17.0',
    os: 'iOS 17.1',
    duration: '4:23',
    pageViews: 7,
    referrer: 'Google Organic',
    isBot: false,
    isCompetitor: false,
    vpnDetected: false,
    sessionStart: '2:15 PM'
  },
  {
    id: 2,
    ip: '10.0.45.123',
    location: 'Scottsdale, AZ',
    page: '/pricing',
    device: 'MacBook Pro',
    browser: 'Chrome 119',
    os: 'macOS 14',
    duration: '8:45',
    pageViews: 12,
    referrer: 'wastemanagement.com',
    isBot: false,
    isCompetitor: true,
    vpnDetected: false,
    sessionStart: '1:45 PM'
  },
  {
    id: 3,
    ip: '172.16.254.1',
    location: 'Tempe, AZ',
    page: '/',
    device: 'Samsung Galaxy S23',
    browser: 'Chrome Mobile',
    os: 'Android 14',
    duration: '1:34',
    pageViews: 3,
    referrer: 'Direct',
    isBot: false,
    isCompetitor: false,
    vpnDetected: false,
    sessionStart: '2:30 PM'
  },
  {
    id: 4,
    ip: '203.0.113.42',
    location: 'Mesa, AZ',
    page: '/contact',
    device: 'Windows Desktop',
    browser: 'Edge 119',
    os: 'Windows 11',
    duration: '12:56',
    pageViews: 15,
    referrer: 'Facebook',
    isBot: false,
    isCompetitor: false,
    vpnDetected: true,
    sessionStart: '1:20 PM'
  },
];

export default function LiveVisitorsPage() {
  const [selectedVisitor, setSelectedVisitor] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">Live Visitor Intelligence</h1>
          <p className="text-desert-sand">Real-time monitoring of active sessions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-patriot-navy border-2 border-green-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Active Visitors</p>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <p className="text-4xl font-bold text-green-400">23</p>
          </div>

          <div className="bg-patriot-navy border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Competitor Visits</p>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-4xl font-bold text-red-400">3</p>
          </div>

          <div className="bg-patriot-navy border-2 border-yellow-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">VPN Detected</p>
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-4xl font-bold text-yellow-400">5</p>
          </div>

          <div className="bg-patriot-navy border-2 border-phoenix-coral/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Avg Session</p>
              <Clock className="w-5 h-5 text-phoenix-coral" />
            </div>
            <p className="text-4xl font-bold text-phoenix-coral">6:42</p>
          </div>
        </div>

        {/* Active Visitors List */}
        <DashboardCard title="Active Sessions">
          <div className="space-y-3">
            {liveVisitors.map((visitor) => (
              <div
                key={visitor.id}
                onClick={() => setSelectedVisitor(selectedVisitor === visitor.id ? null : visitor.id)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  visitor.isCompetitor
                    ? 'bg-red-900/20 border-2 border-red-500/50 hover:border-red-500'
                    : 'bg-patriot-darkNavy border-2 border-phoenix-coral/20 hover:border-phoenix-coral/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className={`w-4 h-4 ${visitor.isCompetitor ? 'text-red-400' : 'text-green-400'} animate-pulse`} />
                      <span className="text-desert-tan font-bold">{visitor.page}</span>
                      {visitor.isCompetitor && (
                        <span className="px-2 py-1 bg-red-500/20 border border-red-500 text-red-300 text-xs rounded-full font-bold">
                          COMPETITOR
                        </span>
                      )}
                      {visitor.vpnDetected && (
                        <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-xs rounded-full font-bold">
                          VPN
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-desert-sand">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-phoenix-coral" />
                        <span>{visitor.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {visitor.device.includes('iPhone') || visitor.device.includes('Samsung') ? (
                          <Smartphone className="w-4 h-4 text-phoenix-coral" />
                        ) : visitor.device.includes('iPad') || visitor.device.includes('Tablet') ? (
                          <Tablet className="w-4 h-4 text-phoenix-coral" />
                        ) : (
                          <Monitor className="w-4 h-4 text-phoenix-coral" />
                        )}
                        <span>{visitor.device}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-phoenix-coral" />
                        <span>{visitor.duration} • {visitor.pageViews} pages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-phoenix-coral" />
                        <span>{visitor.referrer}</span>
                      </div>
                    </div>

                    {selectedVisitor === visitor.id && (
                      <div className="mt-4 pt-4 border-t border-phoenix-coral/20 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-desert-sand">IP Address</p>
                            <p className="text-desert-tan font-mono">{visitor.ip}</p>
                          </div>
                          <div>
                            <p className="text-desert-sand">Session Start</p>
                            <p className="text-desert-tan">{visitor.sessionStart}</p>
                          </div>
                          <div>
                            <p className="text-desert-sand">Browser</p>
                            <p className="text-desert-tan">{visitor.browser}</p>
                          </div>
                          <div>
                            <p className="text-desert-sand">Operating System</p>
                            <p className="text-desert-tan">{visitor.os}</p>
                          </div>
                        </div>
                        {visitor.isCompetitor && (
                          <div className="bg-red-900/30 border border-red-500 rounded p-3">
                            <p className="text-red-300 font-bold text-sm">⚠️ Competitor Activity Detected</p>
                            <p className="text-red-400 text-xs mt-1">
                              Referrer matches known competitor domain. Session is being recorded.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Geographic Map Placeholder */}
        <DashboardCard title="Geographic Distribution">
          <div className="h-96 bg-patriot-darkNavy rounded-lg flex items-center justify-center border-2 border-phoenix-coral/20">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-phoenix-coral mx-auto mb-4" />
              <p className="text-desert-tan font-bold text-lg">Interactive Map Coming Soon</p>
              <p className="text-desert-sand text-sm">Real-time visitor locations will be displayed here</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
