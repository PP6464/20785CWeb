import {Outlet} from "react-router-dom";
import './navbar.css';
import NavbarOption from "./option/navbar-option";
import Loading from "../loading/loading";
import {useEffect, useState} from "react";

function Navbar() {
    const [index, setIndex] = useState(0)
    const [sponsors, setSponsors] = useState([])

    function loadSponsors() {
        fetch("/data/sponsors.json").then(sponsors => {
            sponsors.json().catch(_ => {
            }).then(data => {
                setSponsors(data)
            })
        })
    }

    useEffect(loadSponsors, []);

    return (
        <div>
            <nav>
                <div id="top-bar">
                    <div style={{paddingLeft: "2vw", paddingRight: "2vw"}}>
                        <Loading size="5vh" color="white"/>
                    </div>
                    <div id="sponsors">
                        {
                            sponsors.map((sponsor: any) => (
                                <a key={sponsor.id} style={{display: "flex", alignItems: "center", color: "white", textDecoration: "none"}} href={sponsor.website} target="_blank" rel="noreferrer">
                                    <img src={sponsor.photo} style={{height: "10vh", borderRadius: "50%"}} alt=""/>
                                    <h1 style={{paddingLeft: "1rem", paddingRight: "1rem"}}>{sponsor.name}</h1>
                                </a>
                            ))
                        }
                    </div>
                    <a href="https://www.qebarnet.co.uk" target="_blank" rel="noreferrer">
                        <img src="/assets/qe-logo.png" alt="QE Barnet" style={{padding: "1rem",height: "15vh"}}/>
                    </a>
                </div>
                <ul id="navbar-ul">
                    <NavbarOption onSelect={() => setIndex(0)} path="/" selected={index === 0} title="Home"/>
                    <NavbarOption onSelect={() => setIndex(1)} path="/meet-the-team" selected={index === 1}
                                  title="Meet the team"/>
                    <NavbarOption onSelect={() => setIndex(2)} path="/contact-us" selected={index === 2}
                                  title="Contact us"/>
                    <NavbarOption onSelect={() => setIndex(3)} path="/sponsor-us" selected={index === 3}
                                  title="Sponsor us"/>
                    <NavbarOption onSelect={() => setIndex(4)} path="/download-app" selected={index === 4}
                                  title="20785C app"/>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Navbar
