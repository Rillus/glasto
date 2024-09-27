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
    fetch('/g2024.json')
      .then(response => response.json())
      .then(incomingData => {
        console.log('data got!');
        setData(incomingData);
      });
  }, []);

  return (
    <div>
      <header 
        className="mb-0 leading-[39px] pl-[5px] bg-no-repeat bg-top bg-fixed bg-cover flex h-[60px] md:px-0 max-[400px]:h-[40px]"
        style={{
          backgroundImage: `url('images/pyramid-sunset-blur-dark.jpg')`,
        }}
        >
        <h3 className="m-0 ml-1 text-2xl leading-[59px] ml-3 text-[color:var(--backgroundContrast)] max-[420px]:text-lg max-[359px]:text-sm">
          <Link to={'/'} className="text-[color:var(--backgroundContrast)] no-underline hover:no-underline">
            <img 
              src="/logo192-darkmode.png" 
              alt={`Glasto ${year}`}
              className="w-[60px] h-[60px] max-[400px]:hidden"
            />
          </Link>
        </h3>
        <Nav routes={routeArray} />
      </header>
      <section className="p-1 relative z-[1] min-h-[calc(100%-60px)]">
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
