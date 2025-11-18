'use client';

import { useEffect, useState } from 'react';
import { dashboardApi } from '@/lib/api-client';
import MetricCard from './MetricCard';
import {
  Users,
  Truck,
  Package,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function StatsOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardApi.getStats();
      setStats(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch dashboard stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-patriot-darkNavy rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-patriot-blue/20 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-patriot-blue/20 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-4">
        <p className="text-red-300">Failed to load stats: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Fleet & Operations Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Fleet"
          value={stats?.fleet?.total || 0}
          subtitle={`${stats?.fleet?.available || 0} available`}
          icon={<Truck className="w-5 h-5" />}
          trend={stats?.fleet?.inUse > 0 ? 'up' : 'neutral'}
        />
        <MetricCard
          title="Active Routes"
          value={stats?.routes?.active || 0}
          subtitle={`${stats?.routes?.today || 0} scheduled today`}
          icon={<Package className="w-5 h-5" />}
          trend="neutral"
        />
        <MetricCard
          title="Active Drivers"
          value={stats?.drivers?.active || 0}
          subtitle={`${stats?.drivers?.onRoute || 0} on route`}
          icon={<Users className="w-5 h-5" />}
          trend="neutral"
        />
        <MetricCard
          title="Active Customers"
          value={stats?.customers?.total || 0}
          subtitle={`${stats?.customers?.activeTickets || 0} open tickets`}
          icon={<Activity className="w-5 h-5" />}
          trend="neutral"
        />
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's Revenue"
          value={`$${(stats?.revenue?.today || 0).toLocaleString()}`}
          icon={<DollarSign className="w-5 h-5" />}
          trend="up"
        />
        <MetricCard
          title="Week Revenue"
          value={`$${(stats?.revenue?.week || 0).toLocaleString()}`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend="up"
        />
        <MetricCard
          title="Pending Invoices"
          value={`$${(stats?.revenue?.pending || 0).toLocaleString()}`}
          subtitle={`${stats?.revenue?.pendingCount || 0} invoices`}
          icon={<DollarSign className="w-5 h-5" />}
          trend={stats?.revenue?.pendingCount > 0 ? 'down' : 'neutral'}
        />
        <MetricCard
          title="Overdue Invoices"
          value={`$${(stats?.revenue?.overdue || 0).toLocaleString()}`}
          subtitle={`${stats?.revenue?.overdueCount || 0} invoices`}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={stats?.revenue?.overdueCount > 0 ? 'down' : 'up'}
        />
      </div>

      {/* SEO Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="SEO Score"
          value={stats?.seo?.seoScore || 0}
          suffix="/100"
          icon={<TrendingUp className="w-5 h-5" />}
          trend={stats?.seo?.seoScore >= 80 ? 'up' : 'down'}
        />
        <MetricCard
          title="Performance"
          value={stats?.seo?.performanceScore || 0}
          suffix="/100"
          icon={<Activity className="w-5 h-5" />}
          trend={stats?.seo?.performanceScore >= 80 ? 'up' : 'down'}
        />
        <MetricCard
          title="Avg Keyword Rank"
          value={stats?.seo?.avgKeywordPosition || 0}
          subtitle={`${stats?.seo?.totalKeywords || 0} keywords tracked`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={stats?.seo?.avgKeywordPosition <= 10 ? 'up' : 'down'}
        />
        <MetricCard
          title="Accessibility"
          value={stats?.seo?.accessibilityScore || 0}
          suffix="/100"
          icon={<Activity className="w-5 h-5" />}
          trend={stats?.seo?.accessibilityScore >= 80 ? 'up' : 'down'}
        />
      </div>
    </div>
  );
}
