import React from 'react';
import {Link, Routes, Route} from 'react-router-dom';

import './styles/index.scss';
import Nav from "./components/Nav/Nav";
import Intro from "./components/Intro/Intro";
import Stages from "./components/Stages/Stages";
import Stage from "./components/Stage/Stage";
import Acts from "./components/Acts/Acts";
import Act from "./components/Act/Act";
import Maps from "./components/Maps/Maps";

// data provider for the app
import data from './data/g2024.json';

function App() {
  const year = new Date().getFullYear();
  const routeArray = [
    {
      path: '/',
      element: <Intro data={data} />,
      name: 'My Lineup',
      inNav: true,
      isActive: true
    },
    {
      path: '/stages',
      element: <Stages data={data} />,
      name: 'Stages',
      inNav: true,
      isActive: false
    },
    {
      path: '/stages/:name',
      element: <Stage data={data} />,
      name: 'Stage',
      inNav: false,
      isActive: false
    },
    {
      path: '/acts',
      element: <Acts data={data} />,
      name: 'Acts',
      inNav: true,
      isActive: false
    },
    {
      path: '/acts/:name',
      element: <Act data={data} />,
      name: 'Act',
      inNav: false,
      isActive: false
    },
    {
      path: '/map',
      element: <Maps />,
      name: 'Maps',
      inNav: true,
      isActive: false
    }
  ]

  return (
    <div className="App">
      <header className="App-header Header">
        <h3>
          <Link to={'/'}>
            Glasto {year}
          </Link>
        </h3>
        <Nav routes={routeArray} />
      </header>
      <section className="Main">
        <Routes>
          {routeArray.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            )
          })}
        </Routes>
      </section>
    </div>
  );
}

export default App;
