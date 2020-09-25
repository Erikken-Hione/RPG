import React, {useContext} from 'react';
import {routeContext} from '../../App.js';


const Navigation = () => {
	const {isSignedIn, toRouteChange} = useContext(routeContext)
	if (isSignedIn) {
		return (
			<nav>
				<p onClick={() => toRouteChange('about')} className='nav about'>About</p>
				<p onClick={() => toRouteChange('maker')} className='nav about'>Map Maker</p>
				<p onClick={() => toRouteChange('home')} className='nav about'>Game</p>
				<p onClick={() => toRouteChange('signin')} className='nav signUp'>Sign Out</p>
			</nav>
		)
	}
	else {
		return (
			<nav>
				<p onClick={() => toRouteChange('signin')} className='nav signIn'>Sign In</p>
				<p onClick={() => toRouteChange('register')} className='nav register'>Register</p>
			</nav>
		)
	}  
}


export default Navigation;