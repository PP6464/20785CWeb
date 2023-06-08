import {useEffect, useState} from 'react'
import './competitions.css'
import Loading from "../loading/loading";

type Location = {
    venue: string // Venue
    addressLine1: string | null // Address line 1
    addressLine2: string | null // Address line 2
    city: string // City
    region: string // Region
    postcode: string // Postcode
    country: string // Country
}

type Competition = {
    name: string // Name of the event
    date: string // Date of the event
    location: Location // Where event took place
}

function Competitions() {
    const [competitions, setCompetitions] = useState<Competition[]>([]) // List of competitions
    const [season, setSeason] = useState("181") // Season ID
    const [loading, setLoading] = useState(false) // Controls whether to display loading animation
    const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)

    function loadCompetitions() {
        setLoading(true) // Show loading animation
        fetch(`https://www.robotevents.com/api/v2/teams/93408/events?season%5B%5D=${season}`, {
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_ROBOT_EVENTS_API_TOKEN}`
            }
        }).then(competitions => {
            competitions.json().catch(_ => {
            }).then((data: any) => {
                setCompetitions(data.data.map((competition: any) => {
                    return {
                        name: competition.name,
                        date: competition.start !== competition.end ? `${competition.start.split("T")[0].split("-").reverse().join("/")} to ${competition.end.split("T")[0].split("-").reverse().join("/")}` : competition.start.split("T")[0].split("-").reverse().join("/"), // Convert date into proper format
                        location: {
                            venue: competition.location.venue,
                            addressLine1: competition.location.address_1,
                            addressLine2: competition.location.address_2,
                            city: competition.location.city,
                            region: competition.location.region,
                            postcode: competition.location.postcode,
                            country: competition.location.country,
                        },
                    }
                }))
            })
        })
        setLoading(false) // Hide loading animation
    }

    useEffect(loadCompetitions, [season])

    return (
        <div>
            {
                selectedCompetition === null ? <div id="competitions-container">
                    <h1>Competitions</h1>
                    <label htmlFor="competitions-season-select" style={{fontSize: "25px"}}>Season: </label>
                    <select onChange={(e) => setSeason(e.target.value)}
                            style={{fontSize: "25px", marginBottom: "10px"}} value={season}>
                        <option value="181">2023-24</option>
                        <option value="173">2022-23</option>
                        <option value="154">2021-22</option>
                        <option value="139">2020-21</option>
                        <option value="130">2019-20</option>
                        <option value="125">2018-19</option>
                    </select>
                    {
                        loading ? <Loading size="16vw" color="black"/> : competitions.length === 0 ?
                            <p style={{textAlign: "center", fontSize: "20px"}}>
                                No competitions for this season
                            </p> : competitions.map((competition: Competition, index: number) => (
                                <div key={index} className="competition-outer"
                                     onClick={() => setSelectedCompetition(competition)}>
                                    <h1>{competition.name}</h1>
                                    <p>{competition.date}</p>
                                </div>
                            ))
                    }
                </div> : <div style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    width: "100%"
                }}>
                    <div style={{
                        display: "flex",
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                    }}>
                        <h1 style={{textAlign: "center", maxWidth: "75vw"}}>{selectedCompetition.name}</h1>
                        <img src="/assets/close.png" alt="close" id="close-button" onClick={() => {
                            setSelectedCompetition(null)
                        }}/>
                    </div>
                    <h3>{selectedCompetition.date}</h3>
                    <p>Location:</p>
                    {
                        !(selectedCompetition.location.venue === null || selectedCompetition.location.venue === "") ?
                            <p>{selectedCompetition.location.venue}</p> : <div className="empty"></div>
                    }
                    {
                        !(selectedCompetition.location.addressLine1 === null || selectedCompetition.location.addressLine1 === "") ?
                            <p>{selectedCompetition.location.addressLine1}</p> : <div className="empty"></div>
                    }
                    {
                        !(selectedCompetition.location.addressLine2 === null || selectedCompetition.location.addressLine2 === "") ?
                            <p>{selectedCompetition.location.addressLine2}</p> : <div className="empty"></div>
                    }
                    {
                        !(selectedCompetition.location.city === null || selectedCompetition.location.city === "") ?
                            <p>{selectedCompetition.location.city}</p> : <div className="empty"></div>
                    }
                    {
                        !(selectedCompetition.location.region === null || selectedCompetition.location.region === "") ?
                            <p>{selectedCompetition.location.region}</p> : <div className="empty"></div>
                    }
                    {
                        !(selectedCompetition.location.postcode === null || selectedCompetition.location.postcode === "") ?
                            <p>{selectedCompetition.location.postcode}</p> : <div className="empty"></div>
                    }
                    {
                        !(selectedCompetition.location.country === null || selectedCompetition.location.country === "") ?
                            <p>{selectedCompetition.location.country}</p> : <div className="empty"></div>
                    }
                </div>
            }
        </div>
    )
}

export default Competitions
