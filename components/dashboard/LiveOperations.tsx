'use client';

import { useEffect, useState } from 'react';
import { dashboardApi } from '@/lib/api-client';
import DashboardCard from './DashboardCard';
import { Truck, Users, Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function LiveOperations() {
  const [liveData, setLiveData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveData();
    // Refresh every 10 seconds for live data
    const interval = setInterval(fetchLiveData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchLiveData = async () => {
    try {
      const response = await dashboardApi.getLive();
      setLiveData(response.data.data);
    } catch (err) {
      console.error('Failed to fetch live operations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-patriot-darkNavy rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-patriot-blue/20 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-16 bg-patriot-blue/20 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'text-blue-400';
      case 'DELAYED':
        return 'text-red-400';
      case 'COMPLETED':
        return 'text-green-400';
      default:
        return 'text-desert-sand';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return <Activity className="w-4 h-4" />;
      case 'DELAYED':
        return <AlertCircle className="w-4 h-4" />;
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-phoenix-coral" />
            <div>
              <p className="text-desert-sand text-sm">Active Routes</p>
              <p className="text-2xl font-bold text-desert-tan">{liveData?.routes?.count || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-phoenix-coral" />
            <div>
              <p className="text-desert-sand text-sm">Drivers On Duty</p>
              <p className="text-2xl font-bold text-desert-tan">{liveData?.drivers?.count || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-phoenix-coral" />
            <div>
              <p className="text-desert-sand text-sm">Stops Completed Today</p>
              <p className="text-2xl font-bold text-desert-tan">
                {liveData?.stops?.completed || 0} / {liveData?.stops?.total || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Routes */}
        <DashboardCard title="Active Routes">
          {!liveData || liveData.routes.count === 0 ? (
            <div className="text-center py-8 text-desert-sand">
              <Truck className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active routes at the moment</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {liveData.routes.active.map((route: any) => (
                <div
                  key={route.id}
                  className="bg-patriot-darkNavy rounded-lg p-4 hover:bg-patriot-blue/20 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-desert-tan font-bold">{route.routeName}</p>
                      <p className="text-desert-sand text-sm">{route.routeNumber}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${getStatusColor(route.status)}`}>
                      {getStatusIcon(route.status)}
                      <span className="text-sm">{route.status.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {route.assignedDriver && (
                    <div className="flex items-center gap-2 text-sm text-desert-sand mb-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {route.assignedDriver.firstName} {route.assignedDriver.lastName}
                      </span>
                    </div>
                  )}

                  {route.assignedVehicle && (
                    <div className="flex items-center gap-2 text-sm text-desert-sand mb-2">
                      <Truck className="w-4 h-4" />
                      <span>{route.assignedVehicle.truckNumber}</span>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-desert-sand mb-1">
                      <span>
                        {route.completedStops} / {route.totalStops} stops
                      </span>
                      <span>{route.progress}%</span>
                    </div>
                    <div className="w-full bg-patriot-darkNavy rounded-full h-2">
                      <div
                        className="bg-phoenix-gradient h-2 rounded-full transition-all"
                        style={{ width: `${route.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>

        {/* On-Duty Drivers */}
        <DashboardCard title="Drivers On Duty">
          {!liveData || liveData.drivers.count === 0 ? (
            <div className="text-center py-8 text-desert-sand">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No drivers on duty</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {liveData.drivers.onDuty.map((driver: any) => (
                <div
                  key={driver.id}
                  className="bg-patriot-darkNavy rounded-lg p-4 hover:bg-patriot-blue/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-phoenix-gradient rounded-full flex items-center justify-center text-white font-bold">
                        {driver.firstName[0]}{driver.lastName[0]}
                      </div>
                      <div>
                        <p className="text-desert-tan font-medium">
                          {driver.firstName} {driver.lastName}
                        </p>
                        {driver.assignedVehicle && (
                          <p className="text-desert-sand text-sm flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            {driver.assignedVehicle.truckNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>
      </div>

      {/* Recent Tickets */}
      {liveData?.tickets?.count > 0 && (
        <DashboardCard title="Recent Service Tickets">
          <div className="space-y-3">
            {liveData.tickets.today.slice(0, 5).map((ticket: any) => (
              <div
                key={ticket.id}
                className="bg-patriot-darkNavy rounded-lg p-4 hover:bg-patriot-blue/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        ticket.priority === 'HIGH' || ticket.priority === 'URGENT'
                          ? 'bg-red-900/50 text-red-300'
                          : ticket.priority === 'MEDIUM'
                          ? 'bg-yellow-900/50 text-yellow-300'
                          : 'bg-blue-900/50 text-blue-300'
                      }`}>
                        {ticket.priority}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-desert-tan font-medium">{ticket.description}</p>
                    <p className="text-desert-sand text-sm mt-1">
                      {ticket.customer.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}
    </div>
  );
}
