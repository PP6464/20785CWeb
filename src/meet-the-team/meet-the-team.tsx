import './meet-the-team.css'
import {useEffect, useState} from "react"

function MeetTheTeam() {
    const [members, setMembers] = useState([]) // Save to page state to not lose information when page rerendered

    function loadMembers() { // Load team members data from /data/team-members.json url (corresponds to /public/data/team-members.json)
        fetch("/data/team-members.json").then(members =>
            members.json().catch(_ => {
            }).then(data => {
                setMembers(data)
            })
        )
    }
    useEffect(loadMembers, []) // run on page lauch once

    return (
        <div id="meet-the-team-container">
            <h1 style={{textDecoration: "underline"}}>Meet the Team:</h1>
            <div style={{width: "100%"}}>
                {
                    members.map((member: any, index: number) => (
                        <div key={index} className="member-outer-div"
                             data-on-left={(index % 2 === 0).toString()}>
                            <div className="member-inner-div" data-on-left={(index % 2 === 0).toString()}>
                                <img alt={member.name} src={member.photo} style={{borderRadius: "30%", height: "100px"}}/>
                                <div className="member-info">
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
