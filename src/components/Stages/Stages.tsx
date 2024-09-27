import React, {useEffect, useState} from 'react';
import StageChip from '../StageChip/StageChip';

import {Data, Location} from '../../../types/act';

function Stages({data}: {data: Data}) {
  const [search, setSearch] = useState('');
  const [stages, setStages]: [Location[], any] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  function getStages() {
    return data.locations.map((location, index) => {
      return {
        id: index+1,
        name: location.name,
      }
    })
  }

  useEffect(() => {
    setStages(getStages());
    console.log('stages', stages);
  }, [data]);

  return <div className="Stages">
      <h1 className="text-xl font-bold text-center">
        Stages
      </h1>

      <div className="p-0.5 m-auto rounded-md border border-white flex items-center">
        <input
          className="py-0.5 px-1 mx-auto rounded-md bg-white/80 border border-white w-full"
          type={"text"}
          data-testid={"Search"}
          aria-label={"Search for a stage"}
          placeholder={"Search for a stage"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (e.target.value.length === 0) {
              console.log('empty')
              setStages(getStages());
            } else {
              console.log('not empty')
              setStages(getStages().filter((stage: Location) => stage.name.toLowerCase().includes(e.target.value.toLowerCase())));
            }
          }}
        />
      </div>

      <div className="m-auto text-center grid justify-evenly items-center justify-items-stretch grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-0 gap-x-4">
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
