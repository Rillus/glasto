import React, {useEffect} from 'react';
// import data from '../../data/g2023 2023-06-08.json';
import StageChip from '../StageChip/StageChip';
import ActGrid from "../ActGrid";
import Url from "../../helpers/url";
import {useParams} from "react-router-dom";
import {Data, Location} from "../../../types/act";

function Stage(props: {data: Data}) {
  const { name } = useParams();
  const url = name
  const data = props.data;

  const [stage, setStage] = React.useState<Location | null>(null);

  useEffect(() => {
    const stages: Location[] = data.locations.map((location, index) => {
      return {
        id: index+1,
        name: location.name,
        events: location.events
      }
    });

    const matchingStage: Location = stages.filter((stage, index) => {
      if (Url.safeName(stage.name) === url) {
        return {
          id: stage.id,
          url: url,
          name: stage.name,
          events: stage.events
        }
      }
      return null;
    })[0];

    setStage(matchingStage);
  }, [data, url]);

  if (!stage) {
    return <div>
      <h1 className="u-text-center">Stage not found</h1>
    </div>
  }

  return <div>
      <h1 className="u-text-center">
        <StageChip name={stage.name} id={stage.id} />
      </h1>
      <ActGrid events={stage.events}/>
    </div>
}

export default Stage;
