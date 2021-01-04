import React,{useState} from "react"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Homepage from "./components/Homepage"
import LandingPage from "./components/LandingPage"
import './sass/App.css'
function App() {
  const [width]  = useState(window.innerWidth)
  return (
    <div className="App">
      <LandingPage/>
      <Homepage/>
     {/* <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        {
          width <= 500 ? <Route exact path="/home" component={Homepage}/> : ""
        }
        
      </Switch>
      </Router> 
      {width >= 500 ? <Homepage/> : ""} */}
    </div>
  );
}

export default App;
