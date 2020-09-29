import React from 'react';


const GameMap = ({tiles, mapSize}) => {

	return (
		<div>
			<div     
			    style = {{
          boxSizing: "border-box",
          width: mapSize.width,
          height: mapSize.height
        }}>

          <div style={{ position: "absolute", zIndex: 1 }}>
            {tiles.map((row, y) => (
              <div 
                style={{ display: "flex" }}>
                  {row.map((tile, x) => (
                    <div 
                      style = {{
                        background: "url(" + require(`../../../../public/map-sprites/${tile.background_set}.png`) + ") " + `-${tile.background.x}px -${tile.background.y}px no-repeat`,
                        width: 32,
                        height: 32,
                      }}
                    />
                  ))}
              </div>
            ))}
        </div>


        <div style={{ position: "absolute", zIndex: 2 }}>
          {tiles.map((row, y) => (
            <div 
              style={{ display: "flex" }}>
                {row.map((tile, x) => (
                  <div 
                    style = {{
                      background: "url(" + require(`../../../../public/map-sprites/${tile.season_back}.png`) + ") " + `-${tile.b.x}px -${tile.b.y}px no-repeat`,
                      width: 32,
                      height: 32,
                    }}
                  />
                ))}
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", zIndex: 3 }}>
          {tiles.map((row, y) => (
            <div 
              style={{ display: "flex" }}>
                {row.map((tile, x) => (
                  <div 
                    style = {{
                      background: "url(" + require(`../../../../public/map-sprites/${tile.season_front}.png`) + ") " + `-${tile.v.x}px -${tile.v.y}px no-repeat`,
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

export default GameMap;

