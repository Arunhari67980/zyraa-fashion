import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, UserPlus, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { admin, isAdminAuthenticated, adminLogout, addModerator, getModerators } = useAuth();
  const navigate = useNavigate();
  
  const [moderators, setModerators] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModerator, setNewModerator] = useState({ email: '', name: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated as admin
  useEffect(() => {
    if (!isAdminAuthenticated || admin?.role !== 'admin') {
      navigate('/admin-login');
    }
  }, [isAdminAuthenticated, admin, navigate]);

  // Fetch moderators
  useEffect(() => {
    const fetchModerators = async () => {
      setLoading(true);
      const result = await getModerators();
      if (result.success) {
        setModerators(result.data || []);
      }
      setLoading(false);
    };

    if (isAdminAuthenticated && admin?.role === 'admin') {
      fetchModerators();
    }
  }, [isAdminAuthenticated, admin, getModerators]);

  const handleAddModerator = async (e) => {
    e.preventDefault();

    if (!newModerator.email || !newModerator.name) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    const result = await addModerator(newModerator.email, newModerator.name);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setNewModerator({ email: '', name: '' });
      setShowAddModal(false);
      
      // Refresh moderators list
      const modsResult = await getModerators();
      if (modsResult.success) {
        setModerators(modsResult.data || []);
      }
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    navigate('/');
  };

  if (!isAdminAuthenticated || admin?.role !== 'admin') {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4]">
        <div className="text-center">
          <p className="text-[#666] mb-4">Authenticating...</p>
          <div className="animate-spin inline-block w-8 h-8 border-4 border-[#b8860b] border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-[#2c2c2c] mb-2 tracking-wide">
              Admin Dashboard
            </h1>
            <p className="text-[#666] font-light">Welcome back, {admin?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border animate-fade-in ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-600' 
              : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            {message.text}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#999] font-light text-sm mb-2">Moderators</p>
                  <p className="text-4xl font-light text-[#2c2c2c]">{moderators.length}</p>
                </div>
                <Users className="w-8 h-8 text-[#b8860b] opacity-30" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#999] font-light text-sm mb-2">Role</p>
                  <p className="text-2xl font-light text-[#2c2c2c] capitalize">{admin?.role}</p>
                </div>
                <div className="w-8 h-8 bg-[#b8860b] rounded-full text-white flex items-center justify-center font-light">A</div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#999] font-light text-sm mb-2">Email</p>
                  <p className="text-sm font-light text-[#2c2c2c]">{admin?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Moderators Section */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-[#2c2c2c] tracking-wide">
                Moderators
              </h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary flex items-center gap-2"
              >
                <UserPlus size={18} />
                Add Moderator
              </button>
            </div>

            {/* Moderators List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-[#b8860b] border-t-transparent rounded-full"></div>
                <p className="text-[#666] mt-4">Loading moderators...</p>
              </div>
            ) : moderators.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-[#999] font-light text-lg">No moderators added yet</p>
                <p className="text-[#999] font-light text-sm mt-2">Click "Add Moderator" to get started</p>
              </div>
            ) : (
              <div className="card">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e0d9cc]">
                      <th className="text-left py-4 px-6 font-light text-[#2c2c2c]">Name</th>
                      <th className="text-left py-4 px-6 font-light text-[#2c2c2c]">Email</th>
                      <th className="text-left py-4 px-6 font-light text-[#2c2c2c]">Status</th>
                      <th className="text-left py-4 px-6 font-light text-[#2c2c2c]">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moderators.map((mod) => (
                      <tr key={mod.id} className="border-b border-[#e0d9cc] hover:bg-[#f8f7f4]">
                        <td className="py-4 px-6 text-[#2c2c2c] font-light">{mod.name}</td>
                        <td className="py-4 px-6 text-[#666] font-light">{mod.email}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded text-xs font-light ${
                            mod.is_active 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {mod.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[#999] font-light text-sm">
                          {new Date(mod.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Moderator Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light text-[#2c2c2c]">Add Moderator</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#999] hover:text-[#2c2c2c]"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddModerator} className="space-y-4">
              <div>
                <label className="block text-[#2c2c2c] font-light mb-2 text-sm">
                  Moderator Email
                </label>
                <input
                  type="email"
                  value={newModerator.email}
                  onChange={(e) => setNewModerator({ ...newModerator, email: e.target.value })}
                  placeholder="email@example.com"
                  className="input-field w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-[#2c2c2c] font-light mb-2 text-sm">
                  Moderator Name
                </label>
                <input
                  type="text"
                  value={newModerator.name}
                  onChange={(e) => setNewModerator({ ...newModerator, name: e.target.value })}
                  placeholder="Full Name"
                  className="input-field w-full"
                  required
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  Add Moderator
                </button>
              </div>
            </form>

            <p className="text-[#999] font-light text-xs mt-4 text-center">
              A temporary password will be generated for the moderator
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
