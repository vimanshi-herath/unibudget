import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="bg-card border-b border-border px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">💰 UniBudget</h1>
      <div className="flex items-center gap-4">
        <span className="text-slate-300 text-sm flex items-center gap-1">
          <FiUser className="text-primary" />
          {currentUser?.displayName || currentUser?.email}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-danger transition"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
}
