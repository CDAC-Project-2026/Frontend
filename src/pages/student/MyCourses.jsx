import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

// Cycle through a fixed palette so each course gets a distinct
// progress-bar color, since the backend doesn't store one.
const COLORS = ['bg-blue-600', 'bg-sky-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500'];

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await api.get('/student/my-courses');
        setEnrolledCourses(response.data.data);
      } catch (err) {
        setError('Could not load your courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading your courses...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b-2 border-blue-600 pb-3">
        <h2 className="text-2xl font-bold text-gray-800">Enrolled Course List</h2>
        <Link 
          to="/student/more-courses" 
          className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Browse More Courses
        </Link>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
          <Link 
            to="/student/more-courses" 
            className="inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course, index) => {
            const progress = Number(course.progress);
            const color = COLORS[index % COLORS.length];

            return (
              <div key={course.enrollmentId} className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-700 mb-1">{course.courseName}</h3>
                    <p className="text-sm text-gray-500">{course.description}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${progress === 100 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {progress === 100 ? 'Completed' : 'In Progress'}
                  </span>
                </div>

                <div className="mt-auto pt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Course Progress</span>
                    <span className="font-bold text-gray-700">{progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div 
                      className={`${color} h-2 rounded-full`} 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <Link 
                    to={`/student/courses/${course.courseId}`} 
                    className={`block w-full text-center py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
                      progress === 100 
                        ? 'text-gray-700 bg-gray-100 hover:bg-gray-200' 
                        : 'text-white bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;