import React,{useContext} from "react";
import Nav from "./HomePageComponents/Nav";
import "../checkout.css";
import {StateContext,UserContext,ProductContext} from "../Providers/stateProvider";
import CheckoutProduct from "./HomePageComponents/CheckoutProduct"
import axios from "axios";
import {useHistory} from "react-router-dom";

function findTotal(arr) {
  var total = 0;
  arr.forEach( (item) => {
    total = total + item.price * item.quantity;
  })
  return total;
}

async function byProducts(basket,history,user,price,updatebasket,updateproduct) {

  const response = axios.post("http://localhost:8000/buyproduct",
  {products: basket,user: user,price: price,date: new Date().toISOString().slice(0, 10)})
  .then(function(response) {
    if(response.data.success){
      updatebasket((prevState) => {
        return [];
      })
      updateproduct((prevState)=>{
        return [];
      })
      history.push("/");
    }
    else{
      alert("Please try again later");
    }
  })
}

export default function Checkout() {
  const history = useHistory();
  const [basket,updatebasket] = useContext(StateContext);
  const [product,updateproduct] = useContext(ProductContext);
  const [user] = useContext(UserContext);
  const total = findTotal(basket);
  console.log(total);
  return (
    <div>
      <Nav />
      <div className="checkout">
          <div className="checkoutleft">
            <img className="checkoutad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg" alt="checkout_img" />
            <div>
            <p>Checkout Items</p>
            <div>
            { basket.length > 0 ?
              basket.map((item,i) => {
              return <CheckoutProduct key={i}  id={item.id} title={item.title} price={item.price} rating={item.rating} image={item.image} quantity={item.quantity} />
            }
            ): <p className="noitem">No Item in Cart</p>
            }
            </div>
            </div>
          </div>
          <div className="checkoutright">
            <p>Total cost ({basket.length} items) : <strong>₹ {total}</strong></p>
           {/* <p>  <input type="checkbox" >This has a special gift</input> </p> */}
            <button onClick={() => {
                if(user === ""){
                  history.push("/login");
                }
                else{byProducts(basket,history,user,total,updatebasket,updateproduct);}
            }}>Proceed to checkout</button>
          </div>
      </div>
    </div>
  );
}
