import React,{useEffect} from 'react'
import {useInView} from "react-intersection-observer"
import { motion,useAnimation} from "framer-motion";
import {specialMenu,popularItems} from '../data'

export default function Homepage() {

    const animation =  useAnimation()
    const [ref, inView, entry] = useInView({ threshold: 0 });

    useEffect(() => {
      if (inView) {
        animation.start("visible");
      } else {
        animation.start("hidden");
      }
    }, [animation, inView]);



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
        <div className="home-page">
            {/* special items */}
            <div className="carousel-header">
                <h2 className="title-text">Special Menu</h2>
            </div>
            <motion.div className="card-container" 
            initial="hidden"
            animate="visible"
            variants={container}
            >
            {
                    specialMenu.map((menuItem,idx)=>{
                        return(
                            <motion.div className={`card ${menuItem.colorScheme}`} 
                            key={idx}
                            initial="hidden"
                            animate="visible"
                            variants={container}
                            >
                            <motion.img src={menuItem.image} alt={menuItem.title} />
                            <h3 className="normal-text">{menuItem.title}</h3>
                            </motion.div>
                        )
                    })
                }  
            </motion.div>
            
            <div className="carousel-header">
                <h2 className="title-text">Most Popular Items</h2>
            </div>
            

            
                <motion.div className="card-container" 
                  ref={ref}
                  initial="hidden"
                  animate={animation}
                  variants={container}
                >
                
                    {
                        popularItems.map((card,idx)=>{
                            return(
                                <motion.div className="cart-card"
                                key={idx}
                                ref={ref}
                                 initial="hidden"
                                 animate={animation}
                                 variants={container}
                                >
                                <motion.div className="hero"
                                    variants={item}
                                    >
                                    <img src={card.image} alt={card.name}/>
                                </motion.div>
                
                                <motion.div className="text-container" 
                                    variants={item}
                                    >
                                        <h3 >{card.name}</h3>
                                        <p>by {card.chef}</p>
                                        <h3><span className="light-text">$</span>2.99</h3>
                                </motion.div>
                                <motion.div className="cart-button" 
                                    variants={item}
                                    >
                                        <button className="red-button">
                                            Add to Cart
                                        </button>
                                </motion.div>
                                </motion.div>   
                            )
                        })
                    }
                </motion.div>
                
            </div>

    )
}
