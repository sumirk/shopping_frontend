import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/auth-context";
import { httpGetAllItems } from "../../utils/httpFetch";


export default function Orders({ order }) {
                    const auth = useContext(AuthContext);
                    const { isLoggedIn, logout, token, tokenValid } = auth;
                    const [orders, setOrders] = useState([]);

                    const getOrder = async () => {
                      let orderFetch;
                      let validToken;
                      try {
                        validToken = tokenValid()
                        console.log(validToken);
                      } catch (error) {
                        logout()
                      }
                      if (validToken) {
                        try {
                          orderFetch = await httpGetAllItems(
                            "http://localhost:5000/api/products/get-order",
                            "GET",
                            token
                          );
                        } catch (error) {
                          console.log(error);
                        }
                      }
                      console.log(orderFetch);
                      setOrders(orderFetch);
                    };

                    useEffect(() => {
                      getOrder();
                    }, []);
    return (
      isLoggedIn && (
        <div className="card" style={{ width: "40rem" }}>
          <ul className="list-group">
            {orders.map((order) => (
              <li key={order.id} className="list-group-item">
                <div className="card-header">{order.id}</div>
                <ul className="list-group">
                  {order.products.map((product) => (
                    <li className="list-group-item">
                      <span> {product.title} </span>
                      <span> {product.orderItem.count} </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )
    );
}
