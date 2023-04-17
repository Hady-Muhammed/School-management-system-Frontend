import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateExamForm .css";
import { Button, Container, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const CreateExamForm = () => {
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
          `http://localhost:5000/exam/mangeExam/6431d6463ce404a87b6e2e10`
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
  }, ["6431d6463ce404a87b6e2e10"]);

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
  const handleGradeChange = (event, index) => {
    const { value } = event.target;
    console.log(value);
    const updatedQuestions = [...questions];
    updatedQuestions[index].grade = value;
    setQuestions(updatedQuestions);
  };
  const handleAddQuestion = () => {
    if (examType === "mcq") {
      setQuestions([
        ...questions,
        { question: "", answers: ["", "", "", ""], correctAnswer: "",grade:1 },
      ]);
    } else if (examType === "true_false") {
      setQuestions([
        ...questions,
        { question: "", answers: ["True", "False"], correctAnswer: "",grade:1 },
      ]);
    } else {
      setQuestions([
        ...questions,
        { question: "", answers: [], correctAnswer: "",grade:1 },
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
      courseId: "6431d6463ce404a87b6e2e10",
      type: examType,
      questions: questions.map((question) => {
        return {
          question: question.question,
          answers: question.answers,
          correctAnswer: question.correctAnswer,
          grade:question.grade
        };
      }),
    };
    try {
      console.log(checkData);
      if (checkData == true) {
        // Send exam data to backend API for exam update
        const response = await axios.put(
          "http://localhost:5000/exam/6431d6463ce404a87b6e2e10",
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
      <Container className="container my-5 ">
        <h1
          className="mb-4 text-center"
          style={{ fontSize: "2rem", fontStyle: "italic" }}
        >
          <b>Create Exam</b>
        </h1>
        <form onSubmit={handleExamCreationSubmit}>
          {/* Render exam type field */}
          <FormControl>
            <InputLabel id="exam-type-label" className="mb-3">
              Please Choose Exam Type:{" "}
            </InputLabel>
            <Select
              required
              labelId="exam-type-label"
              value={examType||''}
              onChange={handleExamTypeChange}
            >
              <MenuItem value="mcq">MCQ</MenuItem>
              <MenuItem value="true_false">True/False</MenuItem>
              <MenuItem value="classic">Classic</MenuItem>
            </Select>
          </FormControl>
          {/* Render question fields */}
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h3 style={{ marginTop: "1rem" }}>Question {index + 1}</h3>
              <InputLabel  style={{ marginRight: "1rem", marginTop: "1rem" }} htmlFor="">Grade</InputLabel>
               <Input type="number " 
              id={index} name={index} value={question.grade} 
              placeholder="enter grade question" 
               onChange={(event) => handleGradeChange(event, index)}/>

              <div style={{ display: "flex", alignItems: "center",marginTop: "1rem" }}>
                <InputLabel style={{ marginRight: "1rem", marginTop: "1rem" }}>
                  Question:
                </InputLabel>
                <Input
                  placeholder="Your question"
                  type="text"
                  required
                  name="question"
                  value={question.question||''}
                  className="form-control w-75"
                  onChange={(event) => handleQuestionChange(event, index)}
                />
              </div>
              <br />
              {examType === "mcq" && (
                <div style={{ marginLeft: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <InputLabel>Option 1:</InputLabel>
                    <Input
                      required
                      placeholder="Your option"
                      type="text"
                      name="option1"
                      className="form-control w-50"
                      value={question.answers[0]||''}
                      onChange={(event) => handleOptionChange(event, index, 0)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <InputLabel>Option 2:</InputLabel>
                    <Input
                      required
                      placeholder="Your option"
                      type="text"
                      name="option2"
                      value={question.answers[1]||''}
                      className="form-control w-50"
                      onChange={(event) => handleOptionChange(event, index, 1)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <InputLabel>Option 3:</InputLabel>
                    <Input
                      required
                      placeholder="Your option"
                      type="text"
                      name="option3"
                      value={question.answers[2]||''}
                      className="form-control w-50"
                      onChange={(event) => handleOptionChange(event, index, 2)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <InputLabel>Option 4:</InputLabel>
                    <Input
                      required
                      placeholder="Your option"
                      type="text"
                      name="option4"
                      value={question.answers[3]||''}
                      className="form-control w-50"
                      onChange={(event) => handleOptionChange(event, index, 3)}
                    />
                  </div>
                </div>
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
              <FormControl>
                <InputLabel id="correct_answer_label" className="mb-3">
                  Select Correct Answer
                </InputLabel>
                <Select
  labelId="correct_answer_label"
  value={question.correctAnswer||''}
  onChange={(event) => handleCorrectAnswerChange(event, index)}
  className="form-control w-25 mt-2"
>
  {examType === "mcq" && [
    <MenuItem key="option1" value="option1">Option 1</MenuItem>,
    <MenuItem key="option2" value="option2">Option 2</MenuItem>,
    <MenuItem key="option3" value="option3">Option 3</MenuItem>,
    <MenuItem key="option4" value="option4">Option 4</MenuItem>
  ]}
  {examType === "true_false" && [
    <MenuItem key="option1" value="true">True</MenuItem>,
    <MenuItem key="option2" value="false">False</MenuItem>
  ]}
</Select>
              </FormControl>

              <Button
                type="button"
                className="remove_button"
                style={{ marginLeft: "2rem", marginTop: "1rem" }}
                variant="outlined"
                color="error"
                onClick={() => handleRemoveQuestion(index)}
              >
                Remove Question
              </Button>
            </div>
          ))}
          <div className="d-flex justify-content-between">
            <Button
              type="button"
              variant="contained"
              color="secondary"
              style={{ marginTop: "1rem" }}
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ marginLeft: "2rem", marginTop: "1rem" }}
            >
              Create Exam
            </Button>
          </div>
          {formError && <p>{formError}</p>}
        </form>
      </Container>
    </div>
  );
};

export default CreateExamForm;
