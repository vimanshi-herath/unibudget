export default function SummaryCard({ title, amount, icon, color }) {
  return (
    <div className={`bg-card border border-border rounded-xl p-5 flex items-center gap-4`}>
      <div className={`text-3xl p-3 rounded-xl bg-opacity-20 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">
          Rs. {Number(amount).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
