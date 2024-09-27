import DateChip from "./DateChip";
import ActChip from "./ActChip";
import StageChip from "./StageChip/StageChip";
import {EventType} from "../../types/act";

function ActGrid(props: { events: EventType[]; options?: { showStages: boolean }; }) {

  const events: EventType[] = props.events;

  return (
    <div className="grid">
      {events.map((act: EventType, index: number) => (
        <div
          className="flex justify-between space-x-1 flex-wrap md:flex-nowrap border-b border-dashed border-gray-300 md:border-0"
          key={act.short}>
          <ActChip
            name={act.name}
            short={act.short}
          />

          {props.options?.showStages && act.location && (
            <StageChip name={act.location.name} id={act.location.id} />
          )}

          <DateChip
            start={new Date(act.start)}
            end={new Date(act.end)}
          />
        </div>
      ))}
    </div>
  );
}

export default ActGrid;
