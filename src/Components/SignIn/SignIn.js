import React, {useContext, useState, useEffect} from 'react'
import './signIn.css'
import Ninja from '../Ninja/Ninja.js'
import {routeContext} from '../../App.js'
import {AlertContext} from '../Alert/AlertContext.js'
import Alert from '../Alert/Alert.js'


const SignIn = () => {
  
  const {show, hide} = useContext(AlertContext)



	const {toRouteChange, loadUser} = useContext(routeContext)

	const [email, setEmail] = useState('')

	const emailState = (event) => {
		setEmail(event.target.value)
	}



	const [password, setPasword] = useState('')

	const passwordState = (event) => {
		setPasword(event.target.value)
	}
	
	const onSubmitSignIn = () => {
		fetch("http://localhost:3000/signin", {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					loadUser(user)
					toRouteChange('home')
				} else {
					show('!!! Wrong password or email !!!')
				}
			})
	}

	useEffect(() => {
		hide()
	}, [email, password])

	return (
		<div className='login'>
			<Alert />
			<div>
				<Ninja />
			</div>
			<div>
				<h1 className='header'>LOGIN</h1>
				<input onChange={emailState} className="signForm email" placeholder="Email" type="text"/>
				<input onChange={passwordState} className="signForm password"  placeholder="Password" type="password"/>
				<div>
					<button onClick={onSubmitSignIn} className="signForm btn" type="submit">LOGIN</button>
				</div>
				<p onClick={() => toRouteChange('register')} className='turn'>Create New Account</p>
			</div>
		</div>
	)
}


export default SignIn;