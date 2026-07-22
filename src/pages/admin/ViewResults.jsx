// src/pages/admin/ViewResults.jsx
import { useState } from 'react';
import { AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function ViewResults() {
  const [selectedCourse, setSelectedCourse] = useState(1);

  const courses = [
    { id: 1, name: 'React for Beginners', icon: '⚛️' },
    { id: 2, name: 'Advanced Node.js', icon: '🟢' },
    { id: 3, name: 'UI/UX Design', icon: '🎨' },
  ];

  const results = {
    1: [
      { id: 1, student: 'Deven', score: 85, grade: 'A', avatar: 'https://ui-avatars.com/api/?name=Deven&background=3b82f6&color=fff' },
      { id: 2, student: 'Tejveer', score: 72, grade: 'B', avatar: 'https://ui-avatars.com/api/?name=Tejveer&background=10b981&color=fff' },
      { id: 3, student: 'Sanchit', score: 90, grade: 'A+', avatar: 'https://ui-avatars.com/api/?name=Sanchit&background=f59e0b&color=fff' },
      { id: 4, student: 'Eshita', score: 64, grade: 'C', avatar: 'https://ui-avatars.com/api/?name=Eshita&background=ef4444&color=fff' },
    ],
    2: [
      { id: 1, student: 'Deven', score: 78, grade: 'B+', avatar: 'https://ui-avatars.com/api/?name=Deven&background=3b82f6&color=fff' },
      { id: 2, student: 'Siddhi', score: 88, grade: 'A', avatar: 'https://ui-avatars.com/api/?name=Siddhi&background=10b981&color=fff' },
    ],
    3: [
      { id: 1, student: 'Kunal', score: 92, grade: 'A', avatar: 'https://ui-avatars.com/api/?name=Kunal&background=3b82f6&color=fff' },
      { id: 2, student: 'Siddhi', score: 85, grade: 'A-', avatar: 'https://ui-avatars.com/api/?name=Siddhi&background=ef4444&color=fff' },
    ],
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const currentResults = results[selectedCourse] || [];

  // Calculate statistics for the selected course
  const avgScore = currentResults.length > 0
    ? (currentResults.reduce((sum, r) => sum + r.score, 0) / currentResults.length).toFixed(1)
    : 0;
  const highestScore = currentResults.length > 0
    ? Math.max(...currentResults.map(r => r.score))
    : 0;
  const lowestScore = currentResults.length > 0
    ? Math.min(...currentResults.map(r => r.score))
    : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">View Results</h1>

      {/* Course Selector Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${
                selectedCourse === course.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="text-xl">{course.icon}</span>
              <span className="font-medium">{course.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <AcademicCapIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Average Score</p>
            <p className="text-2xl font-bold">{avgScore}%</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-full">
            <ChartBarIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Highest Score</p>
            <p className="text-2xl font-bold">{highestScore}%</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <div className="bg-red-100 p-3 rounded-full">
            <ChartBarIcon className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Lowest Score</p>
            <p className="text-2xl font-bold">{lowestScore}%</p>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">Student Results</h2>
        </div>
        {currentResults.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No results available for this course.
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img src={result.avatar} alt={result.student} className="h-8 w-8 rounded-full" />
                      <span className="font-medium">{result.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold">{result.score}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-64">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`${getScoreColor(result.score)} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${result.score}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{result.score}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}