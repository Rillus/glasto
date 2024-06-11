import DateChip from "./DateChip";
import ActChip from "./ActChip";
import StageChip from "./StageChip/StageChip";
import {EventType} from "../../types/act";

function ActGrid(props: { events: EventType[]; options?: { showStages: boolean }; }) {

  const events: EventType[] = props.events;

  return (
    <div className={props.options?.showStages ? "Grid Grid--showStage" : "Grid"}>
      {events.map((act: EventType, index: number) => (
        <div
          className="Grid-row"
          key={index}>
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
