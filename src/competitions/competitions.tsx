import {useState} from 'react'
import './competitions.css'

interface Event {

}

function Competitions() {
    const [events, loadEvents] = useState([])
    const [season, setSeason] = useState([])


    return (
        <div id="competitions-container">
            <h1>Competitions</h1>
        </div>
    )
}

export default Competitions
