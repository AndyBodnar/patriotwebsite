'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import StatsOverview from '@/components/dashboard/StatsOverview';
import DashboardAlerts from '@/components/dashboard/DashboardAlerts';
import LiveOperations from '@/components/dashboard/LiveOperations';

export default function SystemPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-desert-tan mb-2">CRM Dashboard</h1>
            <p className="text-desert-sand">Real-time operations, analytics, and SEO insights</p>
          </div>

          {/* System Alerts */}
          <DashboardAlerts />

          {/* Stats Overview */}
          <StatsOverview />

          {/* Live Operations */}
          <LiveOperations />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
