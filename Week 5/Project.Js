// 4. Class Attendance CheckerBuild a program that records whether each student is present or absent. At the end, show the number of students present and absent, and list the names of any students who are absent.

// Your program should use: an array of student objects, a loop to check each student’s attendance, and conditionals to count and list students.




let StudentsListInclude = [
    { name: "James", attendance: "Absent" },
    { name: "John", attendance: "Present" },
    { name: "Caleb", attendance: "Present" },
    { name: "Divine", attendance: "Present" },
    { name: "Nate", attendance: "Present" }
];

let NumberofStudentAbsent = [];
let NumberofStudentPresent = [];

for (let i = 0; i < StudentsListInclude.length; i++) {
    const student = StudentsListInclude[i];
    if (student.attendance === "Absent") {
        NumberofStudentAbsent.push(student.name);
    } else {
        NumberofStudentPresent.push(student.name);
    }
}
console.log("present(" + NumberofStudentPresent.length + "): " + NumberofStudentPresent.join(",  "));

console.log("absent(" + NumberofStudentAbsent.length + "): " + NumberofStudentAbsent.join(",  "));

