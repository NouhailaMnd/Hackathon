import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  {
    to: '/admin/stats',
    label: 'Statistiques',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 17a4 4 0 100-8 4 4 0 000 8z" />
        <path d="M21 21v-2a4 4 0 00-3-3.87" />
        <path d="M3 21v-2a4 4 0 013-3.87" />
      </svg>
    ),
  },
  {
    to: '/admin/locals',
    label: 'Gestion des locaux',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h18M3 14h18M7 6h10M7 18h10" />
      </svg>
    ),
  },
  {
    to: '/admin/plannings',
    label: 'Gestion des plannings',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    to: '/admin/users',
    label: 'Gestion des utilisateurs',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a8.38 8.38 0 0113 0" />
      </svg>
    ),
  },
  {
    to: '/admin/invoices',
    label: 'Suivi des factures',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6M9 16h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  }
];

const AdminDashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-blue-800 text-white p-4 shadow-md">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-xl font-bold tracking-wide">ÉquiPassion Admin</span>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-blue-700 shadow-2xl text-white flex flex-col justify-between"
          >
            <div className="p-6">
              <h1 className="text-2xl font-extrabold mb-6 text-center">Admin Panel</h1>
              <nav className="flex flex-col gap-2">
                {links.map(({ to, label, icon }) => {
                  const isActive = location.pathname === to;
                  return (
                    <Link
                      key={label}
                      to={to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300
                        ${isActive ? 'bg-blue-900 font-semibold shadow-lg' : 'hover:bg-blue-800'}`}
                    >
                      {icon}
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="p-4 text-center text-xs text-blue-200">&copy; 2025 ÉquiPassion</div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-blue-700 shadow-lg text-white flex flex-col justify-between">
        <div className="p-6">
          <div className="p-4 border-b border-blue-800 flex items-center justify-center">
            <img 
              src="/logo-removebg-preview.png" 
              alt="Logo ÉquiPassion" 
              className="h-20 w-auto object-contain" 
            />
          </div>
          
          <nav className="flex flex-col gap-2 mt-4">
            {links.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300
                    ${isActive ? 'bg-blue-900 font-semibold shadow-lg' : 'hover:bg-blue-800'}`}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 text-center text-xs text-blue-300">&copy; 2025 ÉquiPassion</div>
      </aside>
     

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        
        />
        
      )}
      
    </>
  );
};

export default AdminDashboard;
