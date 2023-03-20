import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Order() {
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState();
    const [itemRemove, setItemRemove] = useState();
    //
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    //
    useEffect(() => {
        loadDataProductOrder();
    }, []);
    const loadDataProductOrder = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/order/auth/user", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setOrder(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    return (
        <div>
            <div>
                <div className="page">
                    <div style={{ background: "#ff523b" }}>
                        <div className="container">
                            <h1 style={{ color: "#fff" }}>My Order</h1>
                        </div>
                    </div>
                    <div className="container shop-product-cart-page">
                        <div>
                            <div className="row">
                                <TextField
                                    label="Search (Chưa làm)"
                                    id="fullWidth"
                                    style={{ width: "50%", marginLeft: "auto" }}
                                    // onChange={(e) => setTitle(e.target.value)}
                                />
                                <Button
                                    variant="outlined"
                                    style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                                    // onClick={() => handleSearch()}
                                >
                                    Search
                                </Button>

                                <TableContainer style={{ paddingTop: "15px" }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">STT</TableCell>
                                                <TableCell align="center">OrderId</TableCell>
                                                <TableCell align="center">CartId</TableCell>
                                                <TableCell align="center">Content</TableCell>
                                                <TableCell align="center">Total($)</TableCell>
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
                                                    {order ? (
                                                        order.map((item, i) => (
                                                            <TableRow>
                                                            <TableCell align="center" width={"10px"}>
                                                                {i + 1}
                                                            </TableCell>
                                                            <TableCell align="center">{item.id}</TableCell>
                                                            <TableCell align="center">
                                                                <Link to={`/cart/${item.carts.id}`} > 
                                                                    {item.carts.id}
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell align="center">{item.content}</TableCell>
                                                            <TableCell align="center">{item.total} vnd</TableCell>
                                                            

                                                            <TableCell align="center">
                                                                {item.updatedAt ? item.updatedAt : item.createdAt}
                                                            </TableCell>
                                                            <TableCell align="center">{
                                                                    (
                                                                        item.status == 0 ? "Chờ xác nhận" : null ||
                                                                        item.status == 1 ? "Đã xác nhận" : null||
                                                                        item.status == 2 ? "Đã thanh toán" : null ||
                                                                        item.status == 3 ? "Đang vận chuyển" : null||
                                                                        item.status == 4 ? "Đã giao" : null ||
                                                                        item.status == 5 ? "Huỷ" : null ||
                                                                        item.status == 6 ? "Thành công" : null 
                                                                    )
                                                                }</TableCell>
                                                            <TableCell align="center">
                                                                <Button variant="outlined">
                                                                    <Link
                                                                          to={`/order/${item.id}`}
                                                                        style={{ color: "#000" }}
                                                                    >
                                                                        View
                                                                    </Link>
                                                                </Button>

                                                                <Button variant="outlined" onClick={() => handleOpen()}>
                                                                    Remove
                                                                </Button>
                                                                <Modal
                                                                    open={open}
                                                                    onClose={handleClose}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={style}>
                                                                        <>
                                                                            <h2 id="parent-modal-title">
                                                                                Remove order
                                                                            </h2>
                                                                            <p id="parent-modal-description">
                                                                                Remove order
                                                                            </p>

                                                                            <div style={{ textAlign: "right" }}>
                                                                                <Button variant="contained">Yes</Button>
                                                                                &nbsp;
                                                                                <Button variant="contained" onClick={handleClose}>
                                                                                    Close
                                                                                </Button>
                                                                            </div>
                                                                        </>
                                                                    </Box>
                                                                </Modal>
                                                            </TableCell>
                                                        </TableRow>
                                                        ))
                                                        
                                                    ) : null}
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
