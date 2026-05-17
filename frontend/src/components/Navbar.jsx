import { Link, useNavigate } from "react-router-dom";
import { Camera, LayoutDashboard, FileText, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">
        AI Attendance
      </h1>

      <div className="flex gap-4 items-center">
        <Link className="flex gap-2 items-center text-gray-700" to="/dashboard">
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link className="flex gap-2 items-center text-gray-700" to="/mark-attendance">
          <Camera size={18} /> Mark
        </Link>

        <Link className="flex gap-2 items-center text-gray-700" to="/report">
          <FileText size={18} /> Report
        </Link>

        <button
          onClick={logout}
          className="flex gap-2 items-center bg-red-500 text-white px-4 py-2 rounded-xl"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}