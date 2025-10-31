'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { FileText, Download, Mail, Calendar, TrendingUp, Users, Target, Award } from 'lucide-react';

const reportTemplates = [
  {
    id: 1,
    name: 'Executive Summary',
    description: 'High-level overview of traffic, SEO, and competitive metrics',
    frequency: 'Weekly',
    lastGenerated: '10/28/2025',
    icon: TrendingUp,
    color: 'phoenix-gold'
  },
  {
    id: 2,
    name: 'SEO Performance Report',
    description: 'Detailed keyword rankings, backlinks, and technical SEO health',
    frequency: 'Monthly',
    lastGenerated: '10/01/2025',
    icon: Target,
    color: 'phoenix-coral'
  },
  {
    id: 3,
    name: 'Competitor Analysis',
    description: 'Side-by-side comparison with top 5 competitors',
    frequency: 'Bi-Weekly',
    lastGenerated: '10/15/2025',
    icon: Award,
    color: 'phoenix-orange'
  },
  {
    id: 4,
    name: 'Traffic Source Report',
    description: 'Breakdown of organic, direct, referral, and paid traffic',
    frequency: 'Weekly',
    lastGenerated: '10/28/2025',
    icon: Users,
    color: 'phoenix-flame'
  },
];

const scheduledReports = [
  { report: 'Executive Summary', recipients: 'team@patriotdisposal.com', schedule: 'Every Monday 9:00 AM', status: 'active' },
  { report: 'SEO Performance Report', recipients: 'seo@patriotdisposal.com', schedule: '1st of every month', status: 'active' },
  { report: 'Competitor Analysis', recipients: 'management@patriotdisposal.com', schedule: 'Every other Friday', status: 'paused' },
];

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">Reports & Exports</h1>
          <p className="text-desert-sand">Generate and schedule automated reports</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-phoenix-gradient p-6 rounded-lg hover:scale-105 transition-transform">
            <Download className="w-8 h-8 text-white mb-2" />
            <p className="text-white font-bold">Generate Report Now</p>
            <p className="text-white/80 text-sm mt-1">Create a custom report instantly</p>
          </button>

          <button className="bg-patriot-navy border-2 border-phoenix-coral p-6 rounded-lg hover:border-phoenix-coral/80 transition-colors">
            <Calendar className="w-8 h-8 text-phoenix-coral mb-2" />
            <p className="text-desert-tan font-bold">Schedule Report</p>
            <p className="text-desert-sand text-sm mt-1">Set up automated delivery</p>
          </button>

          <button className="bg-patriot-navy border-2 border-phoenix-coral p-6 rounded-lg hover:border-phoenix-coral/80 transition-colors">
            <Mail className="w-8 h-8 text-phoenix-coral mb-2" />
            <p className="text-desert-tan font-bold">Email Reports</p>
            <p className="text-desert-sand text-sm mt-1">Manage email distribution</p>
          </button>
        </div>

        {/* Report Templates */}
        <DashboardCard title="Available Report Templates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div key={template.id} className="bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral transition-all hover:scale-105">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-phoenix-gradient rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-desert-tan font-bold text-lg">{template.name}</p>
                        <p className="text-desert-sand text-sm">{template.frequency}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-desert-sand text-sm mb-4">{template.description}</p>
                  <div className="flex items-center justify-between text-xs text-desert-sand">
                    <span>Last: {template.lastGenerated}</span>
                    <button className="px-4 py-2 bg-phoenix-gradient text-white rounded font-bold hover:opacity-90">
                      Generate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        {/* Scheduled Reports */}
        <DashboardCard title="Scheduled Reports">
          <div className="space-y-3">
            {scheduledReports.map((scheduled, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-patriot-darkNavy rounded-lg">
                <div className="flex-1">
                  <p className="text-desert-tan font-bold">{scheduled.report}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-desert-sand">
                    <span>📧 {scheduled.recipients}</span>
                    <span>📅 {scheduled.schedule}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    scheduled.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {scheduled.status.toUpperCase()}
                  </span>
                  <button className="text-desert-sand hover:text-phoenix-coral">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Export Options */}
        <DashboardCard title="Export Formats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg text-center hover:border-phoenix-coral transition-colors">
              <FileText className="w-12 h-12 text-phoenix-coral mx-auto mb-2" />
              <p className="text-desert-tan font-bold">PDF Report</p>
              <p className="text-desert-sand text-sm">Professional branded reports</p>
            </div>

            <div className="p-4 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg text-center hover:border-phoenix-coral transition-colors">
              <FileText className="w-12 h-12 text-phoenix-coral mx-auto mb-2" />
              <p className="text-desert-tan font-bold">Excel/CSV</p>
              <p className="text-desert-sand text-sm">Raw data for analysis</p>
            </div>

            <div className="p-4 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg text-center hover:border-phoenix-coral transition-colors">
              <FileText className="w-12 h-12 text-phoenix-coral mx-auto mb-2" />
              <p className="text-desert-tan font-bold">JSON/API</p>
              <p className="text-desert-sand text-sm">Programmatic access</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
