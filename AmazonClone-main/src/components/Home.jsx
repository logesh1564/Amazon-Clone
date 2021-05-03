import React,{useEffect,useState,useContext} from "react";
import Nav from "./HomePageComponents/Nav";
import "../home.css";
import Product from "./HomePageComponents/Product";
import {StateContext,ProductContext} from "../Providers/stateProvider";
import axios from "axios";

function Home() {
  const [firstTwo,updatefirstTwo] = useState([]);
  const [middle,updatemiddle] = useState([]);
  const [last,updatelast] = useState([]);
  const [pro,updatepro] = useContext(ProductContext);
  const [basket] = useContext(StateContext);

  function getQuantity(id){
    var quantity = 0;
    basket.forEach(( item) => {
      if(item.id === id){
        quantity =  item.quantity;
      }
    })
    return quantity;
  }

  // function getProducts(){
  //   axios.get("http://localhost:8000/products").then((result)=>{
  //     let products = result.data.products;
  //     products = products.map ( (prod) => {
  //        return {...prod,quantity: getQuantity(prod._id)}
  //     })
  //     updatepro( (prevState)=>{
  //       return products;
  //     })
  //   })
  // }
  // getProducts();
  useEffect(function (){
    if(pro.length === 0){
    axios.get("http://localhost:8000/products").then((result)=>{
       let products = result.data.products;
       products = products.map ( (prod) => {
         return {...prod,quantity: getQuantity(prod._id)}
       })
       updatepro( (prevState) => {
         return products;
       })
     })
     console.log("Updated");
   }else{
     // let products = pro;
     // products = pro.map( (prod)=>{
     //   return {...prod,quantity: getQuantity(prod._id)}
     // })
     // updatepro(products);
     console.log("daw");
     console.log(pro);
   }
 },[]);

  useEffect( function (){
    updatefirstTwo(pro.slice(0,2));
    updatemiddle(pro.slice(2,pro.length-1));
    updatelast(pro.slice(pro.length-1,pro.length));
      // console.log("PRODUCTS"+pro[0]);
      // updatefirstTwo(pro.slice(0,2));
      // updatemiddle(pro.slice(2,pro.length-1));
      // updatelast(pro.slice(pro.length-1,pro.length));
  },[pro]);
  return (
    <div>
      <Nav />
      <div className="home">
        <img
          className="home-banner"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="amazon-banner"
        />
        <div className="products">
          {
           firstTwo.map( (product) => {
            return <Product key={product._id} id={product._id} title={product.title}  price={product.price} rating={product.rating} image={product.image} quantity={product.quantity} />
          })
          }
          </div>
          <div className="products">
          {
            middle.map( (product) => {
            return <Product key={product._id} id={product._id} title={product.title}  price={product.price} rating={product.rating} image={product.image} quantity={product.quantity} />
          })
          }
        </div>
        <div className="products">
        {last.map((product) =>{
          return <Product key={product._id} id={product._id} title={product.title}  price={product.price} rating={product.rating} image={product.image} quantity={product.quantity} />
        } )
        }
        </div>
      </div>
    </div>
  );
}

export default Home;
