import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Results = () => {
  const [resultsData, setResultsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching data by joining StudentTest, Test, and Courses tables
    setTimeout(() => {
      setResultsData([
        {
          student_test_id: 1,
          test_id: 101,
          title: 'C++ Programming Concepts',
          date: '05-Apr-2026, Sun',
          student_score: 85,
          total_score: 100,
          passing_percentage: 40
        },
        {
          student_test_id: 3,
          test_id: 102,
          title: 'Java Master Class',
          date: '12-Apr-2026, Sun',
          student_score: 95,
          total_score: 100,
          passing_percentage: 40
        },
      ]);
      setIsLoading(false);
    }, 400);
  }, []);

  if (isLoading) return <div className="text-center py-10">Loading results...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b-2 border-blue-600 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Test Results</h1>
        <p className="text-gray-600 mt-1">Review your past performance and analyze your mistakes.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-700">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">Title</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Percentage</th>
              <th className="py-4 px-6">Passing Score</th>
              <th className="py-4 px-6">Result</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {resultsData.map((result, index) => {
              const percentage = (result.student_score / result.total_score) * 100;
              const isPass = percentage >= result.passing_percentage;

              return (
                <tr key={result.student_test_id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-800">{result.title}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{result.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">{percentage.toFixed(2)} %</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{result.passing_percentage} %</td>
                  <td className="py-4 px-6 text-sm font-medium">
                    <span className={isPass ? 'text-teal-500' : 'text-red-500'}>
                      {isPass ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link 
                      to={`/student/analysis/${result.student_test_id}`}
                      className="inline-block px-4 py-1.5 text-sm font-medium text-teal-600 border border-teal-500 rounded-full hover:bg-teal-50 transition-colors"
                    >
                      Analysis
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;