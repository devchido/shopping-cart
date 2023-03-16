import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function User() {
    const [user, setUser] = useState();
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/user/auth/info", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setUser({ result });
                // console.log(user);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, []);
    return (
        <>
            <div>
                <div className="profile-page">
                    <div className="container">
                        <div className="row">
                            {user ? (
                                <>
                                    <div className="col-3">
                                        <img className="img-update-user" src={user.result.photos} />
                                        <div className="btn-add" style={{ width: "100%", textAlign: "center" }}>
                                        <Button variant="outlined">
                                            <Link to={"/user/update"}>Update</Link>
                                        </Button>
                                        </div>
                                        
                                    </div>
                                    <div className="col-3">
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            fullWidth
                                            name="firstName"
                                            label="Full Name"
                                            value={user.result.firstName +" "+ user.result.lastName}
                                            // onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            fullWidth
                                            name="mobile"
                                            label="Mobile"
                                            value={user.result.mobile}
                                        />
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            value={user.result.email}
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
                                            value={user.result.intro}
                                        />
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            id="outlined-multiline-static"
                                            fullWidth
                                            name="profile"
                                            label="Profile"
                                            multiline
                                            rows={4}
                                            value={user.result.profile}
                                        />
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
