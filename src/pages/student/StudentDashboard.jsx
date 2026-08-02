import React, { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  TrophyIcon,
  BellAlertIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useOutletContext } from 'react-router-dom';
import api from '../../services/api';

const StudentDashboard = () => {
  const { studentName } = useOutletContext();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/student/dashboard')
      .then((response) => {
        setDashboard(response.data.data); // StudentDashboardDTO
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

  const testScores = dashboard.testScores ?? [];
  const notifications = dashboard.notifications ?? [];
  const maxScore = testScores.length > 0 ? Math.max(...testScores.map(Number)) : 100;

  return (
    <div className="max-w-7xl mx-auto pb-10">

      {/* Personalized Header */}
      <div className="mb-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-blue-50">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {studentName || dashboard.studentName || 'Student'}! 👋
          </h1>
          <p className="text-gray-500 font-medium">
            Here is a snapshot of your learning progress today. Keep up the great work!
          </p>
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Performance Graph Card — real scores from testScores */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Performance</h3>
              <p className="text-sm text-gray-500 mt-1">Avg. score last {testScores.length} tests</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <ChartBarIcon className="w-6 h-6" />
            </div>
          </div>

          {testScores.length === 0 ? (
            <p className="flex-grow flex items-center justify-center text-gray-400 text-sm">No tests attempted yet.</p>
          ) : (
            <>
              <div className="flex-grow flex items-end justify-between gap-2 pt-8 pb-2 border-b border-gray-100">
                {testScores.map((score, i) => {
                  const pct = Number(score);
                  const heightPx = Math.max(8, (pct / maxScore) * 160);
                  return (
                    <div key={i} className="w-full relative group/bar">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {pct}%
                      </div>
                      <div
                        className="w-full bg-blue-500 rounded-t-md transition-all duration-500 group-hover:bg-blue-600"
                        style={{ height: `${heightPx}px` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-3 text-xs text-gray-400 font-medium px-1">
                {testScores.map((_, i) => (
                  <span key={i}>T{i + 1}</span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Student Rank Card — real rank from backend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-100 rounded-full blur-2xl opacity-60"></div>

          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Batch Rank</h3>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-500">
              <TrophyIcon className="w-6 h-6" />
            </div>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center relative z-10 pb-4">
            <StarIcon className="w-8 h-8 text-yellow-400 mb-2 drop-shadow-md" />
            <span className="text-4xl font-black text-blue-700">#{dashboard.studentRank ?? '—'}</span>
          </div>
        </div>

        {/* Notifications Card — real notifications from backend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Action Center</h3>
              <p className="text-sm text-gray-500 mt-1">Pending tasks & alerts</p>
            </div>
            <div className="relative">
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <BellAlertIcon className="w-6 h-6" />
              </div>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                </span>
              )}
            </div>
          </div>

          <div className="flex-grow overflow-y-auto max-h-64">
            {notifications.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400 text-sm text-center">No notifications yet.</p>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {notifications.map((n, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-blue-600 mb-1">{n.courseName}</p>
                    <p className="text-sm text-gray-800">{n.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.notifTime).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
