import React, {useEffect, useMemo, useState} from "react";
import ActGrid from "../ActGrid";
import {Loader} from "../Loader";
import styles from "./Acts.module.scss";

// import types
import {Act, Data} from "../../../types/act";

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
  const [acts, setActs] = useState<Act[]>([]);
  const [actGridOptions] = useState({showStages: true});
  const [selectedDay, setSelectedDay] = useState('wed');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const take = 20;

  const dayTimes: DayTimes = useMemo(() => {
    return {
      all: {
        start: new Date('2024-06-26T00:00:00.000Z'),
        end: new Date('2024-07-01T12:00:00.000Z')
      },
      wed: {
        start: new Date('2024-06-26T00:00:00.000Z'),
        end: new Date('2024-06-27T05:00:00.000Z')
      },
      thu: {
        start: new Date('2024-06-27T00:00:00.000Z'),
        end: new Date('2024-06-28T05:00:00.000Z')
      },
      fri: {
        start: new Date('2024-06-28T00:00:00.000Z'),
        end: new Date('2024-06-29T05:00:00.000Z')
      },
      sat: {
        start: new Date('2024-06-29T00:00:00.000Z'),
        end: new Date('2024-06-30T05:00:00.000Z')
      },
      sun: {
        start: new Date('2024-06-30T00:00:00.000Z'),
        end: new Date('2024-06-31T05:00:00.000Z')
      },
      mon: {
        start: new Date('2024-06-31T00:00:00.000Z'),
        end: new Date('2024-07-01T12:00:00.000Z')
      }
    }
  }, []);

  useEffect(() => {
    // get page, search and selectedDay from url
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    let searchParam = urlParams.get('search');
    const selectedDayParam = urlParams.get('selectedDay');

    if (pageParam) {
      setPage(parseInt(pageParam));
    }

    if (searchParam && searchParam !== 'null') {
      setSearch(searchParam);
    } else {
      searchParam = '';
    }

    if (selectedDayParam) {
      setSelectedDay(selectedDayParam);
    }

    window.history.pushState({}, '', `?page=${page}&search=${searchParam}&selectedDay=${selectedDay}`);
  }, [setPage, page, selectedDay, setSearch]);

  useEffect(() => {
    const dataActs = data.locations
      .map((location, locationIndex) => {
        return location.events.map((act: any) => {
          return {
            ...act,
            location: {
              name: location.name,
              id: locationIndex
            }
          };
        });
      })
      .flat();
    // console.log('data', dataActs);

    const allActs: Act[] = dataActs
      .filter((act) => {
        if (search) {
          return act.name.toLowerCase().includes(search.toLowerCase());
        }
        return true;
      })
      .filter((act) => {
        const actStart = new Date(act.start);
        let returnAct = false;

        if (selectedDay === '') {
          return false;
        }

        // ensure day is selected
        if (selectedDay.split(',').length === 0) {
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
        const aStart = new Date(a.start).getSeconds();
        const bStart = new Date(b.start).getSeconds();
        return aStart - bStart;
      });

    // console.log('allActs', allActs.slice((page - 1) * take, page * take));
    const updatedActs: Act[] = allActs.slice((page - 1) * take, page * take);
    setActs(updatedActs);
  }, [data, selectedDay, search, page, dayTimes]);

  function toggleDay(day: string) {
    // there can be only be one selected day
    let selectedDay = day;
    setSelectedDay(selectedDay);
    window.history.pushState({}, '', `?page=${page}&search=${search}&selectedDay=${selectedDay}`);
  }

  function DaySelector() : JSX.Element {
    const days = ['wed', 'thu', 'fri', 'sat', 'sun', 'mon'];

    let dayClass = (day: string) => {
      let daySelectorClass = 'Button DateChip-day DateChip-day--';
      daySelectorClass += day;
      // cycle through selectedDays and see if this day is in there
      if (selectedDay !== day) {
        daySelectorClass += ' isInactive';
      }

      return daySelectorClass;
    }

    return (
      <div className={"ButtonGroup"} style={{marginLeft: '12px'}}>
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

  return <div>
      <div className={"Search"}>
        Search:
        <input
          className={"Input"}
          type={"text"}
          id={"actSearch"}
          aria-label={"Search for an act"}
          placeholder={"Search for an act. Minimum 3 characters. Searches on full words only. i.e. 'The' will not return 'Theatre'"}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              if (acts.length === 0){
                setIsLoading(true)
              }
            } else if (e.target.value.length >= 3) {
              // setIsLoading(true)
              const search = e.target.value;
              console.log('search:', search);
              setSearch(search);
            } else {
              console.log('3 or more characters required');
              setIsLoading(false)
              setActs([]);
            }
          }}
        />

        <DaySelector />
      </div>

      <ActGrid
        data={acts}
        options={actGridOptions} />

      <div className={styles.Acts_noResultsWrapper}>
        <div className={styles.Acts_noResultsInner}>
          {acts.length === 0 && (
            <p className={styles.Acts_noResults_text}>No acts found.</p>
          )}
          {isLoading &&
            (
                <Loader size={"100px"} />
            )
          }
        </div>
      </div>
    </div>;
}

export default Acts;
