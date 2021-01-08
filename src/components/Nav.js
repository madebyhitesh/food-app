import React,{useState,useEffect} from 'react'
import {useLocation,Link} from 'react-router-dom'
import Overlay from "./Overlay"
import {motion} from "framer-motion"
export default function Nav({theme,setTheme,cart}) {

    const location =  useLocation()
    const [currentLocation,setCurrentLocation] =  useState(location.pathname)
    const [isOpen,setIsOpen] = useState(false);

    useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location])

    console.log(currentLocation)
    return (
        <header>
               <div className="menu-icon normal-text" onClick={()=>setIsOpen(true)}> 
                <h2>
                <i className="fas fa-bars"></i>
               </h2>
               </div>
               <div className="logo title-text">
                <h2 className="green-text">
                  FoodExpress
                </h2> 
               </div>

               <motion.div className="nav-links" animate={{x:isOpen && window.innerWidth<500 ? 200 : 0}} >
                   <ul>
                       <Link to="/">
                       <li className={currentLocation === "/" ? "navlink  active" : "navlink"}>
                        Home
                       </li>
                       </Link>
                       <Link to="/offers">
                       <li className={currentLocation === "/offers" ? "navlink  active" : "navlink"}>
                        Offers
                       </li>
                       </Link>
                       <Link to="/my-orders">
                       <li className={currentLocation === "/my-orders" ? "navlink  active" : "navlink"}>
                        My Orders
                       </li>
                       </Link>
                       <Link to="contact">
                       <li className={currentLocation === "/contact" ? "navlink  active" : "navlink"}>
                        Contact
                       </li>
                       </Link>
                       <li className="theme-button" onClick={()=>setTheme(!theme)}>
                            {theme ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>} Theme
                       </li>
                   </ul>
               </motion.div>

               <div className="nav-icons">
                   <div className="cart">
                   <i className="fas fa-shopping-basket normal-text"></i>
                    {
                    cart.length > 0 && 
                    <span>
                    {cart.length}
                    </span>
                    }
                   </div>
                   <div className="profile">
                   <i className="fas fa-user-circle normal-text"></i>
                   </div>
               </div>
               {isOpen && <Overlay onClick={e=>setIsOpen(false)} />}
           </header>
    )
}
