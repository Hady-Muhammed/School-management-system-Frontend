import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook from react-router-dom

const ExamPage = () => {
  
  const { examId } = useParams(); // Use useParams hook to get examId from URL parameter
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (examId) {
    // Fetch questions data from backend based on exam ID
    fetch(`http://localhost:5000/exam/${examId}`) // Use the examId from useParams hook
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching questions:", error));
    } 
  }, [examId]); // Update dependency to examId from useParams hoo
  return (
    <div>
<h1>Exam Page</h1>
<div>
  {(questions).map((question, index) => (
    <div key={question._id}>
      <h3>Question {index + 1}</h3>
      <p>{question.question}</p>
      {question.type == "mcq" ? (
        <div>
          {question.options.map(option => (
            <div key={option}>
              <input
                type="radio"
                name={`question_${index + 1}`}
                value={option}
                // Add logic to handle selected option
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <textarea
            // Add logic to handle textarea input
          ></textarea>
        </div>
      )}
    </div>
  ))}
</div>
<button
  // Add logic to handle submit button click
>
  Submit Exam
</button>
</div>
);
};

export default ExamPage;