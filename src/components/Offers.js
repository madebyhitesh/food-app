import React from 'react'
import useFirestore from '../firebase/useFirestore'
import Footer from './Footer';

export default function Offers({dispatch,currentOffer}) {
    const {docs} = useFirestore("promo");
    return (
        <>
        <div className="offers-page">
            <header className="green-text">
                <h1>
                Offers For You.
                </h1>
            </header>
            <div className="offers-container">

            {
                //offers card container
                docs.map(({code,description,value,id,isPercentage})=>(
                    <div className="card" key={id}>
                        <div className="description">
                            <h2 className="normal-text">{code}</h2>
                            <p className="light-text">{description}</p>
                        </div>
                        <div className="apply-promo">{
                            currentOffer && currentOffer.code !== code ?
                            <button onClick={()=>dispatch({type:"ADDPROMO",payload:{code,value,isPercentage}})}>
                              Add Promo
                            </button> :
                            <button onClick={()=>dispatch({type:"REMOVEPROMO"})}>
                                Remove Promo
                            </button>

                        }
                        </div>
                    </div>
                ))
            }
            </div>

           
        </div>
        <Footer/>
        </>
    )
}
