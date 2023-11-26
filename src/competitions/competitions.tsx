import React, { useEffect, useState } from "react";
import "./competitions.css";
import Loading from "../loading/loading";
import Chip from "@mui/material/Chip";
import { RxExit } from "react-icons/rx";

type Location = {
  venue: string; // Venue
  addressLine1: string | null; // Address line 1
  addressLine2: string | null; // Address line 2
  city: string; // City
  region: string; // Region
  postcode: string; // Postcode
  country: string; // Country
};

type Competition = {
  name: string; // Name of the event
  date: string; // Date of the event
  sku: string; // ID of the event
  location: Location; // Where event took place
};

function Competitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]); // List of competitions
  const [seasons, setSeasons] = useState(["181"]); // Season ID
  const [loading, setLoading] = useState(false); // Controls whether to display loading animation
  const [selectedCompetition, setSelectedCompetition] =
    useState<Competition | null>(null); // Selected competition

  function loadCompetitions() {
    setLoading(true); // Show loading animation
    fetch(
      `https://www.robotevents.com/api/v2/teams/93408/events?${seasons
        .map((e) => "season%5B%5D=" + e)
        .join("&")}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ROBOT_EVENTS_API_TOKEN}`,
        },
      }
    ).then((competitions) => {
      competitions
        .json()
        .catch((_) => {})
        .then((data: any) => {
          setCompetitions(
            data.data.map((competition: any) => {
              return {
                name: competition.name,
                date:
                  competition.start !== competition.end
                    ? `${competition.start
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")} to ${competition.end
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}`
                    : competition.start
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/"), // Convert date into proper format
                sku: competition.sku,
                location: {
                  venue: competition.location.venue,
                  addressLine1: competition.location.address_1,
                  addressLine2: competition.location.address_2,
                  city: competition.location.city,
                  region: competition.location.region,
                  postcode: competition.location.postcode,
                  country: competition.location.country,
                },
              };
            })
          );
          setLoading(false); // Hide loading animation
        });
    });
  }

  useEffect(loadCompetitions, [seasons]);

  return (
    <div>
      {selectedCompetition === null ? (
        <div id="competitions-container">
          <h1 style={{ textDecoration: "underline", fontSize: "40px" }}>
            Competitions
          </h1>
          <div
            style={{ display: "flex", zIndex: "0" }}
            id="competitions-seasons-chips"
          >
            <Chip
              label="2023-24"
              onClick={() => {
                !seasons.includes("181")
                  ? setSeasons(seasons.concat("181"))
                  : setSeasons(seasons.filter((e) => e !== "181"));
              }}
              variant={seasons.includes("181") ? "filled" : "outlined"}
            />
            <div className="competitions-chip-padding"></div>
            <Chip
              label="2022-23"
              onClick={() => {
                !seasons.includes("173")
                  ? setSeasons(seasons.concat("173"))
                  : setSeasons(seasons.filter((e) => e !== "173"));
              }}
              variant={seasons.includes("173") ? "filled" : "outlined"}
            />
            <div className="competitions-chip-padding"></div>
            <Chip
              label="2021-22"
              onClick={() => {
                !seasons.includes("154")
                  ? setSeasons(seasons.concat("154"))
                  : setSeasons(seasons.filter((e) => e !== "154"));
              }}
              variant={seasons.includes("154") ? "filled" : "outlined"}
            />
            <div className="competitions-chip-padding"></div>
            <Chip
              label="2020-21"
              onClick={() => {
                !seasons.includes("139")
                  ? setSeasons(seasons.concat("139"))
                  : setSeasons(seasons.filter((e) => e !== "139"));
              }}
              variant={seasons.includes("139") ? "filled" : "outlined"}
            />
            <div className="competitions-chip-padding"></div>
            <Chip
              label="2019-20"
              onClick={() => {
                !seasons.includes("130")
                  ? setSeasons(seasons.concat("130"))
                  : setSeasons(seasons.filter((e) => e !== "130"));
              }}
              variant={seasons.includes("130") ? "filled" : "outlined"}
            />
            <div className="competitions-chip-padding"></div>
            <Chip
              label="2018-19"
              onClick={() => {
                !seasons.includes("125")
                  ? setSeasons(seasons.concat("125"))
                  : setSeasons(seasons.filter((e) => e !== "125"));
              }}
              variant={seasons.includes("125") ? "filled" : "outlined"}
            />
          </div>
          {loading ? (
            <Loading inAppBar={false} size="16vw" color="black" />
          ) : competitions.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "20px" }}>
              No competitions for the selected seasons
            </p>
          ) : (
            competitions.map((competition: Competition, index: number) => (
              <div
                key={index}
                className="competition-outer"
                onClick={() => setSelectedCompetition(competition)}
              >
                <h1>{competition.name}</h1>
                <p>{competition.date}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            width: "100%",
            zIndex: "0",
            padding: "0 50px 30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RxExit
              id="close-button"
              onClick={() => {
                setSelectedCompetition(null);
              }}
              style={{width: "2.5em", height: "2.5em", right: "30px"}}
            />
            <h1
              style={{
                textAlign: "center",
                maxWidth: "75vw",
                fontSize: "40px"
              }}
            >
              {selectedCompetition.name}
            </h1>
          </div>

          <h3>{selectedCompetition.date}</h3>
          <p style={{ margin: "0" }}>Location:</p>
          {!(
            selectedCompetition.location.venue === null ||
            selectedCompetition.location.venue === ""
          ) ? (
            <p style={{ margin: "0" }}>{selectedCompetition.location.venue}</p>
          ) : (
            <div className="empty"></div>
          )}
          {!(
            selectedCompetition.location.addressLine1 === null ||
            selectedCompetition.location.addressLine1 === ""
          ) ? (
            <p style={{ margin: "0" }}>
              {selectedCompetition.location.addressLine1}
            </p>
          ) : (
            <div className="empty"></div>
          )}
          {!(
            selectedCompetition.location.addressLine2 === null ||
            selectedCompetition.location.addressLine2 === ""
          ) ? (
            <p style={{ margin: "0" }}>
              {selectedCompetition.location.addressLine2}
            </p>
          ) : (
            <div className="empty"></div>
          )}
          {!(
            selectedCompetition.location.city === null ||
            selectedCompetition.location.city === ""
          ) ? (
            <p style={{ margin: "0" }}>{selectedCompetition.location.city}</p>
          ) : (
            <div className="empty"></div>
          )}
          {!(
            selectedCompetition.location.region === null ||
            selectedCompetition.location.region === ""
          ) ? (
            <p style={{ margin: "0" }}>{selectedCompetition.location.region}</p>
          ) : (
            <div className="empty"></div>
          )}
          {!(
            selectedCompetition.location.postcode === null ||
            selectedCompetition.location.postcode === ""
          ) ? (
            <p style={{ margin: "0" }}>
              {selectedCompetition.location.postcode}
            </p>
          ) : (
            <div className="empty"></div>
          )}
          {!(
            selectedCompetition.location.country === null ||
            selectedCompetition.location.country === ""
          ) ? (
            <p style={{ margin: "0" }}>
              {selectedCompetition.location.country}
            </p>
          ) : (
            <div className="empty"></div>
          )}
          <a
            style={{ marginTop: "10px" }}
            href={`https://robotevents.com/robot-competitions/vex-robotics-competitions/${selectedCompetition.sku}.html`}
          >
            Further information
          </a>
        </div>
      )}
    </div>
  );
}

export default Competitions;
