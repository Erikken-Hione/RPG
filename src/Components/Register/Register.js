import React, {useContext, useState, useEffect} from 'react'
import Ninja from '../Ninja/Ninja.js'
import {routeContext} from '../../App.js'
import {AlertContext} from '../Alert/AlertContext.js'
import Alert from '../Alert/Alert.js'

const Register = () => {

	// RouteContext	
	const {toRouteChange, loadUser} = useContext(routeContext)

	//SetState Name
	const [name, setName] = useState('')
	const nameState = (event) => {
		setName(event.target.value)
	}

	//SetState Email
	const [email, setEmail] = useState('')
	const emailState = (event) => {
		setEmail(event.target.value)
	}

	//SetState Password
	const [password, setPasword] = useState('')
	const passwordState = (event) => {
		setPasword(event.target.value)
	}
	
	//AlertContext
	const {show, hide} = useContext(AlertContext)	

	//Response to Server
	const emailVal = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	const nameVal = /(^(([A-Za-z])+){2,}(([0-9])+)?$)|^[A-Za-z]{2}$|(^(([A-Za-z])+){1,}((([0-9])+){2,})$)/
	const passwordVal = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/


	const fecthServer = () => {
		fetch("http://localhost:3000/register", {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email.trim(),
				password: password.trim(),
				name: name.trim()
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					loadUser(user)
					toRouteChange('home');
				} else {
					show('This email already registered')
				}
			})
	}

	const onSubmitSignIn = () => {
		if (!emailVal.test(email.trim())) {
			show('Your email is not valid')
		} else if (!nameVal.test(name.trim())) {
			show('Username is not Valid')
		} else if (!passwordVal.test(password.trim())) {
			show('Password is not Valid')
		} else {
			fecthServer()
		}

	}

	useEffect(() => {hide()}, [email, password, name])

	return (
		<div className='login'>
			<Alert />
			<div>
				<Ninja />
			</div>
			<div>
			<h1 className='header'>Register</h1>
				<div className='registerForm'>	
					<input onChange={nameState} className="signForm name" placeholder="Name" type="text"/>
					<input onChange={emailState} className="signForm email" placeholder="Email" type="text"/>
					<input onChange={passwordState} className="signForm password"  placeholder="Password" type="password"/>
				</div>
				
				<div>
					<button onClick={onSubmitSignIn} className="signForm btn" type="submit">REGISTER</button>
				</div>
				<p onClick={() => toRouteChange('signin')} className='turn'>Login To Your Account</p>
			</div>
		</div>
	)
}


export default Register;

