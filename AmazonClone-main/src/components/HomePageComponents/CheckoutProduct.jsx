import React,{useContext} from 'react'
import {StateContext,ProductContext} from "../../Providers/stateProvider";
export default function CheckoutProduct({id,title,price,rating,image,quantity}) {
    const updatebasket = useContext(StateContext)[1];
    const updateproduct = useContext(ProductContext)[1];
    return (
        <div className="checkoutproduct">
           <img className="checkoutimage" src={image} alt="checkoutproduct" />
            <div className="checkoutinfo">
              <p ><strong>{title}</strong></p>
              <p><small>₹</small><strong>{price}</strong></p>
              <div className="checkoutrating">
              {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
              </div>
              <p><strong>Quantity: {quantity}</strong></p>
              <button className="removebutton" onClick = {()=>{
                updateproduct( (prevState) => {
                    const newState = [...prevState];
                    newState.forEach( (item)=>{
                      if(item._id === id){
                        item.quantity = 0;
                      }
                    })
                    return newState;
                })
                   updatebasket( (prevState) => {
                       console.log("Found");
                      const newState = prevState.filter( (item) => {
                          return item.id !== id;
                       })
                       return newState;
                   })
                   alert("Confirm remove from cart");
              }}>Remove this item from cart</button>
            </div>
        </div>
    )
}
