// import React, { Component } from "react";
// import { Link } from "react-router-dom";

// class Profile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: {},
//             // firstName: "",
//             // lastName:"",
//             // mobile: "",
//             // email:"",
//             // photos: "",
//             // intro: "",
//             // profile: "",
//             // open: false,
//         };
//     }
//     // setParams = (even) => {
//     //     this.setState({ [even.target.name]: even.target.value });
//     //     console.log(this.state.firstName);
//     // };
//     // handleOpen = () => {
//     //     this.setState({ open: true });
//     //     console.log(this.state.open);
//     // };
//     // handleClose = () => {
//     //     this.setState({ open: false });
//     //     console.log(this.state.open);
//     // };

//     componentDidMount() {
//         this.loadDataProfile();
//     }

//     loadDataProfile = () => {
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

// var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
// };

// fetch("/user/auth/info", requestOptions)
//     .then((response) => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error(response.status);
//     })
//     .then((result) => {
//         this.setState({ user: result });
//     })
//     .catch((error) => {
//         console.log("error", error);
//     });
// };

//     render() {
//         return (
// <>
//     <div>
//         <div className="profile-page">
//             <div className="row">
//                 <div className="container">
//                     <div>
//                         <img className="img-user" src="./assets/images/product-1.jpg" />
//                     </div>
//                     <span>
//                         Name: {this.state.user.firstName} {this.state.user.lastName}
//                     </span>
//                     <br />
//                     <span>email: {this.state.user.email}</span>
//                     <br />
//                     <button><Link to={{pathname:"/profile/update", state: this.state.user}} > Update</Link></button>
//                     {/* <button onClick={this.handleOpen}>Update</button>
//                     {this.state.open ? (
//                         <>

//                             <div className="modal">
//                                 <div className="modal_inner">
//                                     <div className="modal_header">
//                                         <p>
//                                             Update {this.state.user.firstName} {this.state.user.lastName}
//                                         </p>
//                                         <i class="fa fa-times" onClick={this.handleClose}></i>
//                                     </div>

//                                     <div className="modal_body">
//                                         <div className="row">
//                                             <TextField
//                                                 sx={{ margin: "15px auto" }}
//                                                 fullWidth
//                                                 name="photos"
//                                                 label="Link Ảnh"
//                                                 defaultValue={this.state.user.photos}
//                                                 onChange={this.setParams}
//                                             />
//                                             <div className="col-2">
//                                                 <TextField
//                                                     sx={{ margin: "15px auto" }}
//                                                     fullWidth
//                                                     name="firstName"
//                                                     label="First Name"
//                                                     defaultValue={this.state.user.firstName}
//                                                     onChange={this.setParams}

//                                                 />
//                                                 <TextField
//                                                     sx={{ margin: "15px auto" }}
//                                                     fullWidth
//                                                     type={"number"}
//                                                     name="mobile"
//                                                     label="Mobile"
//                                                     defaultValue={this.state.user.mobile}
//                                                     onChange={this.setParams}
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="col-2">
//                                                 <TextField
//                                                     sx={{ margin: "15px auto" }}
//                                                     fullWidth
//                                                     name="lastName"
//                                                     label="Last Name"
//                                                     defaultValue={this.state.user.lastName}
//                                                     onChange={this.setParams}
//                                                 />
//                                                 <TextField
//                                                     sx={{ margin: "15px auto" }}
//                                                     fullWidth
//                                                     name="email"
//                                                     label="Email"
//                                                     defaultValue={this.state.user.email}
//                                                     onChange={this.setParams}
//                                                     required
//                                                 />
//                                             </div>
//                                             <TextField
//                                                 sx={{ margin: "15px auto" }}
//                                                 fullWidth
//                                                 name="intro"
//                                                 label="Intro"
//                                                 defaultValue={this.state.user.intro}
//                                                 onChange={this.setParams}
//                                             />
//                                             <TextField
//                                                 sx={{ margin: "15px auto" }}
//                                                 fullWidth
//                                                 label="Profile"
//                                                 defaultValue={this.state.user.profile}
//                                                 onChange={this.setParams}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="modal_footer">
//                                         <button onClick={null}>Save</button>
//                                         <button onClick={this.handleClose}>Close</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </>
//                     ) : null} */}
//                 </div>
//             </div>
//         </div>
//     </div>
// </>
//         );
//     }
// }
// export default Profile;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {

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
                // console.log(result);
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
                    <div className="row">
                        <div className="container">
                            {user ? (
                                <>
                                    <div>
                                        <img className="img-user" src="./assets/images/product-1.jpg" />
                                    </div>
                                    <span>
                                        Name:&nbsp; {user.result.firstName} {user.result.lastName}
                                    </span>
                                    <br />
                                    <span>email:&nbsp; {user.result.email}</span>
                                    <br />
                                    <button>
                                        <Link to={{ pathname: "/profile/update", state:{user: user} }}> Update</Link>
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
