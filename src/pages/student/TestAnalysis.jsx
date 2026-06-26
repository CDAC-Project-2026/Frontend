import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const TestAnalysis = () => {
  const { studentTestId } = useParams();
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating joining the Questions table with the StudentAnswers table
    setTimeout(() => {
      setAnalysisData({
        testTitle: 'C++ Programming Concepts',
        score: 85,
        total: 100,
        questions: [
          {
            que_id: 1,
            que_description: "Which of the following is the correct syntax to print 'Hello World' in C++?",
            option_1: "cout << 'Hello World';",
            option_2: "System.out.println('Hello World');",
            option_3: "print('Hello World');",
            option_4: "printf('Hello World');",
            correct_answer: 1,
            student_answer: 1 // Correct
          },
          {
            que_id: 2,
            que_description: "Which operator is used to access the memory address of a variable?",
            option_1: "*",
            option_2: "&",
            option_3: "->",
            option_4: "::",
            correct_answer: 2,
            student_answer: 1 // Incorrect
          }
        ]
      });
      setIsLoading(false);
    }, 400);
  }, [studentTestId]);

  if (isLoading) return <div className="text-center py-10">Loading analysis...</div>;

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
          <p className="text-gray-600 mt-1">{analysisData.testTitle}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Your Score</p>
          <p className="text-3xl font-bold text-blue-700">{analysisData.score} / {analysisData.total}</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-8">
        {analysisData.questions.map((q, index) => {
          const isQuestionCorrect = q.correct_answer === q.student_answer;

          return (
            <div key={q.que_id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-800 leading-relaxed">
                  <span className="font-bold mr-2">Q{index + 1}.</span> {q.que_description}
                </h3>
                {/* Visual Indicator for the whole question */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${isQuestionCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isQuestionCorrect ? '+ Marks Awarded' : 'Incorrect'}
                </span>
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4].map((optNum) => {
                  const optionText = q[`option_${optNum}`];
                  const isCorrectAnswer = q.correct_answer === optNum;
                  const isStudentAnswer = q.student_answer === optNum;

                  // Determine CSS classes based on the logic
                  let optionClass = "p-4 rounded-lg border-2 flex items-center transition-all ";
                  
                  if (isCorrectAnswer && isStudentAnswer) {
                    optionClass += "border-green-500 bg-green-50 text-green-800 font-bold"; // Got it right
                  } else if (isStudentAnswer && !isCorrectAnswer) {
                    optionClass += "border-red-400 bg-red-50 text-red-800"; // Marked this, but it's wrong
                  } else if (isCorrectAnswer && !isStudentAnswer) {
                    optionClass += "border-green-500 bg-white text-green-700 font-bold border-dashed"; // Missed the correct answer
                  } else {
                    optionClass += "border-gray-200 text-gray-600 bg-white opacity-60"; // Irrelevant options
                  }

                  return (
                    <div key={optNum} className={optionClass}>
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