import React, {useState} from 'react';
import StageChip from '../StageChip/StageChip';

import {Data, Location} from '../../../types/act';

import './_Stages.scss';

function Stages({data}: {data: Data}) {
  const initialStages = data.locations.map((location, index) => {
    return {
      id: index+1,
      name: location.name,
    }
  })

  const [search, setSearch] = useState('');
  const [stages, setStages] = useState(initialStages);

  const [errorMessage, setErrorMessage] = useState('');

  return <div className="Stages">
      <h1 className="Stages-heading u-text-center">
        Stages
      </h1>

      <div className={"Search"}>
        <input
          className={"Input"}
          type={"text"}
          data-testid={"Search"}
          aria-label={"Search for a stage"}
          placeholder={"Search for a stage"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (e.target.value.length === 0) {
              setStages(initialStages)
            } else {
              setStages(initialStages.filter((stage: Location) => stage.name.toLowerCase().includes(e.target.value.toLowerCase())));
            }
          }}
        />
      </div>

      <div className="Stages-list">
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
