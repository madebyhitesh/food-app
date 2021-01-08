import React from 'react'
import {motion} from "framer-motion"
import landingImage from "../assets/landing.svg"
import Homepage from './Homepage'

export default function LandingPage({cart,dispatch}) {

    const variants = {
        hidden: { x: "100%" },
        visible: { x: 0},
      }

    return (
    <>
       <div className="landing-page">
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
        </div>
        <Homepage dispatch={dispatch} cart={cart}/>
       </>
    )
}
