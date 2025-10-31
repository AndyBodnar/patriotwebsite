'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Target, TrendingUp, TrendingDown, Link as LinkIcon, Search, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const competitors = [
  { name: 'Patriot Disposal', domain: 'patriotdisposal.com', traffic: 12400, keywords: 247, backlinks: 1247, da: 52, visibility: 78 },
  { name: 'Waste Management', domain: 'wm.com', traffic: 184000, keywords: 5432, backlinks: 45821, da: 82, visibility: 95 },
  { name: 'Republic Services', domain: 'republicservices.com', traffic: 156000, keywords: 4891, backlinks: 38942, da: 79, visibility: 92 },
  { name: 'Waste Connections', domain: 'wasteconnections.com', traffic: 98000, keywords: 3254, backlinks: 25631, da: 75, visibility: 85 },
];

const keywordOverlap = [
  { keyword: 'dumpster rental phoenix', you: 3, wm: 1, republic: 2, waste: 5 },
  { keyword: 'waste management phoenix', you: 7, wm: 1, republic: 3, waste: 4 },
  { keyword: 'commercial dumpster', you: 12, wm: 2, republic: 4, waste: 8 },
  { keyword: 'roll off dumpster', you: 5, wm: 3, republic: 6, waste: 7 },
  { keyword: 'junk removal phoenix', you: 9, wm: 4, republic: 5, waste: 11 },
];

const radarData = [
  { category: 'Traffic', you: 65, competitor: 95 },
  { category: 'Keywords', you: 58, competitor: 88 },
  { category: 'Backlinks', you: 42, competitor: 92 },
  { category: 'DA/Authority', you: 63, competitor: 85 },
  { category: 'Visibility', you: 82, competitor: 94 },
  { category: 'Content', you: 75, competitor: 80 },
];

const contentGaps = [
  { topic: 'Construction Waste Recycling', volume: 2900, difficulty: 45, competitorRank: 3, yourRank: null, opportunity: 'high' },
  { topic: 'Demolition Debris Removal', volume: 1800, difficulty: 52, competitorRank: 5, yourRank: null, opportunity: 'high' },
  { topic: 'Hazardous Waste Disposal', volume: 3400, difficulty: 68, competitorRank: 2, yourRank: null, opportunity: 'medium' },
  { topic: 'Industrial Waste Management', volume: 2200, difficulty: 72, competitorRank: 4, yourRank: null, opportunity: 'medium' },
  { topic: 'Green Waste Recycling Programs', volume: 1200, difficulty: 38, competitorRank: 7, yourRank: null, opportunity: 'high' },
];

export default function CompetitivePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-desert-tan mb-2">Competitive Intelligence</h1>
          <p className="text-desert-sand">Compare your performance against key competitors</p>
        </div>

        {/* Competitor Comparison Table */}
        <DashboardCard title="Competitor Overview">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-phoenix-coral/20">
                  <th className="text-left py-3 px-4 text-desert-sand font-bold">Competitor</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Traffic</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Keywords</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Backlinks</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">DA</th>
                  <th className="text-right py-3 px-4 text-desert-sand font-bold">Visibility</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((comp, index) => (
                  <tr key={index} className={`border-b border-phoenix-coral/10 ${
                    comp.name === 'Patriot Disposal' ? 'bg-phoenix-coral/10' : 'hover:bg-patriot-blue/10'
                  } transition-colors`}>
                    <td className="py-3 px-4">
                      <div>
                        <p className={`font-bold ${comp.name === 'Patriot Disposal' ? 'text-phoenix-coral' : 'text-desert-tan'}`}>
                          {comp.name}
                          {comp.name === 'Patriot Disposal' && <span className="ml-2 text-xs bg-phoenix-gradient px-2 py-1 rounded text-white">YOU</span>}
                        </p>
                        <p className="text-desert-sand text-sm">{comp.domain}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-desert-tan font-bold">{comp.traffic.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-desert-tan font-bold">{comp.keywords.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-desert-tan font-bold">{comp.backlinks.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-1 rounded font-bold ${
                        comp.da >= 70 ? 'bg-green-500/20 text-green-400' :
                        comp.da >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {comp.da}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-desert-tan font-bold">{comp.visibility}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Radar Chart & Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Performance Comparison (You vs Top Competitor)">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1A2B4A" />
                <PolarAngleAxis dataKey="category" stroke="#E8DCC4" />
                <PolarRadiusAxis stroke="#E8DCC4" />
                <Radar name="You" dataKey="you" stroke="#D4A574" fill="#D4A574" fillOpacity={0.6} />
                <Radar name="Competitor" dataKey="competitor" stroke="#FF8C69" fill="#FF8C69" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </DashboardCard>

          <DashboardCard title="Traffic Comparison">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={competitors}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2B4A" />
                <XAxis dataKey="name" stroke="#E8DCC4" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#E8DCC4" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A2B4A', border: '2px solid #FF8C69', borderRadius: '8px' }}
                  labelStyle={{ color: '#E8DCC4' }}
                />
                <Bar dataKey="traffic" fill="#D4A574" />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>
        </div>

        {/* Keyword Overlap */}
        <DashboardCard title="Keyword Ranking Comparison">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-phoenix-coral/20">
                  <th className="text-left py-3 px-4 text-desert-sand font-bold">Keyword</th>
                  <th className="text-center py-3 px-4 text-desert-sand font-bold">You</th>
                  <th className="text-center py-3 px-4 text-desert-sand font-bold">WM</th>
                  <th className="text-center py-3 px-4 text-desert-sand font-bold">Republic</th>
                  <th className="text-center py-3 px-4 text-desert-sand font-bold">Waste Conn.</th>
                </tr>
              </thead>
              <tbody>
                {keywordOverlap.map((kw, index) => (
                  <tr key={index} className="border-b border-phoenix-coral/10 hover:bg-patriot-blue/10 transition-colors">
                    <td className="py-3 px-4 text-desert-tan font-medium">{kw.keyword}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                        kw.you <= 3 ? 'bg-green-500/20 text-green-400' :
                        kw.you <= 10 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {kw.you}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-desert-sand font-bold">{kw.wm}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-desert-sand font-bold">{kw.republic}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-desert-sand font-bold">{kw.waste}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Content Gaps */}
        <DashboardCard title="Content Gap Opportunities">
          <div className="space-y-3">
            {contentGaps.map((gap, index) => (
              <div key={index} className="p-4 bg-patriot-darkNavy rounded-lg border-2 border-phoenix-coral/20 hover:border-phoenix-coral/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-desert-tan font-bold text-lg">{gap.topic}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-desert-sand">
                      <span>Search Volume: <span className="text-phoenix-coral font-bold">{gap.volume.toLocaleString()}</span></span>
                      <span>Difficulty: <span className={`font-bold ${
                        gap.difficulty <= 50 ? 'text-green-400' : gap.difficulty <= 65 ? 'text-yellow-400' : 'text-red-400'
                      }`}>{gap.difficulty}</span></span>
                      <span>Competitor Rank: <span className="text-red-400 font-bold">#{gap.competitorRank}</span></span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full font-bold text-sm ${
                    gap.opportunity === 'high' ? 'bg-green-500/20 text-green-400 border-2 border-green-500' :
                    'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500'
                  }`}>
                    {gap.opportunity.toUpperCase()} OPPORTUNITY
                  </span>
                </div>
                <div className="bg-patriot-navy rounded p-2 mt-2">
                  <p className="text-desert-sand text-sm">
                    <span className="text-red-300 font-bold">💡 Action:</span> Create content targeting this keyword - competitors are ranking but you're not. High traffic potential with manageable difficulty.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
