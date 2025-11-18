'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { reportApi } from '@/lib/api-client';
import { FileText, Download, Calendar, TrendingUp, Users, Truck, MapPin, DollarSign, Loader2 } from 'lucide-react';

const reportTemplates = [
  {
    id: 'routes',
    name: 'Routes Report',
    description: 'Route completion rates, delays, and efficiency metrics',
    icon: MapPin,
    apiCall: 'getRoutes'
  },
  {
    id: 'fleet',
    name: 'Fleet Report',
    description: 'Vehicle status, maintenance schedules, and utilization',
    icon: Truck,
    apiCall: 'getFleet'
  },
  {
    id: 'revenue',
    name: 'Revenue Report',
    description: 'Income, outstanding payments, and billing summary',
    icon: DollarSign,
    apiCall: 'getRevenue'
  },
  {
    id: 'drivers',
    name: 'Drivers Report',
    description: 'Driver performance, certifications, and safety scores',
    icon: Users,
    apiCall: 'getDrivers'
  },
  {
    id: 'customers',
    name: 'Customers Report',
    description: 'Customer accounts, service types, and account balances',
    icon: TrendingUp,
    apiCall: 'getCustomers'
  },
];

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [reportData, setReportData] = useState<any>(null);
  const [activeReport, setActiveReport] = useState<string | null>(null);

  const generateReport = async (reportId: string, apiCall: string) => {
    setGenerating(reportId);
    setActiveReport(reportId);
    setReportData(null);

    try {
      let response;
      const params = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      };

      switch (apiCall) {
        case 'getRoutes':
          response = await reportApi.getRoutes(params);
          break;
        case 'getFleet':
          response = await reportApi.getFleet(params);
          break;
        case 'getRevenue':
          response = await reportApi.getRevenue(params);
          break;
        case 'getDrivers':
          response = await reportApi.getDrivers();
          break;
        case 'getCustomers':
          response = await reportApi.getCustomers();
          break;
        default:
          throw new Error('Unknown report type');
      }

      setReportData(response.data.data);
    } catch (err) {
      console.error('Failed to generate report:', err);
      alert('Failed to generate report');
    } finally {
      setGenerating(null);
    }
  };

  const exportReport = async (format: string) => {
    if (!activeReport) {
      alert('Please generate a report first');
      return;
    }

    try {
      await reportApi.export({
        reportType: activeReport,
        format,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });
      alert(`Export to ${format.toUpperCase()} started`);
    } catch (err) {
      console.error('Failed to export report:', err);
      alert('Failed to export report');
    }
  };
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-desert-tan mb-2">Reports & Exports</h1>
            <p className="text-desert-sand">Generate and export operational reports</p>
          </div>

          {/* Date Range Selector */}
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <label className="block text-desert-sand text-sm mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-2 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                />
              </div>
              <div>
                <label className="block text-desert-sand text-sm mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-2 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                />
              </div>
            </div>
          </div>

          {/* Report Templates */}
          <DashboardCard title="Available Reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTemplates.map((template) => {
                const Icon = template.icon;
                const isGenerating = generating === template.id;
                const isActive = activeReport === template.id;
                return (
                  <div
                    key={template.id}
                    className={`bg-patriot-darkNavy border-2 rounded-lg p-6 transition-all ${
                      isActive ? 'border-phoenix-coral' : 'border-phoenix-coral/30 hover:border-phoenix-coral'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-phoenix-gradient rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-desert-tan font-bold">{template.name}</p>
                      </div>
                    </div>
                    <p className="text-desert-sand text-sm mb-4">{template.description}</p>
                    <button
                      onClick={() => generateReport(template.id, template.apiCall)}
                      disabled={isGenerating}
                      className="w-full px-4 py-2 bg-phoenix-gradient text-white rounded font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        'Generate'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </DashboardCard>

          {/* Report Data Display */}
          {reportData && (
            <DashboardCard title={`${reportTemplates.find(r => r.id === activeReport)?.name || 'Report'} Results`}>
              <div className="bg-patriot-darkNavy rounded-lg p-4 overflow-x-auto">
                <pre className="text-desert-tan text-sm">
                  {JSON.stringify(reportData, null, 2)}
                </pre>
              </div>
            </DashboardCard>
          )}

          {/* Export Options */}
          <DashboardCard title="Export Formats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => exportReport('pdf')}
                className="p-4 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg text-center hover:border-phoenix-coral transition-colors"
              >
                <FileText className="w-12 h-12 text-phoenix-coral mx-auto mb-2" />
                <p className="text-desert-tan font-bold">PDF Report</p>
                <p className="text-desert-sand text-sm">Professional branded reports</p>
              </button>

              <button
                onClick={() => exportReport('csv')}
                className="p-4 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg text-center hover:border-phoenix-coral transition-colors"
              >
                <FileText className="w-12 h-12 text-phoenix-coral mx-auto mb-2" />
                <p className="text-desert-tan font-bold">Excel/CSV</p>
                <p className="text-desert-sand text-sm">Raw data for analysis</p>
              </button>

              <button
                onClick={() => exportReport('json')}
                className="p-4 bg-patriot-darkNavy border-2 border-phoenix-coral/30 rounded-lg text-center hover:border-phoenix-coral transition-colors"
              >
                <FileText className="w-12 h-12 text-phoenix-coral mx-auto mb-2" />
                <p className="text-desert-tan font-bold">JSON/API</p>
                <p className="text-desert-sand text-sm">Programmatic access</p>
              </button>
            </div>
          </DashboardCard>

          {/* Contact Info */}
          <div className="text-center text-desert-sand text-sm">
            For custom reports, contact <a href="mailto:info@pdphx.com" className="text-phoenix-coral hover:underline">info@pdphx.com</a>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
