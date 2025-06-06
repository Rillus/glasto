import React, {useEffect, useState} from 'react';
import {Link, Routes, Route} from 'react-router-dom';

import './styles/index.scss';
import Nav from "./components/Nav/Nav";
import Intro from "./components/Intro/Intro";
import Stages from "./components/Stages/Stages";
import Stage from "./components/Stage/Stage";
import Acts from "./components/Acts/Acts";
import Act from "./components/Act/Act";
import Maps from "./components/Maps/Maps";
import Shared from "./components/Shared/Shared";

// data provider for the app
// import defaultData from './public/g2024.json';

function App() {
  const year = new Date().getFullYear();
  let defaultData = {
    locations: []
  };

  const [data, setData] = useState(defaultData);

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
    },
    {
      path: '/shared/:lineup',
      element: <Shared data={data}/>,
      name: 'Shared',
      inNav: false,
      isActive: false
    },
  ];


  // fetch data
  useEffect(() => {
    fetch('/g2025.json')
      .then(response => response.json())
      .then(incomingData => {
        console.log('data got!', incomingData);
        setData(incomingData);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header Header">
        <h3 className="Header-logo">
          <Link to={'/'}>
            <img src="/logo192-darkmode.png" alt={`Glasto ${year}`}/>
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
