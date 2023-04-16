import React from 'react'

const CourseProgram = ({prog,index}) => {
  return (
    <div>{index + 1 + " - " +prog.name}</div>
  )
}

export default CourseProgram