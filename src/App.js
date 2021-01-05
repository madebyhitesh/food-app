import React,{useState} from "react"
import Homepage from "./components/Homepage"
import LandingPage from "./components/LandingPage"
import './sass/App.css'
function App() {
  const [theme,setTheme] = useState(false)

  return (
    <div className={theme ? 'App dark-mode' : 'App'}>
      <LandingPage setTheme={setTheme} theme={theme}/>
      <Homepage/>
    </div>
  );
}

export default App;
