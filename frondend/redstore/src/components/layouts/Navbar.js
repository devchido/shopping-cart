import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState();
    const handleOpen = () => {
        setOpen(!open);
    };
    useEffect(() => {
        loadDataUser();
    }, []);
    const loadDataUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/user/auth/info", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                setIsLogin(true);
                setUsers(result);
            })
            .catch((error) => {
                console.log("error", error);
                localStorage.removeItem("token");
            });
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
    };
    return (
        <>
            <div>
                <header>
                    <div className="logo">
                        <Link to={"/"}>
                            <img
                                src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/logo.png"
                                style={{ width: "125px" }}
                            />
                        </Link>
                    </div>
                    <nav>
                        <ul id="MenuItems" className="menu-items nav">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/category">Category</Link>
                            </li>
                        </ul>
                    </nav>
                    {isLogin ? (
                        <>
                            {users ? (
                                <>
                                    <div className="dropdown" onClick={handleOpen}>
                                        {/*  */}
                                        {users.photos ? (
                                            <img src={users.photos} style={{ width: "32px" }} class="dropbtn" />
                                        ) : (
                                            <i className="fa fa-user-circle" style={{ fontSize: "28px" }} />
                                        )}
                                        {open ? (
                                            <>
                                                <div className="dropdown-content">
                                                    <Link to="/user">
                                                        {users.firstName} {users.lastName}
                                                    </Link>
                                                    <Link to={"/shop"}>User's Shop</Link>
                                                    <Link to={"/shop/product"}>Shop Product</Link>

                                                    <Link to={"/login"} onClick={handleLogout} className={"logoutItem"}>
                                                        <i className="fa fa-sign-out"></i>Logout
                                                    </Link>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </>
                            ) : null}
                        </>
                    ) : (
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    )}
                    &nbsp;&nbsp;
                    <Link to="/cart">
                        <img
                            src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/cart.png"
                            width="30px"
                            height="30px"
                            alt=""
                        />
                    </Link>
                    {/* <span className="badge badge-warning" id="lblCartCount">
                        123
                    </span> */}
                    <img
                        src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/menu.png"
                        className="menu-icon"
                        id="menu-icon"
                    />
                </header>
            </div>
        </>
    );
}

export default Navbar;
