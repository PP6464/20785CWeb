import {Outlet, useLocation} from "react-router-dom"
import './navbar.css'
import NavbarOption from "./option/navbar-option"
import Loading from "../loading/loading"
import {useEffect, useState} from "react"
import Marquee from "react-fast-marquee"

function Navbar() {
    const [index, setIndex] = useState<number | null>(0) // Selected page index
    const [sponsors, setSponsors] = useState([]) // List of our sponsors
    const [showDropDown, setShowDropDown] = useState(false) // Show the div below more button for all pages
    const location = useLocation() // Use current page location
    const [loading, setLoading] = useState(false) // Show or hide loading animation
    function loadSponsors() {
        setLoading(true) // Show loading animation
        fetch("/data/sponsors.json").then(sponsors => {
            sponsors.json().catch(_ => {
            }).then(data => {
                setSponsors(data)
                setLoading(false) // Hide loading animation
            })
        }) // Load sponsors data from /data/sponsors.json url (corresponds to /public/data/sponsors.json)
    }

    // Only run once every `ms` milliseconds
    function debounce(fn: () => any, ms: number) {
        let timer: any
        return (_: any) => {
            clearTimeout(timer)
            timer = setTimeout(_ => {
                timer = null
                fn()
            }, ms)
        }
    }

    // Hide the div below more button to show pages
    function hideSmallDiv() {
        setShowDropDown(false)
    }

    // Show rolling marquee of sponsors or static div if sponsors width not large enough to require rolling
    function decideMarqueeShouldPlay() {
        try {
            return document.getElementById("sponsor-place")!.clientWidth < (document.documentElement.clientHeight * 0.05 + 10) * sponsors.length
        } catch {
            return true
        }
    }

    // Decide whether or not to use Marquee or h1 for no sponsors text: true is for Marquee, false is for h1
    function marqueeOrH1ForNoSponsorsText() {
        try {
            return document.getElementById("no-sponsors-text")!.clientWidth < 650
        } catch {
            return true
        }
    }

    // Convert route to index
    function indexForRoute(route: string): number | null {
        switch (route) {
            case "/":
                return 0
            case "/awards":
                return 1
            case "/competitions":
                return 2
            case "/meet-the-team":
                return 3
            case "/contact-us":
                return 4
            case "/sponsor-us":
                return 5
            case "/download-app":
                return 6
            default:
                return null
        }
    }

    const [width, setWidth] = useState(0) // Save to page state, so not lost when page rerendered
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
    }, [location]) // Run whenever location changes

    return (
        <header id="navbar-root">
            <nav>
                <div id="top-bar">
                    <a style={{
                        paddingLeft: "2vw",
                        paddingRight: "2vw",
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none"
                    }} href="/" target="_blank" rel="noreferrer">
                        {width > 650 ?
                            <div id="logo-large-container"><Loading inAppBar={true} size="5vh" color="white"/>
                                <h1 style={{margin: "0px", padding: "0px", width: "fit-content"}}>Override</h1>
                            </div> :
                            <img src="/assets/logo-light.png" alt="GEAR" id="img-only-logo"/>}
                    </a>
                    {loading ? <Loading inAppBar={true} size="5vh" color="white"/> : sponsors.length === 0 ?
                        <div style={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            {
                                marqueeOrH1ForNoSponsorsText() ?
                                    <Marquee style={{
                                        width: "50%",
                                        position: "absolute",
                                        left: `${document.getElementById("img-only-logo")?.clientWidth === null ? `${document.getElementById("img-only-logo")!.clientWidth}px` : "30%"}`,
                                        zIndex: "0"
                                    }}>
                                        <h1 id="no-sponsors-text">No sponsors yet. Sponsor
                                            us and get
                                            your brand on our robot!</h1>
                                    </Marquee> : <h1 id="no-sponsors-text">No sponsors yet. Sponsor
                                        us and get
                                        your brand on our robot!</h1>
                            }
                        </div> :
                        <div id="sponsor-place" style={{fontSize: "9px"}}>
                            <h1>Sponsored by: </h1>
                            {
                                decideMarqueeShouldPlay() ? <Marquee>
                                    {
                                        sponsors.map((sponsor: any, index: number) => (
                                            <a className="sponsor" key={index} style={{
                                                display: "flex",
                                                alignItems: "center",
                                                color: "white",
                                                textDecoration: "none"
                                            }} href={sponsor.website} target="_blank" rel="noreferrer">
                                                <img src={sponsor.photo} style={{height: "5vh", borderRadius: "50%"}}
                                                     alt={sponsor.name}/>
                                            </a>
                                        ))
                                    }
                                </Marquee> : <div style={{display: "flex"}}>
                                    {
                                        sponsors.map((sponsor: any, index: number) => (
                                            <a className="sponsor" key={index} style={{
                                                display: "flex",
                                                alignItems: "center",
                                                color: "white",
                                                textDecoration: "none"
                                            }} href={sponsor.website} target="_blank" rel="noreferrer">
                                                <img src={sponsor.photo} style={{height: "5vh", borderRadius: "50%"}}
                                                     alt={sponsor.name}/>
                                            </a>
                                        ))
                                    }
                                </div>
                            }
                        </div>}
                    <a href="https://www.qebarnet.co.uk" target="_blank" rel="noreferrer">
                        <img src="/assets/qe-logo.png" alt="QE Barnet"
                             style={{
                                 padding: "1rem",
                                 height: "15vh",
                                 position: "absolute",
                                 right: "0",
                                 background: "black",
                             }}/>
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
                        <NavbarOption path="/" selected={index === 0} title="Home" onClick={hideSmallDiv}/>
                        <NavbarOption path="/awards" selected={index === 1} title="Awards" onClick={hideSmallDiv}/>
                        <NavbarOption path="/competitions" selected={index === 2} title="Competitions"
                                      onClick={hideSmallDiv}/>
                        <NavbarOption path="/meet-the-team" selected={index === 3} title="Meet the team"
                                      onClick={hideSmallDiv}/>
                        <NavbarOption path="/contact-us" selected={index === 4} title="Contact us"
                                      onClick={hideSmallDiv}/>
                        <NavbarOption path="/sponsor-us" selected={index === 5} title="Sponsor us"
                                      onClick={hideSmallDiv}/>
                        <NavbarOption path="/download-app" selected={index === 6} title="20785C app"
                                      onClick={hideSmallDiv}/>
                    </ul>
                    <div id="small-navbar" style={{display: showDropDown ? "flex" : "none"}}>
                        <NavbarOption path="/" selected={index === 0} title="Home" onClick={hideSmallDiv}/>
                        <NavbarOption path="/awards" selected={index === 1} title="Awards" onClick={hideSmallDiv}/>
                        <NavbarOption path="/competitions" selected={index === 2} title="Competitions"
                                      onClick={hideSmallDiv}/>
                        <NavbarOption path="/meet-the-team" selected={index === 3} title="Meet the team"
                                      onClick={hideSmallDiv}/>
                        <NavbarOption path="/contact-us" selected={index === 4} title="Contact us"
                                      onClick={hideSmallDiv}/>
                        <NavbarOption path="/sponsor-us" selected={index === 5} title="Sponsor us"
                                      onClick={hideSmallDiv}/>
                        <NavbarOption path="/download-app" selected={index === 6} title="20785C app"
                                      onClick={hideSmallDiv}/>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </header>
    )
}

export default Navbar
