import React, { useContext } from 'react'
import useFirestore from '../firebase/useFirestore'
import { GlobalContext } from '../GlobalContext';
import Footer from './Footer';

export default function Offers() {
    const { docs } = useFirestore("promo");

    const { state: { promo }, dispatch } = useContext(GlobalContext);

    return (
        <>
            <div className="offers-page">
                <header className="normal-text">
                    <h2>
                        Offers For You.
                </h2>
                </header>
                <div className="offers-container">

                    {
                        //offers card container
                        docs.map(({ code, description, value, id, isPercentage }) => (
                            <div className="card" key={id}>
                                <div className="description">
                                    <h2 className="normal-text">{code}</h2>
                                    <p className="light-text">{description}</p>
                                </div>
                                <div className="apply-promo">{
                                    promo && promo.code !== code ?
                                        <button onClick={() => dispatch({ type: "ADDPROMO", payload: { code, value, isPercentage } })}>
                                            Add Promo
                            </button> :
                                        <button onClick={() => dispatch({ type: "REMOVEPROMO" })}>
                                            Remove Promo
                            </button>

                                }
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
            <Footer />
        </>
    )
}
