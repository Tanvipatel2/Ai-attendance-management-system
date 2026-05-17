import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Manage users, attendance and reports.</p>
      </div>
    </>
  );
}