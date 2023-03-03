import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem("token") != null,
        };
    }

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
                                <Link to="/not-found">About</Link>
                            </li>
                            <li>
                                <Link to="/not-found">Contact</Link>
                            </li>
                            {this.state.isLogin ? (
                                <>
                                    <Link to = "/profile">
                                        <i className="fa fa-user-circle" />
                                        &nbsp;<span>User</span> &nbsp;
                                    </Link>
                                </>
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

const mapStateToProps = (state) => ({
    cart: state.cart,
});

export default connect(mapStateToProps, {})(Navbar);
