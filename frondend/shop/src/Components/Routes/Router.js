import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Admin from "../Admin/Admin";
import Product from "../Product/Product";
import SingleProduct from "../Product/SingleProduct";
import SingIn from "../Login/SingIn";
import SingUp from "../Login/SingUp"
import Profile from "../User/Profile";
import UpdateProfile from "../User/UpdateProfile";
import Carts from "../Shopping/Carts";
import CartDetail from "../Shopping/CartDetail";
import CartAdd from "../Shopping/CartAdd";
import CreateProducts from "../Manager/CreateProducts"
import VerticalTabs from "../Layout/VerticalTabs";
import Test from "../Test/Test"
import Orders from "../Order/Orders";
import OrderDetail from "../Order/OrderDetail";
import ListProducts from "../Manager/ListProducts";
import UpdateProduct from "../Manager/UpdateProduct";

function Router() {
    return (
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
            <Route path="/carts" element={<Carts />}></Route>
            {/* carts/:id : chi tiết giỏ hàng */}
            <Route path="/carts/:id" element={<CartDetail />}></Route>
            {/* carts/add-cart : Thêm giỏ hàng mới */}
            <Route path="/carts/add-cart" element={<CartAdd />}></Route>
            {/* Orders */}
            <Route path="/orders" element={<Orders/>}></Route>
            <Route path="/orders/:id" element={<OrderDetail/>}></Route>
            {/* Manage: Trang quản lý product của user */}
            <Route path= "/management/list-products" element={<ListProducts/>}></Route>
            {/* Created Products: Tạo sản phẩm mới */}
            <Route path="management/create-products" element={<CreateProducts />}></Route>
            {/* Update Product: Cập nhật sản phẩm  */}
            <Route path="management/update-product/:id" element={<UpdateProduct />}></Route>
            {/* Tabs */}
            <Route path="/tabs" element={<VerticalTabs />}></Route>
            {/* test */}
            <Route path="/test" element={<Test />}></Route>
        </Routes>
    );
}
export default Router;