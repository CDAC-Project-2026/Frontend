import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AcademicCapIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import api from "../../services/api";

const PublicCourseDetails = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${courseId}`);
        setCourse(response.data.data);
      } catch (err) {
        setError('Could not load this course.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Same public nav as BrowseCourses, since this is reached from there */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/courses" className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100">
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

      <main className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{course.courseName}</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">{course.description}</p>

              <Link
                to={`/signup?enroll=${course.courseId}&courseName=${encodeURIComponent(course.courseName)}`}
                className="inline-block mt-6 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-md hover:bg-blue-600 hover:shadow-blue-200 transition-all duration-300"
              >
                Enroll Now
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">Available Tests</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-400 text-sm">
                  You're not enrolled in this course yet
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">Study Materials</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-400 text-sm">
                  Enroll in this course to see its tests.
                </div>
              </div>

            </div>
          </>
        )}
      </main>

    </div>
  );
};

export default PublicCourseDetails;