import React, { useState } from 'react';

export default function Student() {

    const [studentName, setStudentName] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [editableStudent, setEditableStudent] = useState(null);

    const addStudentToList = (e, name) =>{
        e.preventDefault();
        if(name){
            const newStudent = {
                id: Date.now(),
                name
            }
            setStudentList([newStudent, ...studentList])
            setStudentName("")
        }else{
            alert("Pleae provide a student name")
        }
    }

    // Delete functionality 
    const deleteStudentFromList = (id) => {
        setStudentList(studentList.filter((student)=>student.id !==id))
    }

    // Editing functionalities
    const editBtnHandler = (id) =>{
        setIsEditable(true);
        const student = studentList.find((item)=>item.id===id);
        setEditableStudent(student);
        setStudentName(student.name);
    }
    // Update functionality after clicking on edit button 
    const updateHandler = (event, editableStudentName) => {
        event.preventDefault();
        if(editableStudentName){
            editableStudent.name = editableStudentName || editableStudent.name;
            setIsEditable(false);
            setStudentName("");
            setEditableStudent(null);
        }else{
            alert("Pleae provide a student name")
        }
    }

    const presentHandler = (studentId) => {
        const student = studentList.find((item)=>item.id===studentId);
        if(student.isPresent===undefined){
            student.isPresent = true;
        }else if(student.isPresent){
            alert("This student already in present list");
        }else{
            alert("This student already in abesent list");
        }
        setStudentList([...studentList])
    }

    const absentHandler = (studentId) =>{
        const student = studentList.find((item)=>item.id===studentId);
        if(student.isPresent===undefined){
            student.isPresent = false;
        }else if(!student.isPresent){
            alert("This student already in abesent list");
        }else{
            alert("This student already in present list");
        }
        setStudentList([...studentList])
    }

    const presentAbsentToggle = (studentId) =>{
        const student = studentList.find((item)=>item.id===studentId);
        student.isPresent = !student.isPresent
        setStudentList([...studentList])
    }

    
  return (
  <div>
      <h1>Student Management App</h1>
      <form>
          <input type="text" placeholder='Student Name' value={studentName} 
          onChange={(e)=>{setStudentName(e.target.value)}}/>
          <button type='sumbit' onClick={(e)=>{isEditable?updateHandler(e, studentName):addStudentToList(e, studentName)}}>
              {isEditable?"Update": "Add Student"}</button>
      </form>
      <div className="list">
          <div className="all-student list-containr">
              <h2>All Student</h2>
              <table>
                  <thead>
                      <tr>
                          <td>Sr No.</td>
                          <td>Student Name</td>
                          <td>Action buttons</td>
                      </tr>
                  </thead>
                  <tbody>
                      {studentList.map((student, index)=>{
                          return (
                            <tr key={student.id}>
                                <td>{index+1}</td>
                                <td>{student.name}</td>
                                <td>
                                    <button onClick={()=> absentHandler(student.id)}>Absent</button>
                                    <button onClick={()=> presentHandler(student.id)}>present</button>
                                    <button onClick={()=> editBtnHandler(student.id)}>Edit</button>
                                    <button onClick={()=>deleteStudentFromList(student.id)}>Delete</button>
                                </td>
                            </tr>)   
                      })}
                  </tbody>
              </table>
          </div>
          <div className="present-student list-containr">
              <h2>Present Student</h2>
              <table>
                  <thead>
                      <tr>
                          <td>Sr No.</td>
                          <td>Student Name</td>
                          <td>Action buttons</td>
                      </tr>
                  </thead>
                  <tbody>
                      {studentList.filter((student)=>student.isPresent===true).map((presentStudent, index)=>{
                        return(
                        <tr key={presentStudent.id}>
                          <td>{index+1}</td>
                          <td>{presentStudent.name}</td>
                          <td><button onClick={()=>presentAbsentToggle(presentStudent.id)}>Make Absent</button></td>
                      </tr>) 
                      })}
                  </tbody>
              </table>
          </div>
          <div className="absent-student list-containr">
                <h2>Absent Student</h2>
                <table>
                  <thead>
                      <tr>
                          <td>Sr No.</td>
                          <td>Student Name</td>
                          <td>Action buttons</td>
                      </tr>
                  </thead>
                  <tbody>
                    {studentList.filter((student)=>student.isPresent===false).map((absentStudent, index)=>{
                        return(
                        <tr key={absentStudent.id}>
                          <td>{index+1}</td>
                          <td>{absentStudent.name}</td>
                          <td><button onClick={()=>presentAbsentToggle(absentStudent.id)}>Make Present</button></td>
                        </tr>) 
                      })}
                  </tbody>
              </table>
          </div>
      </div>
  </div>);
}
