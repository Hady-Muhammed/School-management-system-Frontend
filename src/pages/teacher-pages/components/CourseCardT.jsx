import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../enviroment'
import defaultImage from "../../../assets/defaultcourseimage.webp"

const CourseCardS = ({ course: crs }) => {
  return (
  <Link to={crs._id} className="bg-white rounded-md shadow-md border hover:scale-[1.1] duration-300 cursor-pointer">
    <div className="space-y-2 p-5">
    <img className="w-full h-[200px] object-cover rounded-md" src={crs.image ? API_URL + `/assets/uploads/course/${crs.image}` : defaultImage} alt="" />
      <div className="flex justify-between w-full text-black/50">
            <span>COURSE</span>
            <span className="text-xs">{new Date(crs.Date).toUTCString()}</span>
      </div>
      <h3 className="font-bold text-xl">{crs.name}</h3>
      <p className="text-sm text-black/50">{crs.description.slice(0,200) + " ....."}</p>
    </div>
  </Link>
  )
}

export default CourseCardS