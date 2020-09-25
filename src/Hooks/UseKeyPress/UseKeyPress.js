import {useEffect} from "react";

const useKeyPress = (event) => {
	useEffect(() => {
		window.addEventListener("keydown", event)
		return () => window.removeEventListener("keydown", event);
	}, [event])
}

export default useKeyPress;