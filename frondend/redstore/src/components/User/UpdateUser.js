import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UpdateUser() {
    // const [user, setUser] = useLocation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [photos, setPhotos] = useState("");

    const [intro, setIntro] = useState("");
    const [profile, setProfile] = useState("");
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var raw = "";
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
                // console.log(result);
                // alert("true")
                setFirstName(result.firstName);
                setLastName(result.lastName);
                setMobile(result.mobile);
                setEmail(result.email);
                setPhotos(result.photos);
                if (result.photos == null) {
                    setPhotos(
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU"
                    );
                }
                setIntro(result.intro);
                setProfile(result.profile);
                console.log(firstName, lastName, mobile, email, photos, intro, profile);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(firstName, lastName, mobile, email, photos, intro, profile);
        //
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            photos: photos,
            intro: intro,
            profile: profile,
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/user/auth/updateInfo", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert("true");
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };

    return (
        <div>
            <div className="profile-page">
                <div className="container">
                    <div className="row">
                        <h1 style={{ paddingBottom: "25px" }}>Update</h1>
                        <div className="form-update">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-3">
                                        <img className="img-update-user" src={photos} />
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            fullWidth
                                            name="photos"
                                            label="Photo link"
                                            value={photos}
                                            onChange={(e) => setPhotos(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            fullWidth
                                            name="firstName"
                                            label="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            fullWidth
                                            name="lastName"
                                            label="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            fullWidth
                                            name="mobile"
                                            label="Mobile"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            value={intro}
                                            onChange={(e) => setIntro(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ margin: "15px auto" }}
                                            id="outlined-multiline-static"
                                            fullWidth
                                            name="profile"
                                            label="Profile"
                                            multiline
                                            rows={4}
                                            value={profile}
                                            onChange={(e) => setProfile(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="btn-add" style={{ width: "100%", textAlign: "center" }}>
                                    <Button type="submit" variant="outlined">
                                        Save
                                    </Button>
                                    <Button variant="outlined">
                                        <Link to={"/user"}>Cancel</Link>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
