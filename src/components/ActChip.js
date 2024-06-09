import Url from "../helpers/url";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function ActChip(props: { name: string, id: string, isSelected: boolean }) {
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const [selectedIcon, setSelectedIcon] = useState(props.isSelected ? (<>&#9733;</>) : (<>&#9734;</>));
  const user = {};

  function addToLineup() {
    if (!isSelected) {
      document.cookie = `act_${props.id}=true`;
      setIsSelected(true);
      setSelectedIcon((<>&#9734;</>));
    } else {
      document.cookie = `act_${props.id}=false`;
      setIsSelected(false);
      setSelectedIcon((<>&#9733;</>));
    }
  }

  useEffect(() => {
    // check if act is in lineup
    const cookie = document.cookie;
    if (cookie.includes(`act_${props.id}=true`)) {
      setIsSelected(true);
      setSelectedIcon((<>&#9733;</>));
    } else {
      setIsSelected(false);
      setSelectedIcon((<>&#9734;</>));
    }
  }, []);


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
