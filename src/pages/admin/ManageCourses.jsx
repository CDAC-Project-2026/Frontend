// src/pages/admin/ManageCourses.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import api from '../../services/api';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/admin/courses');
        setCourses(response.data.data);
      } catch (err) {
        setError('Could not load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (!window.confirm('Delete this course?')) return;

    try {
      await api.delete(`/admin/courses/${courseId}`);
      setCourses(courses.filter((c) => c.courseId !== courseId));
    } catch (err) {
      alert('Could not delete this course. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading courses...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <Link
          to="/admin/courses/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          New Course
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No courses yet. Create your first one.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.courseId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/admin/courses/${course.courseId}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {course.courseName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-gray-600">
                    {course.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.adminName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <Link
                      to={`/admin/courses/${course.courseId}/edit`}
                      className="text-blue-600 hover:text-blue-800 inline-block"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(course.courseId)}
                      className="text-red-600 hover:text-red-800 inline-block"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}