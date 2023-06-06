import './download-app.css'
import { useState, useEffect } from 'react'

function DownloadApp() {
    const [appData, setAppData] = useState({
        "version": "1.0.0+1", // Version number
        "features": [], // List of features to display for app
        "link": "https://play.google.com/store/apps/details?id=com.chat.commenter", // Mock link, will be replaced by actual link for 20785C app
    }) // App data

    function loadAppData() {
        fetch("/data/20785C-app.json").then(app => {
            app.json().catch(_ => {}).then((data: any) => {
                setAppData(data)
            })
        })
    } // Load app data from /data/20785C-app.json url (corresponds to /public/data/20785C-app.json)
    useEffect(loadAppData, []) // run on page launch once

    return (
        <div id="download-app-container">
            <h1 style={{textDecoration: "underline", textAlign: "center"}}>Download the 20785C app:</h1>
            <h1 style={{marginBottom: "0"}}>Version: {appData.version}</h1>
            <h1 style={{marginBottom: "0"}}>Features:</h1>
            <ul style={{listStyle: "none", marginBottom: "0"}}>
                {
                    appData.features.map((feature: any, index: number) => (
                        <li className="app-feature">
                            <h3> </h3>
                            <p key={index} style={{fontSize: "20px"}}>{feature}</p>
                        </li>
                    ))
                }
            </ul>
            <div id="download-app-button" onClick={() => window.open(appData.link, "_blank", "noreferrer")}>
                <h1>Download Now!</h1>
            </div>
        </div>
    )
}

export default DownloadApp
