// src/pages/admin/ManageCourses.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ManageCourses() {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'React for Beginners', 
      category: 'Frontend', 
      instructor: 'Rohan',
      thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=80&h=80&fit=crop'
    },
    { 
      id: 2, 
      title: 'Advanced Node.js', 
      category: 'Backend', 
      instructor: 'Nilesh',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=80&h=80&fit=crop'
    },
    { 
      id: 3, 
      title: 'UI/UX Design', 
      category: 'Design', 
      instructor: 'Ketan',
      thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=80&h=80&fit=crop'
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/courses/${course.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {course.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                    {course.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{course.instructor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Link
                    to={`/admin/courses/${course.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 inline-block"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 hover:text-red-800 inline-block"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}