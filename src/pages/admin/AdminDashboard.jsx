// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import {
  UsersIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import api from '../../services/api';

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then((response) => {
        setDashboard(response.data.data); // AdminDashboardDTO
      })
      .catch((err) => {
        setError(err.response?.data?.status ?? 'Could not load dashboard.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  const stats = [
    { name: 'Total Users', value: dashboard.noOfStudents, icon: UsersIcon, color: 'bg-blue-500' },
    { name: 'Total Courses', value: dashboard.noOfCourses, icon: BookOpenIcon, color: 'bg-green-500' },
    { name: 'Total Tests', value: dashboard.noOfTests, icon: ClipboardDocumentListIcon, color: 'bg-purple-500' },
    { name: 'Average Score', value: `${Number(dashboard.averageScore).toFixed(1)}%`, icon: ChartBarIcon, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <img
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=200&fit=crop"
        alt="Admin workspace"
        className="w-full h-32 object-cover rounded-lg shadow-sm"
      />

      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-4 rounded-lg shadow flex items-center space-x-3">
            <div className={`${stat.color} p-3 rounded-full text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity — real studentLogs from the backend */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 mb-3">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        {(!dashboard.studentLogs || dashboard.studentLogs.length === 0) ? (
          <p className="text-gray-500 text-sm py-2">No recent activity yet.</p>
        ) : (
          <ul className="divide-y">
            {dashboard.studentLogs.map((log, index) => (
              <li key={index} className="py-2">
                <span>{log}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
