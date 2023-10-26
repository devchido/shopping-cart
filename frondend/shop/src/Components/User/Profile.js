import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
import API from "../Api/Api";
import axios from "axios";
function Profile() {
    const [user, setUser] = React.useState({});
    const handleLogout = () => {
        localStorage.removeItem("token");
    };
    const loadDataUser = React.useCallback(() => {
        if (localStorage.getItem("token")) {
            axios
                .get(API + "/user/auth/info", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    setUser(res.data);
                })
                .catch((error) => {
                    console.log("error", error);
                    handleLogout();
                });
        }
    },[]);

    React.useEffect(() => {
        loadDataUser();
    }, [loadDataUser]);
    return (
        <div>
            <section className="h-100 gradient-custom-2">
                <div className="container-fluid py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-12 col-xl-9">
                            <div className="card">
                                <div
                                    className="rounded-top text-white d-flex flex-row"
                                    style={{ backgroundColor: "#000", height: 200 }}
                                >
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                                        <img
                                            src={API+user.photos}
                                            alt={user.firstName + " " + user.lastName}
                                            className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: 150, zIndex: 1 }}
                                            loading="lazy"
                                        />
                                        <Link
                                            to={"/profile/update"}
                                            type="button"
                                            className="btn btn-dark border"
                                            data-mdb-ripple-color="dark"
                                            style={{ zIndex: 1 }}
                                        >
                                            Edit profile
                                        </Link>
                                    </div>
                                    <div className="ms-3" style={{ marginTop: 120 }}>
                                        <h2 className="user-name-style">{user.firstName + " " + user.lastName}</h2>
                                        <p>
                                            <EmailIcon /> {user.email} || <PhoneIcon /> {user.mobile}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-3 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p className="mb-1 h5">Vendor</p>

                                            {user.vendor === 0 ? <span className="badge bg-secondary ms-2">False</span> : null}
                                            {user.vendor === 1 ? <span className="badge bg-info ms-2">True</span> : null}
                                            {user.vendor === 2 ? <span className="badge bg-warning ms-2">Warning</span> : null}
                                            {user.vendor === 3 ? <span className="badge bg-danger ms-2">Ban</span> : null}
                                            {/* <p className="small text-muted mb-0"></p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">Intro</p>

                                        <textarea
                                            className="font-italic mb-1 w-100 p-4"
                                            rows={4}
                                            defaultValue={user.intro}
                                            style={{
                                                border: "none",
                                                background: "#f8f9fa",
                                                cursor: "-moz-grab",
                                            }}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">Profile</p>
                                        <textarea
                                            className="font-italic mb-1 w-100 p-4"
                                            rows={4}
                                            defaultValue={user.profile}
                                            style={{
                                                border: "none",
                                                background: "#f8f9fa",
                                                cursor: "-moz-grab",
                                            }}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;
