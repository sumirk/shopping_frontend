import React, { useContext} from 'react'
import { Link } from "react-router-dom";
import {AuthContext} from "../../utils/auth-context";
import { httpGetAllItems } from "../../utils/httpFetch";


export default function Nav({ activeTab, onTabChange, cart, setCart }) {
                 const auth = useContext(AuthContext);
                 const { isLoggedIn, token, userId, login, logout } = auth;

                 const itemClass = (tabName) => {
                   return `nav-item ${activeTab === tabName ? "active" : ""}`;
                 };
                 const fetchCarts = async () => {
                   let fetchCart;
                   try {
                     if (isLoggedIn) {
                       fetchCart = await httpGetAllItems(
                         "http://localhost:5000/api/products/cart",
                         "GET",
                         token
                       );
                       setCart(fetchCart);
                     }
                   } catch (error) {
                     console.log(error);
                   }
                   console.log(fetchCart);
                 };

                 return (
                   <div>
                     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                       <div>
                         <ul className="navbar-nav mr-auto">
                           <li
                             onClick={() => onTabChange("cart")}
                             className={itemClass("items")}
                             //  className="nav-item"
                           >
                             <Link className="nav-link" to="/">
                               Items
                             </Link>
                           </li>
                           <li
                             onClick={() => {
                               onTabChange("cart");
                               fetchCarts();
                             }}
                             className={itemClass("cart")}
                           >
                             <Link className="nav-link" to="/cart">
                               Cart
                             </Link>
                           </li>
                           <li
                             onClick={() => onTabChange("account")}
                             className={itemClass("account")}
                           >
                             <Link className="nav-link" to="/account">
                               Account
                             </Link>
                           </li>
                           {!auth.isLoggedIn && (
                             <li
                               onClick={() => onTabChange("signup")}
                               className={itemClass("signup")}
                             >
                               <Link className="nav-link" to="/signup">
                                 Signup
                               </Link>
                             </li>
                           )}
                           {!auth.isLoggedIn && (
                             <li
                               onClick={() => onTabChange("login")}
                               className={itemClass("login")}
                             >
                               <Link className="nav-link" to="/login">
                                 Login
                               </Link>
                             </li>
                           )}
                           {auth.isLoggedIn && (
                             <li
                               onClick={() => onTabChange("logout")}
                               className={itemClass("logout")}
                             >
                               <Link
                                 className="nav-link"
                                 to="/logout"
                                 onClick={auth.logout}
                               >
                                 Logout
                               </Link>
                             </li>
                           )}
                         </ul>
                       </div>
                     </nav>
                   </div>
                 );
               }
