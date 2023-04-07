import React from 'react'

const Course = ({crs}) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <img src={crs.image} alt="imagee" className="w-full h-[300px] object-cover"/>
      <div className="space-y-2 p-5">
        <div className="text-sm text-black/50 flex justify-between"><span>COURSE</span><span>{crs.postedAt}</span></div>
        <h3 className="font-bold text-lg">{crs.course_title}</h3>
        <p className="text-sm text-black/50">{crs.category}</p>
        <div className="flex justify-between">
          <button href={crs._id} className="text-white bg-[#8d46ff] w-[45%] duration-500 relative before:absolute before:left-0 before:top-0 before:duration-500 before:w-[0%] before:h-full before:bg-black hover:before:w-full overflow-hidden rounded-md py-2 px-6"><span className="relative z-10">Modify</span></button>
          <button onClick="deleteCourse(crs._id)" className="text-white bg-[#8d46ff] w-[45%] duration-500 relative before:absolute before:left-0 before:top-0 before:duration-500 before:w-[0%] before:h-full before:bg-black hover:before:w-full overflow-hidden rounded-md py-2 px-6"><span className="relative z-10">Delete</span></button>
        </div>
      </div>
    </div>
  )
}

export default Course