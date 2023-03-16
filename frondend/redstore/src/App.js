import React, { Component, Fragment } from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import './App.css';
//Redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
// 
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
// 
import NotFound from "./components/Not-Found/NotFound";
// 
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
// 
import Products from "./components/Products/Products";
import SingleProduct from "./components/Products/SingleProduct";
// 
import User from "./components/User/User";
import UpdateUser from "./components/User/UpdateUser";
import ProductList from "./components/User/ProductList";
import AddProduct from "./components/Products/products/AddProduct";
import UpdateProduct from "./components/Products/products/UpdateProduct";
// 
import Cart from "./components/Cart/Cart";
// 
import ShoppingCart from "./components/Shopping_cart/ShoppingCart";
import Address from "./components/User/Address";

import CartProduct from "./components/Shopping_cart/CartProduct";
import CartDetail from "./components/Cart/CartDetail";


function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Fragment>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            {/*  */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            {/*  */}
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:slug" element={<SingleProduct />} />
                            {/*  */}
                            <Route path="/category" element={<NotFound />} />
                            
                            <Route path="/user_address" element={<Address />} />
                            {/*  */}
                            <Route path="/cart" element={<Cart/>} />
                            <Route path="/cart/:id" element={<CartDetail />} />
                            {/*  */}
                            <Route path="/user" element={<User />} />
                            <Route path="/user/update" element={<UpdateUser/>} />
                            {/*  */}
                            <Route path="/shop-product" element={<ProductList />} />
                            <Route path="/shop-product/update/:id" element={<UpdateProduct/>}/>
                            <Route path="/shop-product/new-product" element={<AddProduct/>} />
                            {/*  */}
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </Fragment>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
export default App;

