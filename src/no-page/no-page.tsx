import './no-page.css'
import {Link} from "react-router-dom"

function NoPage() {
    return (
        <div id="no-page-container">
            <h1>404: Could not find url</h1>
            <p>Try one of: </p>
            <ul id="list-of-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/awards">Awards</Link>
                </li>
                <li>
                    <Link to="/competitions">Competitions</Link>
                </li>
                <li>
                    <Link to="/contact-us">Contact Us</Link>
                </li>
                <li>
                    <Link to="/sponsor-us">Sponsor Us</Link>
                </li>
                <li>
                    <Link to="/meet-the-team">Meet the team</Link>
                </li>
                <li>
                    <Link to="/download-app">20785C App</Link>
                </li>
            </ul>
        </div>
    )
}

export default NoPage
