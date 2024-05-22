import React from "react";
import RewardsImage from "./mithra.png";

function Home() {            
  return (
    <div className="container">
      <h1 className="my-4 text-center" style={{ color: "black" }}>Welcome to the Reward Management System</h1>
      <p className="text-center" style={{ fontWeight: "bold", fontSize: "1.2em" }}>Use the Reward Management bar to manage rewards.</p>
      <div style={{ textAlign: "center" }}>
        <img src={RewardsImage} alt="Rewards" style={{ width: "800px", height: "400px" }} />
      </div>
    </div>
  );
}

export default Home;
