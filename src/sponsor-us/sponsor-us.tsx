import './sponsor-us.css'
import {useState, useEffect} from 'react'

function SponsorUs() {
    const [sponsors, setSponsors] = useState([]) // Save to page state to not lose information when page rerendered
    const [companyName, setCompanyName] = useState("")
    const [companyDetails, setCompanyDetails] = useState("")
    const [companyEmail, setCompanyEmail] = useState("")

    function loadSponsors() {
        fetch("/data/sponsors.json").then(sponsors => {
            sponsors.json().catch(_ => {
            }).then(data => {
                setSponsors(data)
            })
        })
    }

    useEffect(loadSponsors, []) // run on page lauch once

    return (
        <div id="sponsor-us-container">
            <h1 style={{textDecoration: "underline"}}>Sponsor Us:</h1>
            {
                sponsors.length === 0 ?
                    <h3>No sponsors yet. Become our first sponsor and get your brand on our robot!</h3> : <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                        <h1 style={{textAlign: "center"}}>Our sponsors so far:</h1>
                        {
                            sponsors.map((sponsor: any, index: number) => (
                                <a className="sponsor-us-sponsor" key={index} style={{
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
            <h1 style={{textAlign: "center"}}>To sponsor us:</h1>
            <p style={{textAlign: "center"}}>Contact us at vexoverride@gmail.com</p>
            <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <input type="text" className="sponsor-us-input" value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name" data-smaller="true" required/>
                <input type="email" className="sponsor-us-input" value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    placeholder="Enter company email (so we can email you back)" data-medium="true" required/>
                <textarea className="sponsor-us-input" value={companyDetails}
                    onChange={(e) => setCompanyDetails(e.target.value)} placeholder="Your terms for sponsorship"
                    data-larger="true" required/>
                <div id="register-sponsorship" onClick={() => {
                    window.open(`mailto:vexoverride@gmail.com?body=Company%3A%20${encodeURIComponent(companyName)}%0d%0aTerms%20for%20sponsorship%3A%20${encodeURIComponent(companyDetails)}%0d%0aEmail%20to%20email%20back%20on%3A%20${encodeURIComponent(companyEmail)}&subject=Sponsorship%20interest`)
                }}>
                    <h1>Register interest now!</h1>
                </div>
            </form>
        </div>
    )
}

export default SponsorUs
