import { Link, useLocation } from "react-router-dom";

import "./_Nav.scss";

function Nav (props) {
  const location = useLocation();

  function isActive(route) {
    return location.pathname === route.path ? "isActive" : "";
  }

  return (
    <nav className="Nav">
      {props.routes.map((route, index) => {
        if (route.inNav) {
          return (
            <Link className={`Nav-item ${isActive(route)}`} key={index} to={route.path}>{route.name}</Link>
          );
        } else {
          return null;
        }
      })}
    </nav>
  );
}

export default Nav;
