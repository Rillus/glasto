export default function DateChip(props: { start: Date, end: Date }) {
  let startDate = new Date(props.start);
  let startDateOffset = startDate.getTimezoneOffset() * 60000;
  startDate = new Date(startDate.getTime() + startDateOffset);
  const startDay = startDate.toLocaleDateString('en', {weekday: 'short'});
  let endDate = new Date(props.end);
  let endDateOffset = endDate.getTimezoneOffset() * 60000;
  endDate = new Date(endDate.getTime() + endDateOffset);
  const endDay = endDate.toLocaleDateString('en', {weekday: 'short'});

  function dayChip(day: string) {
    const dayClasses = {
      wed: 'bg-[color:var(--wed)] text-white',
      thu: 'bg-[color:var(--thu)] text-black',
      fri: 'bg-[color:var(--fri)] text-black',
      sat: 'bg-[color:var(--sat)] text-black',
      sun: 'bg-[color:var(--sun)] text-white',
      mon: 'bg-[color:var(--mon)] text-white',
    };

    return (
      <span className={`p-0 rounded border border-[color:var(--currentContrast)] inline-block w-[47px] min-w-0 leading-[30px] text-center capitalize ${dayClasses[day.toLowerCase() as keyof typeof dayClasses]}`}>
        {day}
      </span>
    );
  }

  return (
    <span className="inline-block">
      {dayChip(startDay)}&nbsp;
      <em className="p-0 my-0.5 rounded border border-[color:var(--currentContrast)] inline-block w-[90px] leading-[30px] text-center bg-gradient-to-b from-white/10 to-transparent">
        {startDate.toLocaleTimeString('en', {hour: 'numeric', minute: 'numeric'})}
      </em>
      <span> &rarr; </span>
      {startDay !== endDay &&
        dayChip(endDay)
      }&nbsp;
      <em className="p-0 my-0.5 rounded border border-[color:var(--currentContrast)] inline-block w-[90px] leading-[30px] text-center bg-gradient-to-b from-white/10 to-transparent">
        {endDate.toLocaleTimeString('en', {hour: 'numeric', minute: 'numeric'})}
      </em>
    </span>
  );
}
