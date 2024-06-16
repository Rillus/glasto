import Url from "../../helpers/url";
import {Link} from "react-router-dom";

import './_StageChip.scss';

function StageChip({ name, id } : { name: string, id?: number }) {
  return <span
    data-testid="StageChip"
    className="StageChip">
    {name === '' ? `-` :
      <Link
        className={"StageChip-name StageChip-name--"+id}
        to={'/stages/'+Url.safeName(name)}>
        {name}
      </Link>
    }
  </span>
}

export default StageChip;
