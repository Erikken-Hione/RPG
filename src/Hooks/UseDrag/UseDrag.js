import {useState, useEffect} from 'react';

function UseDrag(id) {

  const[position, setPosition] = useState({
    x:50, y:0
  });

  useEffect(() => {
    const handle = document.getElementById(id)
    handle.addEventListener("mousedown", function(e) {
      e.preventDefault()
      handle.style.pointerEvents = "none"

      document.body.addEventListener("mousemove", move)
      document.body.addEventListener("mouseup", () => {
        document.body.removeEventListener("mousemove", move)
        handle.style.pointerEvents = "initial"
      })
    })

    return () => {
      document.body.removeEventListener("mousedown", move)
      document.body.removeEventListener("mouseup", move)
      document.body.removeEventListener("mousemove", move)
    };
  }, []);

  const move = (e) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    }
    setPosition(pos);
  }

  return {
    position
  }
}

export default UseDrag;