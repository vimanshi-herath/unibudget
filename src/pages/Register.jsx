import Navbar from "../components/Navbar";

function Register() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Register</h2>

        <form>
          <input
            type="text"
            placeholder="Full Name"
          />

          <br />
          <br />

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
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;