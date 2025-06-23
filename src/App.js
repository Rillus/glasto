import React, {useEffect, useState} from 'react';
import {Link, Routes, Route} from 'react-router-dom';

import './styles/index.scss';
import './App.scss';
import Nav from "./components/Nav/Nav";
import Intro from "./components/Intro/Intro";
import Stages from "./components/Stages/Stages";
import Stage from "./components/Stage/Stage";
import Acts from "./components/Acts/Acts";
import Act from "./components/Act/Act";
import Maps from "./components/Maps/Maps";
import Shared from "./components/Shared/Shared";
import OfflineIndicator from "./components/OfflineIndicator/OfflineIndicator";
import Footer from "./components/Footer/Footer";

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
    fetch('https://glasto-lineup.vercel.app/api/lineup-data')
      .then(response => response.json())
      .then(apiResponse => {
        console.log('data got!', apiResponse.data);
        setData(apiResponse.data); // Access nested data property
      })
      .catch(error => {
        console.error('Failed to fetch lineup data:', error);
        // Fallback to local data if API fails
        fetch('/g2025.json')
          .then(response => response.json())
          .then(fallbackData => {
            console.log('Using fallback data');
            setData(fallbackData);
          })
          .catch(fallbackError => {
            console.error('Fallback data also failed:', fallbackError);
          });
      });
  }, []);

  return (
    <div className="App">
      <OfflineIndicator />
      <header className="App-header Header">
        <h3 className="Header-logo">
          <Link to={'/'}>
            <img src="/logo192-darkmode.png" alt={`Glasto ${year}`}/>
          </Link>
        </h3>
        <Nav routes={routeArray} />
      </header>
      <main className="App-main">
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
      </main>
      <Footer data={data} />
    </div>
  );
}

export default App;
