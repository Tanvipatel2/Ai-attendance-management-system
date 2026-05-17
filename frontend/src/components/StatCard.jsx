export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}