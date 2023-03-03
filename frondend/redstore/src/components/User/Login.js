import React, { Component } from "react";
import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLogin: localStorage.getItem("token") != null,
        };
    }

    setParams = (even) => {
        this.setState({ [even.target.name]: even.target.value });
    };

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
                if(response.ok){
                    return response.json();
                }
                throw Error(response.status)
            })
            .then((result) => {
                console.log(result);
                localStorage.setItem("token", result.token);
                console.log("true");
                this.setState({isLogin: true});
                <Link to={"/"}/>
                
            })
            .catch((error) => {
                console.log("error", error)
                alert("Email, password are wrong");
            });
    };

    

    render() {
        return (
            
            <div>

                    <form id="loginForm">
                        <input type="text" name="email" placeholder="Email" onChange={this.setParams} />
                        <input type="password" name="password" placeholder="Password" onChange={this.setParams} />
                        <button className="btn" type="button" onClick={this.login}>
                            login
                        </button>
                        {/* <a href="">forgot password</a> */}
                    </form>

            </div>
        );
    }
}
