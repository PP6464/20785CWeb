import "./home.css";

function Home() {
  return (
    <div id="home-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "0 10px",
        }}
      >
        <h1 style={{ textDecoration: "underline", fontSize: "40px" }}>
          Home
        </h1>
        <div className="home-card">
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", position: "relative"}}>
            <h1>Design Award: QE Competition</h1>
            <p style={{justifyContent: "end", position: "absolute", right: "0"}}>09/12/2023</p>
          </div>
          <img src="/assets/award.jpg" alt="" width="500px"/>
          <p>We won the design award at the QE competition! 🏆</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
