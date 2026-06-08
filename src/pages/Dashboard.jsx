import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>

        <div>
          <h3>Total Income</h3>
          <p>Rs. 0</p>
        </div>

        <div>
          <h3>Total Expenses</h3>
          <p>Rs. 0</p>
        </div>

        <div>
          <h3>Balance</h3>
          <p>Rs. 0</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;