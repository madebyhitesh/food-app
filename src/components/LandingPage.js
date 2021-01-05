import React, { useState } from 'react'
import {motion} from "framer-motion"
import landingImage from "../assets/landing.svg"

export default function LandingPage({theme,setTheme}) {

    const [isOpen,setIsOpen] = useState(false)

    const variants = {
        hidden: { x: "100%" },
        visible: { x: 0},
      }

    return (
       <div className="landing-page">
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
                       <li className="navlink  active">
                        Home
                       </li>
                       <li className="navlink">
                        Offers
                       </li>
                       <li className="navlink">
                        My Orders
                       </li>
                       <li className="navlink">
                        Contact
                       </li>
                       <li className="theme-button" onClick={()=>setTheme(!theme)}>
                            {theme ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>} Theme
                       </li>
                   </ul>
               </motion.div>

               <div className="nav-icons">
                   <div className="cart">
                   <i className="fas fa-shopping-basket normal-text"></i>
                   </div>
                   <div className="profile">
                   <i className="fas fa-user-circle normal-text"></i>
                   </div>
               </div>
           </header>
           <div className="content-wrapper">
            <div className="text-container">
           <div className="heading-title">
               <h2 className="normal-text">
               Enjoy Quick <span className="green-text">Food</span> Delivery In SpecialOccasion.
               </h2>
           </div>
           <div className="heading-para">
               <p className="light-text">It is a long established fact that a reader will be distracted by the readable content of page when looking at the layout.</p>
           </div>
           <div className="call-to-action">
               <button className="btn green-button">
                Sign Up
               </button>
               <button className="btn transparent-button">
                Log In
               </button>
           </div>
           <div className="image-wrapper first">
           <motion.div className="image-container"
           initial="hidden"
           animate="visible"
           variants={variants}
           transition={{duration:.5,type:"spring"}}
           >
               <img src={landingImage} alt="landing"/>
           </motion.div>
           </div>
           <div className="search-bar">
               <form>
               <input type="text" name="seach-input" placeholder="Enter your location"/>
                <button className="btn red-button" type="submit">Search</button>
               </form>
           </div>

           {/* <footer>
               <p className="light-text">Skip for now</p>
           </footer> */}
           </div>
           <div className="image-wrapper second">
           <motion.div className="image-container"
           initial="hidden"
           animate="visible"
           variants={variants}
           transition={{duration:.5,type:"spring"}}
           >
               <img src={landingImage} alt="landing"/>
           </motion.div>
           </div>
           </div>

        {isOpen && <div onClick={e=>setIsOpen(false)} className="overlay"></div>}
       </div>
    )
}
