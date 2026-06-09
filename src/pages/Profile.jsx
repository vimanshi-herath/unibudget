import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLogOut } from "react-icons/fi";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-primary/20 text-primary rounded-full p-4 text-3xl">
            <FiUser />
          </div>
          <div>
            <p className="font-semibold text-lg">{currentUser.displayName || "Student"}</p>
            <p className="text-slate-400 text-sm">University Student</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-300 border-t border-border pt-4">
          <FiMail className="text-primary" />
          <span>{currentUser.email}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <FiUser className="text-primary" />
          <span>UID: {currentUser.uid.substring(0, 16)}...</span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30 transition py-2.5 rounded-lg font-semibold"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}