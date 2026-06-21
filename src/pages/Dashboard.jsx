import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTransactions } from "../services/transactionService";
import SummaryCard from "../components/SummaryCard";
import Loader from "../components/Loader";
import { getIncome, getExpenses, getBalance, getByCategory } from "../utils/calculations";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from "react-icons/fi";

const COLORS = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions(currentUser.uid).then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, [currentUser]);

  if (loading) return <Loader />;

  const income = getIncome(transactions);
  const expenses = getExpenses(transactions);
  const balance = getBalance(transactions);
  const pieData = getByCategory(transactions);
  const recent = transactions.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">
        Welcome back, {currentUser.displayName || "Student"} 👋
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Income" amount={income} icon={<FiTrendingUp className="text-success" />} color="text-success" />
        <SummaryCard title="Total Expenses" amount={expenses} icon={<FiTrendingDown className="text-danger" />} color="text-danger" />
        <SummaryCard title="Balance" amount={balance} icon={<FiDollarSign className="text-primary" />} color="text-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-slate-300 mb-4">Spending by Category</h3>
          {pieData.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No expense data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `Rs. ${v.toLocaleString()}`} contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-slate-300 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recent.length === 0 && (
              <p className="text-slate-500 text-center py-8">No transactions yet</p>
            )}
            {recent.map((t) => (
              <div key={t.id} className="flex justify-between items-center py-2 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium">{t.description || t.category}</p>
                  <p className="text-xs text-slate-500">{t.date} · {t.category}</p>
                </div>
                <span className={`font-semibold text-sm ${t.type === "income" ? "text-success" : "text-danger"}`}>
                  {t.type === "income" ? "+" : "-"}Rs. {Number(t.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
