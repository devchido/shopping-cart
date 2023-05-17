import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Admin from "../Admin/Admin";
import Product from "../Product/Product";
import SingleProduct from "../Product/SingleProduct";
import SingIn from "../Login/SingIn";
import SingUp from "../Login/SingUp";
import Profile from "../User/Profile";
import UpdateProfile from "../User/UpdateProfile";
import Carts from "../Shopping/Carts";
import CartDetail from "../Shopping/CartDetail";
import CartAdd from "../Shopping/CartAdd";
import CreateProducts from "../Manager/CreateProducts";
import VerticalTabs from "../Layout/VerticalTabs";
import Test from "../Test/Test";
import Orders from "../Order/Orders";
import OrderDetail from "../Order/OrderDetail";
import ListProducts from "../Manager/ListProducts";
import UpdateProduct from "../Manager/UpdateProduct";
import UsersManagement from "../Admin/Users/UsersManagement";
import ProductManagement from "../Admin/Products/ProductManagement";
import ProductDetailManagement from "../Admin/Products/ProductDetailManagement";
import CategoryManagement from "../Admin/Category/CategoryManagement";
import OrderManagement from "../Admin/Order/OrderManagement";
import TransactionManagement from "../Admin/Transaction/TransactionManagement";
import UserDetailManagement from "../Admin/Users/UserDetailManagement";
import CategoryDetailManagement from "../Admin/Category/CategoryDetailManagement";
import CreatedCategory from "../Admin/Category/CreatedCategory";
import UserView from "../User/UserView";
import OrderDetailManagement from "../Admin/Order/OrderDetailManagement";
import TransactionDetailManagement from "../Admin/Transaction/TransactionDetailManagement";
import TransactionDetail from "../Transaction/TransactionDetail";
import ShoppingCart from "../Shopping/ShoppingCart";
import ChangePassword from "../Login/ChangePassword";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ForgotPassWord from "../Login/ForgotPassWord";

function Router() {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />}></Route>

            {/* Admin management */}
            <Route path="/admin" element={<Admin />}></Route>
            {/* User management */}
            {/* <Route path="/admin/user" element={<UsersManagement />}></Route> */}
            {/* User detail management */}
            <Route path="/admin/user/:id" element={<UserDetailManagement />}></Route>
            {/* Products management */}
            {/* <Route path="/admin/product" element={<ProductManagement />}></Route> */}
            {/* Product Detail management */}
            <Route path="/admin/product/:id" element={<ProductDetailManagement />}></Route>
            {/* Category management */}
            {/* <Route path="/admin/category" element={<CategoryManagement />}></Route> */}
            {/* Category detail management */}
            <Route path="/admin/category/:id" element={<CategoryDetailManagement />}></Route>
            {/* Add Category management */}
            <Route path="/admin/category/create" element={<CreatedCategory />}></Route>
            {/* Order management */}
            {/* <Route path="/admin/order" element={<OrderManagement />}></Route> */}
            {/* Order management */}
            <Route path="/admin/order/:id" element={<OrderDetailManagement />}></Route>
            {/* Transaction management */}
            {/* <Route path="/admin/transaction" element={<TransactionManagement />}></Route> */}
            {/* Transaction detail management */}
            <Route path="/admin/transaction/:id" element={<TransactionDetailManagement />}></Route>

            {/* Product */}
            <Route path="/product" element={<Product />}></Route>
            {/* Singer Product */}
            <Route path="/product/:slug" element={<SingleProduct />}></Route>

            {/* Login */}
            <Route path="/singin" element={<SingIn />}></Route>
            <Route path="/singup" element={<SingUp />}></Route>
            <Route path="/forgot-password" element={<ForgotPassWord />} />

            {/* User View */}
            <Route path="/user/:id" element={<UserView />}></Route>
            {/* Profile */}
            <Route path="/profile" element={<Profile />}></Route>
            {/* Update profile */}
            <Route path="/profile/update" element={<UpdateProfile />}></Route>
            {/* ChangePassword */}
            <Route path="/change-password" element={<ChangePassword />}></Route>

            {/* Carts: Trang quản lý các giỏ hảng */}
            <Route path="/carts" element={<ShoppingCart />}></Route>
            {/* carts/:id : chi tiết giỏ hàng */}
            <Route path="/carts/:id" element={<CartDetail />}></Route>
            {/* carts/add-cart : Thêm giỏ hàng mới */}
            <Route path="/carts/add-cart" element={<CartAdd />}></Route>
            {/* Orders */}
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/orders/:id" element={<OrderDetail />}></Route>
            {/* Transaction */}
            <Route path="/transaction/:id" element={<TransactionDetail />}>
                {" "}
            </Route>
            {/* Manage: Trang quản lý product của user */}
            <Route path="/management/list-products" element={<ListProducts />}></Route>
            {/* Created Products: Tạo sản phẩm mới */}
            <Route path="/management/create-products" element={<CreateProducts />}></Route>
            {/* Update Product: Cập nhật sản phẩm  */}
            <Route path="/management/update-product/:id" element={<UpdateProduct />}></Route>
            {/* Tabs */}
            <Route path="/tabs" element={<VerticalTabs />}></Route>
            {/* test */}
            <Route path="/test" element={<Test />}></Route>

            <Route path="*" exact={true} element={<NotFoundPage />} />
        </Routes>
    );
}
export default Router;
