'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { routeApi, Route } from '@/lib/api-client';
import {
  MapPin,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Truck,
  Users,
  Calendar,
  X,
  Save
} from 'lucide-react';

interface RouteFormData {
  routeName: string;
  routeNumber: string;
  scheduledDate: string;
  notes: string;
  status: string;
}

const emptyFormData: RouteFormData = {
  routeName: '',
  routeNumber: '',
  scheduledDate: '',
  notes: '',
  status: 'SCHEDULED',
};

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [formData, setFormData] = useState<RouteFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchRoutes();
  }, [currentPage, statusFilter, dateFilter]);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const response = await routeApi.getAll({
        status: statusFilter || undefined,
        date: dateFilter || undefined,
        page: currentPage,
        limit: 20
      });
      setRoutes(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch routes:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-900/50 text-blue-300 border-blue-500/50';
      case 'IN_PROGRESS': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50';
      case 'COMPLETED': return 'bg-green-900/50 text-green-300 border-green-500/50';
      case 'DELAYED': return 'bg-orange-900/50 text-orange-300 border-orange-500/50';
      case 'CANCELLED': return 'bg-red-900/50 text-red-300 border-red-500/50';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return <Clock className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Activity className="w-4 h-4" />;
      case 'COMPLETED': return <CheckCircle className="w-4 h-4" />;
      case 'DELAYED': return <AlertTriangle className="w-4 h-4" />;
      case 'CANCELLED': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const openCreateModal = () => {
    setEditingRoute(null);
    setFormData(emptyFormData);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (route: Route) => {
    setEditingRoute(route);
    setFormData({
      routeName: route.routeName,
      routeNumber: route.routeNumber,
      scheduledDate: route.scheduledDate.split('T')[0],
      notes: route.notes || '',
      status: route.status,
    });
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRoute(null);
    setFormData(emptyFormData);
    setFormError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);

    try {
      if (editingRoute) {
        await routeApi.update(editingRoute.id, formData as any);
      } else {
        await routeApi.create(formData as any);
      }
      closeModal();
      fetchRoutes();
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to save route');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (route: Route) => {
    if (!confirm(`Are you sure you want to delete route ${route.routeName}?`)) {
      return;
    }

    try {
      await routeApi.delete(route.id);
      fetchRoutes();
    } catch (err) {
      console.error('Failed to delete route:', err);
      alert('Failed to delete route');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-desert-tan mb-2">Route Management</h1>
              <p className="text-desert-sand">Schedule and manage collection routes</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Create Route
            </button>
          </div>

          {/* Filters */}
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-desert-sand w-5 h-5" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-desert-sand w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral appearance-none cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="DELAYED">Delayed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Routes List */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-patriot-navy rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-patriot-blue/20 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-patriot-blue/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : routes.length === 0 ? (
            <div className="bg-patriot-navy border-2 border-desert-sand/20 rounded-lg p-12 text-center">
              <MapPin className="w-16 h-16 text-desert-sand/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-desert-tan mb-2">No Routes Found</h3>
              <p className="text-desert-sand mb-6">
                {dateFilter || statusFilter
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first route'}
              </p>
              {!dateFilter && !statusFilter && (
                <button className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-opacity">
                  <Plus className="w-5 h-5" />
                  Create First Route
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {routes.map((route: any) => (
                  <div
                    key={route.id}
                    className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-phoenix-gradient rounded-lg flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-desert-tan">{route.routeName}</h3>
                          <p className="text-desert-sand text-sm">Route #{route.routeNumber}</p>
                          <p className="text-desert-sand text-xs mt-1">
                            Scheduled: {new Date(route.scheduledDate).toLocaleDateString()} at{' '}
                            {new Date(route.scheduledDate).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg border-2 text-sm font-bold flex items-center gap-2 ${getStatusColor(route.status)}`}>
                        {getStatusIcon(route.status)}
                        {route.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Route Assignment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Assigned Driver */}
                      <div className="bg-patriot-darkNavy rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-desert-sand" />
                          <p className="text-desert-sand text-xs">Assigned Driver</p>
                        </div>
                        {route.assignedDriver ? (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-phoenix-gradient rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {route.assignedDriver.firstName[0]}{route.assignedDriver.lastName[0]}
                            </div>
                            <div>
                              <p className="text-desert-tan font-medium text-sm">
                                {route.assignedDriver.firstName} {route.assignedDriver.lastName}
                              </p>
                              <p className="text-desert-sand text-xs">{route.assignedDriver.phone}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-desert-sand/50 text-sm italic">Not assigned</p>
                        )}
                      </div>

                      {/* Assigned Vehicle */}
                      <div className="bg-patriot-darkNavy rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="w-4 h-4 text-desert-sand" />
                          <p className="text-desert-sand text-xs">Assigned Vehicle</p>
                        </div>
                        {route.assignedVehicle ? (
                          <div>
                            <p className="text-desert-tan font-medium text-sm">
                              Truck #{route.assignedVehicle.truckNumber}
                            </p>
                            <p className="text-desert-sand text-xs">
                              {route.assignedVehicle.make} {route.assignedVehicle.model}
                            </p>
                          </div>
                        ) : (
                          <p className="text-desert-sand/50 text-sm italic">Not assigned</p>
                        )}
                      </div>
                    </div>

                    {/* Route Progress (for in-progress routes) */}
                    {route.status === 'IN_PROGRESS' && route.completedStops !== undefined && (
                      <div className="bg-patriot-darkNavy rounded-lg p-4 mb-4">
                        <div className="flex justify-between text-sm text-desert-sand mb-2">
                          <span>Progress</span>
                          <span>
                            {route.completedStops} / {route.totalStops} stops ({route.progress}%)
                          </span>
                        </div>
                        <div className="w-full bg-patriot-navy rounded-full h-3">
                          <div
                            className="bg-phoenix-gradient h-3 rounded-full transition-all"
                            style={{ width: `${route.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {route.notes && (
                      <div className="bg-patriot-darkNavy rounded-lg p-4 mb-4">
                        <p className="text-desert-sand text-xs mb-1">Notes</p>
                        <p className="text-desert-tan text-sm">{route.notes}</p>
                      </div>
                    )}

                    {/* Completion Info */}
                    {route.completionDate && (
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
                        <p className="text-green-300 text-sm flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Completed on {new Date(route.completionDate).toLocaleDateString()} at{' '}
                          {new Date(route.completionDate).toLocaleTimeString()}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t-2 border-desert-sand/10">
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        View Stops
                      </button>
                      {route.status === 'SCHEDULED' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-900/20 hover:bg-green-900/30 text-green-300 rounded-lg transition-colors text-sm">
                          <Activity className="w-4 h-4" />
                          Start Route
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(route)}
                        className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(route)}
                        className="flex items-center gap-2 px-3 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-300 rounded-lg transition-colors ml-auto text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg text-desert-tan disabled:opacity-50 disabled:cursor-not-allowed hover:border-phoenix-coral transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-desert-sand">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg text-desert-tan disabled:opacity-50 disabled:cursor-not-allowed hover:border-phoenix-coral transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {/* Create/Edit Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b-2 border-desert-sand/10">
                  <h2 className="text-2xl font-bold text-desert-tan">
                    {editingRoute ? 'Edit Route' : 'Create New Route'}
                  </h2>
                  <button onClick={closeModal} className="text-desert-sand hover:text-desert-tan">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {formError && (
                    <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-4 text-red-300">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Route Name *</label>
                      <input
                        type="text"
                        name="routeName"
                        value={formData.routeName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., North Phoenix Residential"
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Route Number *</label>
                      <input
                        type="text"
                        name="routeNumber"
                        value={formData.routeNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., R-001"
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Scheduled Date *</label>
                      <input
                        type="date"
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      >
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="DELAYED">Delayed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-desert-sand text-sm mb-2">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t-2 border-desert-sand/10">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 bg-patriot-darkNavy border-2 border-desert-sand/20 text-desert-tan rounded-lg hover:border-desert-sand/40 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
                    >
                      {saving ? (
                        'Saving...'
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          {editingRoute ? 'Update Route' : 'Create Route'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
