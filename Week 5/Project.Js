let StudentsListInclude = [
    { name: "Simeon", attendance: "Absent" },
    { name: "Joel", attendance: "Present" },
    { name: "Kingesly", attendance: "Present" },
    { name: "David", attendance: "Present" },
    { name: "Daniel", attendance: "Present" }
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