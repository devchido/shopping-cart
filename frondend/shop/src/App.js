import "./App.css";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/Home/Home";
import Product from "./Components/Product/Product";
import SingIn from "./Components/Login/SingIn";
import SingUp from "./Components/Login/SingUp";
import SingleProduct from "./Components/Product/SingleProduct";
import Footer from "./Components/Layout/Footer";
import Profile from "./Components/User/Profile";

function App() {
    return (
        <Fragment>
            <Navbar />
            <Routes>
                {/* Home */}
                <Route path="/" element={<Home />}></Route>
                {/* Product */}
                <Route path="/product" element={<Product />}></Route>
                {/* Singer Product */}
                <Route path="/product/:slug" element={<SingleProduct/>}></Route>
                {/* Login */}
                <Route path="/singin" element={<SingIn />}></Route>
                <Route path="/singup" element={<SingUp />}></Route>
                {/* Profile */}
                <Route path="/profile" element={<Profile />}></Route>
            </Routes>
            <Footer/>
        </Fragment>
    );
}

export default App;
