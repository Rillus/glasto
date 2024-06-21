import { Link } from "react-router-dom";

import "./_Nav.scss";
import {useEffect} from "react";

function Nav (props) {
  // highlight the route if active
  // function isActive(route) {
  //   console.log(window.location.pathname, route.path);
  //   return window.location.pathname === route.path ? "isActive" : "";
  // }
  //
  // // watch to see if the route changes
  // useEffect(() => {
  //   console.log("Route changed");
  // }, [window.location]);

  return (
    <nav className="Nav">
      {props.routes.map((route, index) => {
        if (route.inNav) {
          return (
            <Link className={`Nav-item`} key={index} to={route.path}>{route.name}</Link>
          );
        } else {
          return null;
        }
      })}
    </nav>
  );
}

export default Nav;
