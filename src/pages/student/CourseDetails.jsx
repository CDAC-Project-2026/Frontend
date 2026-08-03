import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, DocumentIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import api from "../../services/api";

const CourseDetails = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null); // null = not enrolled
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, myCoursesRes] = await Promise.all([
          api.get(`/student/courses/${courseId}`),
          api.get('/student/my-courses'),
        ]);

        setCourse(courseRes.data.data);

        const matched = myCoursesRes.data.data.find(
          (c) => c.courseId === Number(courseId)
        );
        setEnrollment(matched || null);

        if (matched) {
          try {
            const testsRes = await api.get(`/student/courses/${courseId}/tests`);
            setTests(testsRes.data.data);
          } catch (testsErr) {
            console.error("Tests fetch failed:", testsErr.response?.status, testsErr.response?.data);
          }

          try {
            const materialsRes = await api.get(`/student/courses/${courseId}/materials`);
            setMaterials(materialsRes.data.data);
          } catch (materialsErr) {
            console.error("Materials fetch failed:", materialsErr.response?.status, materialsErr.response?.data);
          }
        }
      } catch (err) {
        setError('Could not load this course.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]); 

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await api.post(`/student/courses/${courseId}/enroll`);
      const myCoursesRes = await api.get('/student/my-courses');
      const matched = myCoursesRes.data.data.find(
        (c) => c.courseId === Number(courseId)
      );
      setEnrollment(matched || null);

      if (matched) {
        const testsRes = await api.get(`/student/courses/${courseId}/tests`);
        setTests(testsRes.data.data);
      }
    } catch (err) {
      setError('Could not enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleDownload = async (docUrl, docTitle) => {
    try {
      const response = await api.get(docUrl, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', docTitle);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Could not download this file.');
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!course) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          to="/student/my-courses"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to My Courses
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{course.courseName}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>

        {enrollment ? (
          <div className="mt-4 max-w-sm">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Your progress</span>
              <span className="font-bold text-gray-700">{Number(enrollment.progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${Number(enrollment.progress)}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-3">
            <p className="text-sm text-gray-500">You're not enrolled in this course yet.</p>
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">Available Tests</h2>

          {!enrollment ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-400 text-sm">
              Enroll in this course to see its tests.
            </div>
          ) : tests.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-400 text-sm">
              Tests for this course haven't been added yet. Check back soon.
            </div>
          ) : (
            <div className="space-y-4">
              {tests.map((test) => (
                <div
                  key={test.testId}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-gray-900">{test.testName}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {test.noOfQuestions} Questions &middot; {test.totalScore} Marks &middot; {test.timeAlloted} Minutes
                    </p>
                  </div>
                  <Link
                    to={`/student/test/${test.testId}`}
                    className="px-5 py-2 bg-[#1e3a5f] text-white text-sm font-semibold rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Start Test
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">Study Materials</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {materials.length === 0 ? (
              <p className="p-4 text-gray-400 text-sm text-center">No materials uploaded yet.</p>
            ) : (
              materials.map((doc, index) => (
                <div
                  key={doc.docId}
                  className={`p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${index !== materials.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="bg-red-100 p-2 rounded text-red-600 flex-shrink-0">
                    <DocumentIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{doc.docTitle}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{Number(doc.docSize)} MB</p>
                  </div>
                  <button
                    onClick={() => handleDownload(doc.docUrl, doc.docTitle)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Download"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;