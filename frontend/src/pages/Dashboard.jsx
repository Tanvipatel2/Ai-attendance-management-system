import { useEffect, useState } from "react";
import { Users, CalendarCheck, Clock, AlertTriangle } from "lucide-react";
import API from "../api";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_attendance: 0,
    today_attendance: 0,
    late_count: 0,
  });

  useEffect(() => {
    API.get("/dashboard/").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-gray-500 mb-8">
          Real-time AI attendance analytics overview.
        </p>

        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.total_users}
            icon={<Users />}
          />

          <StatCard
            title="Total Attendance"
            value={stats.total_attendance}
            icon={<CalendarCheck />}
          />

          <StatCard
            title="Today Attendance"
            value={stats.today_attendance}
            icon={<Clock />}
          />

          <StatCard
            title="Late Count"
            value={stats.late_count}
            icon={<AlertTriangle />}
          />
        </div>

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Industry Level Features</h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-xl">
              Face Recognition Attendance
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              Duplicate Attendance Prevention
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              Late Entry Detection
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              Location Tracking
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              Admin Analytics
            </div>
            <div className="p-4 bg-red-50 rounded-xl">
              Proxy Attendance Prevention
            </div>
          </div>
        </div>
      </div>
    </>
  );
}