import "./sponsor-us.css";
import React, { useState, useEffect } from "react";
import Loading from "../loading/loading";

function SponsorUs() {
  const [sponsors, setSponsors] = useState([]); // Save to page state to not lose information when page rerendered
  const [companyName, setCompanyName] = useState(""); // Company name
  const [companyEmail, setCompanyEmail] = useState(""); // Company email to be emailed back on
  const [companyDetails, setCompanyDetails] = useState(""); // Company terms for sponsorship
  const [loading, setLoading] = useState(false); // Display loading animation

  function loadSponsors() {
    setLoading(true); // Show loading animation
    fetch("/data/sponsors.json").then((sponsors) => {
      sponsors
        .json()
        .catch((_error) => {})
        .then((data: any) => {
          setSponsors(data);
          // Keep loading animation always visible for 1 loop
          setTimeout(() => {
            setLoading(false);
          }, 1000); // Set the duration for the loading animation
        });
    }); // Load sponsors data
  }

  useEffect(loadSponsors, []); // run on page lauch once

  return (
    <div id="sponsor-us-container">
      <h1 style={{ textDecoration: "underline", fontSize: "40px" }}>
        Sponsor Us:
      </h1>
      {loading ? (
        <Loading inAppBar={false} size="16vw" color="black" />
      ) : (
        <React.Fragment>
          {sponsors.length === 0 ? (
            <h3 style={{ textAlign: "center" }}>
              No sponsors yet. Sponsor us and showcase your brand on both our
              website and our robot!
            </h3>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h1 style={{ textAlign: "center" }}>Our sponsors so far:</h1>
              {sponsors.map((sponsor: any, index: number) => (
                <a
                  className="sponsor-us-sponsor"
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    textDecoration: "none",
                  }}
                  href={sponsor.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={sponsor.photo}
                    style={{ height: "5vh", borderRadius: "50%" }}
                    alt=""
                  />
                  <h3 style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                    {sponsor.name}
                  </h3>
                </a>
              ))}
            </div>
          )}
          <h1 style={{ textAlign: "center" }}>To sponsor us:</h1>
          <p style={{ textAlign: "center" }}>
            Contact us at vexoverride@gmail.com
          </p>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              className="sponsor-us-input"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              data-smaller="true"
              required
            />
            <input
              type="email"
              className="sponsor-us-input"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              placeholder="Enter company email (so we can email you back)"
              data-medium="true"
              required
            />
            <textarea
              className="sponsor-us-input"
              value={companyDetails}
              onChange={(e) => setCompanyDetails(e.target.value)}
              placeholder="Your terms for sponsorship"
              data-larger="true"
              required
            />
            <div
              id="register-sponsorship"
              onClick={() => {
                window.open(
                  `mailto:vexoverride@gmail.com?body=Company%3A%20${encodeURIComponent(
                    companyName
                  )}%0d%0aTerms%20for%20sponsorship%3A%20${encodeURIComponent(
                    companyDetails
                  )}%0d%0aEmail%20to%20email%20back%20on%3A%20${encodeURIComponent(
                    companyEmail
                  )}&subject=Sponsorship%20interest`
                );
              }}
            >
              <h1>Register interest now!</h1>
            </div>
          </form>
        </React.Fragment>
      )}
    </div>
  );
}

export default SponsorUs;
