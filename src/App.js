import React, { useState, useEffect, useReducer, useMemo } from "react"
import firebase from 'firebase/app'
import 'firebase/auth'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Cart from "./components/Cart"
import LandingPage from "./components/LandingPage"
import Nav from "./components/Nav"
import Offers from "./components/Offers"
import './sass/App.css'
import MyOrders from "./components/MyOrders"
import { GlobalContext } from "./GlobalContext"


const initialState = { cart: [], promo: {}, user: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        cart: [action.payload, ...state.cart]
      };
    case 'REMOVE':
      return {
        ...state,
        cart: state.cart.filter(item => item.item_id !== action.payload)
      };
    case "COPY":
      return {
        ...state,
        cart: [...action.payload]
      };
    case "SETQUANTITY":
      const { item_id, quantity } = action.payload;
      const item = state.cart.find(item => item.item_id === item_id);
      if (item)
        item.quantity = quantity;
      return {
        ...state,
        cart: [...state.cart]
      }
    case "ADDPROMO":
      return {
        ...state,
        promo: { ...action.payload }
      }
    case "REMOVEPROMO":
      return {
        ...state,
        promo: {}
      }
    case "SETUSER":
      return {
        ...state,
        user: action.payload
      }

    default:
      throw new Error();
  }
}


function App() {
  const [theme, setTheme] = useState(false)
  const [loading, setLoading] = useState(true)

  //reducer for the cart
  const [state, dispatch] = useReducer(reducer, initialState);

  const globalState = useMemo(() => ({ state, dispatch }), [state, dispatch])

  //checking the current user state
  function currentUserState() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const object = {
          id: user.uid,
          email: user.email
        }
        dispatch({ type: "SETUSER", payload: object })
        // ...
      } else {
        // User is signed out
        console.log("user has signed out")
        dispatch({ type: "SETUSER", payload: false })

      }
    });

  }

  // Disable console log on production
  if (process.env.NODE_ENV === 'production') {
    console.log = function () { };
  }


  useEffect(() => {

    setLoading(false);
    currentUserState()

    //setting default value of theme when user opens the sight for first time
    if (localStorage.getItem("theme")) {
      const currentTheme = localStorage.getItem("theme")
      if (currentTheme === 'light')
        setTheme(false)
      else
        setTheme(true)
    }
    else {
      localStorage.setItem("theme", "light")
    }

    //setting the cart for the first time;
    if (localStorage.getItem("cart")) {
      const currentCart = JSON.parse(localStorage.getItem("cart"));
      dispatch({ type: "COPY", payload: currentCart })
    }
  }, [])

  useEffect(() => {
    if (theme)
      localStorage.setItem("theme", "dark")
    else
      localStorage.setItem("theme", "light")
  }, [theme])


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <>
      {
        loading ?
          <div className="loader"><h1>Loading...</h1></div>
          :
          <div className={theme ? 'App dark-mode' : 'App'} >
            <GlobalContext.Provider value={globalState}>
              <Router>
                <Nav setTheme={setTheme} theme={theme} />
                <Switch>
                  <Route path="/" exact >
                    <LandingPage />
                  </Route>
                  <Route path="/cart" exact>
                    <Cart />
                  </Route>
                  <Route path="/offers" exact>
                    <Offers />
                  </Route>
                  <Route path="/contact" exact>
                    <header><h1 className="green-text">In Development</h1></header>
                  </Route>
                  {
                    //my orders component will only be available if the user is logged in
                    state.user &&
                    <Route path="/my-orders">
                      <MyOrders />
                    </Route>
                  }
                </Switch>
              </Router>
            </GlobalContext.Provider>
          </div>
      }
    </>

  );
}

export default App;
