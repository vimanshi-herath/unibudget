import { useState } from "react";

const CATEGORIES = [
  "Food", "Transport", "Education", "Entertainment",
  "Health", "Shopping", "Utilities", "Other"
];

export default function TransactionForm({ onSubmit, initial = {}, onCancel }) {
  const [form, setForm] = useState({
    amount: initial.amount || "",
    type: initial.type || "expense",
    category: initial.category || "Food",
    description: initial.description || "",
    date: initial.date || new Date().toISOString().split("T")[0],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Amount (Rs.)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            min="1"
            className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-slate-400 text-xs mb-1 block">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1 block">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g. Lunch at canteen"
          className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="flex-1 bg-primary hover:bg-secondary transition py-2 rounded-lg font-semibold"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-dark border border-border hover:border-slate-400 transition py-2 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}