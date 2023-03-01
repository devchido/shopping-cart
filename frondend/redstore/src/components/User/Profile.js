import React, { Component } from "react";

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
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
        );

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
                console.log(result)
                this.setState({user: result})
            })
            .catch((error) => {
                
                console.log("error", error);
                this.logout();
            });
    };


    logout = () => {
        localStorage.removeItem("token");
        // alert("Logout successful");
        this.props.onLogoutSuccess();
    };

    render() {
        return (
            <div>
                <div>
                    Name: {this.state.user.firstName} {this.state.user.lastName}
                </div>
                <div>email: {this.state.user.email}</div>
                <button type="button" onClick={this.logout}>
                    Logout
                </button>
            </div>
        );
    }
}
export default Profile;
