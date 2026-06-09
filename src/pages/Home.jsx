import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-primary mb-3">💰 UniBudget</h1>
      <p className="text-slate-400 text-lg mb-8 max-w-md">
        Personal finance management built for university students. Track expenses, set budgets, and reach your savings goals.
      </p>
      <div className="flex gap-4">
        <Link to="/register" className="bg-primary hover:bg-secondary transition px-6 py-3 rounded-xl font-semibold">
          Get Started
        </Link>
        <Link to="/login" className="bg-dark border border-border hover:border-primary transition px-6 py-3 rounded-xl">
          Login
        </Link>
      </div>
    </div>
  );
}
