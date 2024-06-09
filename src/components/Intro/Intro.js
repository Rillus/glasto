import ActGrid from "../ActGrid";
import {Link} from "react-router-dom";

function Intro() {

  const data = {
    filteredSavedActs: [
      {
        id: "1",
        name: "Foo Fighters",
        location: {
          id: "1",
          name: "Pyramid Stage"
        },
        start: "2024-06-28T21:00:00+01:00",
        end: "2024-06-29T00:00:00+01:00"
      }
    ]
  }

  return <div>
    {data.filteredSavedActs.length === 0 ? (
      <p>No saved acts yet. Select one of the menu links to view and add some, why don't you?
      </p>
    ) : (
      <ActGrid data={data.filteredSavedActs} options={{showStages: true}}></ActGrid>
    )}
  </div>
}

export default Intro;
