import React from 'react';
import Tilt from 'react-tilt';
import ninja from './ninja.png';

const Ninja = () => {
	return  (
		<div>
			<Tilt className="Tilt" options={{ max : 100 }}>
				<div className="Tilt-inner"><img  style={{width: '350px', height: '350px', paddingLeft: '50px'}} alt='Ninja' src={ninja}/></div>
			</Tilt>
		</div>
	);
}

export default Ninja;