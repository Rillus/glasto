import React from 'react';
// @ts-ignore
import { MapInteractionCSS } from 'react-map-interaction';
import styles from './Maps.module.scss';

function Maps () {
  let [selectedMap, setSelectedMap] = React.useState('official');
  let [mapState, setMapState] = React.useState({
    scale: 0.2,
    translation: { x: -50, y: 0 }
  });

  function updateMap(type: string) {
    setSelectedMap(type);
    let mapWidth = 657;
    // let mapHeight = 620;
    let defaultMapScale = 0.5;
    switch (type) {
      case 'tube':
        setMapState({
          scale: defaultMapScale,
          translation: { x: mapWidth/2 * defaultMapScale, y: 0 }
        });
        break;
      case '1979':
        mapWidth = 800;
        // mapHeight = 577;
        defaultMapScale = 1.58;
        setMapState({
          scale: defaultMapScale,
          translation: { x: 0, y: 0 }
        });
        break;
      case 'official':
      default:
        setMapState({
          scale: 0.2,
          translation: { x: -50, y: 0 }
        });
        break;
    }
    return null;
  }

  function getMap(type: string) {
    switch (type) {
      case 'tube':
        return '/images/glastonderground.jpeg';
        case '1979':
          return '/images/glastonbury-fayre-1979.jpeg';
      case 'official':
      default:
        return '/images/Glastonbury_Map_2025.png';
    }
  }

  return (
    <main className={styles.Maps}>
      <header>
        <h1 className={styles.header}>Maps</h1>
        <div className={`ButtonGroup ${styles.buttonGroup}`}>
          <button
            className={`Button u-minWidth0 ${selectedMap === 'official' ? 'isActive' : 'isInactive'}`}
            onClick={() => { updateMap('official')}}>
            Official map
          </button>
          <button
            className={`Button u-minWidth0 ${selectedMap === 'tube' ? 'isActive' : 'isInactive'}`}
            onClick={() => {updateMap('tube')}}>Tube map
          </button>
          <button
            className={`Button u-minWidth0 ${selectedMap === '1979' ? 'isActive' : 'isInactive'}`}
            onClick={() => {updateMap('1979')}}>1979
          </button>
        </div>
      </header>
      <div className={styles.map}>
        <MapInteractionCSS
          value={mapState}
          onChange={
            (value: {scale: number, translation: {x: number, y: number}}) => {
              console.log('control map', value);
              setMapState( value )
            }
          }>
          <img
            src={
              getMap(selectedMap)
            }
            alt="Glastonbury map"/>
        </MapInteractionCSS>
      </div>
    </main>
  );
}

export default Maps;
