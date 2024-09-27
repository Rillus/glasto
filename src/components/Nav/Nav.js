import { Link, useLocation } from "react-router-dom";

function Nav (props) {
  const location = useLocation();

  function isActive(route) {
    return location.pathname === route.path ? "text-decoration-none border-b-4 border-current" : "";
  }

  return (
    <nav className="m-auto flex flex-end static right-0 md:m-0 md:absolute top-1">
      {props.routes.map((route, index) => {
        if (route.inNav) {
          return (
            <Link 
              className={`list-none h-3 mr-1 last:mr-0 md:last:mr-1 text-decoration-none text-uppercase font-bold transition-border duration-200 border-current hover:border-current hover:border-b-4 ${isActive(route)}`} 
              key={index} 
              to={route.path}>{route.name}</Link>
          );
        } else {
          return null;
        }
      })}
    </nav>
  );
}

export default Nav;
