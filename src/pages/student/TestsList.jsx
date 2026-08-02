import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const TestsList = () => {
    const [activeTests, setActiveTests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);

        api
            .get("/student/tests/all")
            .then((response) => {
                setActiveTests(response.data.data);
            })
            .catch((err) => {
                // ResponseDTO's field is "status", not "message" — confirmed from actual backend code.
                setError(
                    err.response?.data?.status ?? "Could not load active tests."
                );
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div className="text-center py-10 text-gray-500">Loading active tests...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-5xl mx-auto">
      <div className="mb-8 border-b-2 border-blue-600 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Active Tests</h1>
        <p className="text-gray-600 mt-2">Attempt your currently ongoing tests before the time runs out.</p>
      </div>

      <div className="space-y-6">
        {activeTests.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg">You have no active tests at the moment.</p>
          </div>
        ) : (
          activeTests.map((test) => (
            <div
              key={test.testId}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all duration-200 hover:border-blue-300"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-lg flex-shrink-0 mt-1">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4h16v4l-6 6 6 6v4H4v-4l6-6-6-6V4z" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-bold text-blue-600 mb-1 tracking-wide">{test.courseName}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{test.testName}</h3>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      {test.noOfQuestions} Questions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {test.totalScore} Marks
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {test.timeAlloted} Minutes
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 md:ml-4">
                <Link
                  to={`/student/test/${test.testId}`}
                  className="block w-full md:w-auto px-8 py-3 bg-[#1e3a5f] text-white font-semibold rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors text-center"
                >
                  Start Test
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestsList;
