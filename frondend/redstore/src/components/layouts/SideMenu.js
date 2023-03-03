import React, { Component } from "react";

export class SideMenu extends Component {
    render() {
        return (
            <div className="side-menu">
                <div className="brand-name">
                    <h1>Brand</h1>
                </div>
                <ul>
                    <li>
                        <a href="">
                            <i className="fa fa-user-circle" />
                            &nbsp;<span>User</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-info-circle" />
                            &nbsp; <span>Help</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-cog" />
                            &nbsp;<span>Settings</span>{" "}
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-sign-out" />
                            &nbsp;<span>Logout</span>{" "}
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideMenu;
