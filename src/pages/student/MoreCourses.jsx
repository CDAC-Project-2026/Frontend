import React, { useState, useEffect } from 'react';

const MoreCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [enrollingId, setEnrollingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Two calls: the full catalog, and what the student's
        // already enrolled in, so we know which buttons to disable.
        const [coursesRes, myCoursesRes] = await Promise.all([
          api.get('/student/courses'),
          api.get('/student/my-courses'),
        ]);

        setCourses(coursesRes.data.data);
        setEnrolledIds(
          new Set(myCoursesRes.data.data.map((c) => c.courseId))
        );
      } catch (err) {
        setError('Could not load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    setEnrollingId(courseId);
    try {
      await api.post(`/student/courses/${courseId}/enroll`);
      setEnrolledIds((prev) => new Set(prev).add(courseId));
    } catch (err) {
      if (err.response?.status === 409) {
        // Already enrolled (e.g. double-click) - just reflect that state.
        setEnrolledIds((prev) => new Set(prev).add(courseId));
      } else {
        setError('Could not enroll right now. Please try again.');
      }
    } finally {
      setEnrollingId(null);
    }
  };

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
          {courses.map((course) => {
            const isEnrolled = enrolledIds.has(course.courseId);
            const isEnrolling = enrollingId === course.courseId;

            return (
              <div
                key={course.courseId}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-500 flex-grow mb-6">
                  {course.description}
                </p>

                <button
                  onClick={() => handleEnroll(course.courseId)}
                  disabled={isEnrolled || isEnrolling}
                  className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors ${
                    isEnrolled
                      ? 'bg-green-100 text-green-800 cursor-default'
                      : 'text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50'
                  }`}
                >
                  {isEnrolled
                    ? 'Enrolled'
                    : isEnrolling
                    ? 'Enrolling...'
                    : 'Enroll Now'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoreCourses;