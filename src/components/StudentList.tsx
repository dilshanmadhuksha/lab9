import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Student } from "../types";

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

  // Fetch students from the API
  useEffect(() => {
    axios.get("http://localhost:5000/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  // Delete student
  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:5000/students/${id}`).then(() => {
      setStudents((prev) => prev.filter((student) => student.id !== id));
    });
  };

  return (
    <div>
      <h1>Student List</h1>
      <button onClick={() => navigate("/add-student")}>Add Student</button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Year of Enrollment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>{student.yearOfEnrollment}</td>
              <td>
                <button onClick={() => navigate(`/edit-student/${student.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
