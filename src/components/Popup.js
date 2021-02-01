import React from 'react'
import {motion} from 'framer-motion'
export default function Popup({status,actions,message,type,title,isVisible}) {

    

    return (
        <div className="overlay">
        {isVisible && (
        <motion.div className="popup" 
        initial={{ opacity: 0,y:"-50%",scale:0}}
        animate={{ opacity: 1,y:"0",scale:1}}
        key={type}
        >
            <motion.button className="cross-btn" onClick={e=>status(false)}
            whileHover={{
                rotate:180,
                transition: { duration: .3 },
              }}
            ><i className="fas fa-times"></i></motion.button>
            {/* if the modal type is "Succes" */}
            {type === "Succes" && 
            <div className="icon">
                <i className="fas fa-check-double succes"></i>
            </div>}
            {/* if the modal type is "Danger" */}
            {type === "Danger" && 
            <div className="icon">
                <i className="fas fa-exclamation danger"></i>
            </div>}
            {/* if the modal type is "warning" */}
            {type === "Warning" && 
            <div className="icon">
                <i className="fas fa-exclamation-triangle warning"></i>
            </div>}
            {title && <h1 className="normal-text">{title}</h1>}
            {message && <p className="light-text">{message}</p>}
            {actions && 
            <div className="actions" >
            {   
            actions.map(({type,cb,title})=>(
                <button className={type} key={type} onClick={()=>cb()}>{title}</button>
                ))
            }
            </div>
            }
        </motion.div>
        )}
        </div>
    )
}
