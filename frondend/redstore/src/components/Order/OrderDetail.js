import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function OrderDetail() {
    const { orderId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [orderDetail, setOrderDetail] = useState();
    const [order, setOrder] = useState();
    useEffect(() => {
        loadDataOrderDetail();
        loadDataOrder();
    }, []);
    const loadDataOrderDetail = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/order-item/auth/shop/order/" + orderId, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setOrderDetail(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    const loadDataOrder = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/order/auth/findOneById/" + orderId, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // console.log(result);
                setOrder(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    const handleRemoveOrder = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/order/auth/cancel-order?id=" + orderId, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert("true");
                loadDataOrder();
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
                        Order:&nbsp;
                        {isLoading ? <>Loading . . . </> : <>{order ? <>{order.content} </> : null}</>}
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
                            <th style={{ textAlign: "center" }}>Subtotal</th>
                        </tr>
                        {isLoading ? (
                            <div>
                                <h2>Loading . . . </h2>
                            </div>
                        ) : (
                            <>
                                {orderDetail
                                    ? orderDetail.map((item, i) => (
                                          <tr>
                                              <td>{i + 1}</td>
                                              <td>
                                                  <div className="cart-info">
                                                      <Link to={`/products/${item.products.slug}`}>
                                                          <img src={item.products.photos} alt="" />
                                                      </Link>
                                                      <div>
                                                          <Link to={`/products/${item.products.slug}`}>
                                                              <p>{item.products.title}</p>
                                                          </Link>
                                                          <small>Price: {item.price} vnd</small>
                                                          <br />
                                                          <p
                                                              className="item-delete"
                                                              //   onClick={() => handleDeleteCartItem(item)}
                                                          >
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
                        {order ? (
                            <tbody>
                                <tr>
                                    <td>Địa Chỉ</td>
                                    <td>{order.line1}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{order.city}</td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td>{order.country}</td>
                                </tr>
                                <tr style={{ borderBottom: "1px #000" }}>
                                    <td>Content</td>
                                    <td>{order.content}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>
                                        {order.status == 0
                                            ? "Chờ xác nhận"
                                            : null || order.status == 1
                                            ? "Không thành công"
                                            : null || order.status == 2
                                            ? "Đang vận chuyển"
                                            : null || order.status == 3
                                            ? "Đã giao"
                                            : null || order.status == 4
                                            ? "Đã trả lại"
                                            : null || order.status == 5
                                            ? "Hoàn thành"
                                            : null}
                                    </td>
                                </tr>
                            </tbody>
                        ) : null}
                    </table>
                </div>
                {/* button : update cart and . . . */}
                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                    {order ? (
                        <>
                            {order.status !== 6 ? (
                                <>
                                    <Button variant="outlined" onClick={handleRemoveOrder}>
                                        Cancel Order
                                    </Button>
                                    &nbsp;&nbsp;
                                </>
                            ) : null}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
