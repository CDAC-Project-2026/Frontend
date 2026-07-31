import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import api from '../../services/api';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data.data);
      } catch (err) {
        setError('Could not load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <AcademicCapIcon className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ExamPortal</span>
          </div>
        </div>
        <Link to="/login" className="px-5 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
          Student Login
        </Link>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Available Courses</h1>
          <p className="text-lg text-gray-500">Choose a path, enroll in a course, and start your journey toward technical mastery today.</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.courseId} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <h2 className="text-2xl font-bold text-gray-900 mb-3">{course.courseName}</h2>
                <p className="text-gray-500 mb-8 flex-grow leading-relaxed">
                  {course.description}
                </p>

                <Link
                  to={`/courses/${course.courseId}`}
                  className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-center shadow-md hover:bg-blue-600 hover:shadow-blue-200 transition-all duration-300"
                >
                  View Course
                </Link>

              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
};

export default BrowseCourses;