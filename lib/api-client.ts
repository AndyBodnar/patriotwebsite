import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://5.78.98.98:4000';

// Use proxy in browser to avoid CORS, direct API URL on server
export const apiClient = axios.create({
  baseURL: typeof window !== 'undefined' ? '/api/proxy' : `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to all requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on 401
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        document.cookie = 'auth_token=; path=/; max-age=0';
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// ============================================
// TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Visitor Tracking Types
export interface Visitor {
  id: string;
  sessionId: string;
  ipAddress: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  os?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  companyName?: string;
  companyDomain?: string;
  isCompetitor: boolean;
  isVpn: boolean;
  isProxy: boolean;
  fraudScore?: number;
  fingerprint?: string;
  referrer?: string;
  referrerDomain?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  firstSeen: string;
  lastSeen: string;
  _count?: {
    pageViews: number;
    events: number;
  };
  pageViews?: PageView[];
  events?: Event[];
}

export interface PageView {
  id: string;
  visitorId: string;
  path: string;
  title?: string;
  duration?: number;
  timestamp: string;
}

export interface Event {
  id: string;
  visitorId: string;
  eventType: string;
  eventData?: any;
  timestamp: string;
}

export interface CompetitorIP {
  id: string;
  ipRange: string;
  companyName: string;
  domain?: string;
  threatLevel: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalVisitors: number;
  todayVisitors: number;
  totalPageViews: number;
  todayPageViews: number;
  competitorsToday: number;
  vpnDetections: number;
  liveVisitors: number;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

// CRM Types
export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  dotCertification?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_ROUTE' | 'OFF_SHIFT';
  safetyScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  truckNumber: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';
  lastMaintenance?: string;
  nextMaintenance?: string;
  gpsStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  routeName: string;
  routeNumber: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' | 'CANCELLED';
  scheduledDate: string;
  completionDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  serviceAddress: string;
  billingAddress?: string;
  serviceType: string;
  pickupSchedule?: string;
  accountBalance: number;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceTicket {
  id: string;
  ticketType: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  description: string;
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  dueDate: string;
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// API METHODS
// ============================================

// Auth API (all requests now use proxy via apiClient)
export const authApi = {
  login: (data: { email: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  register: (data: { email: string; username: string; password: string; firstName?: string; lastName?: string }) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  logout: () =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/logout'),

  me: () =>
    apiClient.get<{ user: User }>('/auth/me'),
};

// Dashboard API
export const dashboardApi = {
  getStats: () =>
    apiClient.get<ApiResponse<any>>('/patriot/dashboard/stats'),

  getAlerts: () =>
    apiClient.get<ApiResponse<any>>('/patriot/dashboard/alerts'),

  getLive: () =>
    apiClient.get<ApiResponse<any>>('/patriot/dashboard/live'),
};

// Driver Management API
export const driverApi = {
  getAll: (params?: { status?: string; search?: string; page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Driver>>('/patriot/drivers', { params }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Driver>>(`/api/patriot/drivers/${id}`),

  create: (data: Partial<Driver>) =>
    apiClient.post<ApiResponse<Driver>>('/patriot/drivers', data),

  update: (id: string, data: Partial<Driver>) =>
    apiClient.put<ApiResponse<Driver>>(`/api/patriot/drivers/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/patriot/drivers/${id}`),

  getRoutes: (id: string, params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Route>>(`/api/patriot/drivers/${id}/routes`, { params }),

  getDVIRs: (id: string, params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<any>>(`/api/patriot/drivers/${id}/dvirs`, { params }),
};

// Fleet Management API
export const fleetApi = {
  getAll: (params?: { status?: string; search?: string; page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Vehicle>>('/patriot/fleet', { params }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Vehicle>>(`/api/patriot/fleet/${id}`),

  create: (data: Partial<Vehicle>) =>
    apiClient.post<ApiResponse<Vehicle>>('/patriot/fleet', data),

  update: (id: string, data: Partial<Vehicle>) =>
    apiClient.put<ApiResponse<Vehicle>>(`/api/patriot/fleet/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/patriot/fleet/${id}`),

  getMaintenance: (id: string, params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<any>>(`/api/patriot/fleet/${id}/maintenance`, { params }),

  addMaintenance: (id: string, data: any) =>
    apiClient.post<ApiResponse<any>>(`/api/patriot/fleet/${id}/maintenance`, data),

  getDVIRs: (id: string, params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<any>>(`/api/patriot/fleet/${id}/dvirs`, { params }),
};

// Route Management API
export const routeApi = {
  getAll: (params?: { status?: string; date?: string; page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Route>>('/patriot/routes', { params }),

  getActive: () =>
    apiClient.get<ApiResponse<Route[]>>('/patriot/routes/active'),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Route>>(`/api/patriot/routes/${id}`),

  create: (data: Partial<Route>) =>
    apiClient.post<ApiResponse<Route>>('/patriot/routes', data),

  update: (id: string, data: Partial<Route>) =>
    apiClient.put<ApiResponse<Route>>(`/api/patriot/routes/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/patriot/routes/${id}`),

  assign: (id: string, data: { assignedDriverId?: string; assignedVehicleId?: string }) =>
    apiClient.put<ApiResponse<Route>>(`/api/patriot/routes/${id}/assign`, data),

  updateStatus: (id: string, data: { status: string }) =>
    apiClient.put<ApiResponse<Route>>(`/api/patriot/routes/${id}/status`, data),
};

// Customer Management API
export const customerApi = {
  getAll: (params?: { search?: string; isActive?: boolean; page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Customer>>('/patriot/customers', { params }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Customer>>(`/api/patriot/customers/${id}`),

  create: (data: Partial<Customer>) =>
    apiClient.post<ApiResponse<Customer>>('/patriot/customers', data),

  update: (id: string, data: Partial<Customer>) =>
    apiClient.put<ApiResponse<Customer>>(`/api/patriot/customers/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/patriot/customers/${id}`),

  getTickets: (id: string, params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<ServiceTicket>>(`/api/patriot/customers/${id}/tickets`, { params }),

  createTicket: (id: string, data: Partial<ServiceTicket>) =>
    apiClient.post<ApiResponse<ServiceTicket>>(`/api/patriot/customers/${id}/tickets`, data),

  getInvoices: (id: string, params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Invoice>>(`/api/patriot/customers/${id}/invoices`, { params }),
};

// Service Ticket API
export const ticketApi = {
  getAll: (params?: { status?: string; priority?: string; ticketType?: string; page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<ServiceTicket>>('/patriot/tickets', { params }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<ServiceTicket>>(`/api/patriot/tickets/${id}`),

  create: (data: Partial<ServiceTicket>) =>
    apiClient.post<ApiResponse<ServiceTicket>>('/patriot/tickets', data),

  update: (id: string, data: Partial<ServiceTicket>) =>
    apiClient.put<ApiResponse<ServiceTicket>>(`/api/patriot/tickets/${id}`, data),

  updateStatus: (id: string, data: { status: string }) =>
    apiClient.put<ApiResponse<ServiceTicket>>(`/api/patriot/tickets/${id}/status`, data),

  assign: (id: string, data: { assignedTo: string }) =>
    apiClient.put<ApiResponse<ServiceTicket>>(`/api/patriot/tickets/${id}/assign`, data),
};

// Billing API
export const billingApi = {
  getInvoices: (params?: { status?: string; customerId?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Invoice>>('/patriot/billing/invoices', { params }),

  getInvoiceById: (id: string) =>
    apiClient.get<ApiResponse<Invoice>>(`/api/patriot/billing/invoices/${id}`),

  createInvoice: (data: any) =>
    apiClient.post<ApiResponse<Invoice>>('/patriot/billing/invoices', data),

  updateInvoice: (id: string, data: any) =>
    apiClient.put<ApiResponse<Invoice>>(`/api/patriot/billing/invoices/${id}`, data),

  updateInvoiceStatus: (id: string, data: { status: string }) =>
    apiClient.put<ApiResponse<Invoice>>(`/api/patriot/billing/invoices/${id}/status`, data),

  getPayments: (params?: { invoiceId?: string; page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<any>>('/patriot/billing/payments', { params }),

  createPayment: (data: any) =>
    apiClient.post<ApiResponse<any>>('/patriot/billing/payments', data),

  getStats: () =>
    apiClient.get<ApiResponse<any>>('/patriot/billing/stats'),
};

// Reports API
export const reportApi = {
  getRoutes: (params?: { startDate?: string; endDate?: string }) =>
    apiClient.get<ApiResponse<any>>('/patriot/reports/routes', { params }),

  getFleet: (params?: { startDate?: string; endDate?: string }) =>
    apiClient.get<ApiResponse<any>>('/patriot/reports/fleet', { params }),

  getRevenue: (params?: { startDate?: string; endDate?: string }) =>
    apiClient.get<ApiResponse<any>>('/patriot/reports/revenue', { params }),

  getDrivers: () =>
    apiClient.get<ApiResponse<any>>('/patriot/reports/drivers'),

  getCustomers: () =>
    apiClient.get<ApiResponse<any>>('/patriot/reports/customers'),

  export: (data: { reportType: string; format: string; startDate?: string; endDate?: string }) =>
    apiClient.post<ApiResponse<any>>('/patriot/reports/export', data),
};

// SEO API
export const seoApi = {
  getKeywords: (params?: { page?: number; limit?: number; sortBy?: string }) =>
    apiClient.get<ApiResponse<any>>('/patriot/seo/keywords', { params }),

  getBacklinks: (params?: { page?: number; limit?: number; sortBy?: string }) =>
    apiClient.get<ApiResponse<any>>('/patriot/seo/backlinks', { params }),

  getHealth: (params?: { limit?: number }) =>
    apiClient.get<ApiResponse<any>>('/patriot/seo/health', { params }),

  getTraffic: (params?: { days?: number }) =>
    apiClient.get<ApiResponse<any>>('/patriot/seo/traffic', { params }),

  getCompetitors: () =>
    apiClient.get<ApiResponse<any>>('/patriot/seo/competitors'),

  getApiKeys: () =>
    apiClient.get<ApiResponse<any>>('/patriot/seo/api-keys'),

  saveApiKey: (data: { provider: string; apiKey: string; isActive?: boolean }) =>
    apiClient.post<ApiResponse<any>>('/patriot/seo/api-keys', data),

  deleteApiKey: (id: string) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/patriot/seo/api-keys/${id}`),
};

// Visitor Tracking API (existing)
export const visitorApi = {
  track: (data: Partial<Visitor>) =>
    apiClient.post<ApiResponse<Visitor>>('/patriot/visitors/track', data),

  trackPage: (data: { sessionId: string; path: string; title?: string; duration?: number }) =>
    apiClient.post<ApiResponse<PageView>>('/patriot/visitors/page', data),

  trackEvent: (data: { sessionId: string; eventType: string; eventData?: any }) =>
    apiClient.post<ApiResponse<Event>>('/patriot/visitors/event', data),

  getAll: (params?: { page?: number; limit?: number; competitor?: 'all' | 'true' | 'false' }) =>
    apiClient.get<PaginatedResponse<Visitor>>('/patriot/visitors', { params }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Visitor>>(`/api/patriot/visitors/${id}`),

  getLiveCount: () =>
    apiClient.get<ApiResponse<{ liveVisitors: number }>>('/patriot/visitors/live/count'),
};

// Analytics API (existing)
export const analyticsApi = {
  getDashboard: () =>
    apiClient.get<ApiResponse<DashboardStats>>('/patriot/analytics/dashboard'),

  getTimeline: (days: number = 30) =>
    apiClient.get<ApiResponse<any[]>>('/patriot/analytics/visitors-timeline', {
      params: { days },
    }),

  getTopPages: (limit: number = 10) =>
    apiClient.get<ApiResponse<{ path: string; views: number }[]>>(
      '/patriot/analytics/top-pages',
      { params: { limit } }
    ),

  getTrafficSources: () =>
    apiClient.get<ApiResponse<{
      organic: number;
      direct: number;
      referral: number;
      social: number;
    }>>('/patriot/analytics/traffic-sources'),
};

// Competitor Intelligence API (existing)
export const competitorApi = {
  getVisitors: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Visitor>>('/patriot/competitors/visitors', { params }),

  getIPs: () =>
    apiClient.get<ApiResponse<CompetitorIP[]>>('/patriot/competitors/ips'),

  addIP: (data: { ipRange: string; companyName: string; domain?: string; threatLevel?: string }) =>
    apiClient.post<ApiResponse<CompetitorIP>>('/patriot/competitors/ips', data),

  removeIP: (id: string) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/patriot/competitors/ips/${id}`),

  getStats: () =>
    apiClient.get<ApiResponse<{
      totalCompetitorVisits: number;
      todayCompetitorVisits: number;
      weekCompetitorVisits: number;
      vpnDetections: number;
      topCompetitors: { companyName: string; visits: number }[];
    }>>('/patriot/competitors/stats'),
};

