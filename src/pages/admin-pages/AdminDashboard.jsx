
import React, { useState, useEffect } from "react";
import { Button, Table } from "@mui/material";
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
  const handleEndTimeChange = (id, event) => { // New event handler for endTime field
    const { value } = event.target;
    setExams(prevExams =>
      prevExams.map(exam => {
        if (exam._id === id) {
          return { ...exam, endTime: value }; // Update endTime field
        }
        return exam;
      })
    );
  };
  const handleSave = exam => {
    // console.log(exam.date);
    // console.log(new Date(`${exam.date}T${exam.time}`))
    // console.log(new Date(`${exam.date}T${exam.endTime}`))
    // // Update exam data on backend
    axios.patch(`http://localhost:5000/exam/mangeExam/${exam._id}`, {
              name: exam.name,
              startDate:new Date(`${exam.date}T${exam.time}`),
              endDate:new Date(`${exam.date}T${exam.endTime}`)
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
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(exam => (
            <tr key={exam._id}>
              <td>{exam.name}</td>
              <td>
                <input
                  type="date"
                  value={exam.date}
                  onChange={event => handleDateChange(exam._id, event)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={exam.time}
                  onChange={event => handleTimeChange(exam._id, event)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={exam.endTime}
                  onChange={(event) => handleEndTimeChange(exam._id, event)}
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