'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { driverApi, Driver } from '@/lib/api-client';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  X,
  Save
} from 'lucide-react';

interface DriverFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  dotCertification: string;
  status: string;
}

const emptyFormData: DriverFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  licenseNumber: '',
  licenseExpiry: '',
  dotCertification: '',
  status: 'ACTIVE',
};

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState<DriverFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, [currentPage, statusFilter, searchTerm]);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await driverApi.getAll({
        status: statusFilter || undefined,
        search: searchTerm || undefined,
        page: currentPage,
        limit: 20
      });
      setDrivers(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-900/50 text-green-300 border-green-500/50';
      case 'ON_ROUTE': return 'bg-blue-900/50 text-blue-300 border-blue-500/50';
      case 'OFF_SHIFT': return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
      case 'INACTIVE': return 'bg-red-900/50 text-red-300 border-red-500/50';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="w-4 h-4" />;
      case 'ON_ROUTE': return <TrendingUp className="w-4 h-4" />;
      case 'OFF_SHIFT': return <Clock className="w-4 h-4" />;
      case 'INACTIVE': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const isLicenseExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  const isLicenseExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    return expiry < now;
  };

  const openCreateModal = () => {
    setEditingDriver(null);
    setFormData(emptyFormData);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (driver: Driver) => {
    setEditingDriver(driver);
    setFormData({
      firstName: driver.firstName,
      lastName: driver.lastName,
      email: driver.email,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      licenseExpiry: driver.licenseExpiry.split('T')[0],
      dotCertification: driver.dotCertification || '',
      status: driver.status,
    });
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDriver(null);
    setFormData(emptyFormData);
    setFormError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);

    try {
      if (editingDriver) {
        await driverApi.update(editingDriver.id, formData);
      } else {
        await driverApi.create(formData);
      }
      closeModal();
      fetchDrivers();
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to save driver');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (driver: Driver) => {
    if (!confirm(`Are you sure you want to delete ${driver.firstName} ${driver.lastName}?`)) {
      return;
    }

    try {
      await driverApi.delete(driver.id);
      fetchDrivers();
    } catch (err) {
      console.error('Failed to delete driver:', err);
      alert('Failed to delete driver');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-desert-tan mb-2">Driver Management</h1>
              <p className="text-desert-sand">Manage drivers, licenses, and certifications</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Add Driver
            </button>
          </div>

          {/* Filters */}
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-desert-sand w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search drivers by name, email, or license..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan placeholder-desert-sand/50 focus:outline-none focus:border-phoenix-coral"
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
                  <option value="ACTIVE">Active</option>
                  <option value="ON_ROUTE">On Route</option>
                  <option value="OFF_SHIFT">Off Shift</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drivers List */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-patriot-navy rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-patriot-blue/20 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-patriot-blue/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : drivers.length === 0 ? (
            <div className="bg-patriot-navy border-2 border-desert-sand/20 rounded-lg p-12 text-center">
              <Users className="w-16 h-16 text-desert-sand/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-desert-tan mb-2">No Drivers Found</h3>
              <p className="text-desert-sand mb-6">
                {searchTerm || statusFilter
                  ? 'Try adjusting your search criteria'
                  : 'Get started by adding your first driver'}
              </p>
              {!searchTerm && !statusFilter && (
                <button className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-opacity">
                  <Plus className="w-5 h-5" />
                  Add First Driver
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {drivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-phoenix-gradient rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {driver.firstName[0]}{driver.lastName[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-desert-tan">
                            {driver.firstName} {driver.lastName}
                          </h3>
                          <p className="text-desert-sand text-sm">{driver.email}</p>
                          <p className="text-desert-sand text-sm">{driver.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg border-2 text-sm font-bold flex items-center gap-2 ${getStatusColor(driver.status)}`}>
                          {getStatusIcon(driver.status)}
                          {driver.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* License Info */}
                      <div className="bg-patriot-darkNavy rounded-lg p-4">
                        <p className="text-desert-sand text-xs mb-1">License Number</p>
                        <p className="text-desert-tan font-bold">{driver.licenseNumber}</p>
                        <div className="mt-2 flex items-center gap-2">
                          {isLicenseExpired(driver.licenseExpiry) ? (
                            <span className="text-red-400 text-xs flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Expired
                            </span>
                          ) : isLicenseExpiringSoon(driver.licenseExpiry) ? (
                            <span className="text-yellow-400 text-xs flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Expiring Soon
                            </span>
                          ) : (
                            <span className="text-green-400 text-xs flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Valid
                            </span>
                          )}
                          <span className="text-desert-sand text-xs">
                            Expires: {new Date(driver.licenseExpiry).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Safety Score */}
                      <div className="bg-patriot-darkNavy rounded-lg p-4">
                        <p className="text-desert-sand text-xs mb-1">Safety Score</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-desert-tan">{driver.safetyScore}</p>
                          <span className="text-desert-sand text-sm">/100</span>
                        </div>
                        <div className="mt-2 w-full bg-patriot-navy rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              driver.safetyScore >= 80
                                ? 'bg-green-500'
                                : driver.safetyScore >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${driver.safetyScore}%` }}
                          />
                        </div>
                      </div>

                      {/* DOT Certification */}
                      <div className="bg-patriot-darkNavy rounded-lg p-4">
                        <p className="text-desert-sand text-xs mb-1">DOT Certification</p>
                        <p className="text-desert-tan font-bold">
                          {driver.dotCertification || 'N/A'}
                        </p>
                        {driver.dotCertification && (
                          <span className="text-green-400 text-xs flex items-center gap-1 mt-2">
                            <CheckCircle className="w-3 h-3" />
                            Certified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t-2 border-desert-sand/10">
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button
                        onClick={() => openEditModal(driver)}
                        className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(driver)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-300 rounded-lg transition-colors ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
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
                    {editingDriver ? 'Edit Driver' : 'Add New Driver'}
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
                      <label className="block text-desert-sand text-sm mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">License Number *</label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">License Expiry *</label>
                      <input
                        type="date"
                        name="licenseExpiry"
                        value={formData.licenseExpiry}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">DOT Certification</label>
                      <input
                        type="text"
                        name="dotCertification"
                        value={formData.dotCertification}
                        onChange={handleInputChange}
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
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                        <option value="ON_ROUTE">On Route</option>
                        <option value="OFF_SHIFT">Off Shift</option>
                      </select>
                    </div>
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
                          {editingDriver ? 'Update Driver' : 'Create Driver'}
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
