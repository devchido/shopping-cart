import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
function Profile() {
    const [user, setUser] = React.useState({});
    
    const handleLogout = () => {
        localStorage.removeItem("token");
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
                                            src={user.photos}
                                            alt={user.firstName + " " + user.lastName}
                                            className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: 150, zIndex: 1 }}
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
                                    <div className="ms-3" style={{ marginTop: 130 }}>
                                        <h5>{user.firstName + " " + user.lastName}</h5>
                                        <p>
                                            <EmailIcon /> {user.email} || <PhoneIcon /> {user.mobile}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-5 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            {/* <p className="mb-1 h5">Email: {user.email}</p>
                                            <p className="small text-muted mb-0">Email</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">Intro</p>
                                        <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                                            <textarea className="font-italic mb-1">{user.intro}</textarea>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">Profile</p>
                                        <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                                            <textarea className="font-italic mb-1">{user.profile}</textarea>
                                        </div>
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
