import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem("token") != null,
            users: {},
        };
    }
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

        fetch("/user/info", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // console.log(result);
                this.setState({ users: result });
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
                            <img src="./assets/images/logo.png " width="125px" />
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
                                <Link to="/not-found">About</Link>
                            </li>
                            <li>
                                <Link to="/not-found">Contact</Link>
                            </li>
                            {this.state.isLogin ? (
                                <li>
                                    <Link to="/profile">
                                        <i className="fa fa-user-circle" />
                                        &nbsp;
                                        <span>
                                            {this.state.users.firstName} {this.state.users.lastName}
                                        </span>
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <Link to="/shopping_cart">
                        <img src="./assets/images/cart.png" width="30px" height="30px" alt="" />
                    </Link>
                    <span className="badge badge-warning" id="lblCartCount">
                        123
                    </span>

                    <img
                        src="./assets/images/menu.png"
                        className="menu-icon"
                        id="menu-icon"
                        // onClick="menutoggle()"
                    />
                </header>
            </div>
        );
    }
}



export default Navbar;
