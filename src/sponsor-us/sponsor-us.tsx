import './sponsor-us.css'
import { useState, useEffect } from 'react'

function SponsorUs() {
    const [sponsors, setSponsors] = useState([])

    function loadSponsors() {
        fetch("/data/sponsors.json").then(sponsors => {
            sponsors.json().catch(_ => {
            }).then(data => {
                setSponsors(data)
            })
        })
    }
    useEffect(loadSponsors, [])

    return (
        <div id="sponsor-us-container">
            <h1 style={{textDecoration: "underline"}}>Sponsor Us</h1>
            {
                sponsors.length === 0 ? <h3>No sponsors yet. Become our first sponsor and get your brand on our robot!</h3> : <div>
                    <h1>Our sponsors so far:</h1>
                    {
                        sponsors.map((sponsor: any) => (
                            <a className="sponsor" key={sponsor.id} style={{
                                display: "flex",
                                alignItems: "center",
                                color: "black",
                                textDecoration: "none"
                            }} href={sponsor.website} target="_blank" rel="noreferrer">
                                <img src={sponsor.photo} style={{height: "5vh", borderRadius: "50%"}}
                                    alt=""/>
                                <h3 style={{paddingLeft: "1rem", paddingRight: "1rem"}}>{sponsor.name}</h3>
                            </a>
                        ))
                    }
                </div>
            }
            <h1>To sponsor us:</h1>
        </div>
    )
}

export default SponsorUs
