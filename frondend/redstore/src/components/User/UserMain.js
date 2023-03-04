import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

class UserMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formWindow: true,
        };
    }

    render() {
        const loginForm = () => {
            this.setState({ formWindow: true });
        };
        const registerForm = () => {
            this.setState({ formWindow: false });
        };

        return (
            <>
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
                                        <span id="loginTab" onClick={loginForm}>
                                            Login
                                        </span>
                                        <span id="regTab" onClick={registerForm}>
                                            Register
                                        </span>
                                    </div>
                                    {this.state.formWindow ? <Login /> : <Register />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UserMain;
