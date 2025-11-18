'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { fleetApi, Vehicle } from '@/lib/api-client';
import {
  Truck,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Radio,
  X,
  Save
} from 'lucide-react';

interface VehicleFormData {
  truckNumber: string;
  vin: string;
  make: string;
  model: string;
  year: string;
  status: string;
  nextMaintenance: string;
}

const emptyFormData: VehicleFormData = {
  truckNumber: '',
  vin: '',
  make: '',
  model: '',
  year: new Date().getFullYear().toString(),
  status: 'AVAILABLE',
  nextMaintenance: '',
};

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<VehicleFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, [currentPage, statusFilter, searchTerm]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fleetApi.getAll({
        status: statusFilter || undefined,
        search: searchTerm || undefined,
        page: currentPage,
        limit: 20
      });
      setVehicles(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-900/50 text-green-300 border-green-500/50';
      case 'IN_USE': return 'bg-blue-900/50 text-blue-300 border-blue-500/50';
      case 'MAINTENANCE': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50';
      case 'OUT_OF_SERVICE': return 'bg-red-900/50 text-red-300 border-red-500/50';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return <CheckCircle className="w-4 h-4" />;
      case 'IN_USE': return <Truck className="w-4 h-4" />;
      case 'MAINTENANCE': return <Wrench className="w-4 h-4" />;
      case 'OUT_OF_SERVICE': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const isMaintenanceDue = (nextMaintenance?: string) => {
    if (!nextMaintenance) return false;
    const maintenanceDate = new Date(nextMaintenance);
    const now = new Date();
    const daysUntilMaintenance = Math.floor((maintenanceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilMaintenance <= 7 && daysUntilMaintenance >= 0;
  };

  const isMaintenanceOverdue = (nextMaintenance?: string) => {
    if (!nextMaintenance) return false;
    const maintenanceDate = new Date(nextMaintenance);
    const now = new Date();
    return maintenanceDate < now;
  };

  const openCreateModal = () => {
    setEditingVehicle(null);
    setFormData(emptyFormData);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      truckNumber: vehicle.truckNumber,
      vin: vehicle.vin,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year.toString(),
      status: vehicle.status,
      nextMaintenance: vehicle.nextMaintenance ? vehicle.nextMaintenance.split('T')[0] : '',
    });
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVehicle(null);
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
      const submitData = {
        ...formData,
        year: parseInt(formData.year),
        nextMaintenance: formData.nextMaintenance || undefined,
      };

      if (editingVehicle) {
        await fleetApi.update(editingVehicle.id, submitData as any);
      } else {
        await fleetApi.create(submitData as any);
      }
      closeModal();
      fetchVehicles();
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to save vehicle');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (vehicle: Vehicle) => {
    if (!confirm(`Are you sure you want to delete Truck #${vehicle.truckNumber}?`)) {
      return;
    }

    try {
      await fleetApi.delete(vehicle.id);
      fetchVehicles();
    } catch (err) {
      console.error('Failed to delete vehicle:', err);
      alert('Failed to delete vehicle');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-desert-tan mb-2">Fleet Management</h1>
              <p className="text-desert-sand">Manage vehicles, maintenance, and GPS tracking</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Add Vehicle
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
                  placeholder="Search by truck number, VIN, make, or model..."
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
                  <option value="AVAILABLE">Available</option>
                  <option value="IN_USE">In Use</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="OUT_OF_SERVICE">Out of Service</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fleet List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-patriot-navy rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-patriot-blue/20 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-patriot-blue/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            <div className="bg-patriot-navy border-2 border-desert-sand/20 rounded-lg p-12 text-center">
              <Truck className="w-16 h-16 text-desert-sand/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-desert-tan mb-2">No Vehicles Found</h3>
              <p className="text-desert-sand mb-6">
                {searchTerm || statusFilter
                  ? 'Try adjusting your search criteria'
                  : 'Get started by adding your first vehicle'}
              </p>
              {!searchTerm && !statusFilter && (
                <button className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-opacity">
                  <Plus className="w-5 h-5" />
                  Add First Vehicle
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-phoenix-gradient rounded-lg flex items-center justify-center">
                          <Truck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-desert-tan">
                            Truck #{vehicle.truckNumber}
                          </h3>
                          <p className="text-desert-sand text-sm">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg border-2 text-xs font-bold flex items-center gap-2 ${getStatusColor(vehicle.status)}`}>
                        {getStatusIcon(vehicle.status)}
                        {vehicle.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      {/* VIN */}
                      <div className="bg-patriot-darkNavy rounded-lg p-3">
                        <p className="text-desert-sand text-xs mb-1">VIN</p>
                        <p className="text-desert-tan font-mono text-sm">{vehicle.vin}</p>
                      </div>

                      {/* Maintenance Status */}
                      {vehicle.nextMaintenance && (
                        <div className="bg-patriot-darkNavy rounded-lg p-3">
                          <p className="text-desert-sand text-xs mb-1">Next Maintenance</p>
                          <div className="flex items-center justify-between">
                            <p className="text-desert-tan font-medium">
                              {new Date(vehicle.nextMaintenance).toLocaleDateString()}
                            </p>
                            {isMaintenanceOverdue(vehicle.nextMaintenance) ? (
                              <span className="text-red-400 text-xs flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Overdue
                              </span>
                            ) : isMaintenanceDue(vehicle.nextMaintenance) ? (
                              <span className="text-yellow-400 text-xs flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Due Soon
                              </span>
                            ) : (
                              <span className="text-green-400 text-xs flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Scheduled
                              </span>
                            )}
                          </div>
                          {vehicle.lastMaintenance && (
                            <p className="text-desert-sand text-xs mt-1">
                              Last: {new Date(vehicle.lastMaintenance).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}

                      {/* GPS Status */}
                      <div className="bg-patriot-darkNavy rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-desert-sand text-xs">GPS Tracking</p>
                          {vehicle.gpsStatus ? (
                            <span className="text-green-400 text-xs flex items-center gap-1">
                              <Radio className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="text-red-400 text-xs flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t-2 border-desert-sand/10">
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Wrench className="w-4 h-4" />
                        Maintenance
                      </button>
                      <button
                        onClick={() => openEditModal(vehicle)}
                        className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle)}
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
                    {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
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
                      <label className="block text-desert-sand text-sm mb-2">Truck Number *</label>
                      <input
                        type="text"
                        name="truckNumber"
                        value={formData.truckNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">VIN *</label>
                      <input
                        type="text"
                        name="vin"
                        value={formData.vin}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Make *</label>
                      <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Peterbilt"
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Model *</label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 567"
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Year *</label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        min="1990"
                        max="2030"
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      >
                        <option value="AVAILABLE">Available</option>
                        <option value="IN_USE">In Use</option>
                        <option value="MAINTENANCE">Maintenance</option>
                        <option value="OUT_OF_SERVICE">Out of Service</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Next Maintenance</label>
                      <input
                        type="date"
                        name="nextMaintenance"
                        value={formData.nextMaintenance}
                        onChange={handleInputChange}
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
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
                          {editingVehicle ? 'Update Vehicle' : 'Create Vehicle'}
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
