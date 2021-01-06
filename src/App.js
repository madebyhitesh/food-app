import React,{useState,useEffect} from "react"
import Homepage from "./components/Homepage"
import LandingPage from "./components/LandingPage"
import './sass/App.css'


function App() {
  const [theme,setTheme] = useState(false)
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
    {
      loading ?
      <div className="loader"><h1>Loading...</h1></div>
      :
      <div className={theme ? 'App dark-mode' : 'App'} >
        <LandingPage setTheme={setTheme} theme={theme}/>
        <Homepage/>
    </div>
    }
    </>
    
  );
}

export default App;
