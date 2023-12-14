import React, { useEffect, useState } from "react";
import axios from "axios";
import "./competitions.css";
import Loading from "../loading/loading";
import Chip from "@mui/material/Chip";
import { RxExit } from "react-icons/rx";
import { IoIosCheckmarkCircle } from "react-icons/io";

type Location = {
  venue: string;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

type Competition = {
  name: string;
  date: string;
  sku: string;
  location: Location;
};

function Competitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [seasons, setSeasons] = useState(["181"]);
  const [loading, setLoading] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  useEffect(() => {
    const loadCompetitions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.robotevents.com/api/v2/teams/93408/events?${seasons.map((e) => "season%5B%5D=" + e).join("&")}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ROBOT_EVENTS_API_TOKEN}`,
          },
        });
        const competitions = response.data.data.map((competition: any) => ({
          name: competition.name,
          date:
            competition.start !== competition.end
              ? `${competition.start.split("T")[0].split("-").reverse().join("/")} to ${competition.end.split("T")[0].split("-").reverse().join("/")}`
              : competition.start.split("T")[0].split("-").reverse().join("/"),
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
        }));
        setCompetitions(competitions);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    loadCompetitions();
  }, [seasons]);

  const renderSeasonChip = (season: string, label: string) => (
    <React.Fragment key={season}>
      <Chip
        label={label}
        onClick={() => {
          const updatedSeasons = seasons.includes(season) ? seasons.filter((e) => e !== season) : seasons.concat(season);
          setSeasons(updatedSeasons);
        }}
        variant={seasons.includes(season) ? "filled" : "outlined"}
        icon={seasons.includes(season) ? <IoIosCheckmarkCircle /> : undefined}
        style={{ marginRight: "10px" }}
      />
    </React.Fragment>
  );

  return (
    <div>
      {selectedCompetition === null ? (
        <div id="competitions-container">
          <h1 style={{ textDecoration: "underline", fontSize: "40px" }}>Competitions</h1>
          <div style={{ display: "flex", zIndex: "0", marginBottom: "25px" }} id="competitions-seasons-chips">
            {renderSeasonChip("181", "2023-24")}
            {renderSeasonChip("173", "2022-23")}
            {renderSeasonChip("154", "2021-22")}
            {renderSeasonChip("139", "2020-21")}
            {renderSeasonChip("130", "2019-20")}
            {renderSeasonChip("125", "2018-19")}
          </div>
          {loading ? (
            <Loading inAppBar={false} size="16vw" color="black" />
          ) : competitions.length === 0 && seasons.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "20px" }}>Please select seasons</p>
          ) : competitions.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "20px" }}>No competitions for the selected seasons</p>
          ) : (
            competitions.map((competition: Competition, index: number) => (
              <div key={index} className="competition-outer" onClick={() => setSelectedCompetition(competition)}>
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
              style={{ width: "2.5em", height: "2.5em", right: "30px" }}
            />
            <h1
              style={{
                textAlign: "center",
                maxWidth: "75vw",
                fontSize: "40px",
              }}
            >
              {selectedCompetition.name}
            </h1>
          </div>

          <h3>{selectedCompetition.date}</h3>
          <p style={{ margin: "0" }}>Location:</p>
          {Object.entries(selectedCompetition.location).map(([key, value]) => (value !== null && value !== "" ? <p style={{ margin: "0" }}>{value}</p> : <div className="empty"></div>))}
          <a style={{ marginTop: "10px" }} href={`https://robotevents.com/robot-competitions/vex-robotics-competitions/${selectedCompetition.sku}.html`}>
            Further information
          </a>
        </div>
      )}
    </div>
  );
}

export default Competitions;
