import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import StoreIcon from "@mui/icons-material/Store";

function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState();
    const handleOpen = () => {
        setOpen(!open);
    };
    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            loadDataUser();
        }
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
                                alt=""
                            />
                        </Link>
                    </div>
                    <nav>
                        <ul id="MenuItems" className="menu-items nav">
                            <li>
                                <Link to="/" title="Home">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" title="Products">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/category">Category</Link>
                            </li>
                        </ul>
                        {users ? (
                            users.role === "ADMIN" ? (
                                <ul>
                                    <li>
                                        <Link to={"/admin"}>Trang Admin</Link>
                                    </li>
                                </ul>
                            ) : null
                        ) : null}
                    </nav>
                    {isLogin ? (
                        <>
                            {users ? (
                                <>
                                    <div className="dropdown" onClick={handleOpen}>
                                        {/*  */}
                                        {users.photos ? (
                                            <img
                                                src={users.photos}
                                                style={{ width: "32px" }}
                                                className="dropbtn"
                                                title={users.firstName + " " + users.lastName}
                                                alt=""
                                            />
                                        ) : (
                                            <i className="fa fa-user-circle" style={{ fontSize: "28px" }} />
                                        )}
                                        {open ? (
                                            <>
                                                <div className="dropdown-content">
                                                    {/* User */}
                                                    <Link to="/user">{users.firstName + " " + users.lastName}</Link>
                                                    <hr />
                                                    {/* Kênh shopping cart của user */}
                                                    {/* <Link to="/cart" title="Cart">
                                                        <ShoppingBagIcon style={{ marginBottom: "-5px" }} /> Cart
                                                    </Link>
                                                    <Link to={"/order"} title="Order">
                                                        <AssignmentIcon style={{ marginBottom: "-6px" }} /> Order
                                                    </Link> */}
                                                    <Link to={"/shopping-cart"}>Shopping Cart</Link>
                                                    <hr />
                                                    {/* Kênh cửa hàng của user */}
                                                    {/* <Link to={"/shop/product"}>
                                                        <StoreIcon style={{ marginBottom: "-6px" }} />
                                                        Product manager
                                                    </Link>
                                                    <Link to={"/shop/product-cart"}>
                                                        <ShoppingBagIcon style={{ marginBottom: "-5px" }} />
                                                        ProductCart manager
                                                    </Link>
                                                    <Link to={"/shop/order"}>
                                                        <AssignmentIcon style={{ marginBottom: "-6px" }} />
                                                        Order manager
                                                    </Link>
                                                    <Link>
                                                        <i class="fa fa-truck" aria-hidden="true"></i>
                                                        sdf
                                                    </Link> */}
                                                    <Link to={"/shop"}>
                                                        <i className="fa fa-building-o" /> User's Shop
                                                    </Link>
                                                    <hr />
                                                    <Link to={"/login"} onClick={handleLogout} className={"logoutItem"}>
                                                        <LogoutIcon style={{ marginBottom: "-6px" }} />
                                                        Logout
                                                    </Link>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </>
                            ) : null}

                            {/* <span className="badge badge-warning" id="lblCartCount">
                        123
                    </span> */}
                        </>
                    ) : (
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    )}
                    <img
                        src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/menu.png"
                        className="menu-icon"
                        id="menu-icon"
                        alt=""
                    />
                </header>
            </div>
        </>
    );
}

export default Navbar;
