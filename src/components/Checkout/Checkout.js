import React, { useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import './checkout.css'

import {AuthContext} from '../../utils/auth-context'
import { httpGetAllItems } from "../../utils/httpFetch";

export default function Checkout() {
    const [redirect, setRedirect] = useState(false);
    // const [orders, setOrders] = useState([]);
    const auth = useContext(AuthContext);
    const { isLoggedIn, token, userId, login, logout, ordersFunc, orders } = auth;

    const checkOrder = async () => {
        let order;
        try {
          order = await httpGetAllItems(
            "http://localhost:5000/api/products/create-order",
            "GET",
            token
          );
          } catch (error) {
            console.log(error)
          }
          setRedirect(true);
          console.log(order)
        //   setOrders(order)
          ordersFunc(order);
    }

    //     const showLoading = () => {
    //   return loading && (
    //     <div className="alert alert-info"> 
    //     <h2>Loading.........</h2>
    //     </div>
    //   )
    // }

    const redirectUser = () => {
      if (redirect) {
        return (
          <Redirect
            to="/account"
          ></Redirect>
        );
      }
    }

    // const showError = () => {
    //         return (
    //           <div
    //             className="alert alert-danger"
    //             style={{ display: error ? "" : "none" }}
    //           >
    //             {error}
    //           </div>
    //         );
    // };


    return (
      <React.Fragment>
        <button onClick={() => checkOrder()} className="Checkout-button">
          Checkout
        </button>
        { redirect ? <div>{redirectUser()}</div>: null }
      </React.Fragment>
    );
}
