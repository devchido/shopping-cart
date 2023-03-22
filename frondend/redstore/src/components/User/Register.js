import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Profile from "./User";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
            repassword: "",
        };
    }

    setParams = (even) => {
        this.setState({ [even.target.name]: even.target.value });
    };

    register = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        console.log(raw);
        fetch("/api/v1/auth/register", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log(result);
                localStorage.setItem("token", result.token);
                window.location = "/user";
            })
            .catch((error) => {
                console.log("error", error);
                alert("Failed");
            });
    };

    checkRegister = () => {
        if (this.state.password != this.state.repassword) {
            alert("You did not enter the same new password twice. Please re-enter your password.");
            return false;
        } else {
            this.register();
            return true;
        }
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
                                        <span id="loginTab"><Link to= {"/login"}>Login</Link></span>
                                        <span id="regTab">Register</span>
                                    </div>
                                    <form action="" id="regForm">
                                        <input type="text" placeholder="First name" name="firstName" onChange={this.setParams} />
                                        <input type="text" placeholder="Last name" name="lastName" onChange={this.setParams} />
                                        <input type="email" placeholder="Email" name="email" onChange={this.setParams} />
                                        <input type="mobile" placeholder="Mobile" name="mobile" onChange={this.setParams} />
                                        <input type="password" placeholder="Password" name="password" onChange={this.setParams} />
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="repassword"
                                            onChange={this.setParams}
                                        />
                                        <button class="btn" type="button" onClick={this.checkRegister}>
                                            Register
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

export default Register;
