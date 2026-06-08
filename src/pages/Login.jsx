import Navbar from "../components/Navbar";

function Login() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Login</h2>

        <form>
          <input
            type="email"
            placeholder="Email"
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="Password"
          />

          <br />
          <br />

          <button>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;