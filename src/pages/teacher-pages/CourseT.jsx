import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../enviroment";
import axios from "axios";
import user from '../../assets/user.webp'

const CourseT = () => {
  const { id } = useParams();
  // States
  const [course, setCourse] = useState({});
  const [enrolledStudents, setEnrolledStudents] = useState([])
  // Fucntions
  const getCourse = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + `/course/${id}`);
      setCourse(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [id]);
  const getEnrolledStudents = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + `/attendence/course/${id}`, {
        headers: { "x-token": localStorage.getItem("token") },
      });
      setEnrolledStudents(res.data)
    } catch (error) {
      console.log(error)
    }
  },[id]);
  useEffect(() => {
    getCourse();
    getEnrolledStudents()
  }, [getCourse,getEnrolledStudents]);
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
      {/* Notes */}
      {/* <h3 className="font-bold text-3xl my-10">All Notes</h3> */}
      {/* {course?.notes.map((note) => (
      ))} */}
      {/* <Note /> */}
      <h3 className="font-bold text-3xl my-10">Enrolled Students</h3>
      <div className="space-y-4">
        {
          enrolledStudents.map(std => (
            <div className="flex items-center justify-between bg-white rounded-md border p-5">
              <div className="flex space-x-4 items-center">
                <img className="rounded-full border border-black w-[30px] h-[30px]" src={user} alt="adas" />
                <h4 className="font-semibold">{std.studentId.firstName}</h4>
              </div>
              <span className={`${std.status ? "bg-green-500":"bg-red-500"} font-bold px-4 py-2 text-white`}>{std.status ? "Attending":"NOT Attending"}</span>
            </div>
          ))
        }
      </div>
    </main>
  );
};

export default CourseT;
