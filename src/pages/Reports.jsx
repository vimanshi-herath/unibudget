import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTransactions } from "../services/transactionService";
import { getByCategory, getMonthlyData } from "../utils/calculations";
import Loader from "../components/Loader";
import { exportToCSV } from "../utils/exportCSV";
import { exportToPDF } from "../utils/exportPDF";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid,
} from "recharts";
import { FiDownload, FiFileText } from "react-icons/fi";

const COLORS = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
const TIP = { contentStyle: { background: "#1e293b", border: "1px solid #334155", borderRadius: "8px" } };

export default function Reports() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions(currentUser.uid).then((d) => { setTransactions(d); setLoading(false); });
  }, []);

  if (loading) return <Loader />;

  const pieData = getByCategory(transactions);
  const monthly = getMonthlyData(transactions);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <div className="flex gap-2">
          <button onClick={() => exportToCSV(transactions)}
            className="flex items-center gap-1 text-sm px-3 py-2 bg-dark border border-border rounded-lg hover:border-primary transition">
            <FiDownload /> CSV
          </button>
          <button onClick={() => exportToPDF(transactions)}
            className="flex items-center gap-1 text-sm px-3 py-2 bg-dark border border-border rounded-lg hover:border-primary transition">
            <FiFileText /> PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Expenses by Category (Pie)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `Rs. ${v.toLocaleString()}`} {...TIP} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Monthly Income vs Expense (Bar)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthly}>
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `Rs. ${v.toLocaleString()}`} {...TIP} />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:col-span-2">
          <h3 className="font-semibold mb-4">Monthly Trend (Line)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `Rs. ${v.toLocaleString()}`} {...TIP} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} name="Income" />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Expense" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
