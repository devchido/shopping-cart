import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
// import { CommonActions } from '@react-navigation/native';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
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
                console.log(result);
                this.setState({ user: result });
                
                
                
            })
            .catch((error) => {
                console.log("error", error);
                localStorage.setItem("token", "")
                this.logout();
            });
    };

    

    logout = () => {
        localStorage.removeItem("token");
        // window.location.reload();
        window.location = "/"
        

    };

    render() {
        
        return (
            <>
            {/* <Navbar /> */}
                <div className="account-page">
                    
                <div className="container ">
                    <div className="row">
                        <div className="">
                            <span>
                                Name: {this.state.user.firstName} {this.state.user.lastName}
                            </span>
                            <br/>
                            <span>email: {this.state.user.email}</span>
                            <br/>
                            <button className="btn" type="button" onClick={this.logout}>
                                <Link to={"/"}>Logout</Link>
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </>
        );
    }
}
export default Profile;
