import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TestEditor() {
  const [test, setTest] = useState({
    title: "",
    duration: "",
    maxMarks: "",
    passingMarks: "",
    attempts: "",
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

  const { testId } = useParams();

    const isEdit = !!testId;

  const handleChange = (e) => {
    setTest({
      ...test,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              [field]: value,
            }
          : q
      )
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

  const handleSave = () => {
    console.log(test);
    console.log(questions);

    alert("Test Saved Successfully (Mock)");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">
            {isEdit ? "Edit Test" : "Create Test"}
        </h1>

      {/* Test Details */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Test Details
        </h2>

        <div className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Test Title
            </label>

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
              <label className="block mb-2 font-medium">
                Duration (Minutes)
              </label>

              <input
                type="number"
                name="duration"
                value={test.duration}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Maximum Marks
              </label>

              <input
                type="number"
                name="maxMarks"
                value={test.maxMarks}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Passing Marks
              </label>

              <input
                type="number"
                name="passingMarks"
                value={test.passingMarks}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Attempts Allowed
              </label>

              <input
                type="number"
                name="attempts"
                value={test.attempts}
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

          <h2 className="text-2xl font-bold">
            Questions
          </h2>

          <button
            onClick={addQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Question
          </button>

        </div>

        <div className="space-y-6">

          {questions.map((q, index) => (

            <div
              key={q.id}
              className="border rounded-lg p-5 bg-gray-50"
            >

              <div className="flex justify-between items-center mb-4">

                <h3 className="font-bold text-lg">
                  Question {index + 1}
                </h3>

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
                onChange={(e) =>
                  handleQuestionChange(
                    q.id,
                    "question",
                    e.target.value
                  )
                }
                className="w-full border rounded-md p-3 mb-4"
              />

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  placeholder="Option A"
                  value={q.optionA}
                  onChange={(e) =>
                    handleQuestionChange(
                      q.id,
                      "optionA",
                      e.target.value
                    )
                  }
                  className="border rounded-md p-3"
                />

                <input
                  placeholder="Option B"
                  value={q.optionB}
                  onChange={(e) =>
                    handleQuestionChange(
                      q.id,
                      "optionB",
                      e.target.value
                    )
                  }
                  className="border rounded-md p-3"
                />

                <input
                  placeholder="Option C"
                  value={q.optionC}
                  onChange={(e) =>
                    handleQuestionChange(
                      q.id,
                      "optionC",
                      e.target.value
                    )
                  }
                  className="border rounded-md p-3"
                />

                <input
                  placeholder="Option D"
                  value={q.optionD}
                  onChange={(e) =>
                    handleQuestionChange(
                      q.id,
                      "optionD",
                      e.target.value
                    )
                  }
                  className="border rounded-md p-3"
                />

              </div>

              <div className="mt-5">

                <label className="block mb-2 font-medium">
                  Correct Answer
                </label>

                <select
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(
                      q.id,
                      "correctAnswer",
                      e.target.value
                    )
                  }
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

      <div className="flex justify-end">

        <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700"
            >
            {isEdit ? "Update Test" : "Save Test"}
        </button>

      </div>

    </div>
  );
}