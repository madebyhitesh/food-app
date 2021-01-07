import React,{useState,useEffect} from "react"
import Footer from "./components/Footer"
import Homepage from "./components/Homepage"
import LandingPage from "./components/LandingPage"
import './sass/App.css'


function App() {
  const [theme,setTheme] = useState(false)
  const [loading,setLoading] = useState(true)


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
        <LandingPage setTheme={setTheme} theme={theme}/>
        <Homepage/>
        <Footer/>
    </div>
    }
    </>
    
  );
}

export default App;
