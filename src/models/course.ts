export interface Attendance {
  name: string,
  description: string,
  Date: string,
  courseProgram: [],
  notes: note[],
}

type note = {
  studentId: string,
  note: string 
}