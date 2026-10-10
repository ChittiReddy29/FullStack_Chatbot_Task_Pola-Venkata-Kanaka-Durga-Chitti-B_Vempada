import React, { useState, useEffect, useCallback } from 'react';
import { Enquiry, UserType, EnquiryStatus, EnquiryStats } from '../types';
import api from '../services/api';
import {
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Eye,
  CheckCircle,
  Key,
  Users,
  AlertCircle,
  X,
  Edit,
  Clock,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [adminKey, setAdminKey] = useState<string>(() => {
    return localStorage.getItem('dronetv_admin_key') || 'droneTV_admin_key_2026';
  });
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [keyInput, setKeyInput] = useState<string>(adminKey);
  const [authError, setAuthError] = useState<string>('');

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<EnquiryStats>({ New: 0, Contacted: 0, 'In Progress': 0, Closed: 0 });
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUserType, setSelectedUserType] = useState<UserType | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | ''>('');

  // Modals & Detail State
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState<string>('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);

  const loadEnquiries = useCallback(
    async (keyToUse: string) => {
      setIsLoading(true);
      setAuthError('');
      try {
        const response = await api.fetchEnquiries(keyToUse, {
          q: searchTerm,
          userType: selectedUserType,
          status: selectedStatus,
        });

        if (response.success) {
          setEnquiries(response.data);
          setTotalCount(response.total);
          if (response.statusCounts) {
            setStats(response.statusCounts);
          }
          setIsAuthorized(true);
          localStorage.setItem('dronetv_admin_key', keyToUse);
        }
      } catch (err: any) {
        console.error('[Admin Auth Error]:', err);
        setIsAuthorized(false);
        const msg = err.response?.data?.message || 'Unauthorized: Invalid Admin Security Key.';
        setAuthError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm, selectedUserType, selectedStatus]
  );

  useEffect(() => {
    if (adminKey) {
      loadEnquiries(adminKey);
    }
  }, [adminKey, loadEnquiries]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminKey(keyInput);
    loadEnquiries(keyInput);
  };

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setIsUpdatingStatus(true);
    try {
      const response = await api.updateEnquiryStatus(adminKey, id, { status: newStatus });
      if (response.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
        loadEnquiries(adminKey);
      }
    } catch (err) {
      alert('Failed to update enquiry status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const response = await api.updateEnquiryStatus(adminKey, id, { adminNotes: adminNoteInput });
      if (response.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, adminNotes: adminNoteInput } : item))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, adminNotes: adminNoteInput });
        }
        alert('Admin notes saved!');
      }
    } catch (err) {
      alert('Failed to save notes.');
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    try {
      const response = await api.deleteEnquiry(adminKey, id);
      if (response.success) {
        setEnquiries((prev) => prev.filter((item) => item._id !== id));
        setDeleteConfirmId(null);
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setIsDetailModalOpen(false);
        }
        loadEnquiries(adminKey);
      }
    } catch (err) {
      alert('Failed to delete enquiry record.');
    }
  };

  // Render Login Lock Screen if unauthorized
  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto my-12 glass-panel p-8 space-y-6 border-orange-500/30">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/30 text-orange-400 mx-auto flex items-center justify-center">
            <Key className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">Admin Authentication</h2>
          <p className="text-xs text-gray-400">
            Enter your secret admin key to access full lead CRUD management.
          </p>
          <div className="text-[11px] text-orange-400 bg-orange-950/60 p-2 rounded-lg border border-orange-500/20 font-mono">
            Default Key: <span className="font-bold">droneTV_admin_key_2026</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {authError && (
            <div className="bg-rose-950/60 border border-rose-500/40 p-3 rounded-xl text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div>
            <label className="form-label">Admin Security Key</label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Enter admin secret key"
              className="form-input"
            />
          </div>

          <button type="submit" className="w-full btn-primary py-3 text-sm">
            Authenticate & Open Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Admin Lead Operations Portal
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">Enquiry Management Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadEnquiries(adminKey)}
            className="btn-secondary py-2 px-4 text-xs"
            title="Refresh database records"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </button>

          <button
            onClick={() => {
              setIsAuthorized(false);
              localStorage.removeItem('dronetv_admin_key');
            }}
            className="btn-danger py-2 px-3 text-xs"
          >
            Lock Portal
          </button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="glass-panel p-4 border-white/10 text-center">
          <div className="text-gray-400 text-xs font-medium">Total Leads</div>
          <div className="text-2xl font-bold font-heading text-white mt-1">{totalCount}</div>
        </div>

        <div className="glass-panel p-4 border-orange-500/30 text-center">
          <div className="text-orange-400 text-xs font-medium">New Enquiries</div>
          <div className="text-2xl font-bold font-heading text-orange-400 mt-1">{stats.New}</div>
        </div>

        <div className="glass-panel p-4 border-amber-500/30 text-center">
          <div className="text-amber-400 text-xs font-medium">Contacted</div>
          <div className="text-2xl font-bold font-heading text-amber-400 mt-1">{stats.Contacted}</div>
        </div>

        <div className="glass-panel p-4 border-purple-500/30 text-center">
          <div className="text-purple-400 text-xs font-medium">In Progress</div>
          <div className="text-2xl font-bold font-heading text-purple-400 mt-1">{stats['In Progress']}</div>
        </div>

        <div className="glass-panel p-4 border-emerald-500/30 text-center col-span-2 sm:col-span-1">
          <div className="text-emerald-400 text-xs font-medium">Closed</div>
          <div className="text-2xl font-bold font-heading text-emerald-400 mt-1">{stats.Closed}</div>
        </div>
      </div>

      {/* Filters & Search Control Bar */}
      <div className="glass-panel p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-white/10">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, email, phone, text..."
            className="form-input pl-9 py-2 text-xs bg-gray-950/80"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Filter className="w-3.5 h-3.5 text-orange-400" />
            <span>Filter By:</span>
          </div>

          <select
            value={selectedUserType}
            onChange={(e) => setSelectedUserType(e.target.value as UserType | '')}
            className="form-select py-1.5 px-3 text-xs bg-gray-950 w-auto"
          >
            <option value="">All User Types</option>
            <option value="Customer">Customer</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as EnquiryStatus | '')}
            className="form-select py-1.5 px-3 text-xs bg-gray-950 w-auto"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Data Table */}
      <div className="glass-panel overflow-hidden border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/90 text-xs font-semibold text-gray-400 uppercase border-b border-white/10">
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">User Type</th>
                <th className="py-3.5 px-4">Service / Course Interest</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Submitted At</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    {isLoading ? 'Loading records...' : 'No enquiries found matching criteria.'}
                  </td>
                </tr>
              ) : (
                enquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Contact */}
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="font-semibold text-white text-sm">{item.name}</div>
                      <div className="text-gray-400">{item.email}</div>
                      <div className="text-orange-400 font-mono text-[11px]">{item.phone}</div>
                    </td>

                    {/* User Type Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`badge ${
                          item.userType === 'Student'
                            ? 'badge-student'
                            : item.userType === 'Customer'
                            ? 'badge-customer'
                            : 'badge-new'
                        }`}
                      >
                        {item.userType}
                      </span>
                    </td>

                    {/* Interest */}
                    <td className="py-3.5 px-4 max-w-xs truncate text-gray-200" title={item.interest}>
                      {item.interest}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id!, e.target.value as EnquiryStatus)}
                        className={`text-xs py-1 px-2.5 rounded-lg border bg-gray-950 font-semibold cursor-pointer outline-none ${
                          item.status === 'New'
                            ? 'text-orange-400 border-orange-500/30'
                            : item.status === 'Contacted'
                            ? 'text-amber-400 border-amber-500/30'
                            : item.status === 'In Progress'
                            ? 'text-purple-400 border-purple-500/30'
                            : 'text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedEnquiry(item);
                          setAdminNoteInput(item.adminNotes || '');
                          setIsDetailModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-orange-500/20 text-gray-300 hover:text-orange-400 border border-white/10 transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(item._id!)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details View Modal */}
      {isDetailModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel w-full max-w-2xl overflow-hidden border-orange-500/40 shadow-2xl relative">
            <div className="bg-gray-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                Enquiry Detail #{selectedEnquiry._id?.substring(0, 8)}
              </h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-sm">
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <div>
                  <span className="text-xs text-gray-400">Full Name</span>
                  <div className="font-semibold text-white text-base">{selectedEnquiry.name}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">User Classification</span>
                  <div>
                    <span className="badge badge-student">{selectedEnquiry.userType}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Email Address</span>
                  <div className="text-orange-400">{selectedEnquiry.email}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Phone Number</span>
                  <div className="text-white font-mono">{selectedEnquiry.phone}</div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Interest Subject</span>
                <div className="text-white font-medium bg-gray-950 p-3 rounded-xl border border-white/10 mt-1">
                  {selectedEnquiry.interest}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">User Message</span>
                <div className="text-gray-200 leading-relaxed bg-gray-950 p-4 rounded-xl border border-white/10 mt-1 whitespace-pre-line">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Update Control */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Update Status</span>
                <div className="flex items-center gap-3">
                  {(['New', 'Contacted', 'In Progress', 'Closed'] as EnquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedEnquiry._id!, st)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        selectedEnquiry.status === st
                          ? 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-sm'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Internal Admin Notes</span>
                <textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Add internal team comments or follow-up logs..."
                  className="form-textarea text-xs"
                />
                <button
                  onClick={() => handleSaveNotes(selectedEnquiry._id!)}
                  className="btn-secondary text-xs py-1.5 px-4"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel w-full max-w-md p-6 space-y-4 border-rose-500/40 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Confirm Deletion</h3>
            <p className="text-xs text-gray-300">
              Are you sure you want to permanently delete this enquiry record? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEnquiry(deleteConfirmId)}
                className="btn-danger text-xs py-2 px-5"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
