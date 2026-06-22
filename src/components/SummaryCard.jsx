export default function SummaryCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded-lg shadow bg-white border-l-4 ${color}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}