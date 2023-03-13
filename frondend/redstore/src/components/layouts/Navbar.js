import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropDownProfile from "./DropDownProfile";
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem("token") != null,
            users: {},
            openDropdown: false,
        };
    }
    setOpen = () => {
        if (this.state.openDropdown === true) {
            // console.log(this.state.openDropdown);
            this.setState({ openDropdown: false });
        } else {
            // console.log(this.state.openDropdown);
            this.setState({ openDropdown: true });
        }
    };

    componentDidMount() {
        this.loadDataProfile();
    }

    loadDataProfile = () => {
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
                // console.log(result);
                this.setState({ users: result });
                localStorage.setItem("users", result.id);
                // console.log(this.state.userId);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    render() {
        return (
            <div>
                <header>
                    <div className="logo">
                        <Link to={"/"}>
                            <img src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/logo.png" style={{width:"125px"}}  />
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
                            <li>
                                <Link to="/cart-all">Cart - All</Link>
                            </li>
                            <li>
                                <Link to="/popup">popup</Link>
                            </li>
                            <li>
                                <Link to="/not-found">Not found</Link>
                            </li>
                        </ul>
                    </nav>
                    {this.state.isLogin ? (
                        <>
                            <div class="dropdown" onClick={this.setOpen}>
                                {/*  */}
                                {this.state.users.photos ? (
                                    <img src={this.state.users.photos} style={{ width: "32px" }} class="dropbtn" />
                                ) : (
                                    <i className="fa fa-user-circle" style={{ fontSize: "28px"  }} />
                                )}
                                {this.state.openDropdown ? <DropDownProfile users={this.state.users} /> : null}
                               
                            </div>
                        </>
                    ) : (
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    )}
                    &nbsp;&nbsp;

                    <Link to="/shopping_cart">
                        <img src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/cart.png" width="30px" height="30px" alt="" />
                    </Link>
                    {/* <span className="badge badge-warning" id="lblCartCount">
                        123
                    </span> */}
                    <img src="./assets/images/menu.png" className="menu-icon" id="menu-icon" />
                </header>
            </div>
        );
    }
}
export default Navbar;
