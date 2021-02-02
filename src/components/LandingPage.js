import React, { useState, useCallback, useContext } from 'react'
import { motion } from "framer-motion"
import Homepage from './Homepage'
import Signup from './Signup'
import Popup from './Popup';
import LandingImage from './LandingImage'
import SelectedProductPopup from './SelectedProductPopup'
import useFirestore from '../firebase/useFirestore';
import { GlobalContext } from '../GlobalContext';

export default function LandingPage() {

    const [isFormOpen, setFormOpen] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null)
    const [isVisible, setIsVisible] = useState(false)

    const { state: { cart, user }, dispatch } = useContext(GlobalContext);


    const { docs } = useFirestore("products");

    // function to return the items details using itme id
    function getItemDetails(item_id) {
        const item = docs && docs.find(item => item.id === item_id);
        if (item)
            return item;

        return false;
    }



    const searchFunc = useCallback((searchValue, docs) => {
        if (searchValue) {

            const items = docs.filter(doc => {
                return Object.keys(doc).some(key => doc[key].toString().toLowerCase().includes(searchValue.toLowerCase()))
            })
            return items
        }
        return false
    }, [])




    const variants = {
        hidden: { x: "100%" },
        visible: { x: 0 },
    }

    //handling opening and closing of signup modals
    const handleFormModel = (type) => {
        setFormOpen(!isFormOpen);
        setIsSignUp(type)
    }

    //handle value change of search input
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    const handleItemSelect = (itemId) => {
        setSelectedItem(getItemDetails(itemId))
        setSearchValue('')
        setIsVisible(true)
    }

    return (
        <>
            <div className="landing-page">
                <div className="content-wrapper">
                    <div className="text-container">
                        <div className="heading-para">
                            {user.id && <h3 className="normal-text">Welcome <span className="green-text">{user.email}</span>, </h3>}
                        </div>
                        <div className="heading-title">
                            <h2 className="normal-text">
                                Enjoy Quick <span className="green-text">Food</span> Delivery In SpecialOccasion.
               </h2>
                        </div>
                        <div className="heading-para">
                            <p className="light-text">It is a long established fact that a reader will be distracted by the readable content of page when looking at the layout.</p>
                        </div>
                        {
                            !user.id &&
                            <div className="call-to-action">
                                <button className="btn green-button" onClick={() => handleFormModel(true)}>
                                    Sign Up
               </button>
                                <button className="btn transparent-button" onClick={() => handleFormModel(false)}>
                                    Log In
               </button>
                            </div>
                        }
                        <div className="image-wrapper first">
                            <motion.div className="image-container"
                                initial="hidden"
                                animate="visible"
                                variants={variants}
                                transition={{ duration: .5, type: "spring" }}
                            >
                                {/* <img src={landingImage} alt="landing"/> */}
                                <LandingImage />
                            </motion.div>
                        </div>
                        <div className="search-bar">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input type="text"
                                    name="seach-input"
                                    placeholder="What are you looking for?"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    autoComplete="off"
                                />
                                <button className="btn red-button">Search</button>
                            </form>
                            <div className="searched-items">

                                {
                                    searchFunc(searchValue, docs) && searchFunc(searchValue, docs).map(({ name, isVeg, id }) => (
                                        <div className="searched-item" onClick={() => handleItemSelect(id)}>
                                            <p>{name}</p>

                                            {
                                                isVeg ?
                                                    <span className="square veg">
                                                        <span className="circle"></span>
                                                    </span> :
                                                    <span className="square non-veg">
                                                        <span className="circle"></span>
                                                    </span>
                                            }
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                    </div>
                    <div className="image-wrapper second">
                        <motion.div className="image-container"
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: .5, type: "spring" }}
                        >
                            {/* <img src={landingImage} alt="landing"/> */}
                            <LandingImage />
                        </motion.div>
                    </div>
                </div>
            </div>
            <Homepage dispatch={dispatch} cart={cart} />
            {
                isFormOpen &&
                <Signup
                    status={setFormOpen}
                    formtype={isSignUp}
                    formtypeStatus={setIsSignUp}
                    dispatch={dispatch}
                    popup={setIsPopupOpen} />
            }
            {
                isPopupOpen &&
                <Popup
                    title="Welcome"
                    message="Your favourite food is just few clicks away"
                    type="Succes"
                    status={setIsPopupOpen}
                    isVisible={isPopupOpen}
                />
            }
            {
                selectedItem && isVisible &&
                <SelectedProductPopup
                    isVisible={isVisible}
                    status={setIsVisible}
                    cart={cart}
                    item={selectedItem}
                    dispatch={dispatch}
                    setSelectedItem={setSelectedItem}
                />
            }
        </>
    )
}
