import './awards.css'
import React, {useEffect, useState} from "react"
import Loading from '../loading/loading'
import Chip from '@mui/material/Chip'

type Award = {
    title: string // Type of award
    eventName: string // Which event it was given in
    date: string // When award was given
    season: string // Season when award was given
}

const SEASONS: Record<string, string> = {
    "181": "Over Under",
    "173": "Spin Up",
    "154": "Tipping Point",
    "139": "Change Up",
    "130": "Tower Takeover",
    "125": "Turning Point",
  };

function useFetchAwards(seasons: string[]) {
    const [awards, setAwards] = useState<Award[]>([]);
    const [loading, setLoading] = useState(false);
    const token = process.env.REACT_APP_ROBOT_EVENTS_API_TOKEN;
  
    useEffect(() => {
      setLoading(true);
      const fetches = seasons.map(async (season) => {
        const response = await fetch(
          `https://www.robotevents.com/api/v2/teams/93408/awards?season%5B%5D=${season}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: any[] = (await response.json()).data;
        const awardsLoaded = await Promise.all(
          data.map(async (awardData) => {
            const eventResponse = await fetch(
              `https://www.robotevents.com/api/v2/events/${awardData.event.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            const eventData = await eventResponse.json();
  
            const eventDateString =
              eventData.start !== eventData.end
                ? `${eventData.start.split('T')[0].split('-').reverse().join('/')} to ${eventData.end
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('/')}`
                : eventData.start.split('T')[0].split('-').reverse().join('/');
  
            const seasonName = getSeasonName(eventData.season.id);
  
            return {
              title: awardData.title,
              eventName: awardData.event.name,
              date: eventDateString,
              season: seasonName,
            } as Award;
          })
        );
  
        return awardsLoaded;
      });
  
      Promise.all(fetches)
        .then((allAwards) => {
          const flattenedAwards = allAwards.flat();
          setAwards(flattenedAwards);
          setLoading(false);
        })
        .catch(console.error);
    }, [seasons, token]);
  
    return { awards, loading };
  }

function getSeasonName(seasonId: string): string {
    return SEASONS[seasonId] || "Unknown Season";
}
  
function Awards() {
    const [seasons, setSeasons] = useState(Object.keys(SEASONS)) // Season IDs
    const { awards, loading } = useFetchAwards(seasons)

    return (
        <div id="awards-container">
            <h1 style={{textDecoration: 'underline',fontSize: '40px'}}>Awards</h1>
            <div style={{display: "flex", zIndex: "0"}} id="awards-seasons-chips">
                {Object.entries(SEASONS).map(([id, name]) => (
                    <React.Fragment key={id}>
                        <Chip label={name} onClick={() => {
                            !seasons.includes(id) ? setSeasons(seasons.concat(id)) : setSeasons(seasons.filter((e) => e !== id))
                        }} variant={seasons.includes(id) ? "filled" : "outlined"}/>
                        <div className="awards-chip-padding"></div>
                    </React.Fragment>
                ))}
            </div>
            {
                loading ? <div>
                    <Loading color="black" size="16vw" inAppBar={false}/>
                </div> : awards.length === 0 ?
                    <p style={{fontSize: "20px", textAlign: "center"}}>
                        No awards for the selected seasons
                    </p> : awards.map((award: Award, index: number) => (
                        <div key={index} className="award-outer">
                            <h1>{award.title}</h1>
                            <p>{award.eventName}</p>
                            <p>{award.date} ({award.season})</p>
                        </div>
                    ))
            }
        </div>
    )
}

export default Awards
