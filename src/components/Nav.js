import React,{useState,useEffect} from 'react'
import {useLocation,Link} from 'react-router-dom'
import firebase from 'firebase'
import Overlay from "./Overlay"
import {motion} from "framer-motion";
import Signup from './Signup'
import Popup from './Popup'

const  Nav = ({theme,setTheme,cart,user,dispatch}) => {

    const location =  useLocation()
    const [currentLocation,setCurrentLocation] =  useState(location.pathname)
    const [isOpen,setIsOpen] = useState(false);
    const [isFormOpen,setFormOpen] =  useState(false)
    const [isSignUp,setIsSignUp] =  useState(false);
    const [isPopupOpen,setIsPopupOpen] =  useState(false)


    useEffect(() => {
        setCurrentLocation(location.pathname)
        setIsOpen(false)
    }, [location])

    
    function signOut() {
        // [sign out the current user]
        firebase.auth().signOut() 
    }

      //handling opening and closing of signup modals
      const handleFormModel =  (type)=>{
        setFormOpen(!isFormOpen);
        setIsSignUp(type)
    }

    return (
        <header>
               <div className="menu-icon normal-text" onClick={()=>setIsOpen(true)}> 
                <h2>
                <i className="fas fa-bars"></i>
               </h2>
               </div>
               <div className="logo title-text">
                   <Link to="/">
                    <h2 className="green-text">
                    FoodExpress
                    </h2> 
                   </Link>
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
                       
                    {   
                    //will be showing this linking only if the user is logged in
                    user && 
                        <Link to="/my-orders">
                        <li className={currentLocation === "/my-orders" ? "navlink  active" : "navlink"}>
                        My Orders
                        </li>
                        </Link>
                    }
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
                   <Link to="/cart">
                   <div className="cart">
                   <i className="fas fa-shopping-basket normal-text"></i>
                    {
                        cart.length > 0 && 
                        <span>
                    {cart.length}
                    </span>
                    }
                   </div>
                    </Link>
                   <div className="profile">
                       {
                           !user.id ?
                           <button className="btn transparent-button" onClick={()=>handleFormModel(false)}>
                           Log In
                          </button> :
                           <button className="btn transparent-button" onClick={()=>signOut()}>
                           Log Out
                          </button>
                       }
                   </div>
               </div>
               {isOpen && <Overlay onClick={e=>setIsOpen(false)} />}
               {
                isFormOpen && 
                <Signup 
                status={setFormOpen} 
                formtype={isSignUp} 
                formtypeStatus={setIsSignUp} 
                dispatch={dispatch}
                popup={setIsPopupOpen}/>
            }
            {
            isPopupOpen &&
            <Popup 
            title="Welcome" 
            message="Your favourite food is just few clicks away" 
            type="Succes"
            status={setIsPopupOpen}
            />
            }
           </header>
    )
}

export default React.memo(Nav); 
