import React,{useEffect,useState} from 'react'
import useFirestore from '../firebase/useFirestore'

export default function MyOrders({user}) {

    const [orders,setOrders] = useState([])
    console.log(orders)

    const {docs} =  useFirestore("orders")
    console.log(docs)

    useEffect(() => {
        const data = [...docs].filter(item=>item.user_id ===  user.email);
        setOrders(data)
    }, [docs])

    return (
        <div>
            My orders
            p
        </div>
    )
}
