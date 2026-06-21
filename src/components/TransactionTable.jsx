import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  if (!transactions.length) {
    return (
      <div className="text-center text-slate-500 py-12">
        No transactions found. Add your first one!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-slate-400 border-b border-border">
            <th className="text-left py-3 px-2">Date</th>
            <th className="text-left py-3 px-2">Description</th>
            <th className="text-left py-3 px-2">Category</th>
            <th className="text-left py-3 px-2">Type</th>
            <th className="text-right py-3 px-2">Amount</th>
            <th className="text-right py-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-border/50 hover:bg-dark/40 transition">
              <td className="py-3 px-2 text-slate-300">{t.date}</td>
              <td className="py-3 px-2">{t.description || "—"}</td>
              <td className="py-3 px-2">
                <span className="bg-dark px-2 py-0.5 rounded text-xs text-slate-300">
                  {t.category}
                </span>
              </td>
              <td className="py-3 px-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    t.type === "income"
                      ? "bg-green-900/40 text-success"
                      : "bg-red-900/40 text-danger"
                  }`}
                >
                  {t.type}
                </span>
              </td>
              <td className={`py-3 px-2 text-right font-semibold ${
                t.type === "income" ? "text-success" : "text-danger"
              }`}>
                {t.type === "income" ? "+" : "-"}Rs. {Number(t.amount).toLocaleString()}
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => onEdit(t)}
                  className="text-slate-400 hover:text-primary mr-3 transition"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-slate-400 hover:text-danger transition"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}