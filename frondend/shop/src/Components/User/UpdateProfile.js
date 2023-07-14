import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import API from "../Api/Api";

export default function UpdateProfile() {
    const [user, setUser] = React.useState({});
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");

    const handleLogout = () => {
        localStorage.removeItem("token");
    };
    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    const loadDataUser = () => {
        setUser({});
        if (localStorage.getItem("token")) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            fetch(API+"/user/auth/info", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.status);
                })
                .then((result) => {
                    // console.log(result);
                    setUser(result);
                })
                .catch((error) => {
                    console.log("error", error);
                    handleLogout();
                });
        }
    };

    React.useEffect(() => {
        loadDataUser();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var formdata = new FormData();
        if (data.get("photos").name === "" || data.get("photos").name === null) {
        } else {
            formdata.append("image", data.get("photos"), "/" + event.target[0].value);
            fetch(API+"/user/auth/image", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: formdata,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.status;
                    }
                    throw Error(response.status);
                })
                .then((result) => {
                    // console.log(result);
                    setSnackbarOpen(true);
                    setSnackbarSeverity("success");
                    setSnackbarMsg("Cập nhật ảnh thành công.");
                    loadDataUser();
                })
                .catch((error) => {
                    // console.log("error", error);
                    setSnackbarOpen(true);
                    setSnackbarSeverity("error");
                    setSnackbarMsg("False");
                });
        }

        // thông tin user
        fetch(API+"/user/auth/updateInfo", {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: data.get("firstName"),
                lastName: data.get("lastName"),
                mobile: data.get("mobile"),
                email: data.get("email"),
                intro: data.get("intro"),
                profile: data.get("profile"),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.status;
                }
                throw Error(response.status);
            })
            .then((result) => {
                // console.log(result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Cập nhật thành công.");

                loadDataUser();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("False");
            });
    };
    return (
        <div>
            <Snackbar
                sx={{ marginTop: "50px" }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={snackbarClose}
            >
                <Alert
                    severity={`${snackbarSeverity}`}
                    action={[
                        <IconButton key={"close"} aria-label="Close" sx={{ p: 0.5 }} onClick={snackbarClose}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                >
                    {snackbarMsg}
                </Alert>
            </Snackbar>
            <Box component="form" onSubmit={handleSubmit} noValidate="novalidate" encType="multipart/form-data">
                <div className="container rounded bg-white mt-5">
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img
                                    className="rounded form-control mt-5 border"
                                    src={API+user.photos}
                                    style={{ maxHeight: "300px" }}
                                    alt=""
                                />

                                <input
                                    type="file"
                                    className="form-control mt-4"
                                    placeholder="Photos link"
                                    id="photos"
                                    name="photos"
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex flex-row align-items-center back blockquote">
                                        <i className="fa fa-long-arrow-left mr-1 mt-1" />
                                        <h6 className="blockquote">
                                            <Link to={"/profile"} className="text-dark">
                                                Back
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="first name"
                                            id="firstName"
                                            name="firstName"
                                            defaultValue={user.firstName}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="last name"
                                            id="lastName"
                                            name="lastName"
                                            defaultValue={user.lastName}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            id="email"
                                            name="email"
                                            defaultValue={user.email}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="mobile"
                                            name="mobile"
                                            placeholder="Phone number"
                                            defaultValue={user.mobile}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Intro"
                                            id="intro"
                                            name="intro"
                                            rows={3}
                                            defaultValue={user.intro}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Profile"
                                            id="profile"
                                            name="profile"
                                            rows={3}
                                            defaultValue={user.profile}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-right float-end">
                                    <Link to={"/change-password"} className="btn btn-outline-dark">Đổi mật khẩu</Link>&nbsp;
                                    <button className="btn btn-primary" type="submit">
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );
}
