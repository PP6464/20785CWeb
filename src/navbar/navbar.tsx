import {Outlet} from "react-router-dom";
import './navbar.css'
import NavbarOption from "./option/navbar-option";
import Loading from "../loading/loading";
import {useState} from "react";
import * as fs from "fs";

function Navbar() {
    const [index, setIndex] = useState(0)
    const sponsors = JSON.parse(fs.readFileSync("./data/sponsors.json", "utf-8"))

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
                                    <div key={sponsor.id}>{sponsor.name}</div>
                                )
                            )
                        }
                    </div>
                    <img src="/assets/qe-logo.png" alt="QE Barnet" style={{padding: "1rem", height: "15vh"}}
                         onClick={() => {
                         }}/>
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
