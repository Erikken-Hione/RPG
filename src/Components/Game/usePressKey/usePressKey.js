import {useEffect} from "react";

const usePressKey = (event) => {
	useEffect(() => {
		window.addEventListener("keydown", event)
		return () => window.removeEventListener("keydown", event);
	}, [event])
}

export default usePressKey;