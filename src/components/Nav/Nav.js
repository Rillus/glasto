import { Link } from "react-router-dom";

import "./_Nav.scss";

function Nav (props) {
  return (
    <nav className="Nav">
      {props.routes.map((route, index) => {
        if (route.inNav) {
          return (
            <Link className="Nav-item" key={index} to={route.path}>{route.name}</Link>
          );
        } else {
          return null;
        }
      })}
    </nav>
  );
}

export default Nav;
