'use client';

import { useEffect, useState } from 'react';
import { dashboardApi } from '@/lib/api-client';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function DashboardAlerts() {
  const [alerts, setAlerts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
    // Refresh every minute
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await dashboardApi.getAlerts();
      setAlerts(response.data.data);
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-patriot-darkNavy rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-patriot-blue/20 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-patriot-blue/20 rounded w-3/4"></div>
      </div>
    );
  }

  if (!alerts || alerts.alerts.length === 0) {
    return (
      <div className="bg-green-900/20 border-2 border-green-500/50 rounded-lg p-4 flex items-center gap-3">
        <Info className="w-6 h-6 text-green-400" />
        <div>
          <p className="text-green-300 font-bold">All Systems Operational</p>
          <p className="text-green-400 text-sm">No alerts at this time</p>
        </div>
      </div>
    );
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'red';
      case 'MEDIUM':
        return 'yellow';
      default:
        return 'blue';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'LICENSE_EXPIRING':
      case 'LOW_SAFETY_SCORE':
      case 'MAINTENANCE_DUE':
        return <AlertTriangle className="w-6 h-6" />;
      case 'URGENT_TICKET':
      case 'OVERDUE_INVOICE':
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <Info className="w-6 h-6" />;
    }
  };

  // Show top 5 alerts
  const topAlerts = alerts.alerts.slice(0, 5);

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-desert-tan font-bold">System Alerts</h3>
          <div className="flex gap-3 text-sm">
            <span className="text-red-400">High: {alerts.summary.high}</span>
            <span className="text-yellow-400">Medium: {alerts.summary.medium}</span>
            <span className="text-desert-sand">Total: {alerts.summary.total}</span>
          </div>
        </div>
      </div>

      {/* Alert List */}
      {topAlerts.map((alert: any, index: number) => {
        const color = getAlertColor(alert.severity);
        return (
          <div
            key={index}
            className={`bg-${color}-900/20 border-2 border-${color}-500/50 rounded-lg p-4 flex items-center gap-3`}
          >
            <div className={`text-${color}-400`}>
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1">
              <p className={`text-${color}-300 font-bold text-sm`}>
                {alert.type.replace(/_/g, ' ')}
              </p>
              <p className={`text-${color}-400 text-sm`}>{alert.message}</p>
            </div>
          </div>
        );
      })}

      {alerts.alerts.length > 5 && (
        <p className="text-desert-sand text-sm text-center">
          +{alerts.alerts.length - 5} more alerts
        </p>
      )}
    </div>
  );
}
