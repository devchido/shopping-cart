import { Box, Button, Modal, TextField, Typography } from "@mui/material";
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
    const api = useEffect(() => {
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
    });

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
                                                <div className="col-5">
                                                    <Link to={`/cart/${item.id}`}>
                                                        <div className="cart-detail">
                                                            <img src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/cart.png" />
                                                            {/* <p>Create at:{item.createdAt}</p>
                                                              <p>Update at:{item.updatedAt}</p> */}
                                                            <p>content: {item.content}</p>
                                                        </div>
                                                    </Link>
                                                </div>
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
        </>
    );
}
