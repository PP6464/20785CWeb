import './meet-the-team.css'
import React, {useEffect, useState} from "react"
import Loading from '../loading/loading'

function MeetTheTeam() {
    const [members, setMembers] = useState([]) // List of team members
    const [loading, setLoading] = useState(true) // Show loading animation or not
    const [showLoadingAnimation, setShowLoadingAnimation] = useState(true)

    function loadMembers() {
setLoading(true) // Show loading animation
        fetch("/data/team-members.json").then(members =>
            members.json().catch(_ => {
            }).then(data => {
                setMembers(data);
                // Keep loading animation always visible for 1 loop
                setShowLoadingAnimation(true);
                setTimeout(() => {
                    setLoading(false);
                    setShowLoadingAnimation(false);
                }, 500); // Set the duration for the loading animation
            })
        ) // Load team members data from /data/team-members.json url (corresponds to /public/data/team-members.json)
    }
useEffect(loadMembers, []) // run on page lauch once

    return (
        <div id="meet-the-team-container">
            <h1 style={{textDecoration: 'underline',fontSize: '40px'}}>Meet the Team:</h1>
            <div style={{width: "100%"}}>
                {
                    (loading || showLoadingAnimation) ? <Loading size="16vw" color="black" inAppBar={false} /> : members.map((member: any, index: number) => (
                        <div key={index} className="member-outer-div"
                            data-on-left={(index % 2 === 0).toString()}>
                            <div className="member-inner-div" data-on-left={(index % 2 === 0).toString()}>
                                <img alt={member.name} src={member.photo} style={{borderRadius: "30%", height: "100px"}}/>
                                <div className="member-info" data-on-left={(index % 2 === 0).toString()}>
                                    <h1>{member.name}</h1>
                                    <h3>{member.role}</h3>
                                    <p>{member.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MeetTheTeam
