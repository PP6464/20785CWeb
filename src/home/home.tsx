import './home.css'
import {useEffect, useState} from 'react'
import {collection, onSnapshot} from 'firebase/firestore'
import {firestore} from '../firebase/firebase';
import Loading from '../loading/loading';

type Feed = {
    title: string,
    value: string,
    type: string,
    time: string,
}

function Home() {
    const [feeds, setFeeds] = useState<Feed[]>([]) // Feeds for the home page
    const [category, setCategory] = useState("all") // Whether text, video or all feeds
    const [loading, setLoading] = useState(false)

    function loadFeeds() {
        setLoading(true) // Show loading animation
        onSnapshot(collection(firestore, "home"), (snapshot) => {
            setFeeds(snapshot.docs
                .filter((e) => e.data().type !== (category === "text" ? "video" : category === "video" ? "text" : "")) // Filter for relevant type of feed
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
        }) // Listen to feeds
        setLoading(false) // Hide loading animation
    }

    useEffect(loadFeeds, [category])

    return (
        <div id="home-container">
            <h1>Home</h1>
            <select style={{fontSize: "25px"}} onChange={(e) => {
                setCategory(e.target.value)
            }}>
                <option value="all">All</option>
                <option value="video">Video</option>
                <option value="text">Text</option>
            </select>
            {
                loading ? <Loading size="16vw" color="black"/> : feeds.map((feed: Feed, index: number) => (
                    <div key={index} className="feed-outer">
                        <h1>{feed.title}</h1>
                        <h3>{feed.time}</h3>
                        <p>{feed.type}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Home