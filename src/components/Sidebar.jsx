import { Link, useLocation } from "react-router-dom";
import {
  FiGrid, FiList, FiTarget, FiBarChart2, FiUser, FiDollarSign
} from "react-icons/fi";

const links = [
  { to: "/dashboard", icon: <FiGrid />, label: "Dashboard" },
  { to: "/transactions", icon: <FiList />, label: "Transactions" },
  { to: "/budgets", icon: <FiDollarSign />, label: "Budgets" },
  { to: "/goals", icon: <FiTarget />, label: "Goals" },
  { to: "/reports", icon: <FiBarChart2 />, label: "Reports" },
  { to: "/profile", icon: <FiUser />, label: "Profile" },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="bg-card border-r border-border w-56 min-h-screen pt-6 px-3">
      {links.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm transition
            ${pathname === to
              ? "bg-primary text-white font-semibold"
              : "text-slate-400 hover:bg-dark hover:text-white"
            }`}
        >
          {icon} {label}
        </Link>
      ))}
    </aside>
  );
}
