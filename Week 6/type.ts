type AttendanceStatus = "Present" | "Absent";
type name ={
    name: String
    attendance: AttendanceStatus
}
 const StudentAttendanceChecker =[
    {name: "James", attendance: "Present"},
    {name: "Nate", attendance: "Absent"},
     {name: "Kelvin", attendance: "Present"},
     {name: "John", attendance: "Absent"},
     {name: "Peter", attendance: "Absent"}  
 ]
 const AbsentStudentList: string[]=[]
 const PresentStudentList: string[]=[]
 
for(let i=0; i< StudentAttendanceChecker.length; i++){
    const student = StudentAttendanceChecker[i];
if (student.attendance ==="Absent"){
    AbsentStudentList.push(student.name)
}
else {
    PresentStudentList.push(student.name)
}
}
console.log(`Present(${PresentStudentList.length}):${PresentStudentList.join(", ")}`)
console.log(`Absent(${AbsentStudentList.length}):${AbsentStudentList.join(", ")}`)