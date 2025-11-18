'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { customerApi, Customer } from '@/lib/api-client';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  FileText,
  Receipt,
  X,
  Save
} from 'lucide-react';

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  serviceAddress: string;
  billingAddress: string;
  serviceType: string;
  pickupSchedule: string;
  notes: string;
  isActive: boolean;
}

const emptyFormData: CustomerFormData = {
  name: '',
  email: '',
  phone: '',
  serviceAddress: '',
  billingAddress: '',
  serviceType: 'Residential',
  pickupSchedule: '',
  notes: '',
  isActive: true,
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<CustomerFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, activeFilter, searchTerm]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getAll({
        search: searchTerm || undefined,
        isActive: activeFilter === '' ? undefined : activeFilter === 'true',
        page: currentPage,
        limit: 20
      });
      setCustomers(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const openCreateModal = () => {
    setEditingCustomer(null);
    setFormData(emptyFormData);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email || '',
      phone: customer.phone,
      serviceAddress: customer.serviceAddress,
      billingAddress: customer.billingAddress || '',
      serviceType: customer.serviceType,
      pickupSchedule: customer.pickupSchedule || '',
      notes: customer.notes || '',
      isActive: customer.isActive,
    });
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
    setFormData(emptyFormData);
    setFormError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);

    try {
      if (editingCustomer) {
        await customerApi.update(editingCustomer.id, formData);
      } else {
        await customerApi.create(formData);
      }
      closeModal();
      fetchCustomers();
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to save customer');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (customer: Customer) => {
    if (!confirm(`Are you sure you want to delete ${customer.name}?`)) {
      return;
    }

    try {
      await customerApi.delete(customer.id);
      fetchCustomers();
    } catch (err) {
      console.error('Failed to delete customer:', err);
      alert('Failed to delete customer');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-desert-tan mb-2">Customer Management</h1>
              <p className="text-desert-sand">Manage customer accounts and service information</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Add Customer
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
                  placeholder="Search customers by name, email, phone, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan placeholder-desert-sand/50 focus:outline-none focus:border-phoenix-coral"
                />
              </div>

              {/* Active Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-desert-sand w-5 h-5" />
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral appearance-none cursor-pointer"
                >
                  <option value="">All Customers</option>
                  <option value="true">Active Only</option>
                  <option value="false">Inactive Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customers List */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-patriot-navy rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-patriot-blue/20 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-patriot-blue/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : customers.length === 0 ? (
            <div className="bg-patriot-navy border-2 border-desert-sand/20 rounded-lg p-12 text-center">
              <Users className="w-16 h-16 text-desert-sand/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-desert-tan mb-2">No Customers Found</h3>
              <p className="text-desert-sand mb-6">
                {searchTerm || activeFilter
                  ? 'Try adjusting your search criteria'
                  : 'Get started by adding your first customer'}
              </p>
              {!searchTerm && !activeFilter && (
                <button className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-opacity">
                  <Plus className="w-5 h-5" />
                  Add First Customer
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-phoenix-gradient rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {customer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-desert-tan">{customer.name}</h3>
                          <p className="text-desert-sand text-sm">{customer.serviceType}</p>
                          {customer.pickupSchedule && (
                            <p className="text-desert-sand text-xs mt-1">
                              Pickup: {customer.pickupSchedule}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {customer.isActive ? (
                          <span className="px-3 py-1 rounded-lg border-2 bg-green-900/50 text-green-300 border-green-500/50 text-sm font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-lg border-2 bg-red-900/50 text-red-300 border-red-500/50 text-sm font-bold flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Phone */}
                      <div className="bg-patriot-darkNavy rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Phone className="w-4 h-4 text-desert-sand" />
                          <p className="text-desert-sand text-xs">Phone</p>
                        </div>
                        <p className="text-desert-tan font-medium">{customer.phone}</p>
                      </div>

                      {/* Email */}
                      {customer.email && (
                        <div className="bg-patriot-darkNavy rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4 text-desert-sand" />
                            <p className="text-desert-sand text-xs">Email</p>
                          </div>
                          <p className="text-desert-tan font-medium text-sm truncate">
                            {customer.email}
                          </p>
                        </div>
                      )}

                      {/* Account Balance */}
                      <div className="bg-patriot-darkNavy rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-desert-sand" />
                          <p className="text-desert-sand text-xs">Account Balance</p>
                        </div>
                        <p className={`font-bold text-lg ${
                          customer.accountBalance > 0
                            ? 'text-red-400'
                            : customer.accountBalance < 0
                            ? 'text-green-400'
                            : 'text-desert-tan'
                        }`}>
                          {formatCurrency(Math.abs(customer.accountBalance))}
                          {customer.accountBalance > 0 && <span className="text-xs ml-1">owed</span>}
                          {customer.accountBalance < 0 && <span className="text-xs ml-1">credit</span>}
                        </p>
                      </div>
                    </div>

                    {/* Addresses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Service Address */}
                      <div className="bg-patriot-darkNavy rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-desert-sand" />
                          <p className="text-desert-sand text-xs">Service Address</p>
                        </div>
                        <p className="text-desert-tan text-sm">{customer.serviceAddress}</p>
                      </div>

                      {/* Billing Address */}
                      {customer.billingAddress && (
                        <div className="bg-patriot-darkNavy rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Receipt className="w-4 h-4 text-desert-sand" />
                            <p className="text-desert-sand text-xs">Billing Address</p>
                          </div>
                          <p className="text-desert-tan text-sm">{customer.billingAddress}</p>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {customer.notes && (
                      <div className="bg-patriot-darkNavy rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-desert-sand" />
                          <p className="text-desert-sand text-xs">Notes</p>
                        </div>
                        <p className="text-desert-tan text-sm">{customer.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t-2 border-desert-sand/10">
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <FileText className="w-4 h-4" />
                        Tickets
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Receipt className="w-4 h-4" />
                        Invoices
                      </button>
                      <button
                        onClick={() => openEditModal(customer)}
                        className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(customer)}
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
                    {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
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

                  <div>
                    <label className="block text-desert-sand text-sm mb-2">Customer Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
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

                  <div>
                    <label className="block text-desert-sand text-sm mb-2">Service Address *</label>
                    <input
                      type="text"
                      name="serviceAddress"
                      value={formData.serviceAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                    />
                  </div>

                  <div>
                    <label className="block text-desert-sand text-sm mb-2">Billing Address</label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Service Type *</label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Roll-Off">Roll-Off</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Pickup Schedule</label>
                      <input
                        type="text"
                        name="pickupSchedule"
                        value={formData.pickupSchedule}
                        onChange={handleInputChange}
                        placeholder="e.g., Monday & Thursday"
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
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

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label htmlFor="isActive" className="text-desert-tan">Active Customer</label>
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
                          {editingCustomer ? 'Update Customer' : 'Create Customer'}
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
