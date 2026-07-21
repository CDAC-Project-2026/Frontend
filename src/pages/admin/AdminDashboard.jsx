// src/pages/admin/AdminDashboard.jsx
import { 
  UsersIcon, 
  BookOpenIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Users', value: 342, icon: UsersIcon, color: 'bg-blue-500' },
    { name: 'Total Courses', value: 12, icon: BookOpenIcon, color: 'bg-green-500' },
    { name: 'Total Tests', value: 28, icon: ClipboardDocumentListIcon, color: 'bg-purple-500' },
    { name: 'Average Score', value: '74.5%', icon: ChartBarIcon, color: 'bg-orange-500' },
  ];

  const recentActivities = [
    { id: 1, action: "New user registered", time: "2 min ago" },
    { id: 2, action: "Course 'React Basics' updated", time: "1 hour ago" },
    { id: 3, action: "Test 'Midterm' results published", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Image (real Unsplash photo) */}
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

      {/* Recent Activity with Clock Icon */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 mb-3">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <ul className="divide-y">
          {recentActivities.map(activity => (
            <li key={activity.id} className="py-2 flex justify-between items-center">
              <span>{activity.action}</span>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}