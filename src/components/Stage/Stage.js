import React, {useEffect} from 'react';
// import data from '../../data/g2023 2023-06-08.json';
import StageChip from '../StageChip/StageChip';
import ActGrid from "../ActGrid";
import Url from "../../helpers/url";
import {useParams} from "react-router-dom";

function Stage(props) {
  const { name } = useParams();
  const url = name
  const data = props.data;

  const [stage, setStage] = React.useState(null);

  useEffect(() => {
    const stages = data.locations.map((location, index) => {
      return {
        id: index+1,
        name: location.name,
        events: location.events
      }
    });

    const matchingStage = stages.filter((stage, index) => {
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
  }, []);

  if (!stage) {
    return <div>
      <h1 className="u-text-center">Stage not found</h1>
    </div>
  }

  return <div>
      <h1 className="u-text-center">
        <StageChip name={stage.name} id={stage.id} />
      </h1>
      <p>{stage.description}</p>
      <ActGrid data={stage.events}/>
    </div>
}

export default Stage;
