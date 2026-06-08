import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        background: "#333",
        color: "white",
      }}
    >
      <h2>UniBudget</h2>

      <Link
        to="/"
        style={{ color: "white", marginRight: "10px" }}
      >
        Home
      </Link>

      <Link
        to="/login"
        style={{ color: "white", marginRight: "10px" }}
      >
        Login
      </Link>

      <Link
        to="/register"
        style={{ color: "white" }}
      >
        Register
      </Link>
    </nav>
  );
}

export default Navbar;