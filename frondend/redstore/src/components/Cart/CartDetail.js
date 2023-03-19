import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CartDetail() {
    const { id } = useParams();
    console.log("cartId:", id);
    const [isLoading, setIsLoading] = useState(true);
    const [cartDetail, setCartDetail] = useState();
    const [cart, setCart] = useState();

    useEffect(() => {
        loadDataCart();
        loadDataCartDetail();
    }, []);
    const loadDataCart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart/auth/my-cart/" + id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setCart(result);
            })
            .catch((error) => console.log("error", error));
    };
    const loadDataCartDetail = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart-item/auth/cart/" + id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log(result);
                // Set trạng thái loading
                setIsLoading(false);
                // Set data vào cartDetail
                setCartDetail(result);
            })
            .catch((error) => console.log("error", error));
    };
    const handleDeleteCartItem = (item) => {
        console.log(item.id);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/cart-item/auth/" + item.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                // console.log(result);
                // alert("true");
                loadDataCartDetail();
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    const handleOrderNow = () => {
        alert(cart.id);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/order/auth/createByCart?idCart=" + cart.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // alert("true");
                loadDataCart();
                loadDataCartDetail();
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    return (
        <div>
            <div style={{ width: "100%", background: "#ff523b", marginTop: "8rem" }}>
                <div className="container">
                    <h1 style={{ color: "#fff", fontSize: "30px" }}>
                        Cart:&nbsp;
                        {isLoading ? <>Loading . . . </> : <>{cart ? <>{cart.content} </> : null}</>}
                    </h1>
                </div>
            </div>
            <div className="container cart-page">
                <table className="cart-detail-table">
                    <tbody>
                        <tr>
                            <th>Stt</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Subtotal</th>
                        </tr>
                        {isLoading ? (
                            <div>
                                <h2>Loading . . . </h2>
                            </div>
                        ) : (
                            <>
                                {cartDetail
                                    ? cartDetail.map((item, i) => (
                                          <tr>
                                              <td>{i + 1}</td>
                                              <td>
                                                  <div className="cart-info">
                                                      <Link to={`/products/${item.product.slug}`}>
                                                          <img src={item.product.photos} alt="" />
                                                      </Link>
                                                      <div>
                                                          <Link to={`/products/${item.product.slug}`}>
                                                              <p>{item.product.title}</p>
                                                          </Link>
                                                          <small>Price: {item.price} vnd</small>
                                                          <br />
                                                          <p className="item-delete" onClick={() => handleDeleteCartItem(item)}>
                                                              Remove
                                                          </p>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td>
                                                  <input type="number" value={item.quantity} readOnly={false} />
                                              </td>
                                              <td>
                                                  <input type="number" value={item.discount} readOnly={false} />
                                              </td>
                                              <td align="right">
                                                  {(item.price - (item.price * item.discount) / 100) * item.quantity} vnd
                                              </td>
                                          </tr>
                                      ))
                                    : null}
                            </>
                        )}
                    </tbody>
                </table>
                <div className="total-price row">
                    <table>
                        {cart ? (
                            <>
                                <tr>
                                    <td>Địa Chỉ</td>
                                    <td>{cart.line1}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{cart.city}</td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>{cart.country}</td>
                                </tr>
                                <tr>
                                    <td>Content</td>
                                    <td>{cart.content}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>
                                        {cart.status == 0
                                            ? "Mới"
                                            : null || cart.status == 1
                                            ? "Cart"
                                            : null || cart.status == 2
                                            ? "Order"
                                            : null || cart.status == 3
                                            ? "Đã thanh toán"
                                            : null}
                                    </td>
                                </tr>
                            </>
                        ) : null}
                    </table>
                </div>
                {cart ? (
                    <>
                        {
                            cart.status == 0 ? (
                                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                                    <Button variant="contained" style={{ background: "#ff523b" }} >
                                        <Link to={"/products"} style={{color: "#fff"}}>Go shopping now
                                        </Link>
                                        
                                    </Button>
                                </div>
                            ) : null ||cart.status == 1 ? (
                                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                                    <Button variant="contained" style={{ background: "#ff523b" }} onClick={handleOrderNow}>
                                        Order now
                                    </Button>
                                </div>
                            ) : null || cart.status != 1 ? (
                                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                                    <Button variant="contained" style={{ background: "#ff523b" }}>
                                        Dùng lại danh sách này
                                    </Button>
                                </div>
                            ) : null
                        }
                    </>
                ) : null}
            </div>
        </div>
    );
}
