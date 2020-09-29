import React,{useState, useEffect, useContext} from 'react';
import Player from './Player/Player.js';
import {routeContext} from '../../App.js';
import GameMap from './GameMap/GameMap.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Game = () => {

	const {userInfo} = useContext(routeContext)

	const [tiles, setTiles] = useState([])
	const [mapSize, setMapSize] = useState({})

	const fetchDefaultMap = () => {
		fetch("http://localhost:3000/loadmap", {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: 'td@gmail.com'
			})
		})
		.then(response => response.json())
		.then((map) => {
			Object.values(map).map((key) => {
				key.map((value) => {
					setTiles(value.mapInfo.tiles)
					setMapSize(value.mapInfo.mapSize)
				})
			})
		})
		.catch(err => alert('Failed to load the map'))
	}

	useEffect(() => {
		fetchDefaultMap()
	}, [])

	const [dataset, setDataset] = useState([])

	const [currentMap, setCurrentMap] = useState('Default') 
	useEffect(() => {
		fetch("http://localhost:3000/loadmap", {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: userInfo.email
			})
		})
		.then(response => response.json())
		.then((map) => {
			const newDataset = Object.values(map).map((key) => {
				if (key) {
					return 	([
						{
							value: "Default",
							label: "Default"
						},
						{
							type: 'group',
							name: userInfo.name + "'s Maps",
							items: key.map((value) => ({
								value: value.mapName,
								label: value.mapName
							}))
						}
					])
				} else {
					return ({
						type: 'group',
						name: userInfo.name + "'s Maps",
						items: [{
							value: 'None',
							label: 'None'
						}]
					})
					}
				}
			)
			setDataset(newDataset)
	})
	}, [])

	console.log('dataset', dataset)

	useEffect(() => {
		fetch("http://localhost:3000/loadmap", {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: userInfo.email
			})
		})
		.then(response => response.json())
		.then((map) => {
			Object.values(map).map((key) => {
				if (key) {
					key.map((value) => {
						if (value.mapName === currentMap) {
							setTiles(value.mapInfo.tiles)
							setMapSize(value.mapInfo.mapSize)
						}
					})
				}
			})
		})
	}, [currentMap])

	return (
		<div>

			<Dropdown 
		 		value="Default" 
		 		options={dataset} 
		 		onChange={(map) => setCurrentMap(map.value)} />

 			<div style={{
			    position: "relative",
			    width: "1400px",
			    height: "650px",
			    overflow: "auto",
			    border: "1px solid black",
	      	}}>	
				<Player  skin="m1"/>

				<GameMap  tiles={tiles} mapSize={mapSize}/>

			</div>
		</div>
	)
}

export default Game;