import "./download-app.css";
import React, { useState, useEffect } from "react";
import Loading from "../loading/loading";

function DownloadApp() {
  const [appData, setAppData] = useState({
    version: "1.0.0+1", // Version number
    features: [], // List of features to display for app
    link: undefined,
  }); // App data
  const [loading, setLoading] = useState(false);

  function loadAppData() {
    setLoading(true); // Show loading animation
    fetch("/data/20785C-app.json").then((app) => {
      app
        .json()
        .catch((_error) => {})
        .then((data: any) => {
          setAppData(data);
          // Keep loading animation always visible for 1 loop
          setTimeout(() => {
            setLoading(false);
          }, 1000); // Set the duration for the loading animation
        });
    });
  } // Load app data

  useEffect(loadAppData, []); // run on page launch once

  return (
    <div id="download-app-container">
      <h1 style={{ textDecoration: "underline", fontSize: "40px" }}>
        Download the 20785C app:
      </h1>
      {loading ? (
        <Loading inAppBar={false} size="16vw" color="black" />
      ) : (
        <div>
          <h1 style={{ marginBottom: "0", textAlign: "center" }}>
            Version: {appData.version}
          </h1>
          <h1 style={{ marginBottom: "0" }}>Features:</h1>
          <ul style={{ listStyle: "none", marginBottom: "0" }}>
            {appData.features.map((feature: any, index: number) => (
              <li className="app-feature" key={index}>
                <div></div>
                <p key={index} style={{ fontSize: "20px" }}>
                  {feature}
                </p>
              </li>
            ))}
          </ul>
          {!(appData.link === null || appData.link === undefined) ? (
            <div
              id="download-app-button"
              onClick={() => window.open(appData.link, "_blank", "noreferrer")}
            >
              <h1>Download Now!</h1>
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>Download link coming soon</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DownloadApp;
