import React from 'react';
import data from '../../data/g2023 2023-06-08.json';
import StageChip from '../StageChip/StageChip';
import ActGrid from "../ActGrid";
import Url from "../../helpers/url";

function Stage() {
  const url = window.location.pathname.split('/')[2];

  const stages = data.locations.map((location, index) => {
    return {
      id: index+1,
      name: location.name,
      events: location.events
    }
  });

  const stage = stages.filter((stage, index) => {
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

  console.log(stage);

  return <div>
      <h1 className="u-text-center">
        <StageChip name={stage.name} id={stage.id} />
      </h1>
      <p>{stage.description}</p>
      <ActGrid data={stage.events}/>
    </div>
}

export default Stage;
