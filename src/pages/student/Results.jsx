import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Results = () => {
  const [resultsData, setResultsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/student/result')
      .then((response) => {
        setResultsData(response.data.data); // List<AttemptedTestDTO>
      })
      .catch((err) => {
        setError(err.response?.data?.status ?? 'Could not load results.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="text-center py-10">Loading results...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b-2 border-blue-600 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Test Results</h1>
        <p className="text-gray-600 mt-1">Review your past performance and analyze your mistakes.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {resultsData.length === 0 ? (
          <p className="text-center py-10 text-gray-500">You haven't attempted any tests yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-700">
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Percentage</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {resultsData.map((result, index) => {
                const percentage = Number(result.scorePercentage);

                return (
                  <tr key={result.testId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-600">{index + 1}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{result.testName}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(result.attempDateTime).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 font-medium">{percentage.toFixed(2)} %</td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        to={`/student/analysis/${result.testId}`}
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
        )}
      </div>
    </div>
  );
};

export default Results;
