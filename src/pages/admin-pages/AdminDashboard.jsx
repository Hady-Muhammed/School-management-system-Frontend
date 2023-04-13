
import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams data from backend
    fetch("http://localhost:5000/exam/mangeExam") // Update the URL with your backend API endpoint
      .then(response => response.json())
      .then(data => setExams(data))
      .catch(error => console.error("Error fetching exams:", error));
  }, []);

  const handleTimeChange = (id, event) => {
    const { value } = event.target;
    setExams(prevExams =>
      prevExams.map(exam => {
        if (exam._id === id) {
          return { ...exam, time: value };
        }
        return exam;
      })
    );
  };

  const handleDateChange = (id, event) => {
    const { value } = event.target;
    setExams(prevExams =>
      prevExams.map(exam => {
        if (exam._id === id) {
          return { ...exam, date: value };
        }
        return exam;
      })
    );
  };

  const handleSave = exam => {
    console.log(new Date(`${exam.date}T${exam.time}`))
    // Update exam data on backend
    axios.patch(`http://localhost:5000/exam/mangeExam/${exam._id}`, {
              name: exam.name,
              startDate: exam.date,
              endDate:new Date(`${exam.date}T${exam.time}`).toISOString()
            })
     
      .catch(error => console.error("Error updating exam:", error));
  };

  return (
    <div className="examList">
      <div className="container my-5 ">
  
      <h1 className="mb-4 text-center">Exam List</h1>
      <Table >
        <thead>
          <tr>
            <th>Exam</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(exam => (
            <tr key={exam._id}>
              <td>{exam.name}</td>
              <td>
                <Form.Control
                  type="date"
                  value={exam.date}
                  onChange={event => handleDateChange(exam._id, event)}
                />
              </td>
              <td>
                <Form.Control
                  type="time"
                  value={exam.time}
                  onChange={event => handleTimeChange(exam._id, event)}
                />
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleSave(exam)}
                >
                  Save
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
};
export default AdminDashboard;