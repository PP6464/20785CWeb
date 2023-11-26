import './contact-us.css'
import React, {useEffect, useState} from "react"
import Loading from '../loading/loading'

function ContactUs() {
  const [teamContacts, setTeamContacts] = useState([]) // Team contact details
  const [individualContacts, setIndividualContacts] = useState([]) // Contact details for each team member individually
  const [loading, setLoading] = useState(false) // Show or hide loading animation

  function loadContactInfo() {
    setLoading(true) // Show loading animation
    fetch('/data/contacts.json')
      .then((contacts) => {
        contacts.json().catch((_error) => {}).then((data: any) => {
            setTeamContacts(data['team'])
            setIndividualContacts(data['individual'])
            // Keep loading animation always visible for 1 loop
            setTimeout(() => {
              setLoading(false)
            }, 750) // Set the duration for the loading animation
          })
      }) // Load contact details
  }

  useEffect(loadContactInfo, []); // run on page launch once

  return (
    <div id="contact-us-container">
      <h1 style={{textDecoration: 'underline', fontSize: '40px'}}>Contact Us:</h1>
      {loading ? (
        <Loading inAppBar={false} size="16vw" color="black" />
      ) : (
        <>
          <h3 style={{ fontSize: '30px' }}>Team</h3>
          {teamContacts.map((contact: any, index: number) => (
            <a className="team-contact-link" key={index} href={contact.redirect} target="_blank" rel="noreferrer">
              <img src={contact.image} alt={contact.name} style={{ borderRadius: '30%', height: '50px', paddingRight: '10px' }} />
              <h3>{contact.name}: {contact.value}</h3>
            </a>
          ))}
          <h3 style={{ fontSize: '30px' }}>Individuals</h3>
          <div style={{ display: 'flex', width: '20vw', flexDirection: 'column', justifyContent: 'flex-start' }}>
            {individualContacts.map((contact: any, index: number) => (
              <div key={index} className="individual-contact-outer">
                <h3>{contact.name}</h3>
                <div className="individual-contact-details">
                  <a href={`mailto:${contact.email}`}>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/000/581/999/original/email-icon-vector-illustration.jpg"
                      alt="EMAIL"
                      style={{ height: '30px', paddingRight: '10px' }}
                    />
                    Email: {contact.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ContactUs
