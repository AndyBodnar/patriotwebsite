'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ServiceConnection, { MultiServiceConnection } from '@/components/dashboard/ServiceConnection';
import { Bell, AlertTriangle, Mail, MessageSquare, Smartphone, Webhook, CheckCircle, XCircle, ArrowUpRight } from 'lucide-react';

const connections = {
  emailService: false,
  smsService: false,
  slackIntegration: false,
  webhooks: false,
};

export default function AlertsPage() {
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
            <h1 className="text-3xl font-bold text-desert-tan mb-2">Alerts & Notifications</h1>
            <p className="text-desert-sand">Configure automated alerts and view notification history</p>
          </div>
          <div className="text-right">
            <p className="text-phoenix-coral font-bold text-2xl">{connectedCount}/{totalServices}</p>
            <p className="text-desert-sand text-sm">Channels Active</p>
          </div>
        </div>

        {connectedCount === 0 && (
          <div className="bg-gradient-to-r from-phoenix-coral/20 to-patriot-blue/20 border-2 border-phoenix-coral/50 rounded-lg p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-phoenix-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-desert-tan font-bold text-2xl mb-2">Set Up Alert Channels</h3>
                <p className="text-desert-sand mb-6 max-w-2xl">
                  Connect notification services to receive real-time alerts about ranking changes, competitor activity, site issues, and more.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => handleConnect('Email Service')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Mail className="w-4 h-4" />Email
                  </button>
                  <button onClick={() => handleConnect('SMS Service')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />SMS
                  </button>
                  <button onClick={() => handleConnect('Slack')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />Slack
                  </button>
                  <button onClick={() => handleConnect('Webhooks')} className="px-4 py-3 bg-patriot-navy border-2 border-phoenix-coral/50 text-desert-tan rounded-lg font-bold text-sm hover:border-phoenix-coral transition-all flex items-center gap-2">
                    <Webhook className="w-4 h-4" />Webhooks
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-patriot-navy border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Unread Alerts</p>
              <Bell className="w-5 h-5 text-red-400/30" />
            </div>
            <p className="text-4xl font-bold text-desert-tan/30">--</p>
            <button onClick={() => handleConnect('Email Service')} className="text-phoenix-coral text-xs font-bold hover:underline flex items-center gap-1 mt-2">
              Connect Email<ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-patriot-navy border-2 border-phoenix-coral/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Active Rules</p>
              <CheckCircle className="w-5 h-5 text-green-400/30" />
            </div>
            <p className="text-4xl font-bold text-desert-tan/30">--</p>
            <p className="text-desert-sand text-xs mt-2">Configure rules below</p>
          </div>

          <div className="bg-patriot-navy border-2 border-yellow-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Today&apos;s Alerts</p>
              <AlertTriangle className="w-5 h-5 text-yellow-400/30" />
            </div>
            <p className="text-4xl font-bold text-desert-tan/30">--</p>
            <p className="text-desert-sand text-xs mt-2">Connect to track</p>
          </div>

          <div className="bg-patriot-navy border-2 border-gray-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-desert-sand text-sm">Paused Rules</p>
              <XCircle className="w-5 h-5 text-gray-400/30" />
            </div>
            <p className="text-4xl font-bold text-desert-tan/30">--</p>
            <p className="text-desert-sand text-xs mt-2">Configure rules below</p>
          </div>
        </div>

        {/* Recent Alerts */}
        <DashboardCard title="Recent Alerts">
          <div className="text-center py-12 bg-patriot-darkNavy rounded-lg">
            <Bell className="w-12 h-12 text-phoenix-coral/30 mx-auto mb-4" />
            <h4 className="text-desert-tan font-bold text-lg mb-2">No Alerts Yet</h4>
            <p className="text-desert-sand text-sm mb-4 max-w-md mx-auto">
              Connect notification channels and configure alert rules to start receiving alerts about your SEO performance.
            </p>
            <button onClick={() => handleConnect('Email Service')} className="px-6 py-3 bg-phoenix-gradient text-white rounded-lg font-bold hover:opacity-90">
              Set Up Alerts
            </button>
          </div>
        </DashboardCard>

        {/* Notification Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Email Notifications">
            <ServiceConnection serviceName="SendGrid / Resend" serviceIcon={<Mail className="w-10 h-10 text-white" />} description="Connect an email service to receive alerts via email for ranking changes, site issues, and competitor activity." features={['Instant alert emails', 'Daily/weekly digests', 'Custom email templates', 'Multiple recipients', 'Priority filtering', 'Unsubscribe management']} requiresApiKey onConnect={() => handleConnect('Email Service')} docsUrl="https://sendgrid.com/docs/api-reference/" />
          </DashboardCard>

          <DashboardCard title="SMS Notifications">
            <ServiceConnection serviceName="Twilio" serviceIcon={<Smartphone className="w-10 h-10 text-white" />} description="Connect Twilio for SMS alerts on critical issues that need immediate attention." features={['Critical alerts only', 'Instant delivery', 'Multiple phone numbers', 'Delivery confirmation', 'Time-based rules', 'Emergency escalation']} requiresApiKey onConnect={() => handleConnect('SMS Service')} docsUrl="https://www.twilio.com/docs/sms" />
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Slack Integration">
            <ServiceConnection serviceName="Slack" serviceIcon={<MessageSquare className="w-10 h-10 text-white" />} description="Connect Slack to receive alerts in your team channels for collaborative monitoring." features={['Channel notifications', 'Threaded updates', 'Interactive alerts', 'Custom bot name', 'Multiple workspaces', 'Mention support']} requiresOAuth onConnect={() => handleConnect('Slack')} docsUrl="https://api.slack.com/messaging/webhooks" />
          </DashboardCard>

          <DashboardCard title="Custom Webhooks">
            <ServiceConnection serviceName="Webhooks" serviceIcon={<Webhook className="w-10 h-10 text-white" />} description="Set up custom webhooks to send alerts to any external service or your own applications." features={['Custom endpoints', 'JSON payloads', 'Authentication headers', 'Retry logic', 'Event filtering', 'Payload templates']} requiresApiKey onConnect={() => handleConnect('Webhooks')} docsUrl="/system/settings" />
          </DashboardCard>
        </div>

        {/* Alert Rules */}
        <DashboardCard title="Alert Rules Configuration">
          <div className="bg-patriot-darkNavy rounded-lg p-6">
            <h4 className="text-desert-tan font-bold text-lg mb-4">Available Alert Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-patriot-navy rounded-lg border border-phoenix-coral/20">
                <p className="text-desert-tan font-bold mb-1">Ranking Changes</p>
                <p className="text-desert-sand text-sm">Alert when keywords drop more than X positions</p>
              </div>
              <div className="p-4 bg-patriot-navy rounded-lg border border-phoenix-coral/20">
                <p className="text-desert-tan font-bold mb-1">Competitor Activity</p>
                <p className="text-desert-sand text-sm">Alert on visits from competitor IP ranges</p>
              </div>
              <div className="p-4 bg-patriot-navy rounded-lg border border-phoenix-coral/20">
                <p className="text-desert-tan font-bold mb-1">Traffic Spikes</p>
                <p className="text-desert-sand text-sm">Alert on sudden traffic increases/decreases</p>
              </div>
              <div className="p-4 bg-patriot-navy rounded-lg border border-phoenix-coral/20">
                <p className="text-desert-tan font-bold mb-1">New Backlinks</p>
                <p className="text-desert-sand text-sm">Alert when high-authority sites link to you</p>
              </div>
              <div className="p-4 bg-patriot-navy rounded-lg border border-phoenix-coral/20">
                <p className="text-desert-tan font-bold mb-1">Core Web Vitals</p>
                <p className="text-desert-sand text-sm">Alert when performance metrics degrade</p>
              </div>
              <div className="p-4 bg-patriot-navy rounded-lg border border-phoenix-coral/20">
                <p className="text-desert-tan font-bold mb-1">Site Errors</p>
                <p className="text-desert-sand text-sm">Alert on 404s, 500s, and crawl errors</p>
              </div>
            </div>
            <p className="text-desert-sand text-sm mt-4">
              Connect notification channels above to enable and configure these alert rules.
            </p>
          </div>
        </DashboardCard>

        {/* Integration Status */}
        <MultiServiceConnection title="Notification Channel Integrations" description="Connect these services to receive alerts through multiple channels" services={[
          { name: 'Email (SendGrid/Resend)', icon: <Mail className="w-4 h-4 text-phoenix-coral" />, connected: connections.emailService, onConnect: () => handleConnect('Email Service') },
          { name: 'SMS (Twilio)', icon: <Smartphone className="w-4 h-4 text-phoenix-coral" />, connected: connections.smsService, onConnect: () => handleConnect('SMS Service') },
          { name: 'Slack', icon: <MessageSquare className="w-4 h-4 text-phoenix-coral" />, connected: connections.slackIntegration, onConnect: () => handleConnect('Slack') },
          { name: 'Custom Webhooks', icon: <Webhook className="w-4 h-4 text-phoenix-coral" />, connected: connections.webhooks, onConnect: () => handleConnect('Webhooks') },
        ]} />
      </div>
    </DashboardLayout>
  );
}
