import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  FaChartBar, 
  FaUsers, 
  FaExchangeAlt, 
  FaChevronLeft, 
  FaChevronRight, 
  FaBars, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaShieldAlt,
  FaBell,
  FaCog
} from 'react-icons/fa';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();

  const handleLogout = () => {
    // Placeholder logout action
    alert('Logout clicked (Placeholder)');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <FaChartBar /> },
    { name: 'Players', path: '/players', icon: <FaUsers /> },
    { name: 'Compare', path: '/compare', icon: <FaExchangeAlt /> },
    { name: 'Admin Panel', path: '/admin', icon: <FaShieldAlt /> },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-100 font-sans">
      
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden md:flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="p-2 bg-indigo-500 rounded-xl text-white flex-shrink-0">
              <FaChartBar size={18} />
            </span>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight text-white whitespace-nowrap animate-fade-in">
                EAFC 26
              </span>
            )}
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
          </button>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 py-6 px-4 space-y-1.5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* User profile summary in sidebar footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/40 m-4 rounded-xl flex items-center gap-3">
            <FaUserCircle size={32} className="text-indigo-400" />
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-500 truncate">admin@eafc.local</p>
            </div>
          </div>
        )}
      </aside>

      {/* Sidebar - Mobile drawer backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar - Mobile drawer body */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-indigo-500 rounded-xl text-white">
              <FaChartBar size={18} />
            </span>
            <span className="font-bold text-lg text-white">EAFC 26</span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(false)} 
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <FaChevronLeft size={16} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 flex items-center gap-3">
          <FaUserCircle size={36} className="text-indigo-400" />
          <div>
            <p className="text-sm font-semibold text-white">Administrator</p>
            <p className="text-xs text-slate-500">admin@eafc.local</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="text-slate-400 hover:text-white md:hidden p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <FaBars size={20} />
            </button>
            <div className="hidden md:flex items-center text-sm font-medium text-slate-400">
              <span>Admin Console</span>
              <span className="mx-2 text-slate-600">/</span>
              <span className="text-white capitalize">{location.pathname.substring(1) || 'Dashboard'}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification placeholder */}
            <button className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors relative">
              <FaBell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>

            {/* Profile Dropdown container */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-slate-800/60 p-1.5 rounded-xl transition-all duration-200"
              >
                <FaUserCircle size={26} className="text-indigo-400" />
                <span className="hidden sm:inline text-sm font-semibold text-slate-200">Admin</span>
              </button>

              {isProfileOpen && (
                <>
                  <div 
                    onClick={() => setIsProfileOpen(false)}
                    className="fixed inset-0 z-10"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-20 animate-fade-in">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-500 font-mono">Role: SUPER_ADMIN</p>
                    </div>
                    <Link 
                      to="#" 
                      onClick={() => setIsProfileOpen(false)} 
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                    >
                      <FaCog size={14} /> Settings
                    </Link>
                    <button 
                      onClick={() => { setIsProfileOpen(false); handleLogout(); }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-colors border-t border-slate-800"
                    >
                      <FaSignOutAlt size={14} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
