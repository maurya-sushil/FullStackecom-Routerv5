import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header/Header.js";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Products/ProductDetails";
import Search from "./components/Products/Search.js";
import Products from "./components/Products/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/UserOptions/UserOptions";
import Profile from "./components/layout/UserOptions/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Shipping/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment";
import axios from "axios";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import OrderSuccess from "./components/Cart/OrderSuccess";
import Order from "./components/Order/Order.js";
import OrderDetails from "./components/Order/OrderDetails";
// import ProductReviews from "./component/Admin/ProductReviews.js";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
   
  async function getStripeApiKey() {
    const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
  };
    const { data } = await axios.get("/api/v1/stripeapikey",config);

    setStripeApiKey(data.stripeApiKey);
  }
  

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        {/* <Route exact path="/contact" component={Contact} /> */}

        {/* <Route exact path="/about" component={About} /> */}

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/reset-password/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />

        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={Order} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        {/* <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        /> */}

        {/* <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
