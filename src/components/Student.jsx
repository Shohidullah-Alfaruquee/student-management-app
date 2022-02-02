import React, { useState } from "react";
import Form from "./Form";
import PresentStudents from "./PresentStudents";
import StudentListAll from "./StudentListAll";
import AbsentStudents from "./AbsentStudents";

export default function Student() {
  const [studentName, setStudentName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  const presentAbsentToggle = (studentId) => {
    const student = studentList.find((item) => item.id === studentId);
    student.isPresent = !student.isPresent;
    setStudentList([...studentList]);
  };

  return (
    <div>
      <h1>Student Management App</h1>
      <Form
        studentName={studentName}
        setStudentName={setStudentName}
        studentList={studentList}
        setStudentList={setStudentList}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        editableStudent={editableStudent}
        setEditableStudent={setEditableStudent}
      />
      <div className="list">
        <div className="all-student list-containr">
          <StudentListAll
            studentList={studentList}
            setStudentList={setStudentList}
            setIsEditable={setIsEditable}
            setStudentName={setStudentName}
            setEditableStudent={setEditableStudent}
          />
        </div>
        <div className="present-student list-containr">
          <PresentStudents
            studentList={studentList}
            presentAbsentToggle={presentAbsentToggle}
          />
        </div>
        <div className="absent-student list-containr">
          <AbsentStudents
            studentList={studentList}
            presentAbsentToggle={presentAbsentToggle}
          />
        </div>
      </div>
    </div>
  );
}
