import React,{useState,useEffect,useReducer} from "react"
import Footer from "./components/Footer"
import Homepage from "./components/Homepage"
import LandingPage from "./components/LandingPage"
import './sass/App.css'

const initialState = {cart: []};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {cart:[action.payload,...state.cart]};
    case 'REMOVE':
      return {cart: state.cart.filter(item => item === action.payload)};
    default:
      throw new Error();
  }
}


function App() {
  const [theme,setTheme] = useState(false)
  const [loading,setLoading] = useState(true)

  //reducer for the cart
  const [state,dispatch] =  useReducer(reducer,initialState);

  console.log("cart",state)


  useEffect(() => {
    setLoading(false);
    if(localStorage.getItem("theme")){
      const currentTheme =  localStorage.getItem("theme")

      if(currentTheme === 'light')
      setTheme(false)
      else
      setTheme(true)
    }
    else{
      localStorage.setItem("theme","light")
    }

  }, [])

  useEffect(() => {
    if(theme)
    localStorage.setItem("theme","dark")
    else
    localStorage.setItem("theme","light")
  }, [theme])

  return (
    <>
    {
      loading ?
      <div className="loader"><h1>Loading...</h1></div>
      :
      <div className={theme ? 'App dark-mode' : 'App'} >
        <LandingPage setTheme={setTheme} theme={theme} cart={state.cart}/>
        <Homepage dispatch={dispatch}/>
        <Footer/>
    </div>
    }
    </>
    
  );
}

export default App;
