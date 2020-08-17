import React, { useContext } from "react";
import Item from '../Item/Item'
import './CartPage.css'
import Checkout from '../Checkout/Checkout';
import { AuthContext } from "../../utils/auth-context";

export default function CartPage({ cart, onAddToCart, onRemoveCart}) {
                  const auth = useContext(AuthContext);
                  const { isLoggedIn, token, userId, login, logout } = auth;
                 return (
                   <React.Fragment>
                     {isLoggedIn && (
                       <ul className="CartPage-items">
                         {cart.length > 0 ? (
                           cart.map((item) => (
                             <li key={item.id} className="CartPage-items">
                               <Item item={item}>
                                 <span>
                                   <button
                                     className="fa fa-minus-square-o"
                                     onClick={() => onRemoveCart(item)}
                                   ></button>
                                   <span className="CartItem-count">
                                     {item.cartItem.count}
                                   </span>
                                   <button
                                     className="fa fa-plus-square-o"
                                     onClick={() => onAddToCart(item)}
                                   ></button>
                                 </span>
                               </Item>
                             </li>
                           ))
                         ) : (
                           <li className="CartPage-items">
                             {" "}
                             Your Cart is Empty{" "}
                           </li>
                         )}
                       </ul>
                     )}
                     { isLoggedIn && <div className="Total-div">
                       Total: $
                       {cart.reduce(
                         (acc, item) => acc + item.price * item.cartItem.count,
                         0
                       )}
                     </div> }
                     { isLoggedIn &&  <Checkout />}
                   </React.Fragment>
                 );
               }
