import React, { useEffect, useState, useRef } from 'react';
import useDrag from '../../Hooks/UseDrag/UseDrag.js';
import Tile from '../Tile/Tile.js';
import Maps from '../Maps/Maps.js';
import './MapMaker.css';

const MapMaker = () => {

  const [tileset, setTileset] = useState('spring')
  const [activeTile, setActiveTile] = useState({x: 1*32, y: 4*32})
  const [tiles, setTiles] = useState([])
  const [backgroundTile, setBackgroundTile] = useState({ x:-32, y:-32})
  const [mapSize, setMapSize] = useState({
    width: "600",
    height: "600"
  });

  const [boolSwap, setBoolSwap] = useState(false)
  const [zIndex, setzIndex] = useState({front: 3, back: 2})

  const renderCount = useRef(1)

  const{ position } = useDrag("handle")

  useEffect(() => {
    renderCount.current++
    console.log("Rendered:", renderCount.current)
    const _tiles = [];
    let id = 0;

    for(let y = 0; y<mapSize.height; y += 32) {
      const row = []
      for(let x = 0; x<mapSize.width; x += 32) {
        row.push({
          x,
          y,
          id: id ++,
          v: {x:  -32, y: -32},
          season_front: 'spring',
          season_back: 'spring',
          b: {x: -32, y: -32}
        });
      }
      _tiles.push(row);
    }
    setTiles(_tiles);
  }, [mapSize]);  

  return <div className = "mapmaker"
    style={{
      position: "relative",
      width: "1500px",
      height: "650px",
      overflow: "auto",
      border: "1px solid black",
      }}
    >
      <Tile 
        position={position}
        tileset = { tileset }
        activeTile={activeTile}
        setActiveTile={setActiveTile}
        setTileset = {setTileset}
        backgroundTile = {backgroundTile}
        setBackgroundTile = {setBackgroundTile}
        setBoolSwap = {setBoolSwap}
        setMapSize = {setMapSize}
        mapSize = {mapSize}
        mapTiles = {tiles}
      />

      <Maps 
        tiles={tiles} 
        tileset={tileset} 
        mapSize={mapSize} 
        activeTile={activeTile} 
        setTiles={setTiles}
        setTileset={setTileset}
        backgroundTile={backgroundTile}
        zIndex = {zIndex}
        setzIndex = {setzIndex}
        boolSwap = {boolSwap}
        setBackgroundTile = {setBackgroundTile}
      />

    </div>;
}

export default MapMaker;