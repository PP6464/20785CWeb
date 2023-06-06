import './home.css'
import {useEffect, useState} from 'react'
import { firestore } from '../firebase/firebase'

type Feed = {
    title: string,
    value: string,
    type: string
}

function Home() {
    const [feeds, setFeeds] = useState<Feed[]>([]) // Feeds for the home page
    const [category, setCategory] = useState("all") // Whether text, video or all feeds
    const [loading, setLoading] = useState(false)

    function loadFeeds() {
        setLoading(true) // Show loading animation
        firestore.collection("feeds").where("type", "!=", category === "text" ? "video" : category === "video" ? "text" : "").onSnapshot((snapshot) => {
            setFeeds(snapshot.docs.map((doc) => {
                return {
                    title: doc.data().title,
                    value: doc.data().value,
                    type: doc.data().type,
                }
            }))
        }) // Load feeds from firestore
        setLoading(false) // Hide loading animation
    }

    useEffect(loadFeeds, [category])

    return (
        <div>
            <h1>Home</h1>
            <select onChange={(e) => { setCategory(e.target.value) }}>
                <option value="all">All</option>
                <option value="video">Video</option>
                <option value="text">Text</option>
            </select>

        </div>
    )
}

export default Home