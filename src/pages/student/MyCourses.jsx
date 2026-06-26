import React from 'react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  // Simulating data fetched from an API/Database based on your schema
  // Each course now summarizes the related Test and StudyMaterial rows
  const enrolledCourses = [
    { 
      id: 1, 
      course_id: 101,
      course_name: 'C++ Programming Concepts', 
      description: 'Master core logic building and object-oriented concepts.',
      testCount: 4, 
      materialCount: 3 
    },
    { 
      id: 2, 
      course_id: 102,
      course_name: 'Java Masterclass', 
      description: 'Advanced Java architecture and multithreading.',
      testCount: 6, 
      materialCount: 5 
    },
    { 
      id: 3, 
      course_id: 103,
      course_name: 'React Frontend Development', 
      description: 'Build dynamic user interfaces and scalable web apps.',
      testCount: 2, 
      materialCount: 2 
    },
    { 
      id: 4, 
      course_id: 104,
      course_name: 'MySQL Database Administration', 
      description: 'Relational database design, queries, and optimization.',
      testCount: 3, 
      materialCount: 4 
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 border-b-2 border-blue-600 pb-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Enrolled Course List</h2>
          <p className="text-sm text-gray-500 mt-1">Access your tests and study materials here.</p>
        </div>
        <Link 
          to="/student/more-courses" 
          className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Browse More Courses
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
            
            <div className="flex-grow mb-4">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{course.course_name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
            </div>

            {/* Course Contents Summary (Based on DB Schema) */}
            <div className="flex gap-4 mb-6 pt-4 border-t border-gray-100">
              {/* Tests Badge */}
              <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                {course.testCount} Tests
              </div>
              
              {/* Study Materials Badge */}
              <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {course.materialCount} PDFs
              </div>
            </div>
            
            {/* Action Button */}
            <Link 
              to={`/student/courses/${course.course_id}`} 
              className="block w-full text-center py-2.5 px-4 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Enter Course
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;