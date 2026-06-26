import React from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-blue-200">
      
      {/* Sticky Glassmorphism Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-inner">
            <AcademicCapIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">
            ExamPortal
          </h1>
        </div>
        <div className="space-x-1 sm:space-x-3 flex items-center">
          {/* NEW: Admin Login Link (Subtle) */}
          <Link to="/admin-login" className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-800 transition-colors hidden md:block mr-2 border-r border-gray-200 pr-5">
            Admin Access
          </Link>

          <Link to="/courses" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors hidden sm:block">
            Browse Courses
          </Link>
          <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
          <span className="px-4 py-1.5 mb-6 text-xs font-bold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
            Your Future Starts Here
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-3xl leading-tight">
            Master your concepts. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">Ace your exams.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
            A comprehensive, interactive platform designed to track your progress, test your knowledge, and prepare you for technical excellence.
          </p>
        </div>
        
        {/* Widened Call-to-Action Card */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24 w-full">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-8 md:gap-12 group overflow-hidden relative">
            
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:bg-blue-100 transition-colors duration-500"></div>

            <div className="w-20 h-20 md:w-24 md:h-24 bg-sky-50 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 transition-colors duration-300 relative z-10 shadow-sm border border-sky-100">
              <AcademicCapIcon className="w-10 h-10 md:w-12 md:h-12 text-sky-600 group-hover:text-white transition-colors duration-300" />
            </div>
            
            <div className="flex-grow text-center md:text-left relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Premium Courses Catalog</h3>
              <p className="text-gray-500 leading-relaxed text-lg max-w-2xl">
                Explore a wide variety of highly structured subjects including C++, Java, React, and MySQL database administration. Prepare for your technical exams with curated materials and active tests.
              </p>
            </div>

            <div className="flex-shrink-0 relative z-10 w-full md:w-auto">
              <Link 
                to="/courses" 
                className="flex items-center justify-center gap-2 px-8 py-4 w-full md:w-auto text-base font-bold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
              >
                Browse All Courses
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </main>
      
      <footer className="border-t border-gray-100 bg-white py-8 text-center">
        <p className="text-sm text-gray-400 font-medium">
          © {new Date().getFullYear()} ExamPortal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;