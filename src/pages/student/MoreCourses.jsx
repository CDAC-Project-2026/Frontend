import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, BookOpenIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const MoreCourses = () => {
  const availableCourses = [
    { 
      id: 5, 
      course_id: 105,
      course_name: 'Python for Data Science', 
      description: 'Learn data analysis, visualization, and machine learning basics with Python.',
      testCount: 5, 
      materialCount: 6 
    },
    { 
      id: 6, 
      course_id: 106,
      course_name: 'Web Security & Cryptography', 
      description: 'Understand backend vulnerabilities, encryption algorithms, and secure coding patterns.',
      testCount: 4, 
      materialCount: 3 
    },
  ];

  const handleEnroll = (courseId) => {
    alert(`Enrolling in course ID: ${courseId}`);
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b-2 border-blue-600 pb-4 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Browse More Courses</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Expand your skills by enrolling in new technical domains.</p>
        </div>
        <Link 
          to="/student/my-courses" 
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to My Courses
        </Link>
      </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {availableCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            
            
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 group-hover:bg-blue-600 transition-colors duration-300"></div>

            <div className="flex-grow mb-6 pl-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.course_name}</h3>
              <p className="text-base text-gray-500 leading-relaxed">{course.description}</p>
            </div>

            
            <div className="flex gap-6 mb-8 pt-6 border-t border-gray-100 pl-2">
              <div className="flex items-center text-sm font-medium text-gray-600">
                <BookOpenIcon className="w-5 h-5 mr-2 text-emerald-500 group-hover:text-blue-500 transition-colors" />
                {course.testCount} Practice Tests
              </div>
              <div className="flex items-center text-sm font-medium text-gray-600">
                <DocumentTextIcon className="w-5 h-5 mr-2 text-emerald-500 group-hover:text-blue-500 transition-colors" />
                {course.materialCount} PDFs
              </div>
            </div>
            
           
            <button 
              onClick={() => handleEnroll(course.course_id)}
              className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-center shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              Enroll Now
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreCourses;