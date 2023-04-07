import { useState , useEffect } from "react";
import Course from "./components/Course";
import axios from "axios";
import { API_URL } from "../../enviroment";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  // Functions
  const getCourses = async () => {
    const res = await axios.get(API_URL + "/courses/")
  }
  useEffect(() => {
    getCourses()
  }, []);
  return (
    <div className="p-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="font-bold xs:text-md sm:text-2xl">Published Courses</h1>
        <button
          href="/a/courses/new-course"
          className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 relative z-40"
        >
          Post a new course
        </button>
      </div>
      <div className="xs:grid xl:grid-cols-2 pt-10 xs:gap-10 relative z-40">
        {courses.map((course) => (
          <Course key={course.id}/>
        ))}
      </div>
      {!courses && (
        <p className="text-3xl font-bold h-[50vh] grid place-items-center">
          No Courses Found!
        </p>
      )}
    </div>
  );
};

export default Courses;
