import React,{useEffect,useState} from 'react'
import useFirestore from '../firebase/useFirestore'
import MyOrdersItems from './MyOrdersItems'

export default function MyOrders({user}) {

    const [orders,setOrders] = useState([])

    const {docs} =  useFirestore("orders")
    
    useEffect(() => {
        const data = [...docs].filter(item=>item.user_id ===  user.email);
        setOrders(data)
    }, [docs,user.email])


    return (
      <div className="my-orders">
          
            {
          <main>
              {
                orders.length > 0 ?
                orders.map(item=>
                    <MyOrdersItems item={item} key={item.id}/>
                ) :
                "You have no orders"
              }
        </main>
            }
      </div>
    )
}
