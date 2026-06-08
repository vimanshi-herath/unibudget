import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>
          Welcome to UniBudget
        </h1>

        <p>
          Personal Finance Manager for
          University Students
        </p>

        <h3>Features</h3>

        <ul>
          <li>Track Expenses</li>
          <li>Track Income</li>
          <li>Budget Planning</li>
          <li>Savings Goals</li>
          <li>Analytics</li>
        </ul>
      </div>
    </>
  );
}

export default Home;