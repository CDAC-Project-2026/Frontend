import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TestEditor() {
  const [test, setTest] = useState({
    title: "",
    duration: "",
    maxMarks: "",
    scheduleTime: "",
    dueDateTime: "",
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Route is "courses/:courseId/tests/:testId" (edit) or ".../tests/new" (create)
  const { courseId, testId } = useParams();
  const navigate = useNavigate();

  const isEdit = !!testId;

  // Maps the form's "A"/"B"/"C"/"D" dropdown to the integer your Questions
  // entity expects for correctAnswer (1-4).
  const OPTION_TO_INT = { A: 1, B: 2, C: 3, D: 4 };
  const INT_TO_OPTION = { 1: "A", 2: "B", 3: "C", 4: "D" };

  // <input type="datetime-local"> needs "YYYY-MM-DDTHH:mm" — this converts
  // the ISO string your backend sends (e.g. "2026-08-10T23:59:00") into that format.
  const toDatetimeLocalValue = (isoString) => {
    if (!isoString) return "";
    // Slicing to 16 chars strips seconds/timezone, leaving exactly what the input needs.
    return isoString.slice(0, 16);
  };

  // ---- Load existing test data when editing (uses the new GET endpoint) ----
  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    api
      .get(`/admin/test/${testId}`)
      .then((response) => {
        const data = response.data.data; // CreateTestDTO shape: { test: {...}, questions: [...] }

        setTest({
          title: data.test.testName ?? "",
          duration: data.test.timeAlloted ?? "",
          maxMarks: data.test.totalScore ?? "",
          scheduleTime: toDatetimeLocalValue(data.test.scheduleTime),
          dueDateTime: toDatetimeLocalValue(data.test.dueDateTime),
        });

        if (data.questions && data.questions.length > 0) {
          setQuestions(
            data.questions.map((q) => ({
              id: q.queId,
              question: q.queDescription,
              optionA: q.optionA,
              optionB: q.optionB,
              optionC: q.optionC,
              optionD: q.optionD,
              correctAnswer: INT_TO_OPTION[q.correctAnswer] ?? "A",
            }))
          );
        }
      })
      .catch((err) => {
        setError(err.response?.data?.status ?? "Failed to load test");
      })
      .finally(() => setLoading(false));
  }, [isEdit, testId]);

  const handleChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A",
      },
    ]);
  };

  const deleteQuestion = (id) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Builds the EXACT shape CreateTestDTO expects (verified from real backend):
  // { test: { testName, totalScore, scheduleTime, dueDateTime, timeAlloted },
  //   questions: [{ queDescription, optionA, optionB, optionC, optionD, correctAnswer, marks }] }
  const buildRequestBody = () => {
    const totalScore = Number(test.maxMarks) || 0;
    const marksPerQuestion = questions.length > 0 ? totalScore / questions.length : 0;

    return {
      test: {
        testName: test.title,
        totalScore: totalScore,
        timeAlloted: Number(test.duration) || 0,
        // datetime-local gives "YYYY-MM-DDTHH:mm" — append seconds so the
        // format matches what your backend's LocalDateTime parsing expects.
        scheduleTime: test.scheduleTime ? `${test.scheduleTime}:00` : null,
        dueDateTime: test.dueDateTime ? `${test.dueDateTime}:00` : null,
      },
      questions: questions.map((q) => ({
        queDescription: q.question,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctAnswer: OPTION_TO_INT[q.correctAnswer],
        marks: marksPerQuestion,
      })),
    };
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    // Guard against saving a test with zero questions — this is exactly
    // what caused the blank-page crash in TakeTest.jsx (empty questions array).
    if (questions.length === 0) {
      setError("A test must have at least one question.");
      setSaving(false);
      return;
    }

    if (!test.scheduleTime || !test.dueDateTime) {
      setError("Please set both a schedule time and a due date.");
      setSaving(false);
      return;
    }

    if (new Date(test.dueDateTime) <= new Date(test.scheduleTime)) {
      setError("Due date must be after the schedule time.");
      setSaving(false);
      return;
    }

    // Also make sure no question is left completely blank — catches the case
    // where a question was added but never actually filled in.
    const hasIncompleteQuestion = questions.some(
      (q) => !q.question.trim() || !q.optionA.trim() || !q.optionB.trim() || !q.optionC.trim() || !q.optionD.trim()
    );
    if (hasIncompleteQuestion) {
      setError("Every question must have its text and all four options filled in.");
      setSaving(false);
      return;
    }

    const body = buildRequestBody();

    try {
      if (isEdit) {
        await api.put(`/admin/test/${testId}/edit`, body);
      } else {
        await api.post(`/admin/course/${courseId}/test/new`, body);
      }

      alert(isEdit ? "Test updated successfully" : "Test created as draft successfully");
      navigate(`/admin/courses/${courseId}`);
    } catch (err) {
      setError(err.response?.data?.status ?? "Failed to save test");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    setError(null);

    try {
      await api.patch(`/admin/test/${testId}/publish`);
      alert("Test published successfully — students can now see it.");
      navigate(`/admin/courses/${courseId}`);
    } catch (err) {
      setError(err.response?.data?.status ?? "Failed to publish test");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6">Loading test...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEdit ? "Edit Test" : "Create Test"}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded-md p-4">
          {error}
        </div>
      )}

      {/* Test Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-5">Test Details</h2>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Test Title</label>
            <input
              type="text"
              name="title"
              value={test.title}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              placeholder="Java Fundamentals Test"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Duration (Minutes)</label>
              <input
                type="number"
                name="duration"
                value={test.duration}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Maximum Marks</label>
              <input
                type="number"
                name="maxMarks"
                value={test.maxMarks}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Schedule Time</label>
              <input
                type="datetime-local"
                name="scheduleTime"
                value={test.scheduleTime}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Due Date</label>
              <input
                type="datetime-local"
                name="dueDateTime"
                value={test.dueDateTime}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Questions</h2>
          <button
            onClick={addQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Question
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="border rounded-lg p-5 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Question {index + 1}</h3>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>

              <textarea
                placeholder="Enter Question"
                value={q.question}
                onChange={(e) => handleQuestionChange(q.id, "question", e.target.value)}
                className="w-full border rounded-md p-3 mb-4"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Option A"
                  value={q.optionA}
                  onChange={(e) => handleQuestionChange(q.id, "optionA", e.target.value)}
                  className="border rounded-md p-3"
                />
                <input
                  placeholder="Option B"
                  value={q.optionB}
                  onChange={(e) => handleQuestionChange(q.id, "optionB", e.target.value)}
                  className="border rounded-md p-3"
                />
                <input
                  placeholder="Option C"
                  value={q.optionC}
                  onChange={(e) => handleQuestionChange(q.id, "optionC", e.target.value)}
                  className="border rounded-md p-3"
                />
                <input
                  placeholder="Option D"
                  value={q.optionD}
                  onChange={(e) => handleQuestionChange(q.id, "optionD", e.target.value)}
                  className="border rounded-md p-3"
                />
              </div>

              <div className="mt-5">
                <label className="block mb-2 font-medium">Correct Answer</label>
                <select
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(q.id, "correctAnswer", e.target.value)}
                  className="border rounded-md p-3 w-48"
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {isEdit && (
          <button
            onClick={handlePublish}
            disabled={saving}
            className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {saving ? "Please wait..." : "Publish Test"}
          </button>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Test" : "Save Test"}
        </button>
      </div>
    </div>
  );
}
