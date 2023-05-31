import './meet-the-team.css';
import {useEffect, useState} from "react";

function MeetTheTeam() {
    const [members, setMembers] = useState([])

    function loadMembers() {
        fetch("/data/team-members.json").then(members =>
            members.json().catch(_ => {
            }).then(data => {
                setMembers(data)
            })
        )
    }

    useEffect(loadMembers, [])

    return (
        <div id="meet-the-team-container">
            <h1>Meet the team</h1>
            <div style={{width: "100%"}}>
                {
                    members.map((member: any) => (
                        <div key={member.id} className="member-outer-div"
                             data-on-left={(member.id % 2 === 0).toString()}>
                            <div className="member-inner-div" data-on-left={(member.id % 2 === 0).toString()}>
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
