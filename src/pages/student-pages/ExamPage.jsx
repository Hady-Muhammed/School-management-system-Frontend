// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Import useParams hook from react-router-dom

// const ExamPage = () => {
  
//   const { examId } = useParams(); // Use useParams hook to get examId from URL parameter
//   const [questions, setQuestions] = useState([]);
//   const [examType, setExamType] = useState("");
//   useEffect(() => {
//     if (examId) {
//         const fetchExistingExamData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/exam/${examId}`
//         ); // Replace with your own API endpoint to fetch exam data

//         if (response.ok) {
//           const data = await response.json();
//           if (data) {
//             // If exam data is found, set it in the state
//             setExamType(data.type);
//             setQuestions(data.questions);
//           }
//         } else {
//           throw new Error("Failed to fetch exam data");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchExistingExamData();
//     } 
//   }, [examId]); // Update dependency to examId from useParams hoo
//   return (
//     <div>
// <h1>Exam Page</h1>
// <div>
//   {(questions).map((question, index) => (
//     <div key={question._id}>
//       <h3>Question {index + 1}</h3>
//       <p>{question.question}</p>
//       {examType == "mcq" ? (
//         <div>
//           {question.answers.map((ans,index) => (
//             <div key={ans}>
//               <input
//                 type="radio"
//                 id={`${question._id}_${ans}`} // Use question._id or questionIndex as prefix
//               name={`question_${question._id}`} // Use question._id or questionIndex as prefix
           
//                 value={ans}
//                 // Add logic to handle selected ans
//               />
//               <label htmlFor={`${question._id}_${ans}`}>{ans}</label>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>
//           <textarea
//             // Add logic to handle textarea input
//           ></textarea>
//         </div>
//       )}
//     </div>
//   ))}
// </div>
// <button
//   // Add logic to handle submit button click
// >
//   Submit Exam
// </button>
// </div>
// );
// };

// export default ExamPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook from react-router-dom

const ExamPage = () => {
  const { examId } = useParams(); // Use useParams hook to get examId from URL parameter
  const [questions, setQuestions] = useState([]);
  const [examType, setExamType] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    if (examId) {
      const fetchExistingExamData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/exam/${examId}`
          ); // Replace with your own API endpoint to fetch exam data

          if (response.ok) {
            const data = await response.json();
            if (data) {
              // If exam data is found, set it in the state
              setExamType(data.type);
              setQuestions(data.questions);
            }
          } else {
            throw new Error("Failed to fetch exam data");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchExistingExamData();
    }
  }, [examId]); // Update dependency to examId from useParams hook

  // Handler for radio button change event
  const handleRadioButtonChange = (questionId, answer) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answer
    }));
  };

  // Handler for textarea change event
  const handleTextAreaChange = (questionId, answer) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answer
    }));
  };

  // Handler for submit button click event
  const handleSubmitButtonClick = async () => {
    try {
      if (examType === "mcq") {
        // Calculate result for MCQ exams
        let score = 0;
        for (const question of questions) {
          if (question.correctAnswer === selectedAnswers[question._id]) {
            score++;
          }
        }
        // Update backend with exam result
        const response = await fetch(
          `http://localhost:5000/exam/${examId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ score })
          }
        ); // Replace with your own API endpoint to update exam result

        if (response.ok) {
          // Exam result updated successfully
          console.log("Exam result updated successfully");
        } else {
          throw new Error("Failed to update exam result");
        }
      } else {
        // Update backend with classic exam answers
        const response = await fetch(
          `http://localhost:5000/exam/${examId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ answers: selectedAnswers })
          }
        ); // Replace with your own API endpoint to update exam answers

        if (response.ok) {
          // Exam answers updated successfully
          console.log("Exam answers updated successfully");
        } else {
          throw new Error("Failed to update exam answers");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Exam Page</h1>
      <div>
      {questions.map((question,index) => (
          <div key={question._id}>
            <h3>Question {index + 1}</h3>
       <p>{question.question}</p>
            {examType === "mcq" ||examType=="true_false" ? (
              <div>
                {question.answers.map((option,index) => (
                  <div key={option}>
                    <input
                      type="radio"
                      id={option}
                      name={question._id}
                      value={option}
                      checked={selectedAnswers[question._id] === option}
                      onChange={() =>
                        handleRadioButtonChange(question._id, `option${index+1}`)
                      }
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </div>
            ) : (
              <textarea
                id={question._id}
                value={selectedAnswers[question._id] || ""}
                onChange={(e) =>
                  handleTextAreaChange(question._id, e.target.value)
                }
              />
            )}
          </div>
        ))}
        <button onClick={handleSubmitButtonClick}>Submit</button>
      </div>
    </div>
  );
};

export default ExamPage;
