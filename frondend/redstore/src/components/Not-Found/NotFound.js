import React, { Component } from "react";
import Navbar from "../layouts/Navbar";

class NotFound extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div style={{ margin: "150px" }}>
                    <h1 className="display-4">Page Not Found</h1>
                    <p>Sorry, This page does not exist</p>
                </div>
            </>
        );
    }
}

export default NotFound;
