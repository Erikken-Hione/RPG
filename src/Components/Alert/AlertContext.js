import React,{useReducer} from 'react'

export const AlertContext = React.createContext()

const AlertProvider = ({children}) => {

	const reducer = (state, action) => {
		switch (action.type) {
			case 'show': return {...state, visible: true, text: action.text}
			case 'hide': return {...state, visible: false}
			default: return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		visible: false,
		text: ''
	})

	const show = (text) => dispatch({ type: 'show', text })
	const hide = () => dispatch({ type: 'hide' })



	return (
		<AlertContext.Provider value={{
			visible: state.visible,
			text: state.text,
			show, hide
		}}>
			{ children }
		</AlertContext.Provider>
	)
}

export default AlertProvider;
