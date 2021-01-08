import React,{useState,useEffect,useReducer} from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Footer from "./components/Footer"
import LandingPage from "./components/LandingPage"
import Nav from "./components/Nav"
import './sass/App.css'

const initialState = {cart: []};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {cart:[action.payload,...state.cart]};
    case 'REMOVE':
      return {cart: state.cart.filter(item => item !== action.payload)};
    case "COPY":
      return {cart:[...action.payload]};
    default:
      throw new Error();
  }
}


function App() {
  const [theme,setTheme] = useState(false)
  const [loading,setLoading] = useState(true)

  //reducer for the cart
  const [state,dispatch] =  useReducer(reducer,initialState);


  useEffect(() => {

    setLoading(false);

    //setting default value of theme when user opens the sight for first time
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

    //setting the cart for the first time;
    if(localStorage.getItem("cart")){
      const currentCart = JSON.parse(localStorage.getItem("cart"));
      dispatch({type:"COPY",payload:currentCart})
    }
  }, [])

  useEffect(() => {
    if(theme)
    localStorage.setItem("theme","dark")
    else
    localStorage.setItem("theme","light")
  }, [theme])


  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(state.cart))
  },[state.cart])

  return (
    <>
    {
      loading ?
      <div className="loader"><h1>Loading...</h1></div>
      :
      <div className={theme ? 'App dark-mode' : 'App'} >

      <Router>
          <Nav setTheme={setTheme} theme={theme} cart={state.cart}/>
          <Switch>

            <Route path="/" exact >
            <LandingPage setTheme={setTheme} theme={theme} cart={state.cart} dispatch={dispatch}/>
            </Route>

          </Switch>
          <Footer/>
        </Router>

        
       
    </div>
    }
    </>
    
  );
}

export default App;
