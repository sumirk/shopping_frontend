import React, { useState, useContext } from 'react'
import './ItemsPage.css'
import { Redirect } from 'react-router-dom'

import {AuthContext} from "../../utils/auth-context";
import Item from '../Item/Item'

export default function ItemsPage({ items, onAddToCart }) {
                const auth = useContext(AuthContext)
                const [redirect, setRedirect] = useState(false)
                const redirectHandler = () => {
                  setRedirect(!redirect);
                }
                const renderRedirect = () => {
                  if (redirect) {
                    return <Redirect to="/login"/>
                  }
                   
                }
                if (!auth.isLoggedIn) {
                    return (
                      <ul className="ItemPage-items">
                        {items.map(
                          (item) => {
                            return (
                              <li key={item.id} className="ItemPage-item">
                                <Item item={item} onAddToCart={onAddToCart}>
                                  {" "}
                                  <button
                                    onClick={redirectHandler}
                                    className="Item-addToCart"
                                  >
                                    {renderRedirect()}
                                    Add to Cart
                                  </button>
                                </Item>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    );
                } else {
                    return (
                      <ul className="ItemPage-items">
                        {items.map((item) => {
                          return (
                            <li
                              key={item.id}
                              className="ItemPage-item"
                            >
                              <Item
                                item={item}
                                onAddToCart={onAddToCart}
                              >
                                {" "}
                                <button
                                  onClick={() =>
                                    onAddToCart(item)
                                  }
                                  className="Item-addToCart"
                                >
                                  Add to Cart
                                </button>
                              </Item>
                            </li>
                          );
                        })}
                      </ul>
                    );
                }

               }
