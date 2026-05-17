import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Report() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get("/report/").then((res) => {
      setRecords(res.data);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2">Attendance Report</h2>
        <p className="text-gray-500 mb-8">
          Complete attendance history with AI confidence score.
        </p>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Confidence</th>
                <th className="p-4 text-left">Location</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="p-4">{r.username}</td>
                  <td className="p-4">{r.email}</td>
                  <td className="p-4">{r.date}</td>
                  <td className="p-4">{r.time}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4">{r.confidence}%</td>
                  <td className="p-4">{r.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}