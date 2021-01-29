import React from 'react'

export default function Popup({status,actions,message,type,title}) {

    

    return (
        <div className="overlay">
        <div className="popup">
            <button className="cross-btn" onClick={e=>status(false)}><i className="fas fa-times"></i></button>
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
        </div>
        </div>
    )
}
