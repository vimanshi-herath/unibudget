import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import Loader from "../components/Loader";
import { exportToCSV } from "../utils/exportCSV";
import { exportToPDF } from "../utils/exportPDF";
import { FiPlus, FiDownload, FiFileText } from "react-icons/fi";

export default function Transactions() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");

  async function load() {
    setLoading(true);
    const data = await getTransactions(currentUser.uid);
    setTransactions(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(form) {
    await addTransaction({ ...form, userId: currentUser.uid });
    setShowForm(false);
    load();
  }

  async function handleEdit(form) {
    await updateTransaction(editing.id, form);
    setEditing(null);
    load();
  }

  async function handleDelete(id) {
    if (confirm("Delete this transaction?")) {
      await deleteTransaction(id);
      load();
    }
  }

  const filtered = filter === "all"
    ? transactions
    : transactions.filter((t) => t.type === filter);

  return (
    <div className="p-6 space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="flex gap-2">
          <button onClick={() => exportToCSV(transactions)}
            className="flex items-center gap-1 text-sm px-3 py-2 bg-dark border border-border rounded-lg hover:border-primary transition">
            <FiDownload /> CSV
          </button>
          <button onClick={() => exportToPDF(transactions)}
            className="flex items-center gap-1 text-sm px-3 py-2 bg-dark border border-border rounded-lg hover:border-primary transition">
            <FiFileText /> PDF
          </button>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary hover:bg-secondary transition px-4 py-2 rounded-lg text-sm font-semibold">
            <FiPlus /> Add Transaction
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">New Transaction</h3>
          <TransactionForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {editing && (
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Edit Transaction</h3>
          <TransactionForm initial={editing} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex gap-2 mb-4">
          {["all", "income", "expense"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm capitalize transition
                ${filter === f ? "bg-primary text-white" : "bg-dark border border-border text-slate-400 hover:text-white"}`}>
              {f}
            </button>
          ))}
        </div>
        {loading ? <Loader /> : (
          <TransactionTable
            transactions={filtered}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
