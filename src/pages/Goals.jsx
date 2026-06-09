import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getGoals, addGoal, updateGoal, deleteGoal } from "../services/goalService";
import Loader from "../components/Loader";
import { FiPlus, FiTrash2, FiPlusCircle } from "react-icons/fi";

export default function Goals() {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ goalName: "", targetAmount: "", savedAmount: "" });
  const [topUp, setTopUp] = useState({});

  async function load() {
    const data = await getGoals(currentUser.uid);
    setGoals(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await addGoal({
      goalName: form.goalName,
      targetAmount: Number(form.targetAmount),
      savedAmount: Number(form.savedAmount || 0),
      userId: currentUser.uid,
    });
    setForm({ goalName: "", targetAmount: "", savedAmount: "" });
    load();
  }

  async function handleTopUp(goal) {
    const amount = Number(topUp[goal.id] || 0);
    if (!amount) return;
    await updateGoal(goal.id, { savedAmount: goal.savedAmount + amount });
    setTopUp({ ...topUp, [goal.id]: "" });
    load();
  }

  async function handleDelete(id) {
    if (confirm("Delete goal?")) { await deleteGoal(id); load(); }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Savings Goals</h2>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-4">Add a New Goal</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input placeholder="Goal Name (e.g. Laptop)" value={form.goalName}
            onChange={(e) => setForm({ ...form, goalName: e.target.value })} required
            className="bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
          <input type="number" placeholder="Target Amount (Rs.)" value={form.targetAmount}
            onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} required min="1"
            className="bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
          <input type="number" placeholder="Already Saved (Rs.)" value={form.savedAmount}
            onChange={(e) => setForm({ ...form, savedAmount: e.target.value })} min="0"
            className="bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
          <button type="submit" className="md:col-span-3 flex items-center justify-center gap-2 bg-primary hover:bg-secondary transition px-4 py-2 rounded-lg font-semibold text-sm">
            <FiPlus /> Add Goal
          </button>
        </form>
      </div>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.length === 0 && <p className="text-slate-500 col-span-2 text-center py-8">No goals yet. Set your first one!</p>}
          {goals.map((g) => {
            const percent = Math.min((g.savedAmount / g.targetAmount) * 100, 100);
            const done = g.savedAmount >= g.targetAmount;
            return (
              <div key={g.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{g.goalName}</h4>
                    <p className="text-sm text-slate-400">
                      Rs. {g.savedAmount.toLocaleString()} of Rs. {g.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${done ? "text-success" : "text-primary"}`}>
                      {percent.toFixed(0)}%
                    </span>
                    <button onClick={() => handleDelete(g.id)} className="text-slate-500 hover:text-danger transition"><FiTrash2 /></button>
                  </div>
                </div>

                <div className="bg-dark rounded-full h-4 overflow-hidden mb-3">
                  <div className={`h-4 rounded-full transition-all ${done ? "bg-success" : "bg-primary"}`}
                    style={{ width: `${percent}%` }} />
                </div>

                {done ? (
                  <p className="text-success text-sm font-semibold">🎉 Goal Achieved!</p>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <input type="number" placeholder="Add savings (Rs.)" value={topUp[g.id] || ""}
                      onChange={(e) => setTopUp({ ...topUp, [g.id]: e.target.value })} min="1"
                      className="flex-1 bg-dark border border-border rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary" />
                    <button onClick={() => handleTopUp(g)}
                      className="flex items-center gap-1 bg-accent/20 hover:bg-accent/40 text-accent border border-accent/40 px-3 py-1.5 rounded-lg text-sm transition">
                      <FiPlusCircle /> Add
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
