// src/layouts/AdminLayout.jsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'DASHBOARD', path: '/admin/dashboard' },
    { name: 'MANAGE USERS', path: '/admin/users' },
    { name: 'MANAGE COURSES', path: '/admin/courses' },
    { name: 'VIEW RESULTS', path: '/admin/results' },
    { name: 'PROFILE', path: '/admin/profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-blue-600">Admin Portal</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;