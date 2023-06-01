import './sponsor-us.css'
import { useState, useEffect } from 'react'

function SponsorUs() {
    const [sponsors, setSponsors] = useState([]) // Save to page state to not lose information when page rerendered
    const [companyName, setCompanyName] = useState("")
    const [companyDetails, setCompanyDetails] = useState("")

    function loadSponsors() {
        fetch("/data/sponsors.json").then(sponsors => {
            sponsors.json().catch(_ => {
            }).then(data => {
                setSponsors(data)
            })
        })
    }
    useEffect(loadSponsors, [])// run on page lauch once

    return (
        <div id="sponsor-us-container">
            <h1 style={{textDecoration: "underline"}}>Sponsor Us:</h1>
            {
                sponsors.length === 0 ? <h3>No sponsors yet. Become our first sponsor and get your brand on our robot!</h3> : <div>
                    <h1>Our sponsors so far:</h1>
                    {
                        sponsors.map((sponsor: any, index: number) => (
                            <a className="sponsor" key={index} style={{
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
            <p>Contact us at vexoverride@gmail.com</p>
            <input className="sponsor-us-input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name" data-smaller/>
            <textarea className="sponsor-us-input" value={companyDetails} onChange={(e) => setCompanyDetails(e.target.value)} placeholder="Your terms for sponsorship" data-larger/>
            <div id="register-sponsorship" onClick={() => {
                window.open(`mailto:vexoverride@gmail.com?body=Company%3A%20${encodeURIComponent(companyName)}%0d%0aTerms%20for%20sponsorship%3A%20${encodeURIComponent(companyDetails)}&subject=Sponsorship%20interest`)
            }}>
                <h1>Register interest now!</h1>
            </div>
        </div>
    )
}

export default SponsorUs
