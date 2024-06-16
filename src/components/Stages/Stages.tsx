import React from 'react';
import StageChip from '../StageChip/StageChip';

import {Data, Location} from '../../../types/act';

import './_Stages.scss';

function Stages({data}: {data: Data}) {
  const stages: Location[] = data.locations.map((location, index) => {
    return {
      id: index+1,
      name: location.name,
    }
  });

  return <div>
      <h1 className="u-text-center">
        Stages
      </h1>
      <div
        className="Stages">
        {stages.map((stage, index) => (
          <StageChip
            key={index}
            name={stage.name}
            id={stage.id}
          />
        ))}
      </div>
    </div>
}

export default Stages;
