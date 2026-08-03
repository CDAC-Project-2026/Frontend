// src/pages/admin/ViewResults.jsx
import { useState, useEffect } from 'react';
import { AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import api from '../../services/api';

export default function ViewResults() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseResults, setCourseResults] = useState(null);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError] = useState('');

  // ---- Load the real course list once, on mount ----
  useEffect(() => {
    api
      .get('/admin/courses')
      .then((response) => {
        const courseList = response.data.data;
        setCourses(courseList);
        if (courseList.length > 0) {
          setSelectedCourseId(courseList[0].courseId); // default to the first course
        }
      })
      .catch((err) => {
        setError(err.response?.data?.status ?? 'Could not load courses.');
      })
      .finally(() => setLoadingCourses(false));
  }, []);

  // ---- Load results for whichever course is currently selected ----
  useEffect(() => {
    if (!selectedCourseId) return;

    setLoadingResults(true);
    api
      .get(`/admin/course/${selectedCourseId}/results`)
      .then((response) => {
        setCourseResults(response.data.data); // CourseResultDTO
      })
      .catch((err) => {
        setError(err.response?.data?.status ?? 'Could not load results for this course.');
        setCourseResults(null);
      })
      .finally(() => setLoadingResults(false));
  }, [selectedCourseId]);

  const getGradeColor = (grade) => {
    if (!grade) return 'bg-gray-100 text-gray-800';
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

  if (loadingCourses) {
    return <div className="text-center py-10 text-gray-500">Loading courses...</div>;
  }

  const studentResults = courseResults?.studentResults ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">View Results</h1>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-md p-3 text-sm">{error}</div>
      )}

      {/* Course Selector Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
        {courses.length === 0 ? (
          <p className="text-gray-500 text-sm">No courses available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {courses.map(course => (
              <button
                key={course.courseId}
                onClick={() => setSelectedCourseId(course.courseId)}
                className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${
                  selectedCourseId === course.courseId
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="font-medium">{course.courseName}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {loadingResults ? (
        <div className="text-center py-10 text-gray-500">Loading results...</div>
      ) : (
        <>
          {/* Statistics Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Average Score</p>
                <p className="text-2xl font-bold">{Number(courseResults?.averageScore ?? 0).toFixed(1)}%</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Highest Score</p>
                <p className="text-2xl font-bold">{Number(courseResults?.highestScore ?? 0)}%</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <ChartBarIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Lowest Score</p>
                <p className="text-2xl font-bold">{Number(courseResults?.lowestScore ?? 0)}%</p>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold">Student Results</h2>
            </div>
            {studentResults.length === 0 ? (
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
                  {studentResults.map((result) => {
                    const score = Number(result.studentScore);
                    const progress = Number(result.progress);
                    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(result.studentName)}&background=random`;

                    return (
                      <tr key={result.studentId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img src={avatarUrl} alt={result.studentName} className="h-8 w-8 rounded-full" />
                            <span className="font-medium">{result.studentName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-bold">{score}%</span>
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
                                className={`${getScoreColor(progress)} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{progress}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
