import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getBudgets, addBudget, deleteBudget } from "../services/budgetService";
import { getTransactions } from "../services/transactionService";
import Loader from "../components/Loader";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const CATEGORIES = ["Food", "Transport", "Education", "Entertainment", "Health", "Shopping", "Utilities", "Other"];

export default function Budgets() {
  const { currentUser } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");

  async function load() {
    const [b, t] = await Promise.all([
      getBudgets(currentUser.uid),
      getTransactions(currentUser.uid),
    ]);
    setBudgets(b);
    setTransactions(t);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await addBudget({ category, limit: Number(limit), userId: currentUser.uid });
    setLimit("");
    load();
  }

  async function handleDelete(id) {
    if (confirm("Delete budget?")) { await deleteBudget(id); load(); }
  }

  function getSpent(cat) {
    return transactions
      .filter((t) => t.type === "expense" && t.category === cat)
      .reduce((s, t) => s + Number(t.amount), 0);
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Budget Manager</h2>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-4">Set a Budget</h3>
        <form onSubmit={handleAdd} className="flex gap-3 flex-wrap">
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input type="number" placeholder="Monthly Limit (Rs.)" value={limit}
            onChange={(e) => setLimit(e.target.value)} required min="1"
            className="bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
          <button type="submit"
            className="flex items-center gap-2 bg-primary hover:bg-secondary transition px-4 py-2 rounded-lg font-semibold text-sm">
            <FiPlus /> Add Budget
          </button>
        </form>
      </div>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.length === 0 && (
            <p className="text-slate-500 col-span-2 text-center py-8">No budgets set yet.</p>
          )}
          {budgets.map((b) => {
            const spent = getSpent(b.category);
            const percent = Math.min((spent / b.limit) * 100, 100);
            const over = spent > b.limit;
            return (
              <div key={b.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{b.category}</h4>
                    <p className="text-sm text-slate-400">
                      Rs. {spent.toLocaleString()} / Rs. {b.limit.toLocaleString()}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(b.id)}
                    className="text-slate-500 hover:text-danger transition"><FiTrash2 /></button>
                </div>
                <div className="bg-dark rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${over ? "bg-danger" : percent > 75 ? "bg-warning" : "bg-success"}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className={over ? "text-danger font-semibold" : "text-slate-400"}>
                    {over ? "⚠ Over Budget!" : `${percent.toFixed(0)}% used`}
                  </span>
                  <span className="text-slate-400">
                    Rs. {Math.max(b.limit - spent, 0).toLocaleString()} left
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
