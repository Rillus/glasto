import React, {ReactElement, useEffect, useMemo, useState, useRef} from "react";
import ActGrid from "../ActGrid";
import {Loader} from "../Loader";
import styles from "./Acts.module.scss";

// import types
import {EventType, Data} from "../../../types/act";
import {useParams} from "react-router-dom";

interface ActsProps {
  data: Data;
}

interface DayTimes {
  [key: string]: {
    start: Date;
    end: Date;
  };
}

const Acts: React.FC<ActsProps> = ({data}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [acts, setActs] = useState<EventType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string>(useParams().day ?? 'wed');
  const [search, setSearch] = useState<string>(useParams().search ?? '');
  const [errorMessage, setErrorMessage] = useState<string>('')
  const mainElement = useRef<HTMLElement>(null);

  let defaultPageAsString = useParams().page;
  let defaultPage: number;
  if (defaultPageAsString === undefined) {
    defaultPage = 1;
  } else {
    defaultPage = parseInt(defaultPageAsString);
  }
  const [page, setPage] = useState<number>(defaultPage);

  const take = 20;

  const dayTimes: DayTimes = useMemo(() => {
    return {
      all: {
        start: new Date('2025-06-25T00:00:00.000Z'),
        end: new Date('2025-06-31T12:00:00.000Z')
      },
      wed: {
        start: new Date('2025-06-25T00:00:00.000Z'),
        end: new Date('2025-06-26T05:00:00.000Z')
      },
      thu: {
        start: new Date('2025-06-26T00:00:00.000Z'),
        end: new Date('2025-06-27T05:00:00.000Z')
      },
      fri: {
        start: new Date('2025-06-27T00:00:00.000Z'),
        end: new Date('2025-06-28T05:00:00.000Z')
      },
      sat: {
        start: new Date('2025-06-28T00:00:00.000Z'),
        end: new Date('2025-06-29T05:00:00.000Z')
      },
      sun: {
        start: new Date('2025-06-29T00:00:00.000Z'),
        end: new Date('2025-06-30T05:00:00.000Z')
      },
      mon: {
        start: new Date('2025-06-30T00:00:00.000Z'),
        end: new Date('2025-06-31T12:00:00.000Z')
      }
    }
  }, []);

  // This useEffect hook is used to update the page, search and selectedDay in the URL
  useEffect(() => {
    window.history.pushState({}, '', `?page=${page}&search=${search}&selectedDay=${selectedDay}`);
  }, [setPage, page, selectedDay, search, setSearch]);

  // This useEffect hook is used to filter the acts based on the search, selectedDay and page
  useEffect(() => {
    const dataActs: EventType[] = data.locations
      .map((location, locationIndex) => {
        const locationEvents: EventType[] = location.events;
        return locationEvents.map((act: EventType) => {
          // if start and end are not present, set them to the default values
          return {
            ...act,
            location: {
              name: location.name,
              id: locationIndex+1
            }
          };
        });
      })
      .flat();

    const allActs: EventType[] = dataActs
      .filter((act) => {
        if (search) {
          return act.name.toLowerCase().includes(search.toLowerCase());
        }
        return true;
      })
      .filter((act: EventType) => {
        const actStart = new Date(act.start);
        let returnAct = false;

        // ensure day is selected
        if (selectedDay.split(',').length === 0 || selectedDay === '') {
          return false;
        }

        // for each selected day, check if the act is within the day
        selectedDay.split(',').forEach((day) => {
          const {start, end} = dayTimes[day];
          if (actStart >= start && actStart <= end) {
            returnAct = true;
          }
        });

        return returnAct;
      })
      .sort((a, b) => {
        const aStart = new Date(a.start).getTime();
        const bStart = new Date(b.start).getTime();
        return aStart - bStart;
      });

    const totalPageCount = Math.ceil(allActs.length / take);

    if (totalPages === 0 || totalPages !== totalPageCount) {
      setTotalPages(totalPageCount);
    }

    if (page > totalPageCount && totalPages > 0) {
      setPage(totalPageCount);
      return;
    }

    // the first act should be 10 pages back
    const maxPagesToShow = 10;
    const firstActIndex = page > maxPagesToShow ? (page - 10) * take : 0;
    const lastActIndex = page * take;

    const updatedActs: EventType[] = allActs.slice(firstActIndex, lastActIndex);
    setActs(updatedActs);
    if (allActs.length === 0) {
      setErrorMessage('No results found');
    }
  }, [data, selectedDay, search, page, dayTimes, totalPages]);

  // lazy load next page when scrolled to the bottom
  useEffect(() => {
    const handleScroll = () => {
      // get mainElement height
      if (!mainElement.current) {
        return;
      }

      if (
        document.documentElement.scrollTop >= mainElement.current.offsetHeight - window.innerHeight
      ) {
        if (page < totalPages) {
          setPage(page + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, mainElement, totalPages]);

  function toggleDay(day: string) {
    // selectedDay can be a comma separated list of days
    let newSelectedDay = selectedDay;
    let currentlySelectedDays = selectedDay.split(',');

    // if the day is already selected, remove it
    if (currentlySelectedDays.includes(day)) {
      if (currentlySelectedDays.length > 1) {
        newSelectedDay = currentlySelectedDays.filter((d) => d !== day).join(',');
      }
    } else {
      // if the day is not selected, add it. Only one day can be selected
      if (currentlySelectedDays.length === 1) {
        newSelectedDay = day;
      } else {
        newSelectedDay = currentlySelectedDays.filter((d) => d !== 'all').join(',');
        newSelectedDay = newSelectedDay + ',' + day;
      }
    }

    setSelectedDay(newSelectedDay);
    setPage(1);
    window.history.pushState({}, '', `?page=${page}&search=${search}&selectedDay=${selectedDay}`);
  }

  function DaySelector() : ReactElement {
    const days = ['wed', 'thu', 'fri', 'sat', 'sun', 'mon'];

    let dayClass = (day: string) => {
      let daySelectorClass = 'Button DateChip-day DateChip-day--';
      daySelectorClass += day;

      // only allow one day to be selected
      // if (selectedDay.split(',').length > 1) {
      //   daySelectorClass += ' isInactive';
      // }

      if (!selectedDay.split(',').includes(day)) {
        daySelectorClass += ' isInactive';
      }

      return daySelectorClass;
    }

    return (
      <div className={"ButtonGroup"}>
        {days.map((day) => (
          <button
            className={dayClass(day)}
            key={day}
            onClick={() => toggleDay(day)}>
            {day}
          </button>
        ))}
      </div>
    )
  }

  return <main ref={mainElement}>
    <div className={"Search"}>
      <input
        className={"Input"}
        type={"text"}
        id={"actSearch"}
        aria-label={"Search for an act"}
        placeholder={"Search for an act"}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          if (e.target.value.length === 0) {
            if (acts.length === 0){
              setIsLoading(true)
            }
          } else if (e.target.value.length >= 3) {
            // setIsLoading(true)
            setErrorMessage('');
          } else {
            setIsLoading(false)
            setErrorMessage('3 or more characters required to search');
            setActs([]);
          }
        }}
      />

      <DaySelector />

      <button
        className={`Button ${styles.Acts_clearButton}`}
        onClick={() => {
          setSearch('');
          setSelectedDay('wed');
        }}
      >
        &times;
      </button>
    </div>

    <ActGrid
      events={acts}
      options={{showStages: true}} />

    <div className={styles.Acts_noResultsWrapper}>
      <div className={styles.Acts_noResultsInner}>
        {errorMessage && (
          <p
            className={styles.Acts_noResults_text}>
            {errorMessage}
          </p>
        )}
        {isLoading &&
          (
              <Loader size={"100px"} />
          )
        }
      </div>
    </div>
  </main>;
}

export default Acts;
