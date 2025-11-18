'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ServiceConnection, { ChartEmptyState, MultiServiceConnection } from '@/components/dashboard/ServiceConnection';
import { useConnectionStatus, useAPIConnections } from '@/contexts/APIConnectionsContext';
import {
  TrendingUp, Search, Link as LinkIcon, Award, Zap, Globe, BarChart3,
  Activity, MapPin, Star, FileSearch, Eye, ArrowUpRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';

export default function SEOPage() {
  const router = useRouter();
  const connections = useConnectionStatus();
  const { connections: fullConnections } = useAPIConnections();

  const handleConnect = (service: string) => {
    router.push('/system/settings');
  };

  const connectedCount = Object.values(connections).filter(Boolean).length;
  const totalServices = 7; // SEO services count

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-desert-tan mb-2">SEO Performance</h1>
            <p className="text-desert-sand">Keyword rankings, backlinks, and technical SEO health</p>
          </div>
          <div className="text-right">
            <p className="text-phoenix-coral font-bold text-2xl">{connectedCount}/{totalServices}</p>
            <p className="text-desert-sand text-sm">Integrations Active</p>
          </div>
        </div>

        {connectedCount === 0 && (
          <div className="bg-gradient-to-r from-phoenix-coral/20 to-patriot-blue/20 border-2 border-phoenix-coral/50 rounded-lg p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-phoenix-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-desert-tan font-bold text-2xl mb-2">Connect Your SEO Tools</h3>
                <p className="text-desert-sand mb-6 max-w-2xl">
                  Unlock the full power of your SEO Command Center by connecting your analytics and SEO platforms.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => handleConnect('Google Search Console')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Search className="w-4 h-4" />Search Console
                  </button>
                  <button onClick={() => handleConnect('Google Analytics')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />Analytics 4
                  </button>
                  <button onClick={() => handleConnect('SEMrush')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Activity className="w-4 h-4" />SEMrush
                  </button>
                  <button onClick={() => handleConnect('Ahrefs')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />Ahrefs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-desert-sand text-sm font-bold">Avg Keyword Position</p>
              <TrendingUp className="w-5 h-5 text-phoenix-coral" />
            </div>
            {connections.googleSearchConsole ? (
              <>
                <p className="text-3xl font-bold text-desert-tan">--</p>
                <p className="text-desert-sand text-sm">Loading...</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-desert-tan/30">--</p>
                <button onClick={() => handleConnect('Google Search Console')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1">
                  Connect Search Console<ArrowUpRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-desert-sand text-sm font-bold">Total Backlinks</p>
              <LinkIcon className="w-5 h-5 text-phoenix-coral" />
            </div>
            {connections.ahrefs ? (
              <>
                <p className="text-3xl font-bold text-desert-tan">--</p>
                <p className="text-desert-sand text-sm">Loading...</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-desert-tan/30">--</p>
                <button onClick={() => handleConnect('Ahrefs')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1">
                  Connect Ahrefs<ArrowUpRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-desert-sand text-sm font-bold">Domain Authority</p>
              <Award className="w-5 h-5 text-phoenix-coral" />
            </div>
            {connections.moz ? (
              <>
                <p className="text-3xl font-bold text-desert-tan">--</p>
                <p className="text-desert-sand text-sm">Loading...</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-desert-tan/30">--</p>
                <button onClick={() => handleConnect('Moz')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1">
                  Connect Moz<ArrowUpRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-desert-sand text-sm font-bold">Organic Traffic</p>
              <Eye className="w-5 h-5 text-phoenix-coral" />
            </div>
            {connections.googleAnalytics ? (
              <>
                <p className="text-3xl font-bold text-desert-tan">--</p>
                <p className="text-desert-sand text-sm">Loading...</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-desert-tan/30">--</p>
                <button onClick={() => handleConnect('Google Analytics')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1">
                  Connect Analytics<ArrowUpRight className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>

        <DashboardCard title="Average Ranking Trend">
          {connections.googleSearchConsole ? (
            <div className="text-center py-12">
              <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse text-phoenix-coral" />
              <p className="text-desert-sand">Loading ranking data...</p>
            </div>
          ) : (
            <ChartEmptyState serviceName="Google Search Console" serviceIcon={<Search className="w-8 h-8 text-white" />} chartType="Ranking Trend Chart" onConnect={() => handleConnect('Google Search Console')} />
          )}
        </DashboardCard>

        <DashboardCard title="Keyword Rankings">
          {connections.googleSearchConsole || connections.semrush ? (
            <div className="text-center py-12">
              <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse text-phoenix-coral" />
              <p className="text-desert-sand">Loading keyword data...</p>
            </div>
          ) : (
            <ServiceConnection serviceName="Google Search Console" serviceIcon={<Search className="w-10 h-10 text-white" />} description="Connect Google Search Console to track your keyword rankings, search impressions, and click-through rates." features={['Real-time keyword position tracking', 'Search query performance data', 'Click-through rate analysis', 'Impression and click trends', 'Mobile vs desktop rankings', 'Page-level performance breakdown']} requiresOAuth onConnect={() => handleConnect('Google Search Console')} docsUrl="https://search.google.com/search-console" />
          )}
        </DashboardCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Backlink Profile">
            {connections.ahrefs ? (
              <div className="text-center py-12">
                <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse text-phoenix-coral" />
                <p className="text-desert-sand">Loading backlink data...</p>
              </div>
            ) : (
              <ServiceConnection serviceName="Ahrefs" serviceIcon={<LinkIcon className="w-10 h-10 text-white" />} description="Connect Ahrefs to monitor your backlink profile and referring domains." features={['Backlink monitoring & alerts', 'Referring domains analysis', 'Domain Rating tracking', 'New & lost backlinks', 'Anchor text distribution', 'Broken backlink detection']} requiresApiKey onConnect={() => handleConnect('Ahrefs')} docsUrl="https://ahrefs.com/api" />
            )}
          </DashboardCard>
          <DashboardCard title="Domain Authority & Metrics">
            {connections.moz ? (
              <div className="text-center py-12">
                <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse text-phoenix-coral" />
                <p className="text-desert-sand">Loading Moz data...</p>
              </div>
            ) : (
              <ServiceConnection serviceName="Moz" serviceIcon={<Award className="w-10 h-10 text-white" />} description="Connect Moz to track Domain Authority and spam score metrics." features={['Domain Authority tracking', 'Page Authority scores', 'Spam Score monitoring', 'Link metrics & analysis', 'MozRank tracking', 'Root domains linking']} requiresApiKey onConnect={() => handleConnect('Moz')} docsUrl="https://moz.com/products/api" />
            )}
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Core Web Vitals">
            {connections.pageSpeedInsights ? (
              <div className="text-center py-12">
                <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse text-phoenix-coral" />
                <p className="text-desert-sand">Loading vitals...</p>
              </div>
            ) : (
              <ServiceConnection serviceName="PageSpeed Insights" serviceIcon={<Zap className="w-10 h-10 text-white" />} description="Connect PageSpeed Insights to monitor Core Web Vitals and performance." features={['LCP (Largest Contentful Paint)', 'FID (First Input Delay)', 'CLS (Cumulative Layout Shift)', 'Performance score tracking', 'Mobile & desktop analysis', 'Optimization recommendations']} requiresApiKey onConnect={() => handleConnect('PageSpeed Insights')} docsUrl="https://developers.google.com/speed/docs/insights/v5/get-started" />
            )}
          </DashboardCard>
          <DashboardCard title="Technical SEO Audit">
            {connections.semrush ? (
              <div className="text-center py-12">
                <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse text-phoenix-coral" />
                <p className="text-desert-sand">Loading audit...</p>
              </div>
            ) : (
              <ServiceConnection serviceName="SEMrush" serviceIcon={<FileSearch className="w-10 h-10 text-white" />} description="Connect SEMrush for comprehensive site audits and technical SEO." features={['Crawl error detection', 'Broken link identification', 'Duplicate content analysis', 'Meta tag optimization', 'Site health score', 'Priority issue ranking']} requiresApiKey onConnect={() => handleConnect('SEMrush')} docsUrl="https://www.semrush.com/api-analytics/" />
            )}
          </DashboardCard>
        </div>

        <DashboardCard title="Local SEO Performance">
          {connections.brightLocal ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-patriot-darkNavy rounded-lg p-6 text-center">
                <MapPin className="w-8 h-8 text-phoenix-coral mx-auto mb-3" />
                <p className="text-desert-sand text-sm mb-1">Local Pack Rankings</p>
                <p className="text-3xl font-bold text-desert-tan">--</p>
              </div>
              <div className="bg-patriot-darkNavy rounded-lg p-6 text-center">
                <Star className="w-8 h-8 text-phoenix-coral mx-auto mb-3" />
                <p className="text-desert-sand text-sm mb-1">Google Reviews</p>
                <p className="text-3xl font-bold text-desert-tan">--</p>
              </div>
              <div className="bg-patriot-darkNavy rounded-lg p-6 text-center">
                <Globe className="w-8 h-8 text-phoenix-coral mx-auto mb-3" />
                <p className="text-desert-sand text-sm mb-1">Citations</p>
                <p className="text-3xl font-bold text-desert-tan">--</p>
              </div>
            </div>
          ) : (
            <ServiceConnection serviceName="BrightLocal" serviceIcon={<MapPin className="w-10 h-10 text-white" />} description="Connect BrightLocal for local search rankings, citations, and reviews." features={['Local pack rank tracking', 'Google Business Profile insights', 'Citation audit & building', 'Review monitoring & alerts', 'Local competitor analysis', 'NAP consistency checking']} requiresApiKey onConnect={() => handleConnect('BrightLocal')} docsUrl="https://www.brightlocal.com/api/" />
          )}
        </DashboardCard>

        <MultiServiceConnection title="SEO Platform Integrations" description="Connect your SEO tools to unlock the full power of your SEO Command Center" services={[
          { name: 'Google Search Console', icon: <Search className="w-4 h-4 text-phoenix-coral" />, connected: connections.googleSearchConsole, onConnect: () => handleConnect('Google Search Console') },
          { name: 'Google Analytics 4', icon: <BarChart3 className="w-4 h-4 text-phoenix-coral" />, connected: connections.googleAnalytics, onConnect: () => handleConnect('Google Analytics') },
          { name: 'SEMrush', icon: <Activity className="w-4 h-4 text-phoenix-coral" />, connected: connections.semrush, onConnect: () => handleConnect('SEMrush') },
          { name: 'Ahrefs', icon: <LinkIcon className="w-4 h-4 text-phoenix-coral" />, connected: connections.ahrefs, onConnect: () => handleConnect('Ahrefs') },
          { name: 'Moz', icon: <Award className="w-4 h-4 text-phoenix-coral" />, connected: connections.moz, onConnect: () => handleConnect('Moz') },
          { name: 'PageSpeed Insights', icon: <Zap className="w-4 h-4 text-phoenix-coral" />, connected: connections.pageSpeedInsights, onConnect: () => handleConnect('PageSpeed Insights') },
          { name: 'BrightLocal', icon: <MapPin className="w-4 h-4 text-phoenix-coral" />, connected: connections.brightLocal, onConnect: () => handleConnect('BrightLocal') },
        ]} />
      </div>
    </DashboardLayout>
  );
}
