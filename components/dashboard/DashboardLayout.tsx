'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardApi } from '@/lib/api-client';
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
  X,
  LogOut,
  Truck,
  MapPin,
  Receipt,
  UserCog,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigationSections = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Overview', href: '/system', icon: LayoutDashboard },
    ]
  },
  {
    title: 'CRM Operations',
    items: [
      { name: 'Drivers', href: '/system/drivers', icon: UserCog },
      { name: 'Fleet', href: '/system/fleet', icon: Truck },
      { name: 'Routes', href: '/system/routes', icon: MapPin },
      { name: 'Customers', href: '/system/customers', icon: Users },
      { name: 'Service Tickets', href: '/system/tickets', icon: FileText },
      { name: 'Billing', href: '/system/billing', icon: Receipt },
    ]
  },
  {
    title: 'Analytics & SEO',
    items: [
      { name: 'Live Visitors', href: '/system/live', icon: Eye },
      { name: 'SEO Performance', href: '/system/seo', icon: TrendingUp },
      { name: 'Competitive Intel', href: '/system/competitive', icon: Target },
      { name: 'Analytics', href: '/system/analytics', icon: BarChart3 },
      { name: 'Reports', href: '/system/reports', icon: FileText },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Alerts', href: '/system/alerts', icon: Bell },
      { name: 'Privacy', href: '/system/privacy', icon: Shield },
      { name: 'Settings', href: '/system/settings', icon: Settings },
    ]
  }
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await dashboardApi.getAlerts();
        if (response.data.data) {
          // Map alerts to notifications format
          const alerts = response.data.data;
          const mapped: Notification[] = Array.isArray(alerts) ? alerts.map((alert: any) => ({
            id: alert.id || String(Math.random()),
            type: alert.severity || alert.type || 'info',
            title: alert.title || alert.type || 'Alert',
            message: alert.message || alert.description || '',
            timestamp: alert.timestamp || alert.createdAt || new Date().toISOString(),
            read: alert.read || false,
          })) : [];
          setNotifications(mapped);
        }
      } catch (err) {
        // If API fails, show empty notifications
        console.error('Failed to fetch notifications:', err);
      }
    };

    fetchNotifications();
    // Refresh every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

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
            Patriot CRM
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-desert-tan hover:text-phoenix-coral"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-desert-sand uppercase tracking-wider mb-2 px-4">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                        isActive
                          ? 'bg-phoenix-gradient text-white font-bold shadow-lg'
                          : 'text-desert-tan hover:bg-phoenix-coral/10 hover:text-phoenix-coral'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
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
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative text-desert-tan hover:text-phoenix-coral"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg shadow-xl z-50">
                    <div className="flex items-center justify-between p-4 border-b border-phoenix-coral/20">
                      <h3 className="font-bold text-desert-tan">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-phoenix-coral hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-desert-sand">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`p-4 border-b border-phoenix-coral/10 cursor-pointer hover:bg-patriot-darkNavy/50 ${
                              !notification.read ? 'bg-phoenix-coral/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm ${!notification.read ? 'font-bold text-desert-tan' : 'text-desert-sand'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-desert-sand mt-1 truncate">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-desert-sand/60 mt-1">
                                  {formatTimestamp(notification.timestamp)}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-phoenix-coral rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <Link
                      href="/system/alerts"
                      onClick={() => setShowNotifications(false)}
                      className="block p-3 text-center text-sm text-phoenix-coral hover:bg-patriot-darkNavy/50 border-t border-phoenix-coral/20"
                    >
                      View all alerts
                    </Link>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-desert-tan hover:text-phoenix-coral transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
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
