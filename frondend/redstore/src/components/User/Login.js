import React, { Component } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLogin: localStorage.getItem("token") != null,
        };
    }
    // navigation = useNavigate();

    setParams = (even) => {
        this.setState({ [even.target.name]: even.target.value });
    };
    // navigate = useNavigate();

    login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/api/v1/auth/authenticate", requestOptions)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log(result);
                localStorage.setItem("token", result.token);
                // console.log("true");
                this.setState({ isLogin: true });
                window.location = "/user";
            })
            .catch((error) => {
                console.log("error", error);
                alert("Email, password are wrong");
            });
    };

    render() {
        return (
            <>
                {/* <Navbar /> */}
                <div class="account-page">
                    <div class="container">
                        <div class="row">
                            <div class="col-2">
                                <img
                                    src="./assets/images/image1.png"
                                    alt=""
                                    width="100%"
                                    className="w3-container w3-center w3-animate-left"
                                />
                            </div>
                            <div class="col-2">
                                <div class="form-container ">
                                    <div class="form-btn ">
                                        <span id="loginTab">Login</span>
                                        <span id="regTab">
                                            <Link to={"/register"}>Register </Link>
                                        </span>
                                    </div>
                                    <form id="loginForm">
                                        <input type="text" name="email" placeholder="Email" onChange={this.setParams} />
                                        <input type="password" name="password" placeholder="Password" onChange={this.setParams} />
                                        <button className="btn" type="button" onClick={this.login}>
                                            login
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
