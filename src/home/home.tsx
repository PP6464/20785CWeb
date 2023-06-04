import './home.css'
import ReactPlayer from "react-player";
import {useEffect, useState} from 'react';

function Home() {
    const [videoURLs, setVideoURLs] = useState([])

    function loadVideos() {

    }

    return (
        <div>
            <h1>Home</h1>
            <ReactPlayer url="https://www.youtube.com/embed/t__G0TSCBdw" controls={true} width="50vw" height="50vh"/>
        </div>
    )
}

export default Home