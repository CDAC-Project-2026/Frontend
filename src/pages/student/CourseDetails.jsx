import React from "react";
import { Link, useParams } from "react-router-dom";

const CourseDetails = () =>{
    const { courseId } = useParams();

    const courseData = {
        course_name: courseId === '101' ? 'C++ Programming Concepts' : 'Course Details',
        description: 'Master core logic building and object-oriented concepts.',
        tests: [
        { test_id: 1, title: 'Basic Syntax & Datatypes', time_alloted: '30 mins', total_score: 50, status: 'Active' },
        { test_id: 2, title: 'Object Oriented Programming', time_alloted: '45 mins', total_score: 100, status: 'Scheduled' },
        ],
        materials: [
        { doc_id: 1, doc_title: 'Chapter 1: Intro to C++', doc_size: '2.4 MB', doc_type: 'PDF' },
        { doc_id: 2, doc_title: 'Cheatsheet: Pointers & References', doc_size: '1.1 MB', doc_type: 'PDF' },
        ],

        course_name: courseId === '102' ? 'Java Masterclass' : 'Course Details',
        description: 'Java collections.',
        tests: [
        { test_id: 3, title: 'Collection Interfaces', time_alloted: '40 mins', total_score: 50, status: 'Active' },
        { test_id: 4, title: 'Stack, Queue, LinkedList', time_alloted: '45 mins', total_score: 100, status: 'Scheduled' },
        ],
        materials: [
        { doc_id: 3, doc_title: 'Cheatsheet: Collections in java', doc_size: '1.1 MB', doc_type: 'PDF' },
        ]
    };

    return(
        <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <Link 
          to="/student/my-courses" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to My Courses
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{courseData.course_name}</h1>
        <p className="text-gray-600 mt-2">{courseData.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Tests (Takes up 2/3 of the space on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">Available Tests</h2>
          
          <div className="space-y-4">
            {courseData.tests.map((test) => (
              <div key={test.test_id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between hover:border-blue-300 transition-colors">
                
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{test.title}</h3>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${test.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {test.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {test.time_alloted}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {test.total_score} Marks
                    </span>
                  </div>
                </div>

                <Link 
                  to={`/student/test/${test.test_id}`}
                  className={`px-6 py-2 rounded-md text-sm font-semibold text-center transition-colors ${
                    test.status === 'Active' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  Start Test
                </Link>

              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Study Materials (Takes up 1/3 of the space) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2">Study Materials</h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {courseData.materials.map((doc, index) => (
              <div 
                key={doc.doc_id} 
                className={`p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${index !== courseData.materials.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                {/* PDF Icon */}
                <div className="bg-red-100 p-2 rounded text-red-600 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-bold text-gray-800 truncate">{doc.doc_title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{doc.doc_size} • {doc.doc_type}</p>
                </div>
                
                <button className="text-blue-600 hover:text-blue-800 p-1" title="Download">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseDetails