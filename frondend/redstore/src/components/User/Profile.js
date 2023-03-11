import React, { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            open: false,
        };
    }
    handleOpen = () => {
        this.setState({ open: true });
        console.log(this.state.open);
    };
    handleClose = () => {
        this.setState({ open: false });
        console.log(this.state.open);
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

        fetch("/user/info", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // console.log(result);
                this.setState({ user: result });
            })
            .catch((error) => {
                console.log("error", error);
                localStorage.setItem("token", "");
                this.logout();
            });
    };

    logout = () => {
        localStorage.removeItem("token");
        // window.location.reload();
        window.location = "/";
    };

    render() {
        return (
            <>
                <div>
                    <div className="profile-page">
                        <div className="row">
                            <div className="container">
                                <div>
                                    <img src="./assets/images/product-1.jpg" />
                                </div>
                                <span>
                                    Name: {this.state.user.firstName} {this.state.user.lastName}
                                </span>
                                <br />
                                <span>email: {this.state.user.email}</span>
                                <br />
                                <button onClick={this.handleOpen}>Update</button>
                                {this.state.open ? (
                                    <>
                                        <div className="modal">
                                            <div className="modal_inner">
                                                <div className="modal_header">
                                                    <p>
                                                        Update {this.state.user.firstName} {this.state.user.lastName}
                                                    </p>
                                                    <i class="fa fa-times" onClick={this.handleClose}></i>
                                                </div>
                                                
                                                <div className="modal_body">
                                                    <h2>Modal</h2>
                                                    <TextField sx={{ margin:'15px auto'}} fullWidth label="First Name" />
                                                    <TextField sx={{ margin:'15px auto'}} fullWidth label="First Name" />
                                                    <TextField sx={{ margin:'15px auto'}} fullWidth label="First Name" />
                                                    <TextField sx={{ margin:'15px auto'}} fullWidth label="First Name" />
                                                    <TextField sx={{ margin:'15px auto'}} fullWidth label="First Name" />
                                                    <TextField sx={{ margin:'15px auto'}} fullWidth label="First Name" />
                                                </div>
                                                <div className="modal_footer">
                                                    <button onClick={this.handleClose}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Profile;
