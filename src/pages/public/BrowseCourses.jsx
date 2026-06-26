import React from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, ArrowLeftIcon, BookOpenIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const BrowseCourses = () => {
  // Simulating the global course list
  const publicCourses = [
    { 
      id: 101,
      course_name: 'C++ Programming Concepts', 
      description: 'Master core logic building, memory management, and object-oriented programming concepts from scratch.',
      tests: 4, 
      materials: 3,
      tag: 'Beginner Friendly'
    },
    { 
      id: 102,
      course_name: 'Java Masterclass', 
      description: 'Deep dive into advanced Java architecture, JVM mechanics, and multithreading for enterprise applications.',
      tests: 6, 
      materials: 5,
      tag: 'Advanced'
    },
    { 
      id: 103,
      course_name: 'React Frontend Development', 
      description: 'Build dynamic user interfaces, manage state, and deploy scalable web applications using modern React.',
      tests: 2, 
      materials: 2,
      tag: 'High Demand'
    },
    { 
      id: 104,
      course_name: 'MySQL Database Admin', 
      description: 'Learn relational database design, complex SQL queries, and query optimization techniques.',
      tests: 3, 
      materials: 4,
      tag: 'Core Concept'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Simple Public Navigation */}
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

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Available Courses</h1>
          <p className="text-lg text-gray-500">Choose a path, enroll in a course, and start your journey toward technical mastery today.</p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {publicCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                  {course.tag}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{course.course_name}</h2>
              <p className="text-gray-500 mb-6 flex-grow leading-relaxed">
                {course.description}
              </p>

              {/* Course Meta Data */}
              <div className="flex gap-6 mb-8 pt-6 border-t border-gray-100">
                <div className="flex items-center text-sm font-medium text-gray-600">
                  <BookOpenIcon className="w-5 h-5 mr-2 text-blue-500" />
                  {course.tests} Practice Tests
                </div>
                <div className="flex items-center text-sm font-medium text-gray-600">
                  <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-500" />
                  {course.materials} PDF Modules
                </div>
              </div>

              {/* Enroll Button routes to Signup */}
              <Link 
                to="/signup" 
                className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-center shadow-md hover:bg-blue-600 hover:shadow-blue-200 transition-all duration-300"
              >
                Enroll Now
              </Link>

            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default BrowseCourses;