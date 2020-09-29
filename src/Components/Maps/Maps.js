import React, {useState, useEffect} from 'react'
import useKeyPress from '../../Hooks/UseKeyPress/UseKeyPress.js'



const Maps = ({ tiles, tileset, mapSize, activeTile, setTiles, backgroundTile, zIndex, setzIndex, boolSwap, setBackgroundTile}) => {
  
  console.log("this is map rendering")

  const cloneMatrix = (m) => {
    const clone = new Array(m.length)
    for (let i=0; i < m.length; ++i ) {
      clone[i] = m[i].slice(0)
    }
    return clone;
  }


  const dropTile = ({x,y, tileset}) => {
    setTiles((prev) => {
      const clone = cloneMatrix(prev);
      const update = {
        ...clone[y][x],
        v: activeTile,
        season_front: tileset,
      };
      clone[y][x] = update;
      console.log(clone)
      return clone;
    });
  }


  const dropBackround = ({x, y, tileset}) => {
    setTiles((prev) => {
      const clone = cloneMatrix(prev);
      const update = {
        ...clone[y][x],
        b: activeTile,
        season_back: tileset,
      };
      clone[y][x] = update;
      console.log("dropBack" ,clone)
      return clone
    })
  }

  // const [save, setSave] = useState({
  //   tiles: [],
  //   background: {}
  // })

  // const saveLoad = (key) => {
  //   if(key === 'k') {
  //       setSave({
  //         tiles: tiles,
  //         background: backgroundTile
  //       })
  //   } else if (key === 'l') {
  //       setTiles(save.tiles)
  //       setBackgroundTile(save.background)
  //   }
  // }

  // useKeyPress(event => {
  //   saveLoad(event.key.toLowerCase())
  // })

  useEffect(()=>{
    if(boolSwap) {
      setzIndex({front: 1, back: 2})
    } else {
      setzIndex({front: 2, back: 1})
    }
  }, [boolSwap])

  const [fill, setFill] = useState('')

  useEffect(() => {
    setFill("url(" + require(`../../../public/map-sprites/${tileset}.png`) + ") " + `-${backgroundTile.x}px -${backgroundTile.y}px no-repeat`)
  }, [backgroundTile])

    return (
    <div>
      <div
        style = {{
          boxSizing: "border-box",
          width: mapSize.width,
          height: mapSize.height
        }}
      > 
        <div style={{ position: "absolute", zIndex: 1 }}>
          {tiles.map((row, y) => (
            <div 
              style={{ display: "flex" }}>
                {row.map((tile, x) => (
                  <div 
                    style = {{
                      borderTop: "1px solid black",
                      borderRight: "1px solid black",
                      borderBottom: "1px solid black",
                      background: fill,
                      width: 32,
                      height: 32,
                    }}
                  />
                ))}
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", zIndex: zIndex.back }}>
          {tiles.map((row, y) => (
            <div 
              style={{ display: "flex" }}>
                {row.map((tile, x) => (
                  <div className = "box back"
                    onClick={() => dropBackround({x,y,tileset})}
                    style = {{
                      borderTop: "1px solid black",
                      borderRight: "1px solid black",
                      borderBottom: "1px solid black",
                      background: "url(" + require(`../../../public/map-sprites/${tile.season_back}.png`) + ") " + `-${tile.b.x}px -${tile.b.y}px no-repeat`,
                      width: 32,
                      height: 32,
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", zIndex: zIndex.front }}>
          {tiles.map((row, y) => (
            <div 
              style={{ display: "flex" }}>
                {row.map((tile, x) => (
                  <div className = "box front"
                    onClick={() => dropTile({x,y,tileset})}
                    style = {{
                      borderTop: "1px solid black",
                      borderRight: "1px solid black",
                      borderBottom: "1px solid black",
                      background: "url(" + require(`../../../public/map-sprites/${tile.season_front}.png`) + ") " + `-${tile.v.x}px -${tile.v.y}px no-repeat`,
                      width: 32,
                      height: 32,
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}

export default Maps;