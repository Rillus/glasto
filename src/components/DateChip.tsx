export default function DateChip(props: { start: Date, end: Date }) {
  // The festival times are already in BST (British Summer Time)
  // No need for timezone offset calculations as they're already in the correct timezone
  const startDate = new Date(props.start);
  const endDate = new Date(props.end);
  
  const startDay = startDate.toLocaleDateString('en', {weekday: 'short'});
  const endDay = endDate.toLocaleDateString('en', {weekday: 'short'});

  function dayChip(day: string) {
    return (
      <span className={"DateChip-day DateChip-day--"+day.toLowerCase()}>{day}</span>
    );
  }

  return (
    <span className="DateChip">&nbsp;
      {dayChip(startDay)}&nbsp;
      <em className="DateChip-time">
        {startDate.toLocaleTimeString('en', {hour: 'numeric', minute: 'numeric'})}
      </em>
      <span className="DateChip-until"> &rarr; </span>
      {startDay !== endDay &&
        dayChip(endDay)
      }&nbsp;
      <em className="DateChip-time">
        {endDate.toLocaleTimeString('en', {hour: 'numeric', minute: 'numeric'})}
      </em>
      &nbsp;
    </span>
  );
}
