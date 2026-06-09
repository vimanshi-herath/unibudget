import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
      <p className="text-slate-400 mb-6 text-lg">Page not found</p>
      <Link to="/dashboard" className="bg-primary hover:bg-secondary transition px-6 py-3 rounded-xl font-semibold">
        Go to Dashboard
      </Link>
    </div>
  );
}