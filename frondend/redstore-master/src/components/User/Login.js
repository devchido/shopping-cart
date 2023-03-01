import React, { Component } from "react";
import Profile from "./Profile";



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLogin: localStorage.getItem("token") != null,
        };
    };

    

    setParams = (even) => {
        this.setState({ [even.target.name]: even.target.value });
    };

    login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            email: this.state.username,
            password: this.state.password,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://localhost:8080/api/v1/auth/authenticate", requestOptions)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    
                    return response.json();
                }
                throw Error(response.status);
                // response.text()
            })
            .then((result) => {
                console.log(result);
                localStorage.setItem("token", result.token);
                alert("Successfully");
            })
            .catch((error) => {
                console.log("error", error);
                alert("Username, password are wrong");
            });
    };
    
    

    render() {
        return (
            <div>{this.state.isLogin ?
                <Profile /> :
                
                    <form id="loginForm">
                        <input type="text" name="username" placeholder="Username" onChange={this.setParams} />
                        <input type="password" name="password" placeholder="Password" onChange={this.setParams} />
                        <button className="btn" type="button" onClick={this.login}>
                            login
                        </button>
                        {/* <a href="">forgot password</a> */}
                    </form>
                
                }
            </div>
        );
    }
}


