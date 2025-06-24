import ActGrid from "../ActGrid";
import {Data, EventType, Location} from "../../../types/act";
import HidePastActsToggle from "../HidePastActsToggle/HidePastActsToggle";
import useHidePastActs from "../../hooks/useHidePastActs";
import { filterPastActs } from "../../utils/actFilters";

function Intro(props: {data: Data}) {
  const { hidePastActs, toggleHidePastActs } = useHidePastActs();

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

  // Filter past acts if the setting is enabled
  const filteredActData = filterPastActs(savedActData, hidePastActs);

  const shareLineup = () => {
      // create a string in format act_act1-act2_act3 for cookied acts
      const lineup = savedActData.map(act => `act_${act.short}`).join('-');
      // update url with lineup
      const url = window.location.href.split('/').slice(0, -1).join('/') + '/shared/' + lineup;

      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard');
  };

  const ShareLineupButton = () => {
    return (
      <button onClick={shareLineup} className="Button Button-transparent">
        Share your lineup
      </button>
    );
  }

  return <div>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr auto 1fr', 
      alignItems: 'center', 
      marginBottom: '1rem',
      gap: '1rem'
    }}>
      <div></div>
      <h1 className="u-text-center" style={{ margin: 0 }}>My Lineup</h1>
      <div style={{ justifySelf: 'end' }}>
        <HidePastActsToggle 
          hidePastActs={hidePastActs} 
          onToggle={toggleHidePastActs} 
        />
      </div>
    </div>
    {filteredActData.length === 0 ? (
      <p style={{textAlign: 'center'}}>
        {savedActData.length === 0 
          ? <>No saved acts yet. <br />Select "Acts" or "Stages" to find add acts to your lineup with the &#9734; button</>
          : <>No upcoming acts in your lineup.<br />Toggle "Show past" to see all saved acts.</>
        }
      </p>
    ) : (
      <>
        <ShareLineupButton />
        <ActGrid events={filteredActData} options={{showStages: true}}></ActGrid>
      </>
    )}
  </div>
}

export default Intro;
