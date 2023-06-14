import './awards.css'
import {useEffect, useState} from "react"
import Loading from '../loading/loading'
import Chip from '@mui/material/Chip'

type Award = {
    title: string // Type of award
    eventName: string // Which event it was given in
    date: string // When award was given
    season: string // Season when award was given
}

function Awards() {
    const [awards, setAwards] = useState<Award[]>([]) // List of awards
    const [seasons, setSeasons] = useState(["181"]) // Season ID
    const [loading, setLoading] = useState(false) // Show or hide loading animation

    function loadAwards() {
        setLoading(true) // Display loading animation
        const token = process.env.REACT_APP_ROBOT_EVENTS_API_TOKEN
        async function fetchAwards() {
            const response = await fetch(`https://www.robotevents.com/api/v2/teams/93408/awards?${seasons.map((e) => "season%5B%5D=" + e).join("&")}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            const data: any[] = (await response.json()).data
            const awardsLoaded = []; // Awards loaded so far
            for (let i = 0; i < data.length; i++) {
                const event = (await (await fetch(`https://www.robotevents.com/api/v2/events/${data[i].event.id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                })).json())
                const eventDateString = event.start !== event.end ? `${event.start.split("T")[0].split("-").reverse().join("/")} to ${event.end.split("T")[0].split("-").reverse().join("/")}` : event.start.split("T")[0].split("-").reverse().join("/") // Convert date into proper format
                let eventSeasonString = "" // Event season name
                switch (event.season.id) {
                    case 181:
                        eventSeasonString = "Over Under"
                        break
                    case 173:
                        eventSeasonString = "Spin Up"
                        break
                    case 154:
                        eventSeasonString = "Tipping Point"
                        break
                    case 139:
                        eventSeasonString = "Change Up"
                        break
                    case 130:
                        eventSeasonString = "Tower Takeover"
                        break
                    case 125:
                        eventSeasonString = "Turning Point"
                        break
                }
                awardsLoaded.push({
                    title: data[i].title,
                    eventName: data[i].event.name,
                    date: eventDateString,
                    season: eventSeasonString,
                }) // Add the award with the event date string
            }
            setAwards(awardsLoaded) // Save awards loaded to awards list
        }
        fetchAwards().then(_ => setLoading(false)).catch(console.error)
    }

    useEffect(loadAwards, [seasons]) // Run whenever season changes

    return (
        <div id="awards-container">
            <h1>Awards</h1>
            <div style={{display: "flex", zIndex: "0"}} id="awards-seasons-chips">
                <Chip label="2023-24" onClick={() => {
                    !seasons.includes("181") ? setSeasons(seasons.concat("181")) : setSeasons(seasons.filter((e) => e !== "181"))
                }} variant={seasons.includes("181") ? "filled" : "outlined"}/>
                <div className="awards-chip-padding"></div>
                <Chip label="2022-23" onClick={() => {
                    !seasons.includes("173") ? setSeasons(seasons.concat("173")) : setSeasons(seasons.filter((e) => e !== "173"))
                }} variant={seasons.includes("173") ? "filled" : "outlined"}/>
                <div className="awards-chip-padding"></div>
                <Chip label="2021-22" onClick={() => {
                    !seasons.includes("154") ? setSeasons(seasons.concat("154")) : setSeasons(seasons.filter((e) => e !== "154"))
                }} variant={seasons.includes("154") ? "filled" : "outlined"}/>
                <div className="awards-chip-padding"></div>
                <Chip label="2020-21" onClick={() => {
                    !seasons.includes("139") ? setSeasons(seasons.concat("139")) : setSeasons(seasons.filter((e) => e !== "139"))
                }} variant={seasons.includes("139") ? "filled" : "outlined"}/>
                <div className="awards-chip-padding"></div>
                <Chip label="2019-20" onClick={() => {
                    !seasons.includes("130") ? setSeasons(seasons.concat("130")) : setSeasons(seasons.filter((e) => e !== "130"))
                }} variant={seasons.includes("130") ? "filled" : "outlined"}/>
                <div className="awards-chip-padding"></div>
                <Chip label="2018-19" onClick={() => {
                    !seasons.includes("125") ? setSeasons(seasons.concat("125")) : setSeasons(seasons.filter((e) => e !== "125"))
                }} variant={seasons.includes("125") ? "filled" : "outlined"}/>
            </div>
            {
                loading ? <div>
                    <Loading color="black" size="16vw" inAppBar={false}/>
                </div> : awards.length === 0 ?
                    <p style={{fontSize: "20px", textAlign: "center"}}>
                        No awards for the selected seasons
                    </p> : awards.map((award: Award, index: number) => (
                        <div key={index} className="award-outer">
                            <h1>{award.title}</h1>
                            <p>{award.eventName}</p>
                            <p>{award.date} ({award.season})</p>
                        </div>
                    ))
            }
        </div>
    )
}

export default Awards
