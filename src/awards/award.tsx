import './awards.css'
import {useEffect, useState} from "react";

type Award = {
    title: string // Type of award
    eventName: string // Which event it was given in
}

function Awards() {
    const [awards, setAwards] = useState<Award[]>([])
    const [season, setSeason] = useState("181")

    function loadAwards() {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYzM2OWFkZmYxMmI3Y2UzZWNhODQyMDY2YTM4M2ZlZTQ2MzViMzMzMzNhZjI2NWNhOTc2OGU5NTJlMTlhY2M0ZTVmODAwM2Q5ZTlmM2E3M2IiLCJpYXQiOjE2ODU5MDc3MjIuNDI5NDQ1LCJuYmYiOjE2ODU5MDc3MjIuNDI5NDQ3OSwiZXhwIjoyNjMyNjgyNTIyLjQxOTUyMjgsInN1YiI6IjExNTcxMiIsInNjb3BlcyI6W119.f03_cI09hLDArjvpXAczXwlnTLpjofEhUoYuB03Bp4cdjgR97JYJ4z-Hg6eBxb6Hn-bzkybT39_e7ureRADYRWBeO2d7QeFw3RZlHFtN71d1Y-E0xKc-wsekWct3dj2QqfO8cg4_axl_y41jkJD0B2hqiDjiNo-x7I2RSewf4BWhooLW3CwOcI5sQRr34F1SeJW2-5AoUDOqbQAtbzn7sxCaP3ERN3j3LUZgx_3NQ8wVh7ExzZcuyrIHL-bVDrvut2K_OI7uMEFVfqIhiUuoURHYx8kO-eumhsyM3NuAFtliqqj2mkPOc0RV5mDNJtb1-aN80tDWFEsoJAP9ql83PW--ci3E3zG6nqerO_eZ9bzM83eDfADXwH9apyLbaxrIloIutscxhKZW6nlxF8AaWsNTvRduc3lgYSa1bUELB2D4UoUpweCAnUircLWCLZWS8Wn0bVnkRWyOlXOw7G8GwkFYIL78Q5lTAvUKuMu4g9Yh0rIhozdpvydq6dgfp9Uo-bogypb5yWwEmPU3gJcaRZ7xJv0AKl7LgqNCUYbpFwIEVKji9itviuuAAcVsOvcd5wPCIzVq2bdTpHoDJCKxP5RXeTaG30x5EtGFz-ET77cFggfu84orUUAEnynscN6tRpYx01_RRqhiEEBUqrhEBzwaDqT-EZk24rfnT8UBBm8"
        fetch(`https://www.robotevents.com/api/v2/teams/93408/awards?season%5B%5D=${season}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(_awards => {
            _awards.json().catch(_ => {}).then((data: any) => {
                setAwards(data.data.map((award: any) => {
                    return {
                        title: award.title,
                        eventName: award.event.name,
                    }
                }))
            })
        }) // Replace 154 (Tipping Point) for testing with 181 (Over Under) for production code
    }

    useEffect(loadAwards, [season]) // Run once on page launch

    return (
        <div id="awards-container">
            <h1>Awards</h1>
            <label htmlFor="season-select" style={{fontSize: "25px"}}>Season: </label>
            <select id="season-select" onChange={(e) => setSeason(e.target.value)} style={{fontSize: "25px", marginBottom: "10px"}}>
                <option value="181">2023-24</option>
                <option value="173">2022-23</option>
                <option value="154">2021-22</option>
                <option value="139">2020-21</option>
                <option value="130">2019-20</option>
                <option value="125">2018-19</option>
            </select>
            {
                awards.length === 0 ? <p style={{fontSize: "20px", textAlign: "center"}}>No awards for this season</p> : awards.map((award: Award, index: number) => (
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
