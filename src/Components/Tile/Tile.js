import React, {useState, useRef, useContext} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {routeContext} from '../../App.js';

const Tile = ({tileset, position, activeTile, setActiveTile, setTileset, setBoolSwap, mapSize, setMapSize, tiles, setTiles}) => {
	
	// import possible tileset like spring, winter and so onn
	const tilesetData = require("../../Data/Tilesets.json")
	const tilesets = Object.keys(tilesetData).map((set) => ({
		type: "group",
		name: set.replace(/-/g, " "),
		items: tilesetData[set].variants.map(variant => ({
			value: `${variant}`,
			label: variant,
		}))
	}));

	const tilesetVariant = tileset
	console.log('tilesets', tilesets)
	const {width, height} = tilesetData["map-sprites"].size


	// creating tiles for tool bar
	const toolTiles = []
	let id = 0
 	for(let y = 0; y < height; y = y + 32 ) {
 		const row = []
 		for(let x = 0; x < width; x = x + 32) {
 			row.push({
 				x, y, id: id++
 			})
 		}
 		toolTiles.push(row)
 	}

 	// creatting functions for changing map's widnth and height
 	// checks that entered only nmbers
 	const onlyNum = /^[0-9]+$/
 	const [mapIndex, setMapIndex] = useState({
 		width: "",
 		height: ""
 	})

 	const changeMapWidth = (event) => {
 		const width = event.target.value
 		setMapIndex(prev => {
 			return {
 				...prev,
 				width: width
 				}
 			})
 		}
 
 	const changeMapHeight = (event) => {
 		const height = event.target.value
 		setMapIndex(prev => {
 			return {
 				...prev,
 				height: height
 			}
 		})
 	}

 	const submitMapSizeChange = () => {
 		if (onlyNum.test(mapIndex.width) && onlyNum.test(mapIndex.height)) {
 			 setMapSize(mapIndex)
 		}

 	}

 	// creating function which change working layer from front to back and vise versa

 	const layerInfo = useRef('Front')

 	const changeLayer = () => {
 		if (layerInfo.current === "Front") {
 			layerInfo.current = "Back"
 		} else if (layerInfo.current === "Back") {
 			layerInfo.current = "Front"
 		}
 		setBoolSwap((prev) => !prev)
 	}

 	// userInfo is from App.js which is extracted by Context
 	const {userInfo} = useContext(routeContext);

 	// uploading created map into database 
 	const fetchToUpload = (mapName) => {
 		if (mapName) {
			fetch('http://localhost:3000/mapupload', {
	 			method: 'put',
	 			headers: {'Content-Type': 'application/json'},
	 			body: JSON.stringify({
	 				email: userInfo.email,
	 				name: userInfo.name,
	 				map: {
	 					mapName: mapName,
	 					mapInfo: {
	 						mapSize: mapSize,
	 						tiles: tiles
						}
	 				}
	 			})
	 		})
	 		.then(alert('Map Saved'))
 		} else {
 			alert('Failed to upload the map')
 		}
 	}

 	const inputMapName = () => {
 		const mapName = prompt("Please enter map name: ")
 		if (mapName != "Default" && mapName) {
			return mapName.trim()
		} else if (!mapName) {
			alert("Map's name can not be empty")
		} else {
			alert('"Default" name is prohibited')
		}
 	}



 	//logic  of changing background
  	const cloneMatrix = (m) => {
	    const clone = new Array(m.length)
	    for (let i=0; i < m.length; ++i ) {
	      clone[i] = m[i].slice(0)
	    }
	    return clone;
  	}

  	const updateBackground = (x,y, tileset) => {
  		setTiles((prev) => {
  			const clone = cloneMatrix(prev)
  			const update = {
  				...clone[y][x],
  				background: activeTile,
  				background_set: tileset
  			};
  			clone[y][x] = update
  			return clone
  		})
  	}

  	const changeBackground = () => {
  		tiles.map((row, y) => {
  			row.map((tile, x) => {
  				updateBackground(x,y, tileset)
  			})
  		})
  	}

	return (
    <div 
	    id="palette"
	  	style={{
	      position: "absolute",
	      border: "1px solid black",
	      top: position.y,
	      left: position.x,
	      zIndex: 10,
	      backgroundColor: "white"
	    }}>
	  	<div style={{display: 'flex', marginBottom: 4, marginTop: 4}}>
		  	<img id="handle" src={require("../../img/drag-handle.png")} alt="handle" />
				<div style={{
					background: "url(" + require(`../../../public/map-sprites/${tileset}.png`) + ") " + `-${activeTile.x}px -${activeTile.y}px no-repeat`,
					width: 32,
					height: 32,
					border: "2px solid red"
					}}
				/>

				<div style={{ width: 200, marginLeft: 8}}>
					<Dropdown
						value={tileset}
						options={tilesets}
						onChange={(tileset) => setTileset(tileset.value)}
					/>
				</div>

				<div style={{marginLeft: 8}}>
					<button 
						onClick={() => changeBackground()} 
						style={{ padding: "6px 20px", fontSize: 14}}>FILL</button>
				</div>
				<div style={{marginLeft: 8}}>
					<button 
						onClick={() => changeLayer()} 
						style={{ padding: "6px 20px", fontSize: 14}}>{layerInfo.current}</button>
				</div>
				<div style={{marginLeft: 8}}>
					<button
					onClick={() => fetchToUpload(inputMapName())}
					style={{ padding: "6px 20px", fontSize: 14}}>Upload</button>
				</div>

	  	</div>

	  	<div style={{display: 'flex', margin: 5}}>
	  		<input onChange={changeMapWidth} type="text" style={{width: "103px"}} placeholder={mapSize.width} />
	  		<input onChange={changeMapHeight} type="text" style={{width: "103px"}} placeholder={mapSize.height} />
	  		<button onClick={() => submitMapSizeChange()}>Apply</button>
	  	</div>

  		<div style={{position: 'absolute', zIndex: 10, opacity: 0.55}}>
    		{
	      	toolTiles.map((row, y) => (
	      		<div style={{ display: "flex" }}>
	      			{row.map((tile, x) => 
	    					<div 
    						className='box'
		      				onClick = {() => setActiveTile({x: x*32, y: y*32})}
		      				style={{
			      				borderTop: "1px solid black",
			      				borderRight: "1px solid black",
			      				width: 32,
			      				height: 32
	      				}}/>
	      			)}
	      		</div>
	  			))
	      }
      </div>
  		<div >
    		{
	      	toolTiles.map((row, y) => (
	      		<div style={{ display: "flex" }}>
	      			{row.map((tile, x) => 
	    					<div 
		      				style={{
			      				borderTop: "1px solid black",
			      				borderRight: "1px solid black",
			      				background: 'url(' + require(`../../../public/map-sprites/${tileset}.png`) + ") " + `-${x*32}px -${y*32}px no-repeat`,
			      				width: 32,
			      				height: 32
	      				}}/>
	      			)}
	      		</div>
	  			))
	      }
      </div>
    </div>
	)
}

export default Tile;