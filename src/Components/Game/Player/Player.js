import React, {useEffect} from 'react';
import Actor from '../Actor/Actor.js';
import usePressKey from '../usePressKey/usePressKey.js';
import useWalk from '../useWalk/useWalk.js';

const Player = ({ skin }) => {
	
	const { dir, step, walk, position } = useWalk(3)

	const data = {
		h: 32,
		w: 32,
	};

	usePressKey((event) => {
			walk(event.key.replace("Arrow", "").toLowerCase())
			event.preventDefault();
	});

	const scrollCharacter = (x,y, behavior) => window.scrollTo({left: x,top: y, behavior: behavior}) 

	useEffect(() => {
		scrollCharacter(position.x, position.y, "smooth")
	}, [position])

	return (
		<Actor sprite={require(`../../../img/Characters/${skin}.png`)} data={data} step={step} dir={dir} position={position}/>
	)
};

export default Player;