'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { billingApi, Invoice } from '@/lib/api-client';
import {
  Receipt,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Download,
  Send,
  Calendar,
  X,
  Save
} from 'lucide-react';

interface InvoiceFormData {
  invoiceNumber: string;
  amount: string;
  dueDate: string;
  status: string;
  customerId: string;
}

const emptyFormData: InvoiceFormData = {
  invoiceNumber: '',
  amount: '',
  dueDate: '',
  status: 'PENDING',
  customerId: '',
};

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState<InvoiceFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchInvoices();
    fetchStats();
  }, [currentPage, statusFilter]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await billingApi.getInvoices({
        status: statusFilter || undefined,
        page: currentPage,
        limit: 20
      });
      setInvoices(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await billingApi.getStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Failed to fetch billing stats:', err);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50';
      case 'PAID': return 'bg-green-900/50 text-green-300 border-green-500/50';
      case 'OVERDUE': return 'bg-red-900/50 text-red-300 border-red-500/50';
      case 'CANCELLED': return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'PAID': return <CheckCircle className="w-4 h-4" />;
      case 'OVERDUE': return <AlertTriangle className="w-4 h-4" />;
      case 'CANCELLED': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const isDueSoon = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const daysUntilDue = Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDue <= 7 && daysUntilDue >= 0;
  };

  const openCreateModal = () => {
    setEditingInvoice(null);
    setFormData({
      ...emptyFormData,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    });
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount.toString(),
      dueDate: invoice.dueDate.split('T')[0],
      status: invoice.status,
      customerId: '',
    });
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingInvoice(null);
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
        amount: parseFloat(formData.amount),
      };

      if (editingInvoice) {
        await billingApi.updateInvoice(editingInvoice.id, submitData);
      } else {
        await billingApi.createInvoice(submitData);
      }
      closeModal();
      fetchInvoices();
      fetchStats();
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to save invoice');
    } finally {
      setSaving(false);
    }
  };

  const handleMarkPaid = async (invoice: Invoice) => {
    try {
      await billingApi.updateInvoiceStatus(invoice.id, { status: 'PAID' });
      fetchInvoices();
      fetchStats();
    } catch (err) {
      console.error('Failed to mark invoice as paid:', err);
      alert('Failed to update invoice');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-desert-tan mb-2">Billing & Invoices</h1>
              <p className="text-desert-sand">Manage invoices, payments, and billing records</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Create Invoice
            </button>
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-desert-sand text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-desert-tan">
                      {formatCurrency(stats.totalRevenue || 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-patriot-navy border-2 border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-desert-sand text-sm">Pending</p>
                    <p className="text-2xl font-bold text-desert-tan">
                      {formatCurrency(stats.pendingAmount || 0)}
                    </p>
                    <p className="text-desert-sand text-xs">{stats.pendingCount || 0} invoices</p>
                  </div>
                </div>
              </div>

              <div className="bg-patriot-navy border-2 border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-desert-sand text-sm">Overdue</p>
                    <p className="text-2xl font-bold text-desert-tan">
                      {formatCurrency(stats.overdueAmount || 0)}
                    </p>
                    <p className="text-desert-sand text-xs">{stats.overdueCount || 0} invoices</p>
                  </div>
                </div>
              </div>

              <div className="bg-patriot-navy border-2 border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-desert-sand text-sm">Paid This Month</p>
                    <p className="text-2xl font-bold text-desert-tan">
                      {formatCurrency(stats.paidThisMonth || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-desert-sand w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral appearance-none cursor-pointer"
                >
                  <option value="">All Invoices</option>
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="OVERDUE">Overdue</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Invoices List */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-patriot-navy rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-patriot-blue/20 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-patriot-blue/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : invoices.length === 0 ? (
            <div className="bg-patriot-navy border-2 border-desert-sand/20 rounded-lg p-12 text-center">
              <Receipt className="w-16 h-16 text-desert-sand/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-desert-tan mb-2">No Invoices Found</h3>
              <p className="text-desert-sand mb-6">
                {statusFilter
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first invoice'}
              </p>
              {!statusFilter && (
                <button className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-opacity">
                  <Plus className="w-5 h-5" />
                  Create First Invoice
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {invoices.map((invoice: any) => (
                  <div
                    key={invoice.id}
                    className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-phoenix-gradient rounded-lg flex items-center justify-center">
                          <Receipt className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-desert-tan">
                            Invoice #{invoice.invoiceNumber}
                          </h3>
                          {invoice.customer && (
                            <p className="text-desert-sand text-sm">{invoice.customer.name}</p>
                          )}
                          <p className="text-desert-sand text-xs mt-1">
                            Created: {new Date(invoice.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-desert-tan">
                          {formatCurrency(invoice.amount)}
                        </p>
                        <span className={`px-3 py-1 rounded-lg border-2 text-xs font-bold flex items-center gap-2 mt-2 ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          {invoice.status}
                        </span>
                      </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Due Date */}
                      <div className="bg-patriot-darkNavy rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-desert-sand" />
                          <p className="text-desert-sand text-xs">Due Date</p>
                        </div>
                        <p className="text-desert-tan font-medium">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </p>
                        {invoice.status === 'PENDING' && isDueSoon(invoice.dueDate) && (
                          <span className="text-yellow-400 text-xs flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3 h-3" />
                            Due soon
                          </span>
                        )}
                      </div>

                      {/* Payment Date */}
                      {invoice.paidDate && (
                        <div className="bg-patriot-darkNavy rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <p className="text-desert-sand text-xs">Paid Date</p>
                          </div>
                          <p className="text-desert-tan font-medium">
                            {new Date(invoice.paidDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      {/* Days Overdue */}
                      {invoice.status === 'OVERDUE' && (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <p className="text-red-300 text-xs">Days Overdue</p>
                          </div>
                          <p className="text-red-300 font-bold text-lg">
                            {Math.floor(
                              (new Date().getTime() - new Date(invoice.dueDate).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Customer Contact */}
                    {invoice.customer && (
                      <div className="bg-patriot-darkNavy rounded-lg p-3 mb-4">
                        <p className="text-desert-sand text-xs mb-2">Customer Contact</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-desert-tan text-sm">{invoice.customer.email}</p>
                            <p className="text-desert-sand text-xs">{invoice.customer.phone}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t-2 border-desert-sand/10">
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      {invoice.status === 'PENDING' && (
                        <button
                          onClick={() => handleMarkPaid(invoice)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-900/20 hover:bg-green-900/30 text-green-300 rounded-lg transition-colors text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Paid
                        </button>
                      )}
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Send className="w-4 h-4" />
                        Send
                      </button>
                      <button
                        onClick={() => openEditModal(invoice)}
                        className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
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
              <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b-2 border-desert-sand/10">
                  <h2 className="text-2xl font-bold text-desert-tan">
                    {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
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
                    <label className="block text-desert-sand text-sm mb-2">Invoice Number *</label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                    />
                  </div>

                  <div>
                    <label className="block text-desert-sand text-sm mb-2">Amount *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-desert-sand w-5 h-5" />
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-desert-sand text-sm mb-2">Due Date *</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
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
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="OVERDUE">Overdue</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
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
                          {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
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
