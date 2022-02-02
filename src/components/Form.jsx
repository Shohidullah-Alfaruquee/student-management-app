import React from "react";

 function Form({studentName, setStudentName, isEditable, 
    setIsEditable, studentList, setStudentList, editableStudent, setEditableStudent}) {

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
  return (
    <form>
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => {
          setStudentName(e.target.value);
        }}
      />
      <button
        type="sumbit"
        onClick={(e) => {
          isEditable
            ?updateHandler(e, studentName)
            :addStudentToList(e, studentName);
        }}
      >
        {isEditable ? "Update" : "Add Student"}
      </button>
    </form>
  );
}

export default Form
