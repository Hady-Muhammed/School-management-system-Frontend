import React, { useState, useEffect } from "react";
import { Button, Table } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exams data from backend
    fetch("http://localhost:5000/student/6431f6eddfb6d31fad7844c4") // Update the URL with your backend API endpoint
      .then(response => response.json())
      .then(data => setExams(data))
      .catch(error => console.error("Error fetching exams:", error));
  }, []);

  const handleTakeExam = examId => {
    // Implement exam taking logic here
    console.log("Take exam with ID:", examId);
    navigate(`/exam/${examId}`); // Navigate to exam page with exam ID as URL parameter
  };

  const isExamActive = exam => {
    // Check if exam is active based on current time compared to exam start time
    const currentDate = new Date(); // Get current date and time
    const examStartDate = new Date(`${exam.date}T${exam.startTime}`); // Get exam start date and time
    const examEndDate = new Date(`${exam.date}T${exam.endTime}`); // Get exam end date and time
    return currentDate >= examStartDate && currentDate < examEndDate;
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Exam</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(exam => (
            <tr key={exam._id}>
              <td>{exam.name}</td>
              <td>{exam.date}</td>
              <td>{exam.startTime}</td>
              <td>{exam.endTime}</td>
              <td>
                {isExamActive(exam) ? (
                  <Button className=""
                    variant="primary"
                    onClick={() => handleTakeExam(exam._id)}
                  >
                    Join Exam
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    disabled
                  >
                    Exam Not Active
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentDashboard;