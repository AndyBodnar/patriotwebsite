'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Settings, Key, Globe, Database, Webhook, Zap, Mail, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">Settings</h1>
          <p className="text-desert-sand">Configure dashboard preferences and integrations</p>
        </div>

        {/* General Settings */}
        <DashboardCard title="General Settings">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-patriot-darkNavy rounded-lg">
              <div>
                <p className="text-desert-tan font-bold">Dashboard Auto-Refresh</p>
                <p className="text-desert-sand text-sm">Automatically refresh data every 5 seconds</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-phoenix-gradient"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-patriot-darkNavy rounded-lg">
              <div>
                <p className="text-desert-tan font-bold">Dark Mode</p>
                <p className="text-desert-sand text-sm">Use dark theme (currently enabled)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-phoenix-gradient"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-patriot-darkNavy rounded-lg">
              <div>
                <p className="text-desert-tan font-bold">Email Notifications</p>
                <p className="text-desert-sand text-sm">Receive email alerts for important events</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-phoenix-gradient"></div>
              </label>
            </div>
          </div>
        </DashboardCard>

        {/* API Settings */}
        <DashboardCard title="API Configuration">
          <div className="space-y-4">
            <div className="p-4 bg-patriot-darkNavy rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Key className="w-5 h-5 text-phoenix-coral" />
                <p className="text-desert-tan font-bold">API Key</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="password"
                  value="••••••••••••••••••••••••••••••••"
                  className="flex-1 bg-patriot-navy border-2 border-phoenix-coral/30 rounded px-4 py-2 text-desert-tan font-mono"
                  readOnly
                />
                <button className="px-4 py-2 bg-phoenix-gradient text-white rounded font-bold hover:opacity-90">
                  Regenerate
                </button>
              </div>
            </div>

            <div className="p-4 bg-patriot-darkNavy rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Webhook className="w-5 h-5 text-phoenix-coral" />
                <p className="text-desert-tan font-bold">Webhook URL</p>
              </div>
              <input
                type="text"
                placeholder="https://your-domain.com/webhook"
                className="w-full bg-patriot-navy border-2 border-phoenix-coral/30 rounded px-4 py-2 text-desert-tan"
              />
              <p className="text-desert-sand text-xs mt-2">Receive real-time data via webhook</p>
            </div>
          </div>
        </DashboardCard>

        {/* Integrations */}
        <DashboardCard title="Integrations">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-patriot-darkNavy border-2 border-green-500/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-desert-tan font-bold">Google Analytics</p>
                  <p className="text-green-400 text-xs font-bold">CONNECTED</p>
                </div>
              </div>
              <button className="text-desert-sand text-sm hover:text-phoenix-coral">Configure</button>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-green-500/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-desert-tan font-bold">Search Console</p>
                  <p className="text-green-400 text-xs font-bold">CONNECTED</p>
                </div>
              </div>
              <button className="text-desert-sand text-sm hover:text-phoenix-coral">Configure</button>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-gray-500/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-desert-tan font-bold">Zapier</p>
                  <p className="text-gray-400 text-xs font-bold">NOT CONNECTED</p>
                </div>
              </div>
              <button className="text-phoenix-coral text-sm font-bold hover:underline">Connect</button>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-gray-500/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-desert-tan font-bold">SendGrid</p>
                  <p className="text-gray-400 text-xs font-bold">NOT CONNECTED</p>
                </div>
              </div>
              <button className="text-phoenix-coral text-sm font-bold hover:underline">Connect</button>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-gray-500/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-desert-tan font-bold">Slack</p>
                  <p className="text-gray-400 text-xs font-bold">NOT CONNECTED</p>
                </div>
              </div>
              <button className="text-phoenix-coral text-sm font-bold hover:underline">Connect</button>
            </div>

            <div className="p-6 bg-patriot-darkNavy border-2 border-gray-500/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-desert-tan font-bold">CRM</p>
                  <p className="text-gray-400 text-xs font-bold">NOT CONNECTED</p>
                </div>
              </div>
              <button className="text-phoenix-coral text-sm font-bold hover:underline">Connect</button>
            </div>
          </div>
        </DashboardCard>

        {/* Data Management */}
        <DashboardCard title="Data Management">
          <div className="space-y-4">
            <div className="p-4 bg-patriot-darkNavy rounded-lg">
              <p className="text-desert-tan font-bold mb-2">Data Retention</p>
              <p className="text-desert-sand text-sm mb-3">How long to keep visitor data</p>
              <select className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded px-4 py-2 text-desert-tan">
                <option>30 days</option>
                <option>90 days</option>
                <option>180 days</option>
                <option>1 year</option>
                <option>Forever</option>
              </select>
            </div>

            <div className="p-4 bg-red-900/20 border-2 border-red-500 rounded-lg">
              <p className="text-red-300 font-bold mb-2">Danger Zone</p>
              <p className="text-red-400 text-sm mb-3">Permanently delete all data (cannot be undone)</p>
              <button className="px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600">
                Delete All Data
              </button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
