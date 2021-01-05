import React,{useState} from "react"
import Homepage from "./components/Homepage"
import LandingPage from "./components/LandingPage"
import './sass/App.css'
function App() {

  return (
    <div className="App">
      <LandingPage/>
      <Homepage/>
    </div>
  );
}

export default App;