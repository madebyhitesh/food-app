import React, { useEffect, useState } from 'react'
import Delivery from "../assets/delivery.svg"
import useFirestore from "../firebase/useFirestore"
import SubMenuItems from "./SubMenuItems"
import Footer from './Footer';
import { specialMenu } from "../data"

export default function Homepage({ dispatch, cart }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentCategory, setCurrentCategory] = useState("")
    const [currentMenuItem, setCurrentMenuItem] = useState([])
    const [popularItems] = useState(["4MVcMDuBk9UHE1gKmPYP", "T2kJy9BXRG9SHTrvndfs", "fE2A2ZC9fhZRRf89iq0R", "CBzonQXWX8a5A7w2vhWn", "x9mRKsRTeywXXA6KtehA"]);


    const { docs } = useFirestore("products"); //all the products available 

    // selecting the current category when user click the menu card
    useEffect(() => {
        const items = docs.filter(doc => doc.category === currentCategory)
        setCurrentMenuItem(items)
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [currentCategory, docs])


    //when user click on the special menu card it open then sub menu 
    const onMenuClick = (title) => {
        setIsMenuOpen(true)
        setCurrentCategory(title)
    }


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

    // functioin to handle adding items to the cart and add to cart animation
    function handleAddtoCart(e, id) {
        const el = e.target;
        el.classList.add('clicked')
        setTimeout(() => {
            dispatch({ type: "ADD", payload: { item_id: id, quantity: 1 } })
            el.classList.remove('clicked')
        }, 1500)
    }





    return (
        <>
            <div className="home-page">
                {/* special items */}
                <div className="carousel-header">
                    <h2 className="title-text">Special Menu</h2>
                </div>
                <div className="card-container">
                    {
                        specialMenu.map((menuItem, idx) => {
                            return (
                                <div className={`card ${menuItem.colorScheme}`}
                                    key={idx}
                                    onClick={() => onMenuClick(menuItem.title)}
                                >
                                    <img src={menuItem.image} alt={menuItem.title} />
                                    <h3 className="normal-text">{menuItem.title}</h3>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="carousel-header">
                    <h2 className="title-text">Most Popular Items</h2>
                </div>



                <div className="card-container">

                    {
                        docs.filter(doc => popularItems.includes(doc.id)).map(card => (

                            <div className="cart-card"
                                key={card.id}
                                initial="hidden"
                                animate="visible"
                                variants={container}
                            >
                                <div className="hero">
                                    <img src={card.image} alt={card.name} />
                                </div>

                                <div className="text-container" >
                                    <h3 className="normal-text">{card.name}</h3>
                                    <p className="light-text">by {card.chef}</p>
                                    <h3 className="normal-text"><i className="fas fa-rupee-sign"></i> {card.price}</h3>
                                </div>
                                <div className="cart-button"
                                    variants={item}
                                >
                                    {
                                        cart.find(item => item.item_id === card.id) ?
                                            <div className="add-to-cart">
                                                <button className="red-button" onClick={e => dispatch({ type: "REMOVE", payload: card.id })}>
                                                    Remove
                                                </button>
                                            </div>
                                            :
                                            <div className="add-to-cart">
                                                <button className="red-button" onClick={e => handleAddtoCart(e, card.id)}>
                                                    <span>Add to Cart</span>
                                                    <i className="fas fa-shopping-cart"></i>
                                                    <i className="fas fa-box"></i>
                                                </button>
                                            </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="flex-container">
                    <div className="text-container">
                        <h2 className="normal-text">
                            Delivering Your Favourite Food In <span className="green-text">30 Minutes.</span>
                        </h2>
                        <p className="light-text">It is a long established fact that a reader will be distracted by the readable content of page when looking at the layout.</p>
                    </div>
                    <div className="image-container">
                        <img src={Delivery} alt="delivery" />
                    </div>
                </div>
                {
                    isMenuOpen &&
                    <SubMenuItems
                        data={currentMenuItem}
                        status={setIsMenuOpen}
                        title={currentCategory}
                        dispatch={dispatch}
                        cart={cart}
                    />
                }
            </div>
            <Footer />
        </>

    )
}
