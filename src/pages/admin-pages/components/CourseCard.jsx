import axios from "axios";
import { API_URL } from "../../../enviroment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CourseCard = ({ course: crs , courseDeleted }) => {
  const deleteCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(API_URL + `/course/${crs._id}`, {
        headers: {
          "x-token": token,
        },
      });
      toast.success("Course deleted successfully!")
      courseDeleted(true)
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <div className="space-y-2 p-5">
        <div className="text-sm text-black/50 flex justify-between">
          <span>COURSE</span>
          <span>{crs.postedAt}</span>
        </div>
        <h3 className="font-bold text-xl">{crs.name}</h3>
        <p className="text-sm text-black/50">{crs.description}</p>
        <div className="flex justify-between">
          <Link
            to={crs._id}
            className="text-white bg-[#8d46ff] w-[45%] duration-500 relative before:absolute before:left-0 before:top-0 before:duration-500 before:w-[0%] before:h-full before:bg-black hover:before:w-full overflow-hidden rounded-md py-2 px-6 text-center"
          >
            <span className="relative z-10">Modify</span>
          </Link>
          <button
            onClick={deleteCourse}
            className="text-white bg-[#8d46ff] w-[45%] duration-500 relative before:absolute before:left-0 before:top-0 before:duration-500 before:w-[0%] before:h-full before:bg-black hover:before:w-full overflow-hidden rounded-md py-2 px-6"
          >
            <span className="relative z-10">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
