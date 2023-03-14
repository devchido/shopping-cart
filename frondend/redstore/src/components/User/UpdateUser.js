import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function UpdateUser() {
    // const [user, setUser] = useLocation();
    const location = useLocation()
    
    const [image, setImage] = useState(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU"
    );
    useEffect(() => {
        console.log(location);
    }, [])
    const handleImage = () => {
        setImage();
    };
    return (
        <div>
            <div className="profile-page">
                <div className="container">
                    <div className="row">
                        <h1 style={{ paddingBottom: "25px" }}>Update</h1>
                        <div className="form-update">
                            <div className="row">
                                <div className="col-3">
                                    <img className="img-update-user" src={image} />
                                    <TextField
                                        sx={{ margin: "15px auto" }}
                                        fullWidth
                                        name="photos"
                                        label="Photo link"
                                        // defaultValue={this.state.user.firstName}
                                        onChange={() => handleImage}
                                    />
                                </div>
                                <div className="col-3">
                                    <TextField
                                        sx={{ margin: "15px auto" }}
                                        fullWidth
                                        name="firstName"
                                        label="First Name"
                                        // defaultValue={this.state.user.firstName}
                                    />
                                    <TextField
                                        sx={{ margin: "15px auto" }}
                                        fullWidth
                                        name="lastName"
                                        label="Last Name"
                                        // defaultValue={this.state.user.firstName}
                                    />
                                    <TextField
                                        sx={{ margin: "15px auto" }}
                                        fullWidth
                                        name="mobile"
                                        label="Mobile"
                                        // defaultValue={this.state.user.firstName}
                                    />
                                    <TextField
                                        sx={{ margin: "15px auto" }}
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        // defaultValue={this.state.user.firstName}
                                    />
                                </div>
                                <div className="col-3">
                                    <TextField
                                        sx={{ margin: "15px auto" }}
                                        id="outlined-multiline-static"
                                        fullWidth
                                        name="intro"
                                        label="Intro"
                                        multiline
                                        rows={4}
                                        defaultValue="Default Value"
                                    />
                                    <TextField
                                        sx={{ margin: "15px auto" }}
                                        id="outlined-multiline-static"
                                        fullWidth
                                        name="profile"
                                        label="Profile"
                                        multiline
                                        rows={4}
                                        defaultValue="Default Value"
                                    />
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
