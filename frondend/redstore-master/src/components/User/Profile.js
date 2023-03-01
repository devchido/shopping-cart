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

        fetch("http://localhost:8080/user/info", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };


    logout = () => {
        localStorage.removeItem("token");
        alert("Logout successful");
    };

    render() {
        return (
            <div>
                <div>
                    Name: {this.state.user.firstName} {this.state.user.lastName}
                </div>
                <div>email: {this.state.user.email}</div>
                {/* <button type="button" onClick={this.logout}>
                    Logout
                </button> */}
            </div>
        );
    }
}
export default Profile;
