import Navbar from "../../components/Navbar";

export default function FacultyDashboard() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
        <p className="text-gray-500 mt-2">Manage class attendance and student reports.</p>
      </div>
    </>
  );
}