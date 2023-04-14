import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../enviroment";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import CourseCardT from './components/CourseCardT'

const MyCoursesT = () => {
  const [courses, setCourses] = useState([]);
  // Functions
  const getMyCourses = async () => {
    try {
      const { user_id } = jwtDecode(localStorage.getItem("token"));
      const res = await axios.get(API_URL + `/course/teacher/${user_id}`);
      console.log(res)
      setCourses(res.data);
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getMyCourses();
  }, []);
  return (
    <div className="pt-32 relative xs:px-5 sm:px-20">
      <div className="flex items-center justify-between">
        <h1 className="font-bold xs:text-md sm:text-2xl">My Courses</h1>
      </div>
      <div className="xs:grid xl:grid-cols-2 pt-10 xs:gap-10 relative z-40">
        {courses.map((course) => (
          <CourseCardT course={course} key={course._id} />
        ))}
      </div>
      {!courses.length && (
        <p className="text-3xl font-bold h-[50vh] grid place-items-center">
          No Courses Found!
        </p>
      )}
    </div>
  );
};

export default MyCoursesT;
