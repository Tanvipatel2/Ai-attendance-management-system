import Navbar from "../../components/Navbar";

export default function StudentDashboard() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-gray-500 mt-2">View your attendance and mark attendance.</p>
      </div>
    </>
  );
}