import Url from "../helpers/url";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function ActChip(props: { name: string, short: string, isSelected?: boolean}) {
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const [selectedIcon, setSelectedIcon] = useState(props.isSelected ? (<>&#9733;</>) : (<>&#9734;</>));
  const user = {};

  useEffect(() => {
    // check if act is in lineup
    if (localStorage.getItem(`act_${props.short}`) === 'true') {
      setIsSelected(true);
      setSelectedIcon((<>&#9733;</>));
    } else {
      setIsSelected(false);
      setSelectedIcon((<>&#9734;</>));
    }
  }, [props.short]);

  function addToLineup() {
    if (!isSelected) {
      localStorage.setItem(`act_${props.short}`, 'true');
      setIsSelected(true);
      setSelectedIcon((<>&#9733;</>));
    } else {
      localStorage.setItem(`act_${props.short}`, 'false');
      setIsSelected(false);
      setSelectedIcon((<>&#9734;</>));
    }
  }

  return (
    <span className="ActChip">
      {user && (
        <button
          className="ActChip-button"
          aria-label={isSelected ? 'Remove from lineup' : 'Add to lineup'}
          onClick={addToLineup}>
          {selectedIcon}
        </button>
      )}
      <Link to={`/acts/${Url.safeName(props.name)}`}>{props.name}</Link>
    </span>
  );
}
