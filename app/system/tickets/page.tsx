'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ticketApi, ServiceTicket } from '@/lib/api-client';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Users,
  X,
  Save
} from 'lucide-react';

interface TicketFormData {
  ticketType: string;
  priority: string;
  status: string;
  description: string;
  assignedTo: string;
}

const emptyFormData: TicketFormData = {
  ticketType: 'GENERAL_INQUIRY',
  priority: 'MEDIUM',
  status: 'OPEN',
  description: '',
  assignedTo: '',
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<ServiceTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState<ServiceTicket | null>(null);
  const [formData, setFormData] = useState<TicketFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, [currentPage, statusFilter, priorityFilter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await ticketApi.getAll({
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
        page: currentPage,
        limit: 20
      });
      setTickets(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-900/50 text-blue-300 border-blue-500/50';
      case 'IN_PROGRESS': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50';
      case 'RESOLVED': return 'bg-green-900/50 text-green-300 border-green-500/50';
      case 'CLOSED': return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN': return <AlertCircle className="w-4 h-4" />;
      case 'IN_PROGRESS': return <Clock className="w-4 h-4" />;
      case 'RESOLVED': return <CheckCircle className="w-4 h-4" />;
      case 'CLOSED': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-900/50 text-red-300 border-red-500/50';
      case 'HIGH': return 'bg-orange-900/50 text-orange-300 border-orange-500/50';
      case 'MEDIUM': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/50';
      case 'LOW': return 'bg-blue-900/50 text-blue-300 border-blue-500/50';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-500/50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'URGENT':
      case 'HIGH':
        return <AlertTriangle className="w-4 h-4" />;
      case 'MEDIUM':
        return <AlertCircle className="w-4 h-4" />;
      case 'LOW':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const openCreateModal = () => {
    setEditingTicket(null);
    setFormData(emptyFormData);
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (ticket: ServiceTicket) => {
    setEditingTicket(ticket);
    setFormData({
      ticketType: ticket.ticketType,
      priority: ticket.priority,
      status: ticket.status,
      description: ticket.description,
      assignedTo: ticket.assignedTo || '',
    });
    setFormError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTicket(null);
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
      if (editingTicket) {
        await ticketApi.update(editingTicket.id, formData);
      } else {
        await ticketApi.create(formData);
      }
      closeModal();
      fetchTickets();
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to save ticket');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-desert-tan mb-2">Service Tickets</h1>
              <p className="text-desert-sand">Track and manage customer service requests</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              Create Ticket
            </button>
          </div>

          {/* Filters */}
          <div className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-desert-sand w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral appearance-none cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-desert-sand w-5 h-5" />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg pl-10 pr-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral appearance-none cursor-pointer"
                >
                  <option value="">All Priorities</option>
                  <option value="URGENT">Urgent</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tickets List */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-patriot-navy rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-patriot-blue/20 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-patriot-blue/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-patriot-navy border-2 border-desert-sand/20 rounded-lg p-12 text-center">
              <FileText className="w-16 h-16 text-desert-sand/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-desert-tan mb-2">No Tickets Found</h3>
              <p className="text-desert-sand mb-6">
                {statusFilter || priorityFilter
                  ? 'Try adjusting your filters'
                  : 'All tickets are resolved or create your first ticket'}
              </p>
              {!statusFilter && !priorityFilter && (
                <button className="bg-phoenix-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-opacity">
                  <Plus className="w-5 h-5" />
                  Create First Ticket
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {tickets.map((ticket: any) => (
                  <div
                    key={ticket.id}
                    className="bg-patriot-navy border-2 border-phoenix-coral/30 rounded-lg p-6 hover:border-phoenix-coral transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-lg border-2 text-xs font-bold flex items-center gap-2 ${getPriorityColor(ticket.priority)}`}>
                            {getPriorityIcon(ticket.priority)}
                            {ticket.priority}
                          </span>
                          <span className={`px-3 py-1 rounded-lg border-2 text-xs font-bold flex items-center gap-2 ${getStatusColor(ticket.status)}`}>
                            {getStatusIcon(ticket.status)}
                            {ticket.status.replace('_', ' ')}
                          </span>
                          <span className="text-desert-sand text-xs">
                            #{ticket.id.substring(0, 8)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-desert-tan mb-1">
                          {ticket.ticketType.replace(/_/g, ' ')}
                        </h3>
                        <p className="text-desert-sand text-sm mb-3">{ticket.description}</p>
                      </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Customer Info */}
                      {ticket.customer && (
                        <div className="bg-patriot-darkNavy rounded-lg p-3">
                          <p className="text-desert-sand text-xs mb-1">Customer</p>
                          <p className="text-desert-tan font-medium">{ticket.customer.name}</p>
                          <p className="text-desert-sand text-xs mt-1">{ticket.customer.phone}</p>
                        </div>
                      )}

                      {/* Assigned To */}
                      <div className="bg-patriot-darkNavy rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-desert-sand" />
                          <p className="text-desert-sand text-xs">Assigned To</p>
                        </div>
                        {ticket.assignedTo ? (
                          <p className="text-desert-tan font-medium">{ticket.assignedTo}</p>
                        ) : (
                          <p className="text-desert-sand/50 text-sm italic">Unassigned</p>
                        )}
                      </div>

                      {/* Created Date */}
                      <div className="bg-patriot-darkNavy rounded-lg p-3">
                        <p className="text-desert-sand text-xs mb-1">Created</p>
                        <p className="text-desert-tan font-medium">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-desert-sand text-xs">
                          {new Date(ticket.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Resolution Info */}
                    {ticket.resolvedAt && (
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
                        <p className="text-green-300 text-sm flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Resolved on {new Date(ticket.resolvedAt).toLocaleDateString()} at{' '}
                          {new Date(ticket.resolvedAt).toLocaleTimeString()}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t-2 border-desert-sand/10">
                      <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      {ticket.status === 'OPEN' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-900/20 hover:bg-yellow-900/30 text-yellow-300 rounded-lg transition-colors text-sm">
                          <Clock className="w-4 h-4" />
                          Start Work
                        </button>
                      )}
                      {ticket.status === 'IN_PROGRESS' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-900/20 hover:bg-green-900/30 text-green-300 rounded-lg transition-colors text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Mark Resolved
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(ticket)}
                        className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      {!ticket.assignedTo && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-patriot-blue/20 hover:bg-patriot-blue/30 text-desert-tan rounded-lg transition-colors text-sm ml-auto">
                          <Users className="w-4 h-4" />
                          Assign
                        </button>
                      )}
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
                    {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
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
                      <label className="block text-desert-sand text-sm mb-2">Ticket Type *</label>
                      <select
                        name="ticketType"
                        value={formData.ticketType}
                        onChange={handleInputChange}
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      >
                        <option value="GENERAL_INQUIRY">General Inquiry</option>
                        <option value="MISSED_PICKUP">Missed Pickup</option>
                        <option value="BILLING_ISSUE">Billing Issue</option>
                        <option value="SERVICE_REQUEST">Service Request</option>
                        <option value="COMPLAINT">Complaint</option>
                        <option value="CONTAINER_ISSUE">Container Issue</option>
                        <option value="SCHEDULE_CHANGE">Schedule Change</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Priority *</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                      </select>
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
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-desert-sand text-sm mb-2">Assigned To</label>
                      <input
                        type="text"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleInputChange}
                        placeholder="Enter name..."
                        className="w-full bg-patriot-darkNavy border-2 border-desert-sand/20 rounded-lg px-4 py-3 text-desert-tan focus:outline-none focus:border-phoenix-coral"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-desert-sand text-sm mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
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
                          {editingTicket ? 'Update Ticket' : 'Create Ticket'}
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
