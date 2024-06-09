import DateChip from "./DateChip";
import ActChip from "./ActChip";
import StageChip from "./StageChip/StageChip";

function ActGrid(props: { data: Array<any>, options?: { showStages?: boolean } }) {
  return (
    <div className={props.options?.showStages ? "Grid Grid--showStage" : "Grid"}>
      {props.data.map((act, index) => (
        <div
          className="Grid-row"
          key={index}>
            <ActChip name={act.name} id={index} isSelected={act.savedAct?.length > 0} />
            {props.options?.showStages && (<StageChip name={act.location.name} id={act.location.id} />)}
            <DateChip start={act.start} end={act.end} />
        </div>
      ))}
    </div>
  );
}

export default ActGrid;
