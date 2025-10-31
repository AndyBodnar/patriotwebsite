'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Bell, AlertTriangle, TrendingDown, Link as LinkIcon, Zap, Shield, CheckCircle, XCircle } from 'lucide-react';

const recentAlerts = [
  {
    id: 1,
    type: 'competitor',
    severity: 'high',
    title: 'Competitor Activity Spike',
    message: '3 visits from Waste Management IP range in the last hour',
    timestamp: '5 minutes ago',
    status: 'unread',
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: 'ranking',
    severity: 'high',
    title: 'Keyword Ranking Drop',
    message: '"dumpster rental phoenix" dropped from #3 to #7 (-4 positions)',
    timestamp: '2 hours ago',
    status: 'unread',
    icon: TrendingDown,
  },
  {
    id: 3,
    type: 'backlink',
    severity: 'medium',
    title: 'New High-Authority Backlink',
    message: 'constructiontoday.net (DA 72) linked to your site',
    timestamp: '4 hours ago',
    status: 'read',
    icon: LinkIcon,
  },
  {
    id: 4,
    type: 'traffic',
    severity: 'high',
    title: 'Traffic Spike Detected',
    message: '250% increase in traffic from organic search',
    timestamp: '6 hours ago',
    status: 'read',
    icon: Zap,
  },
  {
    id: 5,
    type: 'security',
    severity: 'medium',
    title: 'Multiple VPN Visits',
    message: '12 visitors detected using VPN/Proxy services',
    timestamp: '1 day ago',
    status: 'read',
    icon: Shield,
  },
];

const alertRules = [
  {
    name: 'Competitor Visits',
    description: 'Alert when visits from known competitor IPs are detected',
    channels: ['Email', 'Dashboard'],
    status: 'active',
    threshold: '> 3 visits/hour',
  },
  {
    name: 'Ranking Drop',
    description: 'Alert when keywords drop more than 5 positions',
    channels: ['Email', 'SMS', 'Dashboard'],
    status: 'active',
    threshold: '> 5 positions',
  },
  {
    name: 'Traffic Spike',
    description: 'Alert on sudden traffic increases or decreases',
    channels: ['Email', 'Dashboard'],
    status: 'active',
    threshold: '> 50% change',
  },
  {
    name: 'New Backlinks',
    description: 'Alert when high-authority domains link to your site',
    channels: ['Email'],
    status: 'active',
    threshold: 'DA > 70',
  },
  {
    name: 'Core Web Vitals',
    description: 'Alert when Core Web Vitals enter warning zone',
    channels: ['Email', 'Dashboard'],
    status: 'paused',
    threshold: 'LCP > 2.5s',
  },
  {
    name: 'Suspicious Activity',
    description: 'Alert on scraping attempts or unusual patterns',
    channels: ['Email', 'SMS', 'Dashboard'],
    status: 'active',
    threshold: 'Behavioral flags',
  },
];

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">Alerts & Notifications</h1>
          <p className="text-desert-sand">Configure automated alerts and view notification history</p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-patriot-navy border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Unread Alerts</p>
              <Bell className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
            <p className="text-4xl font-bold text-red-400">12</p>
          </div>

          <div className="bg-patriot-navy border-2 border-phoenix-coral/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Active Rules</p>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-4xl font-bold text-green-400">5</p>
          </div>

          <div className="bg-patriot-navy border-2 border-yellow-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Today&apos;s Alerts</p>
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-4xl font-bold text-yellow-400">27</p>
          </div>

          <div className="bg-patriot-navy border-2 border-gray-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Paused Rules</p>
              <XCircle className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-4xl font-bold text-gray-400">1</p>
          </div>
        </div>

        {/* Recent Alerts */}
        <DashboardCard title="Recent Alerts">
          <div className="space-y-3">
            {recentAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    alert.status === 'unread'
                      ? 'bg-red-900/20 border-red-500/50'
                      : 'bg-patriot-darkNavy border-phoenix-coral/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      alert.severity === 'high' ? 'bg-red-500/20' :
                      alert.severity === 'medium' ? 'bg-yellow-500/20' :
                      'bg-blue-500/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        alert.severity === 'high' ? 'text-red-400' :
                        alert.severity === 'medium' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-desert-tan font-bold">{alert.title}</p>
                        {alert.status === 'unread' && (
                          <span className="px-2 py-1 bg-red-500/20 border border-red-500 text-red-300 text-xs rounded-full font-bold">
                            NEW
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                          alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-desert-sand text-sm mb-2">{alert.message}</p>
                      <p className="text-desert-sand text-xs">{alert.timestamp}</p>
                    </div>

                    <button className="text-desert-sand hover:text-phoenix-coral text-sm">
                      Mark Read
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        {/* Alert Rules */}
        <DashboardCard title="Alert Rules & Configuration">
          <div className="space-y-3">
            {alertRules.map((rule, index) => (
              <div key={index} className="p-4 bg-patriot-darkNavy rounded-lg border-2 border-phoenix-coral/20 hover:border-phoenix-coral/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-desert-tan font-bold text-lg">{rule.name}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        rule.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500' :
                        'bg-gray-500/20 text-gray-400 border border-gray-500'
                      }`}>
                        {rule.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-desert-sand text-sm mb-3">{rule.description}</p>

                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-desert-sand">Threshold: </span>
                        <span className="text-phoenix-coral font-bold">{rule.threshold}</span>
                      </div>
                      <div>
                        <span className="text-desert-sand">Channels: </span>
                        <span className="text-phoenix-coral font-bold">{rule.channels.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-phoenix-gradient text-white rounded font-bold hover:opacity-90">
                      Edit
                    </button>
                    <button className={`px-4 py-2 rounded font-bold ${
                      rule.status === 'active'
                        ? 'bg-gray-500/20 text-gray-400 border border-gray-500'
                        : 'bg-green-500/20 text-green-400 border border-green-500'
                    }`}>
                      {rule.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Notification Channels */}
        <DashboardCard title="Notification Channels">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-patriot-darkNavy border-2 border-green-500/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-desert-tan font-bold text-lg">Email</p>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-desert-sand text-sm mb-2">team@patriotdisposal.com</p>
              <p className="text-green-400 text-xs font-bold">ACTIVE</p>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-green-500/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-desert-tan font-bold text-lg">SMS</p>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-desert-sand text-sm mb-2">+1 (480) 851-2000</p>
              <p className="text-green-400 text-xs font-bold">ACTIVE (Critical Only)</p>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-gray-500/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-desert-tan font-bold text-lg">Slack</p>
                <XCircle className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-desert-sand text-sm mb-2">Not configured</p>
              <button className="text-phoenix-coral text-xs font-bold hover:underline">Configure</button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
