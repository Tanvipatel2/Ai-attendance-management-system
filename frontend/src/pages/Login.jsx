import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login/", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));

    const role = res.data.user.role;

    alert("Login successful");

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "FACULTY") {
      navigate("/faculty/dashboard");
    } else {
      navigate("/student/dashboard");
    }
    } catch (error) {
      alert("Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-indigo-600 text-white flex flex-col justify-center px-20">
        <h1 className="text-5xl font-bold">AI Attendance</h1>
        <p className="mt-5 text-lg">
          Smart face recognition based attendance management system.
        </p>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-xl rounded-3xl p-10 w-[420px]"
        >
          <h2 className="text-3xl font-bold mb-6">Login</h2>

          <input
            className="w-full border p-3 rounded-xl mb-4"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            className="w-full border p-3 rounded-xl mb-4"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
            Login
          </button>

          <p className="mt-4 text-center">
            New user?{" "}
            <Link className="text-indigo-600 font-semibold" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}