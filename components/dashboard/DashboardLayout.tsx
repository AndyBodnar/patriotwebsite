'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Target,
  BarChart3,
  Eye,
  FileText,
  Settings,
  Bell,
  Shield,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/system', icon: LayoutDashboard },
  { name: 'Live Visitors', href: '/system/live', icon: Users },
  { name: 'SEO Performance', href: '/system/seo', icon: TrendingUp },
  { name: 'Competitive Intel', href: '/system/competitive', icon: Target },
  { name: 'Analytics', href: '/system/analytics', icon: BarChart3 },
  { name: 'Spy Mode', href: '/system/spy', icon: Eye },
  { name: 'Reports', href: '/system/reports', icon: FileText },
  { name: 'Alerts', href: '/system/alerts', icon: Bell },
  { name: 'Privacy', href: '/system/privacy', icon: Shield },
  { name: 'Settings', href: '/system/settings', icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-patriot-darkNavy">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-patriot-navy border-r-2 border-phoenix-coral/20 z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-phoenix-coral/20">
          <h2 className="text-xl font-bold bg-phoenix-gradient bg-clip-text text-transparent">
            SEO Command Center
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-desert-tan hover:text-phoenix-coral"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-phoenix-gradient text-white font-bold shadow-lg'
                    : 'text-desert-tan hover:bg-phoenix-coral/10 hover:text-phoenix-coral'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-phoenix-coral/20">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2 text-desert-tan hover:text-phoenix-coral transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-patriot-navy border-b-2 border-phoenix-coral/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-desert-tan hover:text-phoenix-coral"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block text-2xl font-bold text-desert-tan">
              Dashboard
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-desert-tan hover:text-phoenix-coral">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
