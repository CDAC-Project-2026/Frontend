import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const TakeTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [testMeta, setTestMeta] = useState({ testName: '', courseName: '' });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Stores { [questionId]: 1|2|3|4 } — using the real 1-4 integer your
  // backend expects (AnswerDTO.selectedOption), not letters.
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ---- Load the test from the real backend ----
  useEffect(() => {
    api
      .get(`/student/test/${testId}`)
      .then((response) => {
        const data = response.data.data; // TestAttemptDTO

        setTestMeta({ testName: data.testName, courseName: data.courseName });
        setQuestions(data.questions);
        setTimeLeft(data.timeAlloted * 60); // timeAlloted is in minutes
      })
      .catch((err) => {
        setError(err.response?.data?.status ?? 'Could not load this test.');
      })
      .finally(() => setLoading(false));
  }, [testId]);

  // ---- Timer ----
  useEffect(() => {
    if (timeLeft === null) return; // test hasn't loaded yet

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const OPTION_TO_INT = { a: 1, b: 2, c: 3, d: 4 };

  const handleOptionSelect = (optionKey) => {
    const currentQId = questions[currentQuestionIndex].questionId;
    setAnswers({
      ...answers,
      [currentQId]: OPTION_TO_INT[optionKey],
    });
  };

  const handleSubmit = async () => {
    if (submitting) return; // guard against double-submit (e.g. timer hits 0 right as student clicks)
    setSubmitting(true);

    // Build the exact SubmitTestDTO shape: { testId, answers: [{questionId, selectedOption}] }
    // Every question is included — unanswered ones send selectedOption: null,
    // which your backend already handles as "skipped" (no marks, no crash).
    const body = {
      testId: Number(testId),
      answers: questions.map((q) => ({
        questionId: q.questionId,
        selectedOption: answers[q.questionId] ?? null,
      })),
    };

    try {
      await api.post('/student/submit', body);
      alert('Test submitted successfully!');
      navigate('/student/results');
    } catch (err) {
      setError(err.response?.data?.status ?? 'Could not submit test.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading test...</div>;
  }

  if (error && questions.length === 0) {
    // Only block the whole page on error if we never even got the test loaded.
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  const currentQ = questions[currentQuestionIndex];
  const options = [
    { key: 'a', text: currentQ.optionA },
    { key: 'b', text: currentQ.optionB },
    { key: 'c', text: currentQ.optionC },
    { key: 'd', text: currentQ.optionD },
  ];
  const INT_TO_OPTION_KEY = { 1: 'a', 2: 'b', 3: 'c', 4: 'd' };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">

      {/* Left Area: Main Question Content */}
      <div className="flex-1 p-6 md:p-10 md:pr-0 h-screen overflow-y-auto">

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md p-3 mb-4">
            {error}
          </div>
        )}

        <div className="mb-8">
          <p className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wider mb-1">{testMeta.courseName}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{testMeta.testName}</h1>
          <h2 className="text-3xl font-serif font-bold text-gray-800">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <p className="text-lg text-gray-800 mb-8 leading-relaxed">
            {currentQuestionIndex + 1}. {currentQ.queDescription}
          </p>

          <div className="space-y-4">
            {options.map((opt) => {
              const isSelected = INT_TO_OPTION_KEY[answers[currentQ.questionId]] === opt.key;
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
            disabled={currentQuestionIndex === questions.length - 1}
            className={`px-8 py-2.5 rounded-md font-semibold transition-colors shadow-sm ${
              currentQuestionIndex === questions.length - 1
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

        <div className="p-6 border-b border-gray-200 text-center bg-gray-50">
          <p className="text-sm font-semibold text-gray-600 mb-1">Time Remaining</p>
          <div className={`text-4xl font-bold font-mono tracking-wider ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="p-6 flex-grow">
          <h3 className="text-base font-bold text-gray-800 mb-4">Question Palette</h3>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, index) => {
              const isAnswered = answers[q.questionId] !== undefined;
              const isCurrent = index === currentQuestionIndex;

              let btnClass = "h-10 w-full rounded font-semibold text-sm transition-colors border flex items-center justify-center ";

              if (isCurrent) {
                btnClass += "border-2 border-[#1e3a5f] text-[#1e3a5f]";
              } else if (isAnswered) {
                btnClass += "bg-green-100 border-green-200 text-green-800";
              } else {
                btnClass += "bg-white border-gray-200 text-gray-600 hover:bg-gray-50";
              }

              return (
                <button
                  key={q.questionId}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={btnClass}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border border-gray-200 rounded"></div> Unanswered</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-[#1e3a5f] rounded"></div> Current</div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Test'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TakeTest;
