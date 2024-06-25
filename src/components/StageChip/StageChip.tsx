import Url from "../../helpers/url";
import {Link} from "react-router-dom";

import './_StageChip.scss';

function StageChip({ name, id } : { name: string, id?: number }) {
  if (name === '') {
    return;
  }

  return (
    <Link
      data-testid="StageChip"
      className={"StageChip-name StageChip-name--"+id}
      to={'/stages/'+Url.safeName(name)}>
      {name}
    </Link>
  );
}

export default StageChip;
