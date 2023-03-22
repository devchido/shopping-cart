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
                            <th style={{textAlign: "center"}}>Subtotal</th>
                            <th style={{textAlign: "center"}}>Status</th>
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
                                              <td align="center">{item.status === 0
                                                                      ? "Chờ xác nhận"
                                                                      : null || item.status === 1
                                                                      ? "Đã xác nhận"
                                                                      : null || item.status === 2
                                                                      ? "Đang vận chuyển"
                                                                      : null || item.status === 3
                                                                      ? "Thành công"
                                                                      : null || item.status === null
                                                                      ? "Chờ xác nhận"
                                                                      : null}</td>
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
                                            ? "Đã xác nhận"
                                            : null || order.status == 2
                                            ? "Đang vận chuyển"
                                            : null || order.status == 3
                                            ? " "
                                            : null || order.status == 4
                                            ? ""
                                            : null || order.status == 5
                                            ? "Đã Huỷ"
                                            : null || order.status == 6
                                            ? "Thành Công"
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
                            {order.status === 1 || order.status === 3 ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        // onClick={handleOpenUpdateCart}
                                    >
                                        Update cart
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Modal
                                        // open={openUpdateCart}
                                        // onClose={handleCloseUpdateCart}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Update Cart
                                            </Typography>
                                            <TextField
                                                sx={{ margin: "15px auto" }}
                                                fullWidth
                                                name="line1"
                                                label="Địa chỉ"
                                                // defaultValue={line1}
                                                // onChange={(e) => setLine1(e.target.value)}
                                            />
                                            <TextField
                                                sx={{ margin: "15px auto" }}
                                                fullWidth
                                                name="city"
                                                label="City"
                                                // defaultValue={city}
                                                // onChange={(e) => setCity(e.target.value)}
                                            />
                                            <TextField
                                                sx={{ margin: "15px auto" }}
                                                fullWidth
                                                name="country"
                                                label="Country"
                                                // defaultValue={country}
                                                // onChange={(e) => setCountry(e.target.value)}
                                            />
                                            <TextField
                                                sx={{ margin: "15px auto" }}
                                                fullWidth
                                                name="content"
                                                label="Content"
                                                // defaultValue={content}
                                                // onChange={(e) => setContent(e.target.value)}
                                            />
                                            <div style={{ textAlign: "right" }}>
                                                <Button
                                                    variant="contained"
                                                    // onClick={handleCloseUpdateCart}
                                                >
                                                    Close
                                                </Button>
                                                &nbsp;
                                                <Button
                                                    variant="contained"
                                                    // onClick={handleUpdateCart}
                                                >
                                                    Save
                                                </Button>
                                            </div>
                                        </Box>
                                    </Modal>
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
