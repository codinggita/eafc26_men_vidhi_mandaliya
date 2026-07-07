import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats } from '../features/user/userSlice';
import { FaUserShield, FaUsers, FaDatabase, FaShieldAlt, FaKey, FaClock } from 'react-icons/fa';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { adminStats, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (loading || !adminStats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] space-y-4">
        <span className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm animate-pulse">Loading system console...</p>
      </div>
    );
  }

  // Admin stats card definitions
  const adminCards = [
    { label: 'Total Accounts', value: adminStats.users?.total || 0, sub: `${adminStats.users?.adminCount || 0} Admins`, icon: <FaUsers />, color: 'text-indigo-400 border-indigo-500/20' },
    { label: 'Database Documents', value: adminStats.players?.total || 0, sub: `Average Rating: ${adminStats.players?.averageRating || 0}`, icon: <FaDatabase />, color: 'text-emerald-400 border-emerald-500/20' },
  ];

  // Placeholder system user accounts log matching database
  const demoUsers = [
    { id: '1', name: 'Vidhi Mandaliya', email: 'vidhimandaliya81@gmail.com', role: 'admin', joined: 'July 7, 2026' },
    { id: '2', name: 'System Auditor', email: 'auditor@eafc.local', role: 'admin', joined: 'July 6, 2026' },
    { id: '3', name: 'Viewer Demo', email: 'viewer@eafc.local', role: 'user', joined: 'July 5, 2026' }
  ];

  return (
    <div className="space-y-8 text-left animate-fade-in">
      
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <FaUserShield className="text-indigo-400" />
          <span>Administration Console</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Manage system configurations, user accounts, and database integrations.</p>
      </div>

      {/* Grid stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminCards.map((card) => (
          <div 
            key={card.label} 
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-xl"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">{card.label}</span>
              <span className="text-3xl font-extrabold text-white font-mono tracking-tight">{card.value}</span>
              <span className="text-xs text-slate-400 block pt-1">{card.sub}</span>
            </div>
            <span className={`p-4 bg-slate-800/60 border rounded-xl text-xl ${card.color}`}>
              {card.icon}
            </span>
          </div>
        ))}
      </div>

      {/* Accounts list & Security sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* User accounts list */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base border-l-4 border-indigo-500 pl-3">Registered User Accounts</h3>
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300 font-medium">
                {demoUsers.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 font-bold text-white">{usr.name}</td>
                    <td className="py-4 font-mono">{usr.email}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        usr.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-850 text-slate-400'
                      }`}>
                        {usr.role}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400">{usr.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security & Token Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="font-bold text-white text-base border-l-4 border-indigo-500 pl-3">System Permissions</h3>
          
          <div className="space-y-4 pt-2">
            
            {/* Sec Item 1 */}
            <div className="flex gap-3 items-start text-xs">
              <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg mt-0.5">
                <FaKey size={12} />
              </span>
              <div>
                <p className="font-bold text-white">Active Session Token</p>
                <p className="text-slate-500 text-[10px] font-mono truncate max-w-[170px] mt-0.5">
                  {localStorage.getItem('eafc_token') || 'No Token'}
                </p>
              </div>
            </div>

            {/* Sec Item 2 */}
            <div className="flex gap-3 items-start text-xs border-t border-slate-800/60 pt-4">
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg mt-0.5">
                <FaShieldAlt size={12} />
              </span>
              <div>
                <p className="font-bold text-white">Role access control</p>
                <p className="text-slate-500 text-[10px] mt-0.5 leading-relaxed">
                  Administrator role is authorized to perform mutations (create, edit, delete players).
                </p>
              </div>
            </div>

            {/* Sec Item 3 */}
            <div className="flex gap-3 items-start text-xs border-t border-slate-800/60 pt-4">
              <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg mt-0.5">
                <FaClock size={12} />
              </span>
              <div>
                <p className="font-bold text-white">Token expiry period</p>
                <p className="text-slate-500 text-[10px] mt-0.5">
                  JWT expires in 24 hours. Requester will be redirected to Login.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminPanel;
