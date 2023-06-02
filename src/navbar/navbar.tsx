import {Outlet, useLocation} from "react-router-dom";
import './navbar.css';
import NavbarOption from "./option/navbar-option";
import Loading from "../loading/loading";
import {useEffect, useState} from "react";
import Marquee from "react-fast-marquee";

function Navbar() {
    const [index, setIndex] = useState<number | null>(0) // Save to page state, so not lost when page rerendered
    const [sponsors, setSponsors] = useState([]) // Save to page state, so not lost when page rerendered
    const [showDropDown, setShowDropDown] = useState(false) // Save to page state, so not lost when page rerendered
    const location = useLocation() // Use current page location
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

    function indexForRoute(route: string): number | null {
        switch (route) {
            case "/":
                return 0
            case "/competitions":
                return 1
            case "/meet-the-team":
                return 2
            case "/contact-us":
                return 3
            case "/sponsor-us":
                return 4
            case "/download-app":
                return 5
            default:
                return null
        }
    }

    const [width, setWidth] = useState(0); // Save to page state, so not lost when page rerendered
    useEffect(() => {
        const windowResizeListener = debounce(() => {
            setWidth(window.innerWidth)
        }, 1000)
        setWidth(window.innerWidth)
        window.addEventListener("resize", windowResizeListener) // register window resize listener to ensure correct logo size is used for display width
    }, []) // run on page lauch once
    useEffect(loadSponsors, []) // run on page lauch once
    useEffect(() => {
        setIndex(indexForRoute(location.pathname))
    }, [location])

    return (
        <header id="navbar-root">
            <nav style={{background: "black"}}>
                <div id="top-bar">
                    <a style={{
                        paddingLeft: "2vw",
                        paddingRight: "2vw",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none"
                    }} href="/" target="_blank" rel="noreferrer">
                        {width > 650 ?
                            <div id="logo-large-container"><Loading size="5vh" color="white"/>
                                <h1 style={{margin: "0px", padding: "0px", width: "fit-content"}}>Override</h1>
                            </div> :
                            <img src="/assets/logo-light.png" alt="GEAR" id="img-only-logo"/>}
                    </a>
                    {sponsors.length === 0 ? <div style={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <h1>No sponsors yet. Sponsor us and get your brand on our robot!</h1>
                        </div> :
                        <div id="sponsor-place">
                            <h1 style={{fontSize: "1rem"}}>Sponsored by: </h1>
                            {
                              document.getElementById("sponsor-place")!.offsetWidth < (document.documentElement.clientHeight * 0.09 + 10) * sponsors.length ? <Marquee>
                                    {
                                        sponsors.map((sponsor: any) => (
                                            <a className="sponsor" key={sponsor.id} style={{
                                                display: "flex",
                                                alignItems: "center",
                                                color: "white",
                                                textDecoration: "none"
                                            }} href={sponsor.website} target="_blank" rel="noreferrer">
                                                <img src={sponsor.photo} style={{height: "9vh", borderRadius: "50%"}}
                                                    alt={sponsor.name} />
                                            </a>
                                        ))
                                    }
                                </Marquee> : <div style={{display: "flex"}}>
                                    {
                                        sponsors.map((sponsor: any) => (
                                            <a className="sponsor" key={sponsor.id} style={{
                                                display: "flex",
                                                alignItems: "center",
                                                color: "white",
                                                textDecoration: "none"
                                            }} href={sponsor.website} target="_blank" rel="noreferrer">
                                                <img src={sponsor.photo} style={{height: "9vh", borderRadius: "50%"}}
                                                    alt={sponsor.name} />
                                            </a>
                                            ))
                                    }
                        </div>
                            }
                        </div>}
                    <a href="https://www.qebarnet.co.uk" target="_blank" rel="noreferrer">
                        <img src="/assets/qe-logo.png" alt="QE Barnet" style={{padding: "1rem", height: "15vh"}}/>
                    </a>
                </div>
                <div id="navbar-tab-container">
                    <div id="more-div" onClick={() => {
                        setShowDropDown(!showDropDown) // Show navigation opetions or hide if already displayed
                        let rotatingArrow = document.getElementById("rotating-arrow")!
                        rotatingArrow.style.rotate = showDropDown ? "0deg" : "90deg" // rotate arrow accordingly
                    }}>
                        <div style={{display: "flex"}}>
                            <h1 style={{paddingRight: "10px"}}>More</h1>
                            <h1 id="rotating-arrow">&gt;</h1>
                        </div>
                    </div>
                    <ul id="navbar-ul">
                        <NavbarOption path="/" selected={index === 0} title="Home"/>
                        <NavbarOption path="/about-us" selected={index === 1} title="About us" />
                        <NavbarOption path="/competitions" selected={index === 2} title="Competitions"/>
                        <NavbarOption path="/meet-the-team" selected={index === 3} title="Meet the team"/>
                        <NavbarOption path="/contact-us" selected={index === 4} title="Contact us"/>
                        <NavbarOption path="/sponsor-us" selected={index === 5} title="Sponsor us"/>
                        <NavbarOption path="/download-app" selected={index === 6} title="20785C app"/>
                    </ul>
                    <div id="small-navbar" style={{display: showDropDown ? "flex" : "none"}}>
                        <NavbarOption path="/" selected={index === 0} title="Home"/>
                        <NavbarOption path="/about-us" selected={index === 1} title="About us" />
                        <NavbarOption path="/competitions" selected={index === 2} title="Competitions"/>
                        <NavbarOption path="/meet-the-team" selected={index === 3} title="Meet the team"/>
                        <NavbarOption path="/contact-us" selected={index === 4} title="Contact us"/>
                        <NavbarOption path="/sponsor-us" selected={index === 5} title="Sponsor us"/>
                        <NavbarOption path="/download-app" selected={index === 6} title="20785C app"/>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </header>
    )
}

export default Navbar
