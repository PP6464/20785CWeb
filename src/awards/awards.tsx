import './awards.css'
import {useEffect, useState} from "react"
import Loading from '../loading/loading'
import Chip from '@mui/material/Chip'

type Award = {
    title: string // Type of award
    eventName: string // Which event it was given in
}

function Awards() {
    const [awards, setAwards] = useState<Award[]>([]) // List of awards
    const [seasons, setSeasons] = useState(["181"]) // Season ID
    const [loading, setLoading] = useState(false) // Show or hide loading animation

    function loadAwards() {
        setLoading(true) // Display loading animation
        const token = process.env.REACT_APP_ROBOT_EVENTS_API_TOKEN
        fetch(`https://www.robotevents.com/api/v2/teams/93408/awards?${seasons.map((e) => "season%5B%5D=" + e).join("&")}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(_awards => {
            _awards.json().catch(_ => {
            }).then((data: any) => {
                setAwards(data.data.map((award: any) => {
                    console.log(award)
                    return {
                        title: award.title,
                        eventName: award.event.name,
                    }
                }))
                setLoading(false) // Hide loading animation
            })
        }) // Load awards from selected season
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
                        </div>
                    ))
            }
        </div>
    )
}

export default Awards
