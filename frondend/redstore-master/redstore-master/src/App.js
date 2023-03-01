import React, { Component, Fragment } from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
import axios from 'axios';
//Redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import home from './pages/home';
import Navbar from './components/layouts/Navbar';
import Products from './components/Products/Products';
import Footer from './components/layouts/Footer';
import ShoppingCart from './components/Shopping_cart/ShoppingCart';
import SingleProduct from './components/Products/SingleProduct';
import UserMain from './components/User/UserMain';
import Address from './components/User/Address';
import NotFoundRoute from './components/Common/NotFoundRoute';
import NotFound from './components/Not-Found/NotFound';
import Home from './pages/home';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <Fragment>
      <Navbar />
              <Routes>
              <Route  path="/" element={<Home/>}></Route>
              <Route  path="/products" element={<Products/>}/>
              <Route  path="/shopping_cart" element={<ShoppingCart/>}/>
              <Route  path="/single_product/:id" element={<SingleProduct/>}/>
              <Route  path="/user_auth" element={<UserMain/>}/>
              <Route  path="/user_address" element={<Address/>}/>
              <Route  path="/not-found" element={<NotFound/>}/>
              </Routes>
              <Footer />
          </Fragment>
          </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
export default App;
