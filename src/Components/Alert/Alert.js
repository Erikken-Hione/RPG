import React,{useContext} from 'react'
import {AlertContext} from './AlertContext.js'



const Alert = () => {
	const alert = useContext(AlertContext)

	if (!alert.visible) {
		return null
	} else {
			return (
				<div className='alert' onClick={alert.hide}>
					{alert.text}
				</div>
		)
	}
}
 

export default Alert;
