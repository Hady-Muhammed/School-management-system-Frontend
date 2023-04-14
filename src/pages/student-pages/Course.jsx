import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../enviroment";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Note from "./components/Note";
import user from "../../assets/user.webp"

const Course = () => {
  const { id } = useParams();
  // States
  const [course, setCourse] = useState({});
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [content, setContent] = useState("")
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
  const handleKeyUp = async (event) => {
    if (event.key === 'Enter') {
      addNote()
    }
  }
  const addNote = async () => {
    if(content) {
      try {
        const student = jwtDecode(localStorage.getItem('token'))
        const res = await axios.post(API_URL + "/notes/", {
          note: content,
          courseId: id,
          studentId: student.user_id,
        },{
          headers: {
            "x-token": localStorage.getItem('token')
          }
        })
        setContent("")
        toast.success("Note added successfully!")
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error("Enter a valid data!")
    }
  }
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
          {!alreadyEnrolled ? "Enroll Course" : "Already Enrolled"}
        </button>
      </div>
      {
        alreadyEnrolled &&
        <div className="flex p-5 items-center space-x-2 pl-10">
        <img className="object-cover block w-[35px] h-[35px] rounded-full" src={user} alt="profile"/>
        <input onKeyUp={handleKeyUp} value={content} onChange={(e) => setContent(e.target.value)} className="w-full outline-none block bg-gray-200 rounded-md p-2" placeholder="Write a note.." type="text"/>
        <button onClick={addNote} className="text-white bg-[#8d46ff] rounded-md h-full p-2 w-[10%]">
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
      }
      {/* Notes */}
      <h3 className="font-bold text-3xl my-10">All Notes</h3>
      {/* {course?.notes.map((note) => (
      ))} */}
      <Note />
    </main>
  );
};

export default Course;
