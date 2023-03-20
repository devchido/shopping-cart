import {
    Box,
    Button,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function Cart() {
    const [cart, setCart] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadDataCart();
    }, []);

    const loadDataCart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart/auth/my-cart", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                // Set trạng thái loading
                setIsLoading(false);
                // Set data vào cart
                setCart(result);
                console.log(cart);
            })
            .catch((error) => console.log("error", error));
    };

    //
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // new cart
    const [line1, setLine1] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [content, setContent] = useState("");
    const handleNewCart = () => {
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
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/cart/auth/create", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert("true");
                handleClose();
                loadDataCart();
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    const [dropdown, setdropdown] = useState(false);
    const openDropdown = () => {
        setdropdown(!dropdown);
    };
    const handleDeleteCart = (item) => {
        // alert(item.id);
        setdropdown(false);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/cart/auth/delete/" + item.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // alert("true");
                loadDataCart();
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    return (
        <>
            <div style={{ width: "100%", background: "#ff523b", marginTop: "8rem" }}>
                <div className="container">
                    <h1>My cart</h1>
                </div>
            </div>
            <div className="container">
                <div className="cart-page">
                    {isLoading ? (
                        <div className="row">
                            <h2>Loading . . . </h2>
                        </div>
                    ) : (
                        <>
                            {
                                cart ? (
                                    //
                                    <>
                                        <div className="row">
                                            {/* New cart */}
                                            <div className="col-5">
                                                <div className="new-cart-detail">
                                                    <i class="fa fa-plus-square-o" onClick={handleOpen}></i>
                                                </div>
                                                <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                                            New cart
                                                        </Typography>
                                                        <TextField
                                                            sx={{ margin: "15px auto" }}
                                                            fullWidth
                                                            name="line1"
                                                            label="Địa chỉ"
                                                            onChange={(e) => setLine1(e.target.value)}
                                                        />
                                                        <TextField
                                                            sx={{ margin: "15px auto" }}
                                                            fullWidth
                                                            name="city"
                                                            label="City"
                                                            onChange={(e) => setCity(e.target.value)}
                                                        />
                                                        <TextField
                                                            sx={{ margin: "15px auto" }}
                                                            fullWidth
                                                            name="country"
                                                            label="Country"
                                                            onChange={(e) => setCountry(e.target.value)}
                                                        />
                                                        <TextField
                                                            sx={{ margin: "15px auto" }}
                                                            fullWidth
                                                            name="content"
                                                            label="Content"
                                                            onChange={(e) => setContent(e.target.value)}
                                                        />
                                                        <div style={{ textAlign: "right" }}>
                                                            <Button variant="contained" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                            &nbsp;
                                                            <Button variant="contained" onClick={handleNewCart}>
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </Modal>
                                            </div>
                                            {/*  */}

                                            {cart.map((item, i) => (
                                                <>
                                                    {item.status == 0 || item.status == 1 ? (
                                                        <div className="col-5">
                                                            <div className="cart-detail">
                                                                <div
                                                                    className="dropdown"
                                                                    style={{ display: "flex", justifyContent: "right" }}
                                                                >
                                                                    <i
                                                                        className="fa fa-ellipsis-v"
                                                                        style={{ padding: "10px" }}
                                                                        onClick={openDropdown}
                                                                    />

                                                                    {dropdown ? (
                                                                        <>
                                                                            <div
                                                                                className="dropdown-content"
                                                                                style={{ margin: "35px 0" }}
                                                                            >
                                                                                <a onClick={() => handleDeleteCart(item)}>
                                                                                    <i className="fa fa-times"></i>Remove
                                                                                </a>
                                                                            </div>
                                                                        </>
                                                                    ) : null}
                                                                </div>
                                                                <Link to={`/cart/${item.id}`}>
                                                                    <img src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/cart.png" />

                                                                    <p>content: {item.content}</p>
                                                                    <p>
                                                                        status:{" "}
                                                                        {item.status == 0
                                                                            ? "New"
                                                                            : null || item.status == 1
                                                                            ? "Cart"
                                                                            : null || item.status == 2
                                                                            ? "Order"
                                                                            : null || item.status == 3
                                                                            ? "Đã thanh toán"
                                                                            : null}
                                                                    </p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </>
                                            ))}
                                        </div>
                                    </>
                                ) : null
                                //
                            }
                        </>
                    )}
                </div>
            </div>
            <div style={{ width: "100%", background: "#ff523b", marginTop: "8rem" }}>
                <div className="container">
                    <h1>All my cart</h1>
                </div>
            </div>
            <TableContainer className="container" style={{ paddingTop: "15px" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Country</TableCell>
                            <TableCell align="center">Content</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <div className="row">
                                <h2>Loading . . . </h2>
                            </div>
                        ) : (
                            <>
                                {cart
                                    ? cart.map((item, i) => (
                                          <TableRow>
                                              <TableCell align="center" width={"10px"}>
                                                  {i + 1}
                                              </TableCell>
                                              <TableCell align="center">{item.line1}</TableCell>
                                              <TableCell align="center">{item.city}</TableCell>
                                              <TableCell align="center">{item.country}</TableCell>
                                              <TableCell align="center">{item.content}</TableCell>

                                              <TableCell align="center">
                                                  {item.updatedAt ? item.updatedAt : item.createdAt}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {item.status == 0
                                                      ? "New"
                                                      : null || item.status == 1
                                                      ? "Cart"
                                                      : null || item.status == 2
                                                      ? "Order"
                                                      : null || item.status == 3
                                                      ? "Đã thanh toán"
                                                      : null}
                                              </TableCell>
                                              <TableCell align="center">
                                                  <Button variant="outlined">
                                                      <Link to={`/cart/${item.id}`} style={{ color: "#000" }}>
                                                          View
                                                      </Link>
                                                  </Button>
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : null}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
