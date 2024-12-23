import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    yearOfEnrollment: 2022,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://localhost:5000/students", form).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          name="yearOfEnrollment"
          value={form.yearOfEnrollment}
          onChange={handleChange}
          placeholder="Year of Enrollment"
          type="number"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddStudent;
