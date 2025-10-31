'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import MetricCard from '@/components/dashboard/MetricCard';
import { BarChart3, Users, MousePointerClick, Eye, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pagePerformance = [
  { page: 'Homepage', views: 12453, avgTime: '2:34', bounceRate: 42, exitRate: 35 },
  { page: 'Services', views: 8234, avgTime: '3:12', bounceRate: 38, exitRate: 28 },
  { page: 'Residential', views: 6891, avgTime: '4:05', bounceRate: 25, exitRate: 45 },
  { page: 'Commercial', views: 5432, avgTime: '3:48', bounceRate: 31, exitRate: 52 },
  { page: 'Contact', views: 4123, avgTime: '5:21', bounceRate: 15, exitRate: 88 },
];

const conversionFunnel = [
  { step: 'Homepage', visitors: 10000, conversion: 100 },
  { step: 'Service Page', visitors: 4200, conversion: 42 },
  { step: 'Pricing', visitors: 2100, conversion: 21 },
  { step: 'Contact Form', visitors: 840, conversion: 8.4 },
  { step: 'Submission', visitors: 420, conversion: 4.2 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">User Behavior Analytics</h1>
          <p className="text-desert-sand">Deep dive into visitor behavior and engagement</p>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Avg Pages/Session"
            value="5.7"
            change={8.2}
            icon={<Eye className="w-5 h-5" />}
          />
          <MetricCard
            title="Avg Session Duration"
            value="6:42"
            change={-3.1}
            icon={<Clock className="w-5 h-5" />}
          />
          <MetricCard
            title="Bounce Rate"
            value="32.4"
            change={-5.8}
            suffix="%"
            icon={<MousePointerClick className="w-5 h-5" />}
          />
          <MetricCard
            title="Engaged Sessions"
            value="68.3"
            change={12.4}
            suffix="%"
            icon={<Users className="w-5 h-5" />}
          />
        </div>

        {/* Page Performance */}
        <DashboardCard title="Page Performance">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-phoenix-coral/20">
                  <th className="text-left py-3 px-4 text-desert-sand font-bold">Page</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Views</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Avg Time</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Bounce Rate</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Exit Rate</th>
                </tr>
              </thead>
              <tbody>
                {pagePerformance.map((page, index) => (
                  <tr key={index} className="border-b border-phoenix-coral/10 hover:bg-patriot-blue/10 transition-colors">
                    <td className="py-3 px-4 text-desert-tan font-medium">{page.page}</td>
                    <td className="py-3 px-4 text-right text-desert-tan font-bold">{page.views.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-desert-sand">{page.avgTime}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        page.bounceRate <= 30 ? 'bg-green-500/20 text-green-400' :
                        page.bounceRate <= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {page.bounceRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-desert-sand">{page.exitRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Conversion Funnel */}
        <DashboardCard title="Conversion Funnel">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={conversionFunnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2B4A" />
              <XAxis type="number" stroke="#E8DCC4" />
              <YAxis dataKey="step" type="category" stroke="#E8DCC4" width={150} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A2B4A', border: '2px solid #FF8C69', borderRadius: '8px' }}
                labelStyle={{ color: '#E8DCC4' }}
              />
              <Bar dataKey="visitors" fill="#D4A574" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-5 gap-4 mt-6">
            {conversionFunnel.map((step, index) => (
              <div key={index} className="text-center">
                <p className="text-desert-sand text-sm mb-1">{step.step}</p>
                <p className="text-phoenix-coral font-bold text-2xl">{step.conversion}%</p>
                {index < conversionFunnel.length - 1 && (
                  <p className="text-red-400 text-xs mt-1">
                    -{(conversionFunnel[index].conversion - conversionFunnel[index + 1].conversion).toFixed(1)}%
                  </p>
                )}
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Heatmap Placeholder */}
        <DashboardCard title="Heatmaps & Session Recordings">
          <div className="h-96 bg-patriot-darkNavy rounded-lg flex items-center justify-center border-2 border-phoenix-coral/20">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-phoenix-coral mx-auto mb-4" />
              <p className="text-desert-tan font-bold text-lg">Heatmaps & Recordings Coming Soon</p>
              <p className="text-desert-sand text-sm">Click tracking, scroll depth, and session replay features will be displayed here</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
