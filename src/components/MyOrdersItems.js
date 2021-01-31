import React, { useState } from 'react'
import useFirestore from '../firebase/useFirestore';
import {motion} from 'framer-motion'

const MyOrdersItems = ({item}) => {

    const [isOpen,setIsOpen] =  useState(false)

    const {docs} =  useFirestore("products")

     // sturucture of the data output
     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

     // function to return the items details using itme id
     function getItemDetails(item_id) {
         const item =  docs && docs.find(item=>item.id === item_id);
         if(item)
         return item;
 
         return false;
     }

     function handleToggle (){
         //toggle the isOpen
         setIsOpen(!isOpen);
     }

    const {id,cart,total,timestamp} = item;

    //framer motion variants
    const variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
    }


    return (
        <div className={"single-order-container"} key={id}>
        <section className="main-area">
            <div className="order-date-id">
            <p className="order-id"><b>OrderId:</b> #{id.substr(1,8)}</p>
            <p className="order-date">{new Date(timestamp).toLocaleDateString(undefined,options)}</p>
            </div>
            <div className="order-price-status">
            <p className="order-total"><b>&#x20B9;</b> {total}</p>
            <p className="order-status"><b>Delivered</b></p>
            </div>
        </section>
        {
            isOpen &&
            <motion.section className="toggle-area" 
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{duration:.5,type:"spring"}}
            >
            <table>
                <tbody>
                {cart.map(({item_id,quantity})=>(
                <tr className="item" key={item_id}>
                <td>{getItemDetails(item_id).name} <small className="light-text">({quantity})</small></td>
                <td>&#x20B9; {(getItemDetails(item_id).price)*quantity}</td>
                </tr>
            ))}
                </tbody>
            </table>
        </motion.section> 
        }
        <div className="action">
        <button onClick={handleToggle}>{!isOpen ? "Show details" : "Hide Details"}</button>
        </div>
    </div>
    )
}

export default React.memo(MyOrdersItems)
