import React from 'react'
import { motion } from 'framer-motion'

export default function SubMenuItems({data,status}) {

    
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
          }
        }
      }

    const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
    x: 0,
    opacity: 1
    }
    }
    return (
        <div className="overlay menu-page">
            <button className="cross-btn" onClick={e=>status([])}><i className="fas fa-times"></i></button>
            <div className="page-header">
                <h2 className="white-text">
                {data.title}
                </h2>
            </div>

            <motion.div className="items-container" 
            initial="hidden"
            animate="visible"
            variants={container}
            >
            {
               data.items.map(({name,image,chef,price,id})=>(
                 <motion.div className="item-card" key={id} variants={item}>
                     <motion.div className="hero" 
                     animate={
                         { rotate:2,x:1}
                     }
                     transition={{repeat:Infinity,duration:.5,repeatType:'mirror',ease: [0.17, 0.67, 0.83, 0.67]}}
                     >
                    <img src={image} alt={name}/>
                     </motion.div>
                     <div className="text-container">
                         <h3 className="white-text">{name}</h3>
                         <p>by {chef}</p>
                         <h2><small>$</small> {price}</h2>
                     </div>
                     <div className="add-to-cart">
                         <button className="red-button">Add to Cart</button>
                     </div>
                 </motion.div>  
               ))
            } 
            </motion.div>
           
        </div>
    )
}
