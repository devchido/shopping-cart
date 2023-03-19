import React from "react";
import { Link } from "react-router-dom";

function UsersShop() {
    return (
        <div className="page">
            <div style={{ background: "#ff523b" }}>
                <div className="container">
                    <h1 style={{ color: "#fff" }}>My Shop</h1>
                </div>
            </div>
            <div className="small-container">
                <div className="shop-page">
                    <div className="row">
                        <div className="col-5">
                            <Link to={"/shop/product"}>
                                <div className="col-item" style={{margin: "5px"}}>
                                    <i class="fa fa-product-hunt" />
                                    <p>Product manager</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-5">
                            <Link to={"/shop/product-cart"}>
                                <div className="col-item">
                                    <i class="fa fa-shopping-cart" />
                                    <p>ProductCart manager</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-5">
                            <Link to={"/shop/order"}>
                                <div className="col-item">
                                    <i class="fa fa-file-text-o" />
                                    <p>Order management</p>
                                </div>
                            </Link>
                        </div>

                        <div className="col-5">
                            <Link>
                                <div className="col-item">
                                    <i class="fa fa-shopping-cart" />
                                    <p>sdf</p>
                                </div>
                            </Link>
                        </div>
                        <div className="col-5">
                            <Link>
                                <div className="col-item">
                                    <i class="fa fa-shopping-cart" />
                                    <p>txt</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersShop;
