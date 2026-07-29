import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');

  const navItems = [
    { name: 'DASHBOARD', path: '/student/dashboard' },
    { name: 'MY COURSES', path: '/student/my-courses' },
    { name: 'TESTS', path: '/student/tests' },
    { name: 'VIEW RESULTS', path: '/student/results' },
    { name: 'CHATBOT', path: '/student/chatbot' },
    { name: 'MORE COURSES', path: '/student/more-courses' },
    { name: 'PROFILE', path: '/student/profile' },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/student/profile');
        setStudentName(response.data.data.name);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sideebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-blue-600">Student Portal</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-end items-center">
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet context={{ studentName }} />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;