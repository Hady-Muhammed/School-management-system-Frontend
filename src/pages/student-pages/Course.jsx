import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../enviroment";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Course = () => {
  const { id } = useParams();
  // States
  const [course, setCourse] = useState({});
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  // Fucntions
  const getCourse = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + `/course/${id}`);
      console.log(res);
      setCourse(res.data);
      const { user_id } = jwtDecode(localStorage.getItem("token"));
      setAlreadyEnrolled(res.data.studentId.some((std) => std._id === user_id));
    } catch (error) {
      toast.error(error.message);
    }
  }, [id]);
  const enrollCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const { user_id } = jwtDecode(token);
      const res = await axios.patch(
        API_URL + `/student/enroll/${id}/${user_id}`,
        {},
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      getCourse();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCourse();
  }, [getCourse]);
  return (
    <main className="pt-32 relative xs:px-5 sm:px-20">
      <button
        onClick={() => window.history.back()}
        className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 relative z-40"
      >
        Return
      </button>
      <div>
        <h1 className="text-center font-bold text-3xl">{course.name}</h1>
        <p className="mt-10">{course.description}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={enrollCourse}
          className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 px-10 mt-10 relative z-40 disabled:opacity-50"
          disabled={alreadyEnrolled}
        >
          {!alreadyEnrolled ? "Enroll Course": "Already Enrolled"}
        </button>
      </div>
    </main>
  );
};

export default Course;
