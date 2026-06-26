import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TakeTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  // --- Simulated Database Data ---
  // In a real app, you would fetch these from your Questions table using testId
  const courseName = "C++ Programming Concepts";
  const testTitle = "Mid-Term Exam: Core Syntax";
  const totalTimeSeconds = 60 * 60; // 60 minutes
  
  const mockQuestions = [
    {
      que_id: 1,
      que_description: "Which of the following is the correct syntax to print 'Hello World' in C++?",
      option_a: "cout << 'Hello World';",
      option_b: "System.out.println('Hello World');",
      option_c: "print('Hello World');",
      option_d: "printf('Hello World');"
    },
    {
      que_id: 2,
      que_description: "Which operator is used to access the memory address of a variable?",
      option_a: "*",
      option_b: "&",
      option_c: "->",
      option_d: "::"
    },
    {
      que_id: 3,
      que_description: "What is the size of an 'int' data type in a standard 32-bit compiler?",
      option_a: "1 Byte",
      option_b: "2 Bytes",
      option_c: "4 Bytes",
      option_d: "8 Bytes"
    },
    {
      que_id: 4,
      que_description: "Which loop is guaranteed to execute at least once?",
      option_a: "for loop",
      option_b: "while loop",
      option_c: "do-while loop",
      option_d: "None of the above"
    },
    {
      que_id: 5,
      que_description: "What does OOP stand for?",
      option_a: "Object Oriented Programming",
      option_b: "Oriented Object Programming",
      option_c: "Office Objective Programming",
      option_d: "Object Operational Process"
    }
  ];

  // --- State Management ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores { que_id: 'a'/'b'/'c'/'d' }
  const [timeLeft, setTimeLeft] = useState(totalTimeSeconds);

  // --- Timer Logic ---
  useEffect(() => {
    // If time runs out, auto-submit
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    // Tick down every 1 second
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, [timeLeft]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // --- Handlers ---
  const handleOptionSelect = (optionKey) => {
    const currentQId = mockQuestions[currentQuestionIndex].que_id;
    setAnswers({
      ...answers,
      [currentQId]: optionKey
    });
  };

  const handleSubmit = () => {
    // In a real app, POST the 'answers' object to your StudentAnswers table
    console.log("Test Submitted!", answers);
    alert("Test Submitted successfully!");
    navigate('/student/dashboard'); 
  };

  // --- Current Question Setup ---
  const currentQ = mockQuestions[currentQuestionIndex];
  // Map DB columns to an array for easy UI rendering
  const options = [
    { key: 'a', text: currentQ.option_a },
    { key: 'b', text: currentQ.option_b },
    { key: 'c', text: currentQ.option_c },
    { key: 'd', text: currentQ.option_d },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* Left Area: Main Question Content */}
      <div className="flex-1 p-6 md:p-10 md:pr-0 h-screen overflow-y-auto">
        
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wider mb-1">{courseName}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{testTitle}</h1>
          <h2 className="text-3xl font-serif font-bold text-gray-800">
            Question {currentQuestionIndex + 1} of {mockQuestions.length}
          </h2>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <p className="text-lg text-gray-800 mb-8 leading-relaxed">
            {currentQ.que_id}. {currentQ.que_description}
          </p>

          <div className="space-y-4">
            {options.map((opt) => {
              const isSelected = answers[currentQ.que_id] === opt.key;
              return (
                <div 
                  key={opt.key}
                  onClick={() => handleOptionSelect(opt.key)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center ${
                    isSelected 
                      ? 'border-[#1e3a5f] bg-blue-50 text-[#1e3a5f]' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-[#1e3a5f]' : 'border-gray-400'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 bg-[#1e3a5f] rounded-full"></div>}
                  </div>
                  <span className={`text-base ${isSelected ? 'font-semibold' : 'text-gray-700'}`}>
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center max-w-3xl">
          <button 
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2.5 rounded-md font-semibold transition-colors border ${
              currentQuestionIndex === 0 
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          <button 
            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
            disabled={currentQuestionIndex === mockQuestions.length - 1}
            className={`px-8 py-2.5 rounded-md font-semibold transition-colors shadow-sm ${
              currentQuestionIndex === mockQuestions.length - 1
                ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                : 'bg-[#1e3a5f] text-white hover:bg-blue-800'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Sidebar: Timer & Palette */}
      <div className="w-full md:w-80 bg-white border-l border-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.05)] h-screen overflow-y-auto flex flex-col">
        
        {/* Timer Box */}
        <div className="p-6 border-b border-gray-200 text-center bg-gray-50">
          <p className="text-sm font-semibold text-gray-600 mb-1">Time Remaining</p>
          <div className={`text-4xl font-bold font-mono tracking-wider ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Palette */}
        <div className="p-6 flex-grow">
          <h3 className="text-base font-bold text-gray-800 mb-4">Question Palette</h3>
          
          <div className="grid grid-cols-5 gap-2">
            {mockQuestions.map((q, index) => {
              const isAnswered = answers[q.que_id] !== undefined;
              const isCurrent = index === currentQuestionIndex;
              
              let btnClass = "h-10 w-full rounded font-semibold text-sm transition-colors border flex items-center justify-center ";
              
              if (isCurrent) {
                btnClass += "border-2 border-[#1e3a5f] text-[#1e3a5f]"; // Highlight current
              } else if (isAnswered) {
                btnClass += "bg-green-100 border-green-200 text-green-800"; // Answered
              } else {
                btnClass += "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"; // Unanswered
              }

              return (
                <button
                  key={q.que_id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={btnClass}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          
          {/* Palette Legend */}
          <div className="mt-8 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border border-gray-200 rounded"></div> Unanswered</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-[#1e3a5f] rounded"></div> Current</div>
          </div>
        </div>

        {/* Submit Area */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button 
            onClick={handleSubmit}
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
          >
            Submit Test
          </button>
        </div>

      </div>
    </div>
  );
};

export default TakeTest;