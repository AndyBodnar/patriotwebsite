'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import MetricCard from '@/components/dashboard/MetricCard';
import {
  Users,
  Eye,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  Target,
  AlertTriangle
} from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trafficData = [
  { date: '10/24', visitors: 1200 },
  { date: '10/25', visitors: 1800 },
  { date: '10/26', visitors: 1600 },
  { date: '10/27', visitors: 2100 },
  { date: '10/28', visitors: 1900 },
  { date: '10/29', visitors: 2400 },
  { date: '10/30', visitors: 2800 },
];

const sourceData = [
  { name: 'Organic', value: 45, color: '#D4A574' },
  { name: 'Direct', value: 25, color: '#FF8C69' },
  { name: 'Referral', value: 15, color: '#FF6B45' },
  { name: 'Social', value: 10, color: '#FF5733' },
  { name: 'Paid', value: 5, color: '#8B2332' },
];

const deviceData = [
  { name: 'Mobile', value: 52 },
  { name: 'Desktop', value: 38 },
  { name: 'Tablet', value: 10 },
];

const topPages = [
  { page: '/', views: 12453, conversion: 4.2 },
  { page: '/services', views: 8234, conversion: 6.8 },
  { page: '/residential', views: 6891, conversion: 8.1 },
  { page: '/commercial', views: 5432, conversion: 5.4 },
  { page: '/contact', views: 4123, conversion: 12.3 },
];

const liveVisitors = [
  { id: 1, page: '/services', location: 'Phoenix, AZ', device: 'Mobile', duration: '2:34' },
  { id: 2, page: '/residential', location: 'Scottsdale, AZ', device: 'Desktop', duration: '1:12' },
  { id: 3, page: '/', location: 'Tempe, AZ', device: 'Mobile', duration: '0:45' },
  { id: 4, page: '/contact', location: 'Mesa, AZ', device: 'Desktop', duration: '3:21' },
  { id: 5, page: '/commercial', location: 'Chandler, AZ', device: 'Tablet', duration: '1:56' },
];

export default function SystemPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">Dashboard Overview</h1>
          <p className="text-desert-sand">Real-time analytics and competitive intelligence</p>
        </div>

        <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <div>
            <p className="text-red-300 font-bold">Competitor Alert!</p>
            <p className="text-red-400 text-sm">3 visits detected from known competitor IP ranges in the last hour</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total Visitors (24h)" value="2,847" change={12.5} icon={<Users className="w-5 h-5" />} />
          <MetricCard title="Page Views" value="6,423" change={8.3} icon={<Eye className="w-5 h-5" />} />
          <MetricCard title="Avg Session Duration" value="3:24" change={-2.1} icon={<Clock className="w-5 h-5" />} />
          <MetricCard title="Conversion Rate" value="4.8" change={15.2} suffix="%" icon={<Target className="w-5 h-5" />} />
        </div>

        <DashboardCard title="Live Visitors (Real-Time)">
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-2xl font-bold text-green-400">23</span>
                <span className="text-desert-sand">Active Now</span>
              </div>
            </div>
            <div className="space-y-2">
              {liveVisitors.map((visitor) => (
                <div key={visitor.id} className="flex items-center justify-between p-3 bg-patriot-darkNavy rounded-lg hover:bg-patriot-blue/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-phoenix-coral" />
                    <span className="text-desert-tan font-medium">{visitor.page}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-desert-sand">
                    <span>{visitor.location}</span>
                    <span>{visitor.device}</span>
                    <span className="text-phoenix-coral">{visitor.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Traffic Trend (7 Days)">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A574" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4A574" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2B4A" />
                <XAxis dataKey="date" stroke="#E8DCC4" />
                <YAxis stroke="#E8DCC4" />
                <Tooltip contentStyle={{ backgroundColor: '#1A2B4A', border: '2px solid #FF8C69', borderRadius: '8px' }} labelStyle={{ color: '#E8DCC4' }} />
                <Area type="monotone" dataKey="visitors" stroke="#D4A574" fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Device Breakdown">
            <div className="space-y-4">
              {deviceData.map((device) => (
                <div key={device.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {device.name === 'Mobile' && <Smartphone className="w-4 h-4 text-phoenix-coral" />}
                      {device.name === 'Desktop' && <Monitor className="w-4 h-4 text-phoenix-coral" />}
                      {device.name === 'Tablet' && <Tablet className="w-4 h-4 text-phoenix-coral" />}
                      <span className="text-desert-tan">{device.name}</span>
                    </div>
                    <span className="text-desert-sand font-bold">{device.value}%</span>
                  </div>
                  <div className="w-full bg-patriot-darkNavy rounded-full h-2">
                    <div className="bg-phoenix-gradient h-2 rounded-full transition-all" style={{ width: `${device.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Traffic Sources">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" label={({ name, value }) => `${name}: ${value}%`} outerRadius={100} dataKey="value">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1A2B4A', border: '2px solid #FF8C69', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Top Landing Pages">
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-patriot-darkNavy rounded-lg hover:bg-patriot-blue/20 transition-colors">
                  <div className="flex-1">
                    <p className="text-desert-tan font-medium">{page.page}</p>
                    <p className="text-desert-sand text-sm">{page.views.toLocaleString()} views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-phoenix-coral font-bold">{page.conversion}%</p>
                    <p className="text-desert-sand text-sm">conv rate</p>
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
