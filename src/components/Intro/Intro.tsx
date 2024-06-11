import ActGrid from "../ActGrid";
import {Data, EventType, Location} from "../../../types/act";

function Intro(props: {data: Data}) {

  let savedActData: EventType[] = [];

  // get data of saved acts from cookie
  props.data.locations.forEach((location: Location, index: number) => {
    const filteredEvents: EventType[] = location.events.filter((act: EventType) => {
      const cookie = `act_${act.short}`;
      // console.log(localStorage, cookie, localStorage.getItem(cookie))
      return localStorage.getItem(cookie) === 'true';
    });

    if(filteredEvents.length > 0) {
      filteredEvents.forEach((act: EventType) => {
        savedActData.push({
          ...act,
          location: {
            id: index + 1,
            name: location.name
          }
        });
      });
    }
  });

  // reorder saved acts by start time
  savedActData = savedActData.sort((a: EventType, b: EventType) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  return <div>
    {savedActData.length === 0 ? (
      <p style={{textAlign: 'center'}}>
        No saved acts yet. <br />
        Select "Acts" or "Stages" to find add acts to your lineup with the &#9734; button
      </p>
    ) : (
      <ActGrid events={savedActData} options={{showStages: true}}></ActGrid>
    )}
  </div>
}

export default Intro;
