import React from "react";

export default function () {
    return (
        <div>
            <div style={{ width: "100%", background: "#ff523b", marginTop: "8rem" }}>
                <div className="container">

                <h1>Cart detail: </h1>
                </div>
            </div>
            <div className="container cart-page">
                <table>
                    <tbody>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        <tr>
                            <td>
                                <div className="cart-info">
                                    <a href="product-details.html">
                                        <img src="images/buy-1.jpg" alt="" />
                                    </a>
                                    <div>
                                        <a href="product-details.html">
                                            <p>Red Printed T-Shirt</p>
                                        </a>
                                        <small>Price: $50.00</small>
                                        <br />
                                        <a href="">Remove</a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <input type="number" defaultValue={1} />
                            </td>
                            <td>$50.00</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="cart-info">
                                    <a href="product-details.html">
                                        <img src="images/buy-2.jpg" alt="" />
                                    </a>
                                    <div>
                                        <a href="product-details.html">
                                            <p>Red Printed T-Shirt</p>
                                        </a>
                                        <small>Price: $75.00</small>
                                        <br />
                                        <a href="">Remove</a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <input type="number" defaultValue={1} />
                            </td>
                            <td>$75.00</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="cart-info">
                                    <a href="product-details.html">
                                        <img src="images/buy-3.jpg" alt="" />
                                    </a>
                                    <div>
                                        <a href="product-details.html">
                                            <p>Red Printed T-Shirt</p>
                                        </a>
                                        <small>Price: $75.00</small>
                                        <br />
                                        <a href="">Remove</a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <input type="number" defaultValue={1} />
                            </td>
                            <td>$75.00</td>
                        </tr>
                    </tbody>
                </table>
                <div className="total-price">
                    <table>
                        <tbody>
                            <tr>
                                <td>Subtotal</td>
                                <td>$200.00</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td>$35.00</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>$235.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
