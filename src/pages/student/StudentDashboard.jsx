import React from 'react';
import { 
  ChartBarIcon, 
  TrophyIcon, 
  BellAlertIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useOutletContext } from 'react-router-dom';

const StudentDashboard = () => {
  const {studentName} = useOutletContext();
  return (
    <div className="max-w-7xl mx-auto pb-10">
      
      {/* Personalized Header */}
      <div className="mb-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-blue-50">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {studentName || 'Student'}! 👋
          </h1>
          <p className="text-gray-500 font-medium">
            Here is a snapshot of your learning progress today. Keep up the great work!
          </p>
        </div>
        <div className="hidden md:flex p-4 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 text-white items-center gap-3">
          <ArrowTrendingUpIcon className="w-8 h-8 opacity-80" />
          <div>
            <p className="text-xs text-blue-100 font-semibold uppercase tracking-wider">Weekly Streak</p>
            <p className="text-xl font-bold">12 Days</p>
          </div>
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Performance Graph Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Performance</h3>
              <p className="text-sm text-gray-500 mt-1">Avg. score last 4 tests</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <ChartBarIcon className="w-6 h-6" />
            </div>
          </div>
          
          {/* Beautified CSS Bar Chart */}
          <div className="flex-grow flex items-end justify-between gap-2 pt-8 pb-2 border-b border-gray-100">
             <div className="w-full relative group/bar">
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">55%</div>
               <div className="w-full bg-blue-100 h-16 rounded-t-md transition-all duration-500 group-hover:bg-blue-200"></div>
             </div>
             <div className="w-full relative group/bar">
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">68%</div>
               <div className="w-full bg-blue-300 h-24 rounded-t-md transition-all duration-500 group-hover:bg-blue-400"></div>
             </div>
             <div className="w-full relative group/bar">
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">82%</div>
               <div className="w-full bg-blue-500 h-32 rounded-t-md transition-all duration-500 group-hover:bg-blue-600"></div>
             </div>
             <div className="w-full relative group/bar">
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">95%</div>
               <div className="w-full bg-blue-600 h-40 rounded-t-md shadow-[0_0_15px_rgba(37,99,235,0.3)]"></div>
             </div>
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-400 font-medium px-1">
            <span>T1</span>
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
          </div>
        </div>

        {/* Student Rank Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          {/* Decorative background blur */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-100 rounded-full blur-2xl opacity-60"></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Batch Rank</h3>
              <p className="text-sm text-gray-500 mt-1">Top 5% of students</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-500">
              <TrophyIcon className="w-6 h-6" />
            </div>
          </div>

          <div className="flex-grow flex items-end justify-center space-x-3 relative z-10 pb-4">
            {/* Rank 2 */}
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-gray-400 mb-2">2</span>
              <div className="w-16 h-20 bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-xl border-t-4 border-gray-300 shadow-inner"></div>
            </div>
            
            {/* Rank 1 (Current Student) */}
            <div className="flex flex-col items-center relative z-20">
              <StarIcon className="w-6 h-6 text-yellow-400 mb-1 drop-shadow-md animate-pulse" />
              <div className="w-20 h-28 bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-xl border-t-4 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex justify-center pt-3">
                 <span className="text-2xl font-black text-white">1</span>
              </div>
            </div>
            
            {/* Rank 3 */}
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-gray-400 mb-2">3</span>
              <div className="w-16 h-16 bg-gradient-to-t from-orange-100 to-orange-50 rounded-t-xl border-t-4 border-orange-200 shadow-inner"></div>
            </div>
          </div>
        </div>

        {/* Test Notification Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Action Center</h3>
              <p className="text-sm text-gray-500 mt-1">Pending tasks & alerts</p>
            </div>
            <div className="relative">
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <BellAlertIcon className="w-6 h-6 animate-bounce" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
              </span>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800">Upcoming Test</p>
                <p className="text-xs text-gray-500 mt-0.5">C++ Programming Concepts</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">Today</span>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between opacity-70">
              <div>
                <p className="text-sm font-bold text-gray-800">New Material</p>
                <p className="text-xs text-gray-500 mt-0.5">Added to Java Masterclass</p>
              </div>
              <span className="text-xs font-bold text-gray-500">Yesterday</span>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;