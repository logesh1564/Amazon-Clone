import React,{useContext} from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import {StateContext,UserContext} from "../../Providers/stateProvider"
function Nav() {
  const [basket] = useContext(StateContext);
  var [user] = useContext(UserContext);
  var username = user===""?"Guest":user;
  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo-alt"
        />
      </Link>
      <div className="header-search">
        <input type="text" className="header-search-input" />
        <SearchIcon className="header-search-button" />
      </div>
      <div className="header-nav">
        <Link to="/login">
          <ExtraNav
            key="1"
            firstline={`Hello ${username}`}
            secondline="Account & Lists"
          />
        </Link>
        <ExtraNav key="2" firstline="Returns" secondline="&Orders" />
        <ExtraNav key="3" firstline="Yours" secondline="Prime" />
        <div className="header-nav-lastChild">
          <Link to="/checkout">
            <ShoppingBasketIcon
              style={{ color: "white" }}
              className="header-nav-lastChild-element1"
            />
          </Link>
          <p className="header-nav-lastChild-element2 ">{basket.length}</p>
        </div>
      </div>
    </div>
  );
}

function ExtraNav(props) {
  return (
    <div className="header-nav-element">
      <span className="header-nav-element1">{props.firstline}</span>
      <span className="header-nav-element2">{props.secondline}</span>
    </div>
  );
}

export default Nav;
