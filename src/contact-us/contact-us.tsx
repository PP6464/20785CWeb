import './contact-us.css'
import {useEffect, useState} from "react"
import Loading from '../loading/loading'

function ContactUs() {
    const [teamContacts, setTeamContacts] = useState([]) // Team contact details
    const [individualContacts, setIndividualContacts] = useState([]) // Contact details for each team member individually
    const [loading, setLoading] = useState(false) // Show or hide loading animation

    function loadContactInfo() {
        setLoading(true) // Show loading animation
        fetch("/data/contacts.json").then(contacts => {
            contacts.json().catch(_ => {
            }).then((data: any) => {
                setTeamContacts(data["team"])
                setIndividualContacts(data["individual"])
                setLoading(false) // Hide loading animation
            })
        }) // Loads contact details from /data/contacts.json url (corresponds to public/data/contacts.json)
    }

    useEffect(loadContactInfo, []) // run on page launch once

    return (
        <div id="contact-us-container">
            <h1 style={{textDecoration: "underline", fontWeight: "bold", marginBottom: "0"}}>Contact Us:</h1>
            {loading ? <div></div> : <h3 style={{fontSize: "30px"}}>Team</h3>}
            {
                // Renders team contact details with image, value, name and redirect (see /public/data/contact.json for example)
                loading ? <Loading size="16vw" color="black" inAppBar={false}/> : teamContacts.map((contact: any, index: number) => (
                    <a className="team-contact-link" key={index} href={contact.redirect} target="_blank"
                       rel="noreferrer">
                        <img src={contact.image} alt={contact.name}
                             style={{borderRadius: "30%", height: "50px", paddingRight: "10px"}}/>
                        <h3>{contact.name}: {contact.value}</h3>
                    </a>
                ))
            }
            {loading ? <div></div> : <h3 style={{fontSize: "30px"}}>Individuals</h3>}
            <div style={{display: "flex", width: "20vw", flexDirection: "column", justifyContent: "flex-start"}}>
                {
                    // Render Discord and email contact details for each member of team (with corresponding redirects)
                    loading ? <div></div> : individualContacts.map((contact: any, index: number) => (
                        <div key={index} className="individual-contact-outer">
                            <h3>{contact.name}</h3>
                            <div className="individual-contact-details">
                                <a href={`mailto:${contact.email}`}>
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/000/581/999/original/email-icon-vector-illustration.jpg"
                                        alt="EMAIL" style={{height: "30px", paddingRight: "10px"}}/>
                                    Email: {contact.email}
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ContactUs
