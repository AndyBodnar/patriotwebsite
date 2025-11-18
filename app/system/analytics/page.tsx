'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ServiceConnection, { ChartEmptyState, MultiServiceConnection } from '@/components/dashboard/ServiceConnection';
import { BarChart3, Users, MousePointerClick, Eye, Clock, Activity, Video, Layers, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const connections = {
  googleAnalytics: false,
  hotjar: false,
  fullStory: false,
  mixpanel: false,
};

export default function AnalyticsPage() {
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
            <h1 className="text-3xl font-bold text-desert-tan mb-2">User Behavior Analytics</h1>
            <p className="text-desert-sand">Deep dive into visitor behavior and engagement</p>
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
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-desert-tan font-bold text-2xl mb-2">Connect Your Analytics Tools</h3>
                <p className="text-desert-sand mb-6 max-w-2xl">
                  Understand how visitors interact with your site by connecting analytics platforms for behavior tracking, heatmaps, and session recordings.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => handleConnect('Google Analytics')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />Analytics 4
                  </button>
                  <button onClick={() => handleConnect('Hotjar')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Layers className="w-4 h-4" />Hotjar
                  </button>
                  <button onClick={() => handleConnect('FullStory')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Video className="w-4 h-4" />FullStory
                  </button>
                  <button onClick={() => handleConnect('Mixpanel')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Activity className="w-4 h-4" />Mixpanel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-desert-sand text-sm font-bold">Avg Pages/Session</p>
              <Eye className="w-5 h-5 text-phoenix-coral" />
            </div>
            <p className="text-3xl font-bold text-desert-tan/30">--</p>
            <button onClick={() => handleConnect('Google Analytics')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1">
              Connect Analytics<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-desert-sand text-sm font-bold">Avg Session Duration</p>
              <Clock className="w-5 h-5 text-phoenix-coral" />
            </div>
            <p className="text-3xl font-bold text-desert-tan/30">--</p>
            <button onClick={() => handleConnect('Google Analytics')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1">
              Connect Analytics<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-desert-sand text-sm font-bold">Bounce Rate</p>
              <MousePointerClick className="w-5 h-5 text-phoenix-coral" />
            </div>
            <p className="text-3xl font-bold text-desert-tan/30">--%</p>
            <button onClick={() => handleConnect('Google Analytics')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1">
              Connect Analytics<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-desert-sand text-sm font-bold">Engaged Sessions</p>
              <Users className="w-5 h-5 text-phoenix-coral" />
            </div>
            <p className="text-3xl font-bold text-desert-tan/30">--%</p>
            <button onClick={() => handleConnect('Google Analytics')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1">
              Connect Analytics<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Page Performance */}
        <DashboardCard title="Page Performance">
          <ServiceConnection serviceName="Google Analytics 4" serviceIcon={<BarChart3 className="w-10 h-10 text-white" />} description="Connect Google Analytics 4 to track page views, user behavior, and conversion metrics across your site." features={['Page views & unique visitors', 'Session duration & bounce rate', 'User flow visualization', 'Event tracking & goals', 'Audience demographics', 'Real-time reporting']} requiresOAuth onConnect={() => handleConnect('Google Analytics')} docsUrl="https://analytics.google.com" />
        </DashboardCard>

        {/* Conversion Funnel */}
        <DashboardCard title="Conversion Funnel">
          <ChartEmptyState serviceName="Google Analytics" serviceIcon={<BarChart3 className="w-8 h-8 text-white" />} chartType="Conversion Funnel Chart" onConnect={() => handleConnect('Google Analytics')} />
        </DashboardCard>

        {/* Heatmaps & Session Recordings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Heatmaps & Click Tracking">
            <ServiceConnection serviceName="Hotjar" serviceIcon={<Layers className="w-10 h-10 text-white" />} description="Connect Hotjar to visualize user behavior with heatmaps, scroll maps, and click tracking." features={['Click heatmaps', 'Scroll depth analysis', 'Move maps', 'Rage click detection', 'Form analytics', 'Feedback polls']} requiresApiKey onConnect={() => handleConnect('Hotjar')} docsUrl="https://www.hotjar.com" />
          </DashboardCard>
          <DashboardCard title="Session Recordings">
            <ServiceConnection serviceName="FullStory" serviceIcon={<Video className="w-10 h-10 text-white" />} description="Connect FullStory to watch session recordings and understand user frustrations." features={['Session replay', 'Frustration signals', 'Error tracking', 'Console logs', 'Network requests', 'Searchable sessions']} requiresApiKey onConnect={() => handleConnect('FullStory')} docsUrl="https://www.fullstory.com" />
          </DashboardCard>
        </div>

        {/* Product Analytics */}
        <DashboardCard title="Product Analytics & Events">
          <ServiceConnection serviceName="Mixpanel" serviceIcon={<Activity className="w-10 h-10 text-white" />} description="Connect Mixpanel for advanced event tracking, cohort analysis, and user retention metrics." features={['Custom event tracking', 'Funnel analysis', 'Cohort retention', 'A/B test results', 'User segmentation', 'Predictive analytics']} requiresApiKey onConnect={() => handleConnect('Mixpanel')} docsUrl="https://mixpanel.com" />
        </DashboardCard>

        {/* Integration Status */}
        <MultiServiceConnection title="Analytics Platform Integrations" description="Connect your analytics tools to understand user behavior and optimize conversions" services={[
          { name: 'Google Analytics 4', icon: <BarChart3 className="w-4 h-4 text-phoenix-coral" />, connected: connections.googleAnalytics, onConnect: () => handleConnect('Google Analytics') },
          { name: 'Hotjar', icon: <Layers className="w-4 h-4 text-phoenix-coral" />, connected: connections.hotjar, onConnect: () => handleConnect('Hotjar') },
          { name: 'FullStory', icon: <Video className="w-4 h-4 text-phoenix-coral" />, connected: connections.fullStory, onConnect: () => handleConnect('FullStory') },
          { name: 'Mixpanel', icon: <Activity className="w-4 h-4 text-phoenix-coral" />, connected: connections.mixpanel, onConnect: () => handleConnect('Mixpanel') },
        ]} />
      </div>
    </DashboardLayout>
  );
}
