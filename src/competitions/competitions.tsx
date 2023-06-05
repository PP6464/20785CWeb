import {useState} from 'react'
import './competitions.css'

interface Event {

}

function Competitions() {
    const [events, loadEvents] = useState([])
    const [season, setSeason] = useState("")


    return (
        <div id="competitions-container">
            <h1>Competitions</h1>
            <label htmlFor="competitions-season-select" style={{fontSize: "25px"}}>Season: </label>
            <select id="competitions-season-select" onChange={(e) => setSeason(e.target.value)} style={{fontSize: "25px", marginBottom: "10px"}}>
                <option value="181">2023-24</option>
                <option value="173">2022-23</option>
                <option value="154">2021-22</option>
                <option value="139">2020-21</option>
                <option value="130">2019-20</option>
                <option value="125">2018-19</option>
            </select>
        </div>
    )
}

export default Competitions
