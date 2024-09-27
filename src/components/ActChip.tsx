import Url from "../helpers/url";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "./Button/Button";

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
    <span className="inline-flex flex-auto bg-lightGradient border border-[color:var(--currentContrast)] leading-[30px] mx-0 my-0.5 px-0.5 py-0.25 rounded-[5px] border-solid;">
      {user && (
        <Button
          aria-label={isSelected ? 'Remove from lineup' : 'Add to lineup'}
          variant={['transparent', 'icon']}
          onClick={addToLineup}>
          {selectedIcon}
        </Button>
      )}
      <Link to={`/acts/${Url.safeName(props.name)}`} data-testid="ActName" className="text-white inline-block w-full no-underline self-center">{props.name}</Link>
    </span>
  );
}
