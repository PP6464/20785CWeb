import './home.css'
import {useEffect, useState} from 'react'
import {collection, onSnapshot} from 'firebase/firestore'
import {firestore} from '../firebase/firebase';
import Loading from '../loading/loading';
import ReactPlayer from 'react-player';
import Chip from "@mui/material/Chip";

type Feed = {
    title: string,
    value: string,
    type: string,
    time: string,
}

function Home() {
    const [feeds, setFeeds] = useState<Feed[]>([]) // Feeds for the home page
    const [category, setCategory] = useState<string[]>([]) // Text or video feeds or both
    const [loading, setLoading] = useState(false) // Show or hide loading animation
    const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null) // Selected feed

    function loadFeeds() {
        setLoading(true) // Show loading animation
        onSnapshot(collection(firestore, "home"), (snapshot) => {
            setFeeds(snapshot.docs
                .filter((e) => category.includes(e.data().type)) // Filter for relevant type of feed
                .sort((b, a) => b.data().time.nanoseconds > a.data().time.nanoseconds ? -1 : b.data().time.nanoseconds === a.data().time.nanoseconds ? 0 : 1) // Sort by time descending
                .map((feed) => {
                    const dateTime = feed.data().time.toDate()
                    return {
                        title: feed.data().title,
                        value: feed.data().value,
                        type: feed.data().type,
                        time: dateTime.toLocaleTimeString() + " " + dateTime.toDateString(),
                    }
                })
            )
            setLoading(false) // Hide loading animation
        }) // Listen to feeds
    }

    useEffect(loadFeeds, [category]) // Run whenever category changes

    return (
        <div id="home-container">
            {
                selectedFeed === null ?
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                        <h1 style={{textAlign: "center"}}>Home</h1>
                        <div style={{display: "flex"}}>
                            <Chip label="Text" onClick={() => setCategory(category.includes("text") ? category.filter((e) => e !== "text") : category.concat("text"))} variant={category.includes("text") ? "filled" : "outlined"}/>
                        <div style={{padding: "25px 5px"}}></div>
                            <Chip label="Video" onClick={() => setCategory(category.includes("video") ? category.filter((e) => e !== "video") : category.concat("video"))} variant={category.includes("video") ? "filled" : "outlined"}/>
                        </div>
                        {
                            loading ? <Loading size="16vw" color="black" inAppBar={false}/> : feeds.map((feed: Feed, index: number) => (
                                <div key={index} className="feed-outer" onClick={() => {
                                    setSelectedFeed(feed)
                                }}>
                                    <h1>{feed.title}</h1>
                                    <h3>{feed.time}</h3>
                                    <p>{feed.type}</p>
                                </div>
                            ))
                        }
                    </div> : <div id="home-selected-feed-outer">
                        <div style={{
                            display: "flex",
                            position: "relative",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%"
                        }}>
                            <h1 style={{textAlign: "center", maxWidth: "75vw"}}>{selectedFeed.title}</h1>
                            <img src="/assets/close.png" alt="close" id="close-button" onClick={() => {
                                setSelectedFeed(null)
                            }}/>
                        </div>
                        {
                            selectedFeed.type === "video" ?
                                <ReactPlayer url={selectedFeed.value} controls={true} width="90vw" height="54vh"/> :
                                <p style={{textAlign: "justify", margin: "0 20px"}}>{selectedFeed.value}</p>
                        }
                    </div>
            }
        </div>
    )
}

export default Home