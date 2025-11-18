'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Eye, AlertTriangle, Shield, MapPin, Clock, Activity, Fingerprint, Network, Server, Loader2 } from 'lucide-react';
import { competitorApi, Visitor, CompetitorIP } from '@/lib/api-client';

interface CompetitorStats {
  totalCompetitorVisits: number;
  todayCompetitorVisits: number;
  weekCompetitorVisits: number;
  vpnDetections: number;
  topCompetitors: { companyName: string; visits: number }[];
}

export default function VisitorIntelligencePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [competitorVisitors, setCompetitorVisitors] = useState<Visitor[]>([]);
  const [competitorIPs, setCompetitorIPs] = useState<CompetitorIP[]>([]);
  const [stats, setStats] = useState<CompetitorStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [visitorsRes, ipsRes, statsRes] = await Promise.all([
          competitorApi.getVisitors({ limit: 10 }),
          competitorApi.getIPs(),
          competitorApi.getStats(),
        ]);

        setCompetitorVisitors(visitorsRes.data.data);
        setCompetitorIPs(ipsRes.data.data);
        setStats(statsRes.data.data);
      } catch (err) {
        console.error('Failed to fetch competitor data:', err);
        setError('Failed to load competitor intelligence data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getLocationString = (visitor: Visitor) => {
    const parts = [];
    if (visitor.city) parts.push(visitor.city);
    if (visitor.state) parts.push(visitor.state);
    return parts.join(', ') || 'Unknown';
  };

  const getThreatLevel = (ip: CompetitorIP): 'high' | 'medium' | 'low' => {
    if (ip.threatLevel === 'high') return 'high';
    if (ip.threatLevel === 'medium') return 'medium';
    return 'low';
  };

  const getConfidenceLevel = (visitor: Visitor): number => {
    let confidence = 50;
    if (visitor.isCompetitor) confidence += 30;
    if (visitor.companyName) confidence += 15;
    if (visitor.isVpn) confidence -= 10;
    if (visitor.fraudScore && visitor.fraudScore > 75) confidence += 10;
    return Math.min(95, Math.max(60, confidence));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-phoenix-coral animate-spin mx-auto mb-4" />
            <p className="text-desert-tan">Loading competitor intelligence...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-red-300 font-bold text-lg">Error Loading Data</p>
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const hasHighThreatActivity = (stats?.todayCompetitorVisits || 0) > 5;
  const behavioralFlags = [
    { behavior: 'VPN/Proxy Detected', count: stats?.vpnDetections || 0, severity: 'low' as const },
    { behavior: 'Known Competitor IPs', count: competitorIPs.filter(ip => getThreatLevel(ip) === 'high').length, severity: 'high' as const },
    { behavior: 'Multiple Page Views', count: competitorVisitors.filter(v => (v._count?.pageViews || 0) > 5).length, severity: 'medium' as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-red-400" />
            <h1 className="text-3xl font-bold text-desert-tan">Visitor Intelligence</h1>
          </div>
          <p className="text-desert-sand">Competitive intelligence & suspicious activity monitoring</p>
        </div>

        {hasHighThreatActivity && (
          <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4 flex items-center gap-3 animate-pulse">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-red-300 font-bold text-lg">🚨 HIGH THREAT ACTIVITY DETECTED</p>
              <p className="text-red-400">
                {stats?.todayCompetitorVisits || 0} competitor visits today • {stats?.vpnDetections || 0} VPN/Proxy detections
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-patriot-navy border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Competitor Visits (24h)</p>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-4xl font-bold text-red-400">{stats?.todayCompetitorVisits || 0}</p>
            <p className="text-xs text-red-300 mt-1">Total: {stats?.totalCompetitorVisits || 0}</p>
          </div>

          <div className="bg-patriot-navy border-2 border-yellow-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">VPN Detections</p>
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-4xl font-bold text-yellow-400">{stats?.vpnDetections || 0}</p>
            <p className="text-xs text-yellow-300 mt-1">Masked connections</p>
          </div>

          <div className="bg-patriot-navy border-2 border-orange-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Active Visitors</p>
              <Activity className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-4xl font-bold text-orange-400">{competitorVisitors.length}</p>
            <p className="text-xs text-orange-300 mt-1">Recently detected</p>
          </div>

          <div className="bg-patriot-navy border-2 border-purple-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Network Clusters</p>
              <Network className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-4xl font-bold text-purple-400">{competitorIPs.length}</p>
            <p className="text-xs text-purple-300 mt-1">{competitorIPs.filter(ip => getThreatLevel(ip) === 'high').length} high threat</p>
          </div>
        </div>

        <DashboardCard title="Suspicious Activity - Real-Time">
          {competitorVisitors.length === 0 ? (
            <div className="text-center py-8 text-desert-sand">
              <p>No competitor activity detected recently</p>
            </div>
          ) : (
            <div className="space-y-4">
              {competitorVisitors.map((visitor) => {
                const confidence = getConfidenceLevel(visitor);
                const totalDuration = visitor.pageViews?.reduce((sum, pv) => sum + (pv.duration || 0), 0) || 0;

                return (
                  <div
                    key={visitor.id}
                    className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-4 hover:border-red-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-red-300 font-bold text-lg">
                            {visitor.companyName || visitor.companyDomain || 'Unknown Organization'}
                          </span>
                          <span className="px-3 py-1 bg-red-500/30 border border-red-500 text-red-200 text-xs rounded-full font-bold">
                            {confidence}% CONFIDENCE
                          </span>
                          {visitor.isVpn && (
                            <span className="px-3 py-1 bg-yellow-500/30 border border-yellow-500 text-yellow-200 text-xs rounded-full font-bold">
                              VPN
                            </span>
                          )}
                          {visitor.isProxy && (
                            <span className="px-3 py-1 bg-orange-500/30 border border-orange-500 text-orange-200 text-xs rounded-full font-bold">
                              PROXY
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-2 text-desert-sand">
                            <Clock className="w-4 h-4 text-red-400" />
                            <span>{formatTimestamp(visitor.lastSeen)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-desert-sand">
                            <MapPin className="w-4 h-4 text-red-400" />
                            <span>{getLocationString(visitor)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-desert-sand">
                            <Server className="w-4 h-4 text-red-400" />
                            <span>{visitor.ipAddress}</span>
                          </div>
                          <div className="flex items-center gap-2 text-desert-sand">
                            <Activity className="w-4 h-4 text-red-400" />
                            <span>{formatDuration(totalDuration)}</span>
                          </div>
                        </div>

                        <div className="bg-red-950/50 border border-red-500/30 rounded p-3 mb-3">
                          <p className="text-red-200 font-bold text-sm mb-1">🎯 Detection Reason:</p>
                          <p className="text-red-300 text-sm">
                            {visitor.isCompetitor && 'Flagged as competitor IP • '}
                            {visitor.isVpn && 'VPN/Proxy detected • '}
                            {visitor.companyName && `Corporate network: ${visitor.companyName} • `}
                            {(visitor.fraudScore || 0) > 75 && 'High fraud score'}
                          </p>
                        </div>

                        {visitor.pageViews && visitor.pageViews.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-desert-sand text-sm font-bold">Pages Viewed ({visitor.pageViews.length}):</p>
                            <div className="flex flex-wrap gap-2">
                              {visitor.pageViews.slice(0, 6).map((page) => (
                                <span key={page.id} className="px-2 py-1 bg-patriot-navy border border-phoenix-coral/30 rounded text-desert-tan text-xs">
                                  {page.path}
                                </span>
                              ))}
                              {visitor.pageViews.length > 6 && (
                                <span className="px-2 py-1 bg-patriot-navy border border-phoenix-coral/30 rounded text-desert-tan text-xs">
                                  +{visitor.pageViews.length - 6} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {visitor.fingerprint && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-desert-sand">
                            <Fingerprint className="w-4 h-4 text-purple-400" />
                            <span className="font-mono">{visitor.fingerprint}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DashboardCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Network Clusters">
            {competitorIPs.length === 0 ? (
              <div className="text-center py-8 text-desert-sand">
                <p>No competitor IP ranges configured</p>
              </div>
            ) : (
              <div className="space-y-3">
                {competitorIPs.map((cluster) => {
                  const threatLevel = getThreatLevel(cluster);
                  return (
                    <div key={cluster.id} className={`p-4 rounded-lg border-2 ${
                      threatLevel === 'high' ? 'bg-red-900/20 border-red-500/50' :
                      threatLevel === 'medium' ? 'bg-orange-900/20 border-orange-500/50' :
                      'bg-yellow-900/20 border-yellow-500/50'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-desert-tan font-bold">{cluster.companyName}</p>
                          <p className="text-desert-sand text-sm font-mono">{cluster.ipRange}</p>
                          {cluster.domain && (
                            <p className="text-desert-sand text-xs mt-1">{cluster.domain}</p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          threatLevel === 'high' ? 'bg-red-500/30 text-red-300' :
                          threatLevel === 'medium' ? 'bg-orange-500/30 text-orange-300' :
                          'bg-yellow-500/30 text-yellow-300'
                        }`}>
                          {threatLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-desert-sand">
                        <p className="text-xs">Last Updated: {formatLastSeen(cluster.updatedAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </DashboardCard>

          <DashboardCard title="Behavioral Red Flags">
            <div className="space-y-3">
              {behavioralFlags.map((flag, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-patriot-darkNavy rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      flag.severity === 'high' ? 'bg-red-500 animate-pulse' :
                      flag.severity === 'medium' ? 'bg-orange-500' :
                      'bg-yellow-500'
                    }`} />
                    <span className="text-desert-tan text-sm">{flag.behavior}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      flag.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                      flag.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {flag.severity.toUpperCase()}
                    </span>
                    <span className="text-phoenix-coral font-bold text-lg">{flag.count}</span>
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
