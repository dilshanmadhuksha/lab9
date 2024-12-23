import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Student } from "../types";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Student | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`).then((response) => {
      setForm(response.data);
    });
  }, [id]);

  if (!form) return <div>Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value } as Student);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/students/${id}`, form).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <input
          name="yearOfEnrollment"
          value={form.yearOfEnrollment}
          onChange={handleChange}
          placeholder="Year of Enrollment"
          type="number"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;
