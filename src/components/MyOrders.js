import React, { useContext, useEffect, useState } from 'react'
import useFirestore from '../firebase/useFirestore'
import { GlobalContext } from '../GlobalContext';
import MyOrdersItems from './MyOrdersItems'

export default function MyOrders() {

  const [orders, setOrders] = useState([])

  const { state: { user } } = useContext(GlobalContext);


  const { docs } = useFirestore("orders")

  useEffect(() => {
    const data = [...docs].filter(item => item.user_id === user.email);
    setOrders(data)
  }, [docs, user.email])


  return (
    <div className="my-orders">

      {
        <main>
          {
            orders.length > 0 ?
              orders.map(item =>
                <MyOrdersItems item={item} key={item.id} />
              ) :
              <header className="green-text"><h1>You have no orders</h1></header>
          }
        </main>
      }
    </div>
  )
}
