import React, {useState, useEffect, useRef} from 'react'
import About from './Components/About/About.js'
import SignIn from './Components/SignIn/SignIn.js'
import Register from './Components/Register/Register.js'
import Particles from 'react-particles-js'
import './App.css'
import Navigation from './Components/Navigation/Navigation.js'
import Game from './Components/Game/Game.js'
import AlertProvider from './Components/Alert/AlertContext.js'
import MapMaker from './Components/MapMaker/MapMaker.js'

const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 400 
      }
    }
  }
}

export const routeContext = React.createContext()

function App() {

const renderCount = useRef(1);

useEffect(() => {
  renderCount.current++
  console.log(renderCount.current)
})

  const [route, setRoute] = useState("signin")

  const [isSignedIn, setIsSignedIn] = useState(false)

  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    email: '',
    joined: '',
    score: 0
  })

  const loadUser = (data) => {
    setUserInfo({
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined,
      score: data.score
    })
  }

 const clearState = () => {
  setIsSignedIn(false)
  setUserInfo({
    id: '',
    name: '',
    email: '',
    joined: '',
    score: 0
  })
 }

  const toRouteChange = (route) => {
    switch (route){
      case 'signIn':
        clearState();
        break;
      case 'home':
        setIsSignedIn(true);
        break;
      case 'about':
        break;
      default:
        break;
    }
    setRoute(route)
  }

  const renderRoute = (route) => {
    switch (route) {
      case 'home':
        return <Game />;
      case 'signin':
        return <SignIn />;
      case 'register':
        return <Register />;
      case 'about':
        return <About />
      case 'maker':
        return <MapMaker />
      default:
        return <SignIn />
    }
  }


  return (
    <div className='main'>
      <Particles className='particles' params={particlesOptions}/>
      <routeContext.Provider value={{toRouteChange, isSignedIn, loadUser, userInfo}}>
        <AlertProvider>
          <Navigation />
          <main className = 'container'>
            {renderRoute(route)}
          </main>
        </AlertProvider>
      </routeContext.Provider>
    </div>
  );
}

export default App;
