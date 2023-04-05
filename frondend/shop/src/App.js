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
import VerticalTabs from "./Components/Layout/VerticalTabs";
import Admin from "./Components/Admin/Admin";
import UpdateProfile from "./Components/User/UpdateProfile";
import Test from "./Components/Test/Test";
import ScrollToTop from "react-scroll-to-top";
import Carts from "./Components/Shopping/Carts";
import CartDetail from "./Components/Shopping/CartDetail";
//

//
function App(props) {
    return (
        <Fragment>
            <Navbar />
            <ScrollToTop smooth />
            <Routes>
                {/* Home */}
                <Route path="/" element={<Home />}></Route>
                {/* Admin */}
                <Route path="/admin" element={<Admin />}></Route>
                {/* Product */}
                <Route path="/product" element={<Product />}></Route>
                {/* Singer Product */}
                <Route path="/product/:slug" element={<SingleProduct />}></Route>
                {/* Login */}
                <Route path="/singin" element={<SingIn />}></Route>
                <Route path="/singup" element={<SingUp />}></Route>
                {/* Profile */}
                <Route path="/profile" element={<Profile />}></Route>
                {/* Update profile */}
                <Route path="/profile/update" element={<UpdateProfile />}></Route>
                {/* Carts: Trang quản lý các giỏ hảng */}
                <Route path="/carts" element= {<Carts/>}></Route>
                {/* carts/:id : chi tiết giỏ hàng */}
                <Route path="/carts/:id" element= {<CartDetail/>}></Route>
                {/*  */}
                {/* Tabs */}
                <Route path="/tabs" element={<VerticalTabs />}></Route>
                {/* test */}
                <Route path="/test" element={<Test />}></Route>
            </Routes>

            <Footer />
        </Fragment>
    );
}

export default App;
