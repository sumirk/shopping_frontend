import React from 'react'
import './Item.css'

export default function Item({ item, onAddToCart, children }) {
                 return (
                   <div className="Item">
                     <div className="Item-image-div">
                       <img className="Item-image" alt="item" />
                     </div>
                     <div className="Item-title">{item.title}</div>
                     <div className="Item-description">{item.description}</div>
                     <div className="Item-price">${item.price}</div>
                     <div>{children}</div>
                   </div>
                 );
               }
