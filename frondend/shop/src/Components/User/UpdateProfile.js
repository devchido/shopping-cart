import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

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
        if (localStorage.getItem("token") !== null) {
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

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            photos: data.get("photos"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            mobile: data.get("mobile"),
            email: data.get("email"),
            intro: data.get("intro"),
            profile: data.get("profile"),
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/user/auth/updateInfo", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.status;
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Cập nhật thành công.");
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
            <Box component="form" onSubmit={handleSubmit}>
                <div className="container rounded bg-white mt-5">
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img className="rounded-circle mt-5 border" src={user.photos} width={135} alt="" />
                                <input
                                    type="text"
                                    className="form-control mt-4"
                                    placeholder="Photos link"
                                    id="photos"
                                    name="photos"
                                    defaultValue={user.photos}
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex flex-row align-items-center back">
                                        <i className="fa fa-long-arrow-left mr-1 mb-1" />
                                        <h6>
                                            <Link to={"/profile"} style={{ color: "#212529" }}>
                                                Back
                                            </Link>
                                        </h6>
                                    </div>
                                    <h6 className="text-right">Edit Profile</h6>
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
                                            defaultValue={user.profile}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-right float-end">
                                    <button className="btn btn-outline-dark" type="submit">
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
