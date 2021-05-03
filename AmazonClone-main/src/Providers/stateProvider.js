import React,{createContext,useState} from "react";
// import products from "../data/constant";
// import axios from "axios";

export const StateContext = createContext();

export const StateProvider = ({ children}) => {
   const [cart,updateCart] = useState([]);
   return <StateContext.Provider value={[cart,updateCart]}>
        {children}
    </StateContext.Provider>
}

export const ProductContext = createContext();

// async function getProducts() {
//   var products = [];
//   axios.get("http://localhost:8000/products").then( (result)=>{
//     products = result.data.products;
//     console.log(products);
//     products = products.map ( (prod) => {
//         return {...prod,quantity: 0}
//       });
//   });
//   return products;
// }

  // axios.get("http://localhost:8000/products").then((result)=>{
  //   products = result.data.products;
  //   products = products.map ( (prod) => {
  //     return {...prod,quantity: 0}
  //   });


export const ProductProvider = ({ children})  => {
   const [product,updateProduct] = useState([]);
   // useEffect( ()=>{
   //  async function rand(){
   //   updateProduct(await getProducts());
   // }
   // },[])
   return <ProductContext.Provider value={[product,updateProduct]}>
        {children}
    </ProductContext.Provider>
}

export const UserContext = createContext();

export const UserProvider = ({ children})  => {
   const [user,setUser] = useState("");
   return <UserContext.Provider value={[user,setUser]}>
        {children}
    </UserContext.Provider>
}
