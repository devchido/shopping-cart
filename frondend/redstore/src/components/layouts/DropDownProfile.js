import React, { Component } from "react";
import { Link } from "react-router-dom";

export class DropDownProfile extends Component {

logout = () => {
    localStorage.removeItem("token");
    // window.location.reload();
    window.location = "/";
};
    render() {
        return (
<>
    <div class="dropdown-content">

        <Link to="/profile">{this.props.users.firstName} {this.props.users.lastName}</Link>
        <Link to={""}>Link 2</Link>
        <Link to={"/my-product"} >My Product</Link>

        <Link to={"/"} onClick={this.logout}   className={"logoutItem"}>
            <i class="fa fa-sign-out"></i>Logout
        </Link>
    </div>
</>
        );
    }
}

export default DropDownProfile;
// import React from "react";
// import { Link } from "react-router-dom";
// export default function DropDownProfile() {
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         // window.location.reload();
//         window.location = "/";
//     };
//     return (
//         <>
//             <div class="dropdown-content">
//                 <Link to="/profile">
//                     {this.props.users.firstName} {this.props.users.lastName}
//                 </Link>
//                 <Link to={""}>Link 2</Link>
//                 <Link to={"/my-product"}>My Product</Link>

//                 <Link to={"/"} onClick={() => handleLogout} className={"logoutItem"}>
//                     <i class="fa fa-sign-out"></i>Logout
//                 </Link>
//             </div>
//         </>
//     );
// }
