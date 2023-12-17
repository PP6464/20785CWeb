import React from "react";
import "./home.css";

function Home() {
  return (
    <div id="home-container">
      <h1 style={{ textDecoration: "underline", fontSize: "40px" }}>Home</h1>
      <div className="home-card" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", position: "relative" }}>
          <h1>Design Award: QE Competition</h1>
          <p style={{ textAlign: "end", position: "absolute", right: "0", margin: "0" }}>09/12/2023</p>
        </div>
        <div style={{ display: "flex" }}>
          <img src="/assets/award.jpg" alt="" style={{ width: "100%", maxWidth: "500px" }} />
        </div>
        <p>We won the design award at the QE competition! 🏆</p>
      </div>
      <embed height="500px" src="https://www.gofundme.com/f/help-override-20785c-compete-in-the-2324-season" type="text/html"></embed>
    </div>
  );
}

export default Home;
