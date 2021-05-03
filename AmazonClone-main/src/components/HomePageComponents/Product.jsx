import React,{useContext} from "react";
import {StateContext,ProductContext} from "../../Providers/stateProvider";

export default function Product({id, title, price, rating, image, quantity }) {
  const [data,updatedata] = useContext(StateContext);

  const [product,updateproduct] = useContext(ProductContext);
  // const updatedata = basketContext[1];
  // const updateproduct = productContext[1];
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p>
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      {/* <div className="product_info2"> */}
        <img className="product_image" src={image} alt="product_image" />
        {quantity > 0 ? <p>Quantity: {quantity} </p>:null}
        <button  onClick={()=>{

          // updateproduct( (prevState) => {
          //     const newState = [...prevState];
          //     newState.forEach( (item)=>{
          //       if(item._id === id){
          //         item.quantity = item.quantity + 1;
          //       }
          //     })
          //     return newState;
          // })

          updatedata((prevState) => {
            if(prevState.length === 0){
            return  [ ...prevState,{title:title,price:price,rating:rating,image:image,id:id,quantity:quantity+1}]
            }
            const newState = prevState;
            console.log(prevState);
            var found = false;
            newState.forEach( (item)=>{
              if(item.id === id){
                item.quantity = item.quantity + 1;
                found = true;
              }
            })
            if(found){
              return newState;
            }
            return [...prevState,{id: id,title:title,price:price,rating:rating,image:image,quantity:quantity+1}]
          });

          updateproduct( (prevState) => {
            var quantity = 0;
            data.forEach((item)=>{
                if(item.id === id){
                  quantity = item.quantity;
                }
            });
            const newState = [...prevState];
            newState.forEach((item)=>{
              if(item._id === id){
                console.log(`Quanitty updated ${id}`);
                item.quantity = quantity === 0?1:quantity;
              }
            })
            console.log(newState);
            return newState;
          })

          // alert("Added to cart");
        }} className="product_to_cart"> Add to Cart </button>
      {/* </div> */}
    </div>
  );
}
