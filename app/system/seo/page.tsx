'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import MetricCard from '@/components/dashboard/MetricCard';
import { TrendingUp, TrendingDown, Search, Link as LinkIcon, Zap, Award, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const rankingData = [
  { date: '10/20', avgRank: 15.2 },
  { date: '10/22', avgRank: 14.8 },
  { date: '10/24', avgRank: 13.5 },
  { date: '10/26', avgRank: 12.9 },
  { date: '10/28', avgRank: 11.4 },
  { date: '10/30', avgRank: 10.2 },
];

const keywords = [
  { keyword: 'dumpster rental phoenix', position: 3, change: 2, volume: 8100, difficulty: 65, traffic: 2430 },
  { keyword: 'waste management phoenix az', position: 7, change: -1, volume: 5400, difficulty: 72, traffic: 810 },
  { keyword: 'commercial dumpster rental', position: 12, change: 5, volume: 3600, difficulty: 58, traffic: 180 },
  { keyword: 'roll off dumpster phoenix', position: 5, change: 0, volume: 2900, difficulty: 61, traffic: 870 },
  { keyword: 'construction waste removal', position: 15, change: 3, volume: 2200, difficulty: 54, traffic: 110 },
  { keyword: 'junk removal phoenix', position: 9, change: -2, volume: 4800, difficulty: 69, traffic: 480 },
  { keyword: 'residential dumpster rental', position: 18, change: 7, volume: 1800, difficulty: 52, traffic: 54 },
  { keyword: 'debris removal service', position: 22, change: 1, volume: 1500, difficulty: 48, traffic: 30 },
];

const backlinks = [
  { domain: 'buildermagazine.com', authority: 78, type: 'Dofollow', status: 'Active', date: '10/28' },
  { domain: 'phoenixbusiness.org', authority: 65, type: 'Dofollow', status: 'Active', date: '10/25' },
  { domain: 'constructiontoday.net', authority: 72, type: 'Dofollow', status: 'Active', date: '10/22' },
  { domain: 'localbusiness-az.com', authority: 45, type: 'Dofollow', status: 'Active', date: '10/20' },
  { domain: 'wastemanagement-news.com', authority: 58, type: 'Nofollow', status: 'Active', date: '10/18' },
];

const coreWebVitals = [
  { metric: 'LCP (Largest Contentful Paint)', mobile: 1.8, desktop: 0.9, status: 'good' },
  { metric: 'FID (First Input Delay)', mobile: 45, desktop: 15, status: 'good' },
  { metric: 'CLS (Cumulative Layout Shift)', mobile: 0.05, desktop: 0.02, status: 'good' },
  { metric: 'Page Speed Score', mobile: 92, desktop: 98, status: 'good' },
];

export default function SEOPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">SEO Performance</h1>
          <p className="text-desert-sand">Keyword rankings, backlinks, and technical SEO health</p>
        </div>

        {/* Key SEO Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Avg Keyword Position"
            value="10.2"
            change={-15.3}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <MetricCard
            title="Total Backlinks"
            value="1,247"
            change={8.7}
            icon={<LinkIcon className="w-5 h-5" />}
          />
          <MetricCard
            title="Domain Authority"
            value="52"
            change={3.2}
            icon={<Award className="w-5 h-5" />}
          />
          <MetricCard
            title="Organic Traffic"
            value="12.4K"
            change={18.9}
            icon={<Search className="w-5 h-5" />}
          />
        </div>

        {/* Ranking Trend */}
        <DashboardCard title="Average Ranking Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rankingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2B4A" />
              <XAxis dataKey="date" stroke="#E8DCC4" />
              <YAxis reversed stroke="#E8DCC4" label={{ value: 'Position', angle: -90, position: 'insideLeft', fill: '#E8DCC4' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A2B4A', border: '2px solid #FF8C69', borderRadius: '8px' }}
                labelStyle={{ color: '#E8DCC4' }}
              />
              <Line type="monotone" dataKey="avgRank" stroke="#D4A574" strokeWidth={3} dot={{ fill: '#D4A574', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Keyword Rankings */}
        <DashboardCard title="Keyword Rankings">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-phoenix-coral/20">
                  <th className="text-left py-3 px-4 text-desert-sand font-bold">Keyword</th>
                  <th className="text-center py-3 px-4 text-desert-sand font-bold">Position</th>
                  <th className="text-center py-3 px-4 text-desert-sand font-bold">Change</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Volume</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Difficulty</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Est. Traffic</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw, index) => (
                  <tr key={index} className="border-b border-phoenix-coral/10 hover:bg-patriot-blue/10 transition-colors">
                    <td className="py-3 px-4 text-desert-tan font-medium">{kw.keyword}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                        kw.position <= 3 ? 'bg-green-500/20 text-green-400' :
                        kw.position <= 10 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {kw.position}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className={`inline-flex items-center gap-1 ${
                        kw.change > 0 ? 'text-green-400' :
                        kw.change < 0 ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {kw.change > 0 && <ArrowUp className="w-4 h-4" />}
                        {kw.change < 0 && <ArrowDown className="w-4 h-4" />}
                        {kw.change === 0 && <Minus className="w-4 h-4" />}
                        <span className="font-bold">{Math.abs(kw.change)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-desert-sand">{kw.volume.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        kw.difficulty <= 50 ? 'bg-green-500/20 text-green-400' :
                        kw.difficulty <= 65 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {kw.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-phoenix-coral font-bold">{kw.traffic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Backlinks & Core Web Vitals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Recent Backlinks">
            <div className="space-y-3">
              {backlinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-patriot-darkNavy rounded-lg">
                  <div className="flex-1">
                    <p className="text-desert-tan font-medium">{link.domain}</p>
                    <div className="flex items-center gap-3 text-sm text-desert-sand mt-1">
                      <span>DA: {link.authority}</span>
                      <span className={link.type === 'Dofollow' ? 'text-green-400' : 'text-yellow-400'}>
                        {link.type}
                      </span>
                      <span>{link.date}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-phoenix-gradient flex items-center justify-center text-white font-bold">
                    {link.authority}
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Core Web Vitals">
            <div className="space-y-4">
              {coreWebVitals.map((vital, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-desert-tan">{vital.metric}</span>
                    <span className="text-green-400 font-bold">GOOD</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-desert-sand mb-1">Mobile</p>
                      <div className="bg-patriot-darkNavy rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-desert-tan">{vital.mobile}{vital.metric.includes('CLS') ? '' : vital.metric.includes('Score') ? '' : 's'}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-desert-sand mb-1">Desktop</p>
                      <div className="bg-patriot-darkNavy rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-desert-tan">{vital.desktop}{vital.metric.includes('CLS') ? '' : vital.metric.includes('Score') ? '' : 's'}</p>
                      </div>
                    </div>
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
