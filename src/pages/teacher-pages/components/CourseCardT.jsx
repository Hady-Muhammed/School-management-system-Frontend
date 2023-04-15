import React from 'react'
import { Link } from 'react-router-dom'

const CourseCardS = ({ course: crs }) => {
  return (
  <Link to={crs._id} className="bg-white rounded-md shadow-md border hover:scale-[1.1] duration-300 cursor-pointer">
    <div className="space-y-2 p-5">
      <div className="text-sm text-black/50 flex justify-between">
        <span>COURSE</span>
        <span>{crs.postedAt}</span>
      </div>
      <h3 className="font-bold text-xl">{crs.name}</h3>
      <p className="text-sm text-black/50">{crs.description.slice(0,200) + " ....."}</p>
    </div>
  </Link>
  )
}

export default CourseCardS