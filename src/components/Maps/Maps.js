import React from 'react';
import { MapInteractionCSS } from "react-map-interaction";

function Maps () {
  let [selectedMap, setSelectedMap] = React.useState('official');
  let [mapState, setMapState] = React.useState({
    scale: 0.2,
    translation: { x: -50, y: 0 }
  });

  function updateMap(type: string) {
    setSelectedMap(type);
    switch (type) {
      case 'official':
        setMapState({
          scale: 0.2,
          translation: { x: -50, y: 0 }
        });
        break;
      case 'tube':
        let mapWidth = 657;
        let mapHeight = 620;
        let defaultMapScale = 0.5;
        setMapState({
          scale: defaultMapScale,
          translation: { x: mapWidth/2 * defaultMapScale, y: 0 }
        });
        break;
      default:
        break;
    }
    return null;
  }

  return (
    <main style={{position: 'relative', minHeight: '100%'}}>
      <header>
        <h1 style={{display: 'inline-block'}}>Maps</h1>
        <div className="ButtonGroup" style={{marginBottom: '12px', display: 'inline-block', marginLeft: '12px'}}>
          <button
            className={`Button ${selectedMap === 'official' ? 'isActive' : 'isInactive'}`}
            onClick={() => { updateMap('official')}}>
            Official map
          </button>
          <button
            className={`Button ${selectedMap === 'tube' ? 'isActive' : 'isInactive'}`}
            onClick={() => {updateMap('tube')}}>Tube map
          </button>
        </div>
      </header>
      <div style={{
        border: '1px solid white',
        borderRadius: '5px',
        position: 'fixed',
        bottom: '12px',
        top: '152px',
        right: '12px',
        left: '12px',
        backgroundColor: 'white'
      }}>
        <MapInteractionCSS
          value={mapState}
          onChange={
            (value) => {
              console.log('control map', value);
              setMapState( value )
            }
          }>
          <img
            src={
              selectedMap === 'official' ?
                "images/Glastonbury-Webmap-2023_V1.5.png" :
                "images/glastonderground.jpeg"
            }
            alt="Glastonbury map"/>
        </MapInteractionCSS>
      </div>
    </main>
  );
}

export default Maps;
