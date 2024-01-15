import React from "react";
import "./home.css";

function Home() {
  return (
    <div id="home-container">
      <h1 style={{ textDecoration: "underline", fontSize: "40px" }}>Home</h1>
      <div id="home-feed-1">
        <div className="home-card" style={{ flex: 6, marginRight: "20px" }}>
          <div>
            <h1>Design Award: QE Competition</h1>
            <p>09/12/2023</p>
          </div>
          <div style={{ display: "flex" }}>
            <img src="/assets/award.jpg" alt="" style={{ width: "100%", maxWidth: "500px" }} />
          </div>
          <p>We won the design award at the QE competition! 🏆</p>
        </div>
        <object
          className="gofundme-object"
          data="https://www.gofundme.com/f/help-override-20785c-compete-in-the-2324-season"
          title="gofundme"
          style={{ flex: 2, height: "544.17px", border: "none", overflow: "hidden" }}
        ></object>
      </div>
    </div>
  );
}

export default Home;
