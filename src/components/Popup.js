import React,{useState,useEffect} from 'react'

export default function Popup({status,action,message,type,title}) {

        

    return (
        <div className="overlay">
        <div className="popup">
            <button className="cross-btn" onClick={e=>status(false)}><i className="fas fa-times"></i></button>
            {type === "Succes" && 
            <div className="icon">
                <i className="fas fa-check-double succes"></i>
            </div>}
            {title && <h1 className="normal-text">{title}</h1>}
            {message && <p className="light-text">{message}</p>}
            {action && 
            <div className="actions">
            <button onClick={()=>action()}>Yes</button>
            <button onClick={()=>status(false)}>No</button>
            </div>
            }
        </div>
        </div>
    )
}
