import {Outlet} from "react-router-dom";
import './navbar.css';
import NavbarOption from "./option/navbar-option";
import Loading from "../loading/loading";
import {useEffect, useState} from "react";
import Marquee from "react-fast-marquee";

function Navbar() {
    const [index, setIndex] = useState(0)
    const [sponsors, setSponsors] = useState([])
    const [showDropDown, setShowDropDown] = useState(false)

    function loadSponsors() {
        fetch("/data/sponsors.json").then(sponsors => {
            sponsors.json().catch(_ => {
            }).then(data => {
                setSponsors(data)
            })
        })
    }

    function debounce(fn: () => any, ms: number) {
        let timer: any
        return (_: any) => {
            clearTimeout(timer)
            timer = setTimeout(_ => {
                timer = null
                fn()
            }, ms)
        };
    }

    const [width, setWidth] = useState(0);
    useEffect(() => {
        const windowResizeListener = debounce(() => {
            setWidth(window.innerWidth)
        }, 1000)
        window.addEventListener("resize", windowResizeListener)
    }, []);
    useEffect(loadSponsors, []);

    return (
        <div>
            <nav>
                <div id="top-bar">
                    <div style={{paddingLeft: "2vw", paddingRight: "2vw", display: "flex", alignItems: "center"}}>
                        {width > 650 ?
                            <div id="logo-large-container"><Loading size="5vh" color="white"/>
                                <h1 style={{margin: "0px", padding: "0px", width: "fit-content"}}>Override</h1>
                            </div> :
                            <img src="/assets/logo-light.png" alt="GEAR" id="img-only-logo"/>}
                    </div>
                    <Marquee>
                        {
                            sponsors.map((sponsor: any) => (
                                <a className="sponsor" key={sponsor.id} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "white",
                                    textDecoration: "none"
                                }} href={sponsor.website} target="_blank" rel="noreferrer">
                                    <img src={sponsor.photo} style={{height: "10vh", borderRadius: "50%"}} alt=""/>
                                    <h1 style={{paddingLeft: "1rem", paddingRight: "1rem"}}>{sponsor.name}</h1>
                                </a>
                            ))
                        }
                    </Marquee>
                    <a href="https://www.qebarnet.co.uk" target="_blank" rel="noreferrer">
                        <img src="/assets/qe-logo.png" alt="QE Barnet" style={{padding: "1rem", height: "15vh"}}/>
                    </a>
                </div>
                <div id="navbar-tab-container">
                    <div id="more-div" onClick={() => {
                        setShowDropDown(!showDropDown)
                        let rotatingArrow = document.getElementById("rotating-arrow")!
                        rotatingArrow.style.rotate = showDropDown ? "0deg" : "90deg"
                    }}>
                        <div style={{display: "flex"}}>
                            <h1 style={{paddingRight: "10px"}}>More</h1>
                            <h1 id="rotating-arrow">&gt;</h1>
                        </div>
                    </div>
                    <ul id="navbar-ul">
                        <NavbarOption onSelect={() => setIndex(0)} path="/" selected={index === 0} title="Home"/>
                        <NavbarOption onSelect={() => setIndex(1)} path="/competitions" selected={index === 1}
                                      title="Competitions"/>
                        <NavbarOption onSelect={() => setIndex(2)} path="/meet-the-team" selected={index === 2}
                                      title="Meet the team"/>
                        <NavbarOption onSelect={() => setIndex(3)} path="/contact-us" selected={index === 3}
                                      title="Contact us"/>
                        <NavbarOption onSelect={() => setIndex(4)} path="/sponsor-us" selected={index === 4}
                                      title="Sponsor us"/>
                        <NavbarOption onSelect={() => setIndex(5)} path="/download-app" selected={index === 5}
                                      title="20785C app"/>
                    </ul>
                    <div id="small-navbar" style={{display: showDropDown ? "flex" : "none"}}>
                        <NavbarOption onSelect={() => {
                            setIndex(0);
                            setShowDropDown(false)
                        }} path="/" selected={index === 0} title="Home"/>
                        <NavbarOption onSelect={() => {
                            setIndex(1);
                            setShowDropDown(false)
                        }} path="/meet-the-team" selected={index === 1}
                                      title="Meet the team"/>
                        <NavbarOption onSelect={() => {
                            setIndex(2);
                            setShowDropDown(false)
                        }} path="/contact-us" selected={index === 2}
                                      title="Contact us"/>
                        <NavbarOption onSelect={() => {
                            setIndex(3);
                            setShowDropDown(false)
                        }} path="/sponsor-us" selected={index === 3}
                                      title="Sponsor us"/>
                        <NavbarOption onSelect={() => {
                            setIndex(4);
                            setShowDropDown(false)
                        }} path="/download-app" selected={index === 4}
                                      title="20785C app"/>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Navbar
