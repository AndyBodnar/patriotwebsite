'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ServiceConnection, { ChartEmptyState, MultiServiceConnection } from '@/components/dashboard/ServiceConnection';
import { Target, TrendingUp, Link as LinkIcon, Search, Award, Activity, BarChart3, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const connections = {
  semrush: false,
  ahrefs: false,
  similarWeb: false,
  spyFu: false,
};

export default function CompetitivePage() {
  const handleConnect = (service: string) => {
    console.log(`Connect ${service}`);
  };

  const connectedCount = Object.values(connections).filter(Boolean).length;
  const totalServices = Object.keys(connections).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-desert-tan mb-2">Competitive Intelligence</h1>
            <p className="text-desert-sand">Compare your performance against key competitors</p>
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
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-desert-tan font-bold text-2xl mb-2">Enable Competitor Analysis</h3>
                <p className="text-desert-sand mb-6 max-w-2xl">
                  Connect SEO intelligence platforms to track competitor rankings, backlinks, traffic estimates, and identify content gaps.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => handleConnect('SEMrush')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Activity className="w-4 h-4" />SEMrush
                  </button>
                  <button onClick={() => handleConnect('Ahrefs')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />Ahrefs
                  </button>
                  <button onClick={() => handleConnect('SimilarWeb')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />SimilarWeb
                  </button>
                  <button onClick={() => handleConnect('SpyFu')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Search className="w-4 h-4" />SpyFu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Competitor Overview */}
        <DashboardCard title="Competitor Overview">
          <ServiceConnection serviceName="SEMrush" serviceIcon={<Activity className="w-10 h-10 text-white" />} description="Connect SEMrush to get comprehensive competitor analysis including traffic estimates, keyword overlap, and domain comparison." features={['Competitor traffic estimates', 'Domain comparison metrics', 'Keyword overlap analysis', 'Backlink gap analysis', 'Content gap identification', 'Market share trends']} requiresApiKey onConnect={() => handleConnect('SEMrush')} docsUrl="https://www.semrush.com/api-analytics/" />
        </DashboardCard>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Performance Comparison">
            <ChartEmptyState serviceName="SEMrush" serviceIcon={<Activity className="w-8 h-8 text-white" />} chartType="Radar Comparison Chart" onConnect={() => handleConnect('SEMrush')} />
          </DashboardCard>

          <DashboardCard title="Traffic Comparison">
            <ChartEmptyState serviceName="SimilarWeb" serviceIcon={<BarChart3 className="w-8 h-8 text-white" />} chartType="Traffic Bar Chart" onConnect={() => handleConnect('SimilarWeb')} />
          </DashboardCard>
        </div>

        {/* Keyword Comparison */}
        <DashboardCard title="Keyword Ranking Comparison">
          <ServiceConnection serviceName="Ahrefs" serviceIcon={<LinkIcon className="w-10 h-10 text-white" />} description="Connect Ahrefs to compare keyword rankings across competitors and identify opportunities where they rank but you do not." features={['Keyword position comparison', 'Content gap discovery', 'SERP feature tracking', 'Ranking history comparison', 'Keyword difficulty scores', 'Traffic potential estimates']} requiresApiKey onConnect={() => handleConnect('Ahrefs')} docsUrl="https://ahrefs.com/api" />
        </DashboardCard>

        {/* Content Gaps */}
        <DashboardCard title="Content Gap Opportunities">
          <ServiceConnection serviceName="SpyFu" serviceIcon={<Search className="w-10 h-10 text-white" />} description="Connect SpyFu to discover keywords your competitors rank for that you are missing, plus PPC competitor intelligence." features={['Competitor keyword lists', 'PPC keyword analysis', 'Ad copy intelligence', 'Ranking history', 'SEO vs PPC comparison', 'Monthly search trends']} requiresApiKey onConnect={() => handleConnect('SpyFu')} docsUrl="https://www.spyfu.com/api" />
        </DashboardCard>

        {/* Traffic Intelligence */}
        <DashboardCard title="Traffic & Audience Intelligence">
          <ServiceConnection serviceName="SimilarWeb" serviceIcon={<BarChart3 className="w-10 h-10 text-white" />} description="Connect SimilarWeb for detailed traffic estimates, audience demographics, and traffic source breakdowns for any competitor." features={['Monthly traffic estimates', 'Traffic source breakdown', 'Audience demographics', 'Geographic distribution', 'Engagement metrics', 'Top referring sites']} requiresApiKey onConnect={() => handleConnect('SimilarWeb')} docsUrl="https://www.similarweb.com/corp/developer/" />
        </DashboardCard>

        {/* Integration Status */}
        <MultiServiceConnection title="Competitive Intelligence Integrations" description="Connect these platforms to unlock full competitor analysis capabilities" services={[
          { name: 'SEMrush', icon: <Activity className="w-4 h-4 text-phoenix-coral" />, connected: connections.semrush, onConnect: () => handleConnect('SEMrush') },
          { name: 'Ahrefs', icon: <LinkIcon className="w-4 h-4 text-phoenix-coral" />, connected: connections.ahrefs, onConnect: () => handleConnect('Ahrefs') },
          { name: 'SimilarWeb', icon: <BarChart3 className="w-4 h-4 text-phoenix-coral" />, connected: connections.similarWeb, onConnect: () => handleConnect('SimilarWeb') },
          { name: 'SpyFu', icon: <Search className="w-4 h-4 text-phoenix-coral" />, connected: connections.spyFu, onConnect: () => handleConnect('SpyFu') },
        ]} />

        {/* Add Competitors */}
        <DashboardCard title="Manage Competitors">
          <div className="bg-patriot-darkNavy rounded-lg p-6 text-center">
            <Target className="w-12 h-12 text-phoenix-coral mx-auto mb-4" />
            <h4 className="text-desert-tan font-bold text-lg mb-2">Add Competitors to Track</h4>
            <p className="text-desert-sand text-sm mb-4 max-w-md mx-auto">
              Once you connect your SEO tools, you can add competitor domains to track and compare performance metrics.
            </p>
            <button className="px-6 py-3 bg-phoenix-coral/20 border-2 border-phoenix-coral text-phoenix-coral rounded-lg font-bold hover:bg-phoenix-coral hover:text-white transition-colors">
              Add Competitor Domain
            </button>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
