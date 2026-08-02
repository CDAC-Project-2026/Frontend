import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const TestAnalysis = () => {
  // Route is "analysis/:studentTestId" — but the value we actually pass here
  // (from Results.jsx) is the real testId your backend endpoint expects.
  const { studentTestId } = useParams();
  const testId = studentTestId;

  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/student/test/${testId}/result`)
      .then((response) => {
        setAnalysisData(response.data.data); // TestResultDetailDTO
      })
      .catch((err) => {
        setError(err.response?.data?.status ?? 'Could not load analysis.');
      })
      .finally(() => setIsLoading(false));
  }, [testId]);

  if (isLoading) return <div className="text-center py-10">Loading analysis...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end border-b-2 border-blue-600 pb-4">
        <div>
          <Link to="/student/results" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Results
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Test Analysis</h1>
          <p className="text-gray-600 mt-1">{analysisData.testName} &middot; {analysisData.courseName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Your Score</p>
          <p className="text-3xl font-bold text-blue-700">{Number(analysisData.studentScore)} / {Number(analysisData.totalScore)}</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-8">
        {analysisData.questions.map((q, index) => {
          const wasAnswered = q.studentAnswer !== null && q.studentAnswer !== undefined;
          const isQuestionCorrect = wasAnswered && q.correctAnswer === q.studentAnswer;

          return (
            <div key={q.queId} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-800 leading-relaxed">
                  <span className="font-bold mr-2">Q{index + 1}.</span> {q.queDescription}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${
                  !wasAnswered
                    ? 'bg-gray-100 text-gray-600'
                    : isQuestionCorrect
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {!wasAnswered ? 'Not Answered' : isQuestionCorrect ? '+ Marks Awarded' : 'Incorrect'}
                </span>
              </div>

              <div className="space-y-3">
                {OPTION_LETTERS.map((letter, i) => {
                  const optionNum = i + 1; // A=1, B=2, C=3, D=4 — matches correctAnswer/studentAnswer ints
                  const optionText = q[`option${letter}`]; // optionA, optionB, optionC, optionD
                  const isCorrectAnswer = q.correctAnswer === optionNum;
                  const isStudentAnswer = q.studentAnswer === optionNum;

                  let optionClass = "p-4 rounded-lg border-2 flex items-center transition-all ";

                  if (isCorrectAnswer && isStudentAnswer) {
                    optionClass += "border-green-500 bg-green-50 text-green-800 font-bold";
                  } else if (isStudentAnswer && !isCorrectAnswer) {
                    optionClass += "border-red-400 bg-red-50 text-red-800";
                  } else if (isCorrectAnswer && !isStudentAnswer) {
                    optionClass += "border-green-500 bg-white text-green-700 font-bold border-dashed";
                  } else {
                    optionClass += "border-gray-200 text-gray-600 bg-white opacity-60";
                  }

                  return (
                    <div key={letter} className={optionClass}>
                      <div className="mr-3 w-6 flex justify-center">
                        {isCorrectAnswer && (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        )}
                        {isStudentAnswer && !isCorrectAnswer && (
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                      </div>
                      <span>{optionText}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestAnalysis;
