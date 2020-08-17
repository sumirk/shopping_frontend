import React, { useState, useContext , useEffect} from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import './App.css';

import ItemsPage from './components/ItemsPage/ItemsPage'
import Nav from './components/Nav/Nav'
import CartPage from './components/CartPage/CartPage';
import Signup from './components/Auth/Signup'
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Login";
import Accounts from "./components/AccountsPage/Accounts";
import {AuthContext} from './utils/auth-context'
import { httpFetch, httpGetAllItems } from "./utils/httpFetch";
import Orders from './components/AccountsPage/Orders';

// import {items} from './staticitems'


const App = () => {

  const [activeTab, setActiveTab] = useState("items");
  const [cart, setCart] = useState([]);
  // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart"));
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const setCartHandler = (value) => {
    setCart(value);
  }

  let [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)

  const auth = useContext(AuthContext);

  const login = (uid, token) => {
      setToken(token)
      setUserId(uid)
  }

  const logout = () => {
      setToken(null);
      setUserId(null);
  };


  const ordersFunc= (value) => {
    setOrders(value);
  };


  const tokenValid = async () => {
    let jwt;
    try {
      jwt = await JSON.parse(atob(token.split(".")[1]));
      console.log(jwt)
    } catch (error) {
       return false
    }
    return Date.now() < jwt.exp;
  }



  // const tempItems = async () => await httpGetAllItems("http://localhost:5000/api/products/", "GET");



  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const fetchItems = await httpGetAllItems(
          "http://localhost:5000/api/products/",
          "GET"
        );
        setItems(fetchItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllItems();
  }, []);

  // useEffect( () => {
  //     const fetchCartUser = async () => {
  //           let fetchCart;
  //           try {
  //                 if (auth.isLoggedIn) {
  //                 fetchCart = await httpGetAllItems(
  //                   "http://localhost:5000/api/products/cart",
  //                   "GET",
  //                   token
  //                 );
  //                     setCart(fetchCart);
  //                   }
  //                 }
  //           catch (error) {
  //             console.log(error)
  //           }
  //                   console.log(fetchCart);
  //           }
  //     fetchCartUser();
  //     console.log('2nd Useeffcct')

  // }, [auth.isLoggedIn, token])

  console.log(items)

  const addToCartHandler = async (item) => {       
          let cartResponse;
          try {
          cartResponse = await httpFetch(
            "http://localhost:5000/api/products/cart",
            "POST",
            token,
            item
          );
          } catch (error) {
            console.log(error)
          }

          //// Local storage handling commented

          // if (localStorage.getItem("cart")) {
          //   const cartLocal = JSON.parse(localStorage.getItem("cart"));
          //   setCart(cartLocal);
          // }
          // localStorage.setItem("cart", JSON.stringify(cartResponse));


          // Handle the retrnedn objetct with cartitem entry in the json to create the set cart and then ,,, we will have to get rid of the aggregate cart function 
          // const updatedCart = [...cart, item]; 

          // localStorage.setItem("cart", JSON.stringify(updatedCart));

          setCart(cartResponse);

          // setCart(cart => {
          //   const newCart = [...cart, item];
          //   localStorage.setItem("cart", JSON.stringify(newCart));
          //   return newCart;
          // })    }
        }


  const onRemoveCartHandler = async (item) => {
      let cartResponse;
      try {
        cartResponse = await httpFetch(
            "http://localhost:5000/api/products/cart",
            "DELETE",
            token,
            item
          );
      } catch (error) {
        console.log(error)
      }

    // let cart = [];

    
    // if (localStorage.getItem("cart")) {
    //   cart = JSON.parse(localStorage.getItem("cart"));
    //   setCart(cart);
    // }

    //// Local storage commented
    // if (localStorage.getItem("cart")) {
    //     const cartLocal = JSON.parse(localStorage.getItem("cart"));
    //     setCart(cartLocal);
    //   }

    // localStorage.setItem("cart", JSON.stringify(cartResponse));
      setCart(cartResponse);

  //   setCart((cart) => {
  //     let tempCart = [...cart]
  //     const index = tempCart.findIndex((cartItem) => cartItem.id === item.id);
  //     tempCart.splice(index, 1);
  //     localStorage.setItem("cart", JSON.stringify(tempCart));
  //     return tempCart

  //   });
  // };

  // const aggCountCartHandler = (data) => {
  //   let aggregateData;
  //   if (data) {
  //     aggregateData = data.reduce((dataStruc, value) => {
  //       if (dataStruc[value.id]) {
  //         dataStruc[value.id].count++;
  //       } else {
  //         dataStruc[value.id] = { ...value, count: 0 };
  //         dataStruc[value.id].count++;
  //       }

  //       return dataStruc;
  //     }, {});
  //     return Object.values(aggregateData); // This returns an array of the values except the id  - out of the Object
  //   }


  // };
    }
      return (
        <React.Fragment>
          <AuthContext.Provider
            value={{
              isLoggedIn: !!token,
              token: token,
              userId: userId,
              login: login,
              logout: logout,
              ordersFunc: ordersFunc,
              tokenValid: tokenValid,
              orders: orders,
            }}
          >
            <BrowserRouter>
              <Nav
                activeTab={activeTab}
                onTabChange={setActiveTab}
                cart={cart}
                setCart={setCartHandler}
              />
              <Switch>
                <Route path="/" exact>
                  <ItemsPage
                    items={items}
                    onAddToCart={addToCartHandler}
                    cart={cart}
                  />
                </Route>
                <Route path="/cart" exact>
                  <CartPage
                    onAddToCart={addToCartHandler}
                    onRemoveCart={onRemoveCartHandler}
                    cart={cart}
                  />
                </Route>
                <Route path="/account" exact>
                  <Accounts />
                </Route>
                <Route path="/orders" exact>
                  <Orders />
                </Route>
                <Route path="/signup" exact>
                  <Signup />
                </Route>
                <Route path="/login" exact>
                  <Login />
                </Route>
                <Route path="/logout" exact>
                  <Redirect to="/" />
                </Route>
                <Redirect to="/" />
              </Switch>
            </BrowserRouter>
          </AuthContext.Provider>
        </React.Fragment>
      );
}

export default App;
