import React from 'react'
import { motion } from 'framer-motion'
export default function Popup({ item, isVisible, status, cart, dispatch, setSelectedItem }) {

    const { id, chef, name, image, price } = item;

    // functioin to handle adding items to the cart and add to cart animation
    function handleAddtoCart(e, id) {
        const el = e.target;
        el.classList.add('clicked')
        setTimeout(() => {
            dispatch({ type: "ADD", payload: { item_id: id, quantity: 1 } })
            el.classList.remove('clicked')
        }, 1500)
    }

    function closePopup() {

        status(false)
        setSelectedItem(null)
    }

    return (
        <div className="overlay">
            {isVisible && (
                <motion.div className="popup"
                    initial={{ opacity: 0, y: "-50%", scale: 0 }}
                    animate={{ opacity: 1, y: "0", scale: 1 }}
                    key={item.id}
                >
                    <motion.button className="cross-btn" onClick={e => closePopup()}
                        whileHover={{
                            rotate: 180,
                            transition: { duration: .3 },
                        }}
                    ><i className="fas fa-times"></i></motion.button>
                    <div className="cart-card"
                        key={item.id}
                    >
                        <div className="hero">
                            <img src={image} alt={item.name} />
                        </div>

                        <div className="text-container" >
                            <h3 className="normal-text">{name}</h3>
                            <p className="light-text">by {chef}</p>
                            <h3 className="normal-text"><i className="fas fa-rupee-sign"></i> {price}</h3>
                        </div>
                        <div className="cart-button">
                            {
                                cart.find(item => item.item_id === id) ?
                                    <div className="add-to-cart">
                                        <button className="red-button" onClick={e => dispatch({ type: "REMOVE", payload: id })}>
                                            Remove
                                                </button>
                                    </div>
                                    :
                                    <div className="add-to-cart">
                                        <button className="red-button" onClick={e => handleAddtoCart(e, id)}>
                                            <span>Add to Cart</span>
                                            <i className="fas fa-shopping-cart"></i>
                                            <i className="fas fa-box"></i>
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
