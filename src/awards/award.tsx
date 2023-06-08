import './awards.css'
import {useEffect, useState} from "react"
import Loading from '../loading/loading'

type Award = {
    title: string // Type of award
    eventName: string // Which event it was given in
}

function Awards() {
    const [awards, setAwards] = useState<Award[]>([]) // List of awards
    const [season, setSeason] = useState("181") // Season ID
    const [loading, setLoading] = useState(false) // Show or hide loading animation

    function loadAwards() {
        setLoading(true) // Display loading animation
        const token = process.env.REACT_APP_ROBOT_EVENTS_API_TOKEN
        fetch(`https://www.robotevents.com/api/v2/teams/93408/awards?season%5B%5D=${season}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(_awards => {
            _awards.json().catch(_ => {
            }).then((data: any) => {
                setAwards(data.data.map((award: any) => {
                    return {
                        title: award.title,
                        eventName: award.event.name,
                    }
                }))
            })
        }) // Load awards from selected season
        setLoading(false) // Hide loading animation
    }

    useEffect(loadAwards, [season]) // Run whenever season changes

    return (
        <div id="awards-container">
            <h1>Awards</h1>
            <label htmlFor="awards-season-select" style={{fontSize: "25px"}}>Season: </label>
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
                loading ? <div>
                    <Loading color="black" size="16vw"/>
                </div> : awards.length === 0 ?
                    <p style={{fontSize: "20px", textAlign: "center"}}>
                        No awards for this season
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
