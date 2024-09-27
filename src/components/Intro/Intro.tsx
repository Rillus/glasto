import ActGrid from "../ActGrid";
import {Data, EventType, Location} from "../../../types/act";
import Button from "../Button/Button";

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
      <Button variant={['medium', 'transparent']} onClick={shareLineup}>
        Share your lineup
      </Button>
    );
  }

  return <div>
    <h1 className="text-center">My Lineup</h1>
    {savedActData.length === 0 ? (
      <p style={{textAlign: 'center'}}>
        No saved acts yet. <br />
        Select "Acts" or "Stages" to find add acts to your lineup with the &#9734; button
      </p>
    ) : (
      <>
        <ShareLineupButton />
        <ActGrid events={savedActData} options={{showStages: true}}></ActGrid>
      </>
    )}
    <footer>
      <hr/>
      <div style={{float: 'left'}}>
        v1.2 &nbsp;
      <a
        style={{textAlign: 'center'}}
        href="https://github.com/Rillus/glasto/"
        target="_blank">About this app</a>
      </div>
      <div style={{float: 'right'}}>
        Lineup updated: {props.data?.modified}
      </div>
    </footer>
  </div>
}

export default Intro;
