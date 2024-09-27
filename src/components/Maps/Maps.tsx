import React from 'react';
// @ts-ignore
import { MapInteractionCSS } from 'react-map-interaction';
import Button from '../Button/Button';
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
      case 'official':
        return '/images/Glastonbury_Public_Map_2024_V1.1_web_large.png';
      case 'tube':
        return '/images/glastonderground.jpeg';
      case '1979':
        return '/images/glastonbury-fayre-1979.jpeg';
      default:
        return '/images/Glastonbury_Public_Map_2024_V1.1_web_large.png';
    }
  }

  return (
    <main className="relative min-h-full">
      <header>
        <h1 className="text-xl font-bold text-center inline-block">Maps</h1>
        <div className={`inline-block mb-1 ml-1`}>
          <Button
            className={`min-w-0 ${selectedMap === 'official' ? 'bg-semiTransparentWhiteHover' : ''}`}
            variant={['transparent', 'medium']}
            onClick={() => { updateMap('official')}}>
            Official map
          </Button>
          <Button
            className={`min-w-0 ${selectedMap === 'tube' ? 'bg-semiTransparentWhiteHover' : ''}`}
            variant={['transparent', 'medium']}
            onClick={() => {updateMap('tube')}}>Tube map
          </Button>
          <Button
            className={`min-w-0 ${selectedMap === '1979' ? 'bg-semiTransparentWhiteHover' : ''}`}
            variant={['transparent', 'medium']}
            onClick={() => {updateMap('1979')}}>1979
          </Button>
        </div>
      </header>
      <div className="fixed bottom-1 left-1 right-1 top-[162px] md:top-[152px] rounded bg-white border border-white">
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
