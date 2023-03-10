import React, { Component, Fragment } from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import './App.css';
//Redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import Navbar from "./components/layouts/Navbar";
import Products from "./components/Products/Products";
import Footer from "./components/layouts/Footer";
import ShoppingCart from "./components/Shopping_cart/ShoppingCart";
import SingleProduct from "./components/Products/SingleProduct";
import Address from "./components/User/Address";
import NotFound from "./components/Not-Found/NotFound";
// import Home from "./pages/home";
import Profile from "./components/User/Profile";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Home from "./components/Home/Home";
import ProductList from "./components/User/ProductList";
import AddProduct from "./components/Products/products/AddProduct";
import UpdateProduct from "./components/Products/products/UpdateProduct";
import CartProduct from "./components/Shopping_cart/CartProduct";
import UserUpdate from "./components/Popup/UserUpdate";
import UpdateUser from "./components/User/UpdateUser";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Fragment>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/products" element={<Products />} />
                            <Route path="/category" element={<NotFound />} />
                            <Route path="/shopping_cart" element={<ShoppingCart />} />
                            <Route path="/single_product/:slug" element={<SingleProduct />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/user_address" element={<Address />} />
                            <Route path="/not-found" element={<NotFound />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/my-product" element={<ProductList />} />
                            <Route path="/my-product/update/:id" element={<UpdateProduct/>}/>
                            <Route path="/my-product/new-product" element={<AddProduct/>} />
                            <Route path="/cart-all" element={<CartProduct/>} />
                            <Route path="/popup" element={<UserUpdate/>} />
                            <Route path="/profile/update" element={<UpdateUser/>} />
                        </Routes>
                        <Footer />
                    </Fragment>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
export default App;

