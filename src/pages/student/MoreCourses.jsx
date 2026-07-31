import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const MoreCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/student/courses');
        setCourses(response.data.data);
      } catch (err) {
        setError('Could not load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading courses...</p>;
  }

  return (
    <div>
      <div className="mb-6 border-b-2 border-blue-600 pb-3">
        <h2 className="text-2xl font-bold text-gray-800">Browse Courses</h2>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.courseId}
              to={`/student/courses/${course.courseId}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col h-full hover:shadow-md hover:border-blue-300 transition-all"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {course.courseName}
              </h3>
              <p className="text-sm text-gray-500 flex-grow mb-6">
                {course.description}
              </p>
              <span className="text-sm font-semibold text-blue-600">
                View Course →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreCourses;