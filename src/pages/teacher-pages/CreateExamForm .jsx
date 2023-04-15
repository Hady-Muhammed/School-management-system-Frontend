import React, { useState, useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import "./CreateExamForm .css";
const CreateExamForm  = () => {
  const [examType, setExamType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [formError, setFormError] = useState("");
  const [existingExamData, setExistingExamData] = useState(null); // Added state to store existing exam data
  const [checkData, setcheckData] = useState(false);
  useEffect(() => {
    // Check if an exam already exists for the selected course
    // You can replace this with your own logic to fetch exam data from the backend
    const fetchExistingExamData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/exam/6434a742dd1243a90af081c2`
        ); // Replace with your own API endpoint to fetch exam data

        if (response.ok) {
          const data = await response.json();
          if (data) {
            // If exam data is found, set it in the state
            setExamType(data.type);
            setQuestions(data.questions);
            setExistingExamData(data);
            setcheckData(true);
          }
        } else {
          throw new Error("Failed to fetch exam data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchExistingExamData();
  }, ["6434a742dd1243a90af081c2"]);

  const handleExamTypeChange = (event) => {
    setExamType(event.target.value);
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (event, index, optionIndex) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (event, index) => {
    const { value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (examType === "mcq") {
      setQuestions([
        ...questions,
        { question: "", answers: ["", "", "", ""], correctAnswer: "" },
      ]);
    } else if (examType === "true_false") {
      setQuestions([
        ...questions,
        { question: "", answers: ["True", "False"], correctAnswer: "" },
      ]);
    } else {
      setQuestions([
        ...questions,
        { question: "", answers: [], correctAnswer: "" },
      ]);
    }
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleExamCreationSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!examType || questions.length === 0) {
      setFormError("Please fill in all fields.");
      return;
    }

    // Prepare exam data for API request
    const examData = {
      name: "courceName",
      courseId: "6434a742dd1243a90af081c2",
      type: examType,
      questions: questions.map((question) => {
        return {
          question: question.question,
          answers: question.answers,
          correctAnswer: question.correctAnswer,
        };
      }),
    };
    try {
      console.log(checkData);
      if (checkData == true) {
        // Send exam data to backend API for exam update
        const response = await axios.put(
          "http://localhost:5000/exam/6434a742dd1243a90af081c2",
          examData
        );
        console.log("Exam updated successfully:", response.data);
      } else {
        // Send exam data to backend API for exam creation
        const response = await axios.post(
          "http://localhost:5000/exam",
          examData
        );
        console.log("Exam created successfully:", response.data);
      }

      // Reset form fields and state
      setExamType("");
      setQuestions([]);
      setFormError("");
    } catch (error) {
      console.error("Failed to create exam:", error.response.data);
      setFormError("Failed to create exam. Please try again.");
    }
  };

  return (
    <div className="pageContainer">
      <div className="container my-5 ">
        <h1 className="mb-4 text-center">Create Exam</h1>
        <form onSubmit={handleExamCreationSubmit}>
          {/* Render exam type field */}
          <div>
            <label className="mb-3">Please Choose Exam Type: </label>
            <select
              required
              value={examType}
              onChange={handleExamTypeChange}
              className="form-control w-25 mb-2"
            >
              <option value="">Select Exam Type</option>
              <option value="mcq">MCQ</option>
              <option value="true_false">True/False</option>
              <option value="classic">Classic</option>
            </select>
          </div>
          {/* Render question fields */}
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h3>Question {index + 1}</h3>
              <label>Question:</label>
              <input
                type="text"
                required
                name="question"
                value={question.question}
                className="form-control w-75"
                onChange={(event) => handleQuestionChange(event, index)}
              />
              <br />
              {examType === "mcq" && (
                <>
                  <label>Option 1:</label>
                  <input
                  required
                    type="text"
                    name="option1"
                    className="form-control w-50"
                    value={question.answers[0]}
                    onChange={(event) => handleOptionChange(event, index, 0)}
                  />
                  <label>Option 2:</label>
                  <input
                  required
                    type="text"
                    name="option2"
                    value={question.answers[1]}
                    className="form-control w-50"
                    onChange={(event) => handleOptionChange(event, index, 1)}
                  />
                  <label>Option 3:</label>
                  <input
                  required
                    type="text"
                    name="option3"
                    value={question.answers[2]}
                    className="form-control w-50"
                    onChange={(event) => handleOptionChange(event, index, 2)}
                  />
                  <label>Option 4:</label>
                  <input
                  required
                    type="text"
                    name="option4"
                    value={question.answers[3]}
                    className="form-control w-50"
                    onChange={(event) => handleOptionChange(event, index, 3)}
                  />
                </>
              )}
              {examType === "true_false" && (
                <>
                  <label className="me-2">Option 1:</label>
                  <input
                    type="text"
                    name="option1"
                    value="True"
                    disabled
                    className="me-2"
                  />
                  <label className="me-2">Option 2:</label>
                  <input type="text" name="option2" value="False" disabled />
                </>
              )}
              <br />
              <label className="mt-2">Correct Answer:</label>
              <select
                value={question.correctAnswer}
                onChange={(event) => handleCorrectAnswerChange(event, index)}
                className="form-control w-25 mt-2"
              >
                {examType === "mcq" ? (
                  <option value="">Select Correct Answer</option>
                ) : (
                  <option value="">Select Answer</option>
                )}
                {examType === "mcq" && (
                  <>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </>
                )}
                {examType === "true_false" && (
                  <>
                    <option value="option1">True</option>
                    <option value="option2">False</option>
                  </>
                )}
              </select>
              <button
                type="button"
                className="btn btn-danger mt-2 ms-auto"
                onClick={() => handleRemoveQuestion(index)}
              >
                Remove Question
              </button>
            </div>
          ))}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="mx-5 btn btn-primary"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>

            <button type="submit" className="btn btn-success">
              Create Exam
            </button>
          </div>
          {formError && <p>{formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateExamForm ;
