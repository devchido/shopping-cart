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

export default function CartDetail() {
    const { id } = useParams();
    console.log("cartId:", id);
    const [isLoading, setIsLoading] = useState(true);
    const [cartDetail, setCartDetail] = useState();
    const [cart, setCart] = useState();
    // Update cart
    const [openUpdateCart, setOpenUpdateCart] = useState(false);
    const handleOpenUpdateCart = () => setOpenUpdateCart(true);
    const handleCloseUpdateCart = () => setOpenUpdateCart(false);
    // thông tin cart
    const [line1, setLine1] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [content, setContent] = useState("");
    //

    useEffect(() => {
        loadDataCart();
        loadDataCartDetail();
    }, []);
    // get data cart
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
                setLine1(result.line1);
                setCity(result.city);
                setCountry(result.country);
                setContent(result.content);
            })
            .catch((error) => console.log("error", error));
    };
    // get all data cartItem
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
    // Remove cart item form cart
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
    // Order cart
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
    // update cart data: with line1, city, country, content
    const handleUpdateCart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            line1: line1,
            city: city,
            country: country,
            content: content,
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/cart/auth/" + cart.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // alert("true");
                loadDataCart();
                handleCloseUpdateCart();
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    }
    return (
        <div>
            <div style={{ width: "100%", marginTop: "8rem" }}>
                <div className="container">
                    <h1>
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
                                        {cart.status === 0
                                            ? "Mới"
                                            : null || cart.status === 1
                                            ? "Cart"
                                            : null || cart.status === 2
                                            ? "Order"
                                            : null || cart.status === 3
                                            ? "Đã thanh toán"
                                            : null}
                                    </td>
                                </tr>
                            </>
                        ) : null}
                    </table>
                </div>
                {/* button : update cart and . . . */}
                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                    <Button variant="outlined" onClick={handleOpenUpdateCart}>Update cart</Button>&nbsp;&nbsp;
                    <Modal
                        open={openUpdateCart}
                        onClose={handleCloseUpdateCart}
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
                                defaultValue={line1}
                                onChange={(e) => setLine1(e.target.value)}
                            />
                            <TextField
                                sx={{ margin: "15px auto" }}
                                fullWidth
                                name="city"
                                label="City"
                                defaultValue={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <TextField
                                sx={{ margin: "15px auto" }}
                                fullWidth
                                name="country"
                                label="Country"
                                defaultValue={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <TextField
                                sx={{ margin: "15px auto" }}
                                fullWidth
                                name="content"
                                label="Content"
                                defaultValue={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <div style={{ textAlign: "right" }}>
                                <Button variant="contained" 
                                onClick={handleCloseUpdateCart}
                                >
                                    Close
                                </Button>
                                &nbsp;
                                <Button variant="contained" 
                                onClick={handleUpdateCart}
                                >
                                    Save
                                </Button>
                            </div>
                        </Box>
                    </Modal>

                    {cart ? (
                        <>
                            {cart.status === 0 ? (
                                <Button variant="outlined" style={{ background: "#ff523b" }}>
                                    <Link to={"/products"} style={{ color: "#fff" }}>
                                        Go shopping now
                                    </Link>
                                </Button>
                            ) : null || cart.status === 1 ? (
                                <Button variant="outlined" onClick={handleOrderNow}>
                                    Order now
                                </Button>
                            ) : null || cart.status !== 1 ? (
                                <Button variant="outlined">Dùng lại danh sách này</Button>
                            ) : null}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
