import React,{useState,useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import useFirestore from '../firebase/useFirestore'
import {projectFirestore} from '../firebase/config'
import Footer from "./Footer"
import Popup from './Popup'

export default function Cart({cart,dispatch,promo,user}) {

    const history =  useHistory()

    const [loading,setLoading] = useState(false);
    const {docs} =  useFirestore("products");
    const [currentCartData,setCurrentCartData] =  useState([]);
    const [itemtotal,setItemTotal] =  useState(0);
    const [coupon,setCoupon] = useState(null);
    const [isPopupOpen,setIsPopupOpen] =  useState(false);
    const [popupData,setPopupData] = useState(null);
    //getting width of the device user using
    const width =  window.innerWidth;
    
    const cartItems = ()=>{
        const myArrayFiltered = docs.filter(array => cart.some(filter => filter.item_id === array.id));
        return myArrayFiltered;
    }

    const getQuantity =  (itemId)=>{
        const quantity =  cart.find(({item_id})=>item_id === itemId);
        if(quantity)
        return quantity.quantity;
    }




    
    useEffect(() => {
        setLoading(true);
        setCurrentCartData(cartItems())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docs,cart])

    useEffect(() => {
    //total price of items without the coupon
    const itemTotal  = () =>{
        let sum = 0;
        currentCartData.forEach(({id,price})=>{
            sum =  sum + parseInt(price*getQuantity(id));
        })
        setItemTotal(sum);
    }
        
    if(currentCartData.length>0){
        setLoading(false)
        itemTotal()
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCartData])

    useEffect(() => {
    //setting the coupon value
    const couponValue = ()=>{
        let coupon;
        const {value,isPercentage} =  promo;
        if(isPercentage)
        coupon =  itemtotal*(value/100)
        else
        coupon = value;

        setCoupon(coupon)
    }
     couponValue()
    }, [promo,itemtotal])


    function handleSubmitOrder (e){
        e.preventDefault()
        if(user.id){
            const body = {
                user_id:user.email,
                cart:[...cart],
                total: coupon ? itemtotal - coupon : itemtotal,
                timestamp: Date.now()
            }

            console.log(body)
            projectFirestore.collection("orders")
            .add(body)
            .then(docRef=>{
                //setting the pop up body for a succesful order
                const popupBody ={
                    type:"Succes",
                    title:"Order Placed :D",
                    message:"Just sit back and let us handle from here",
                    actions: [{
                        type:"Succes",
                        title:"My Orders",
                        cb: ()=>{
                            history.push("/my-orders")
                            dispatch({type:"COPY",payload:[]})
                            setIsPopupOpen(false)
                        }
                    }],

                }
                setPopupData(popupBody)
                setIsPopupOpen(true)
             })
            .catch(err=>console.log(err))

        }else{
            //setting the popup body if the user is not logged in
            const popupBody = {
                type:"Danger",
                title:"Login Required!!!",
                message:"If you dont have an account sign in",
                actions: false
            }
            setPopupData(popupBody)
            setIsPopupOpen(true)
        }

    }
  
    return (
        <>
        <div className="cart-page">
            <header>
                <h2 className="normal-text">{!loading ? "Your favourite food is just few clicks away" : "Looks like your cart is empty"}</h2>
            </header>
            <main>
            {
                loading ? 
                <>
                <header className="add-more-items">
                <Link to="/">Add items</Link>
                </header>
                </> :

            <section className="products">
            {
                currentCartData.map(({id,name,price,isVeg,chef,image})=>(
                    //list of the items in cart
                    <div className="card" key={id}>

                        <div className="hero">
                            <img src={image} alt={name}/>
                        </div>

                        <div className="description">
                            <div className="item-type">
                            <h4 className="normal-text">{name}</h4>
                            {
                                isVeg ?
                                <span className="square veg">
                                    <span className="circle"></span>
                                </span>:
                                <span className="square non-veg">
                                    <span className="circle"></span>
                                </span>
                            }
                            </div>
                            <p className="light-text">by {chef}</p>
                        </div>
                        
                        <div className="right-card-section">
                            <div className="change-quantity">
                            <button 
                            onClick={()=>{
                                const currentQuantity  =  getQuantity(id);
                                //restricting the quantity from getting negative
                                if(currentQuantity === 1)
                                dispatch({type:"REMOVE",payload:id})
                                else
                                dispatch({type:"SETQUANTITY",payload:{item_id:id,quantity:parseInt(currentQuantity - 1)}})
                            }}>
                            <i className="fas fa-minus"></i>
                            </button>
                            <p className="normal-text"> {getQuantity(id)} </p>
                            <button onClick={()=>dispatch({type:"SETQUANTITY",payload:{item_id:id,quantity:parseInt(getQuantity(id) + 1)}})}>
                            <i className="fas fa-plus"></i>
                            </button>
                            </div>
                            <div className="price normal-text">
                            <div> &#x20B9; </div>
                            <p> {price * getQuantity(id)}</p>
                            </div>
                        </div>
                    </div>
                ))
            }

            {
            currentCartData.length < 4 &&
            <div className="add-more-items">
            <div>
            <Link to="/">Add more items</Link>
            </div>
            </div>}
            </section>
            }
            {!loading && 
            <section className="price-description">
            <div className="coupon">
                <label htmlFor="coupoun">Offers</label>
                <form>
                {promo ? 
                <p>
                Promo selected : <b>{promo.code}</b>
                </p>
                : 
                <p>
                Select the promo
                </p>
                }
                <Link to="/offers">View</Link>
                </form>
            </div>
            <table className="cart-total">
                <tbody>
                    <tr>
                        <td>
                            Items Total
                        </td>
                        <td>
                            &#x20B9; {itemtotal}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Delivery
                        </td>
                        <td>
                            Free Delivery
                        </td>
                    </tr>
                    {
                        coupon &&
                    <tr>
                        <td>
                            Discount
                        </td>
                    <td>
                        - &#x20B9; {coupon} 
                    </td>
                    </tr>}

                    <tr>
                        <td>
                            <b>Grand Total</b>
                        </td>
                    <td>
                        <b>
                        &#x20B9; { coupon ? itemtotal - coupon : itemtotal}
                        </b>
                    </td>
                    </tr>
                </tbody>
            </table>
            <div className="place-order">
                <button onClick={handleSubmitOrder}>
                    Place Order
                </button>
            </div>
            </section>
        }
            </main>
        </div>
        {
            width > 600 && <Footer/>
        }

        {
            isPopupOpen &&
            <Popup  
            title={popupData.title} 
            message={popupData.message}
            type={popupData.type}
            actions={popupData.actions}
            status={setIsPopupOpen}/>
        }
        </>
        
    )
}
