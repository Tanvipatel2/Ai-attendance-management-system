import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
    department: "",
    phone: "",
    face_image: null,
  });

  useEffect(() => {
    API.get("/departments/").then((res) => {
      setDepartments(res.data);
    });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    try {
      await API.post("/register/", data);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-3xl p-10 w-[520px]"
      >
        <h2 className="text-3xl font-bold mb-6">Create Account</h2>

        <input
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border p-3 rounded-xl mb-3"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
        </select>

        <select
          className="w-full border p-3 rounded-xl mb-3"
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Select Department</option>

          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          className="w-full border p-3 rounded-xl mb-3"
          placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <label className="block mb-2 font-semibold">Upload Face Image</label>

        <input
          type="file"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) => setForm({ ...form, face_image: e.target.files[0] })}
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
          Register
        </button>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link className="text-indigo-600 font-semibold" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}