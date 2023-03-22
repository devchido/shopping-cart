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

function ShopOrder() {
    const [productOrder, setProductOrder] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [itemRemove, setItemRemove] = useState();
    const [statusItem, setStatusItem] = useState("");
    const handleConfirmStatus = (item) => {
        console.log("status: ",statusItem, "itemId", item.id);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            status: "1",
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/order-item/auth/shop/order/orderItem/" + item.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // alert("true");
                loadDataProductOrder();
                
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    }
    const handleCancelStatus = (item) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            status: "0",
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/order-item/auth/shop/order/orderItem/" + item.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // alert("true");
                loadDataProductOrder();
                
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    }
    const handleOpen = (item) => {
        setOpen(true);
        setItemRemove(item);
        // alert(item.id);
    };
    const handleClose = () => setOpen(false);

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

        fetch("/order-item/auth/shop/order", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setProductOrder(result);
                setStatusItem(result.status);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    
    return (
        <div>
            <div className="page">
                <div>
                    <div className="container">
                        <h1>Shop: Order management</h1>
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
                                            <TableCell align="center">Id</TableCell>
                                            <TableCell align="center">Order id</TableCell>
                                            <TableCell align="center">Product item order</TableCell>
                                            <TableCell align="center">Time</TableCell>
                                            <TableCell align="center">Item Status</TableCell>
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
                                                {productOrder
                                                    ? productOrder.map((item, i) => (
                                                          <TableRow>
                                                              <TableCell align="center" width={"10px"}>
                                                                  {/* {i + 1} */}
                                                                  {item.id}
                                                              </TableCell>
                                                              <TableCell align="center">{item.orders.id}</TableCell>
                                                              <TableCell align="center">
                                                                  <div className="cart-info">
                                                                      <Link to={""}>
                                                                          {<img src={item.products.photos} alt="" />}
                                                                      </Link>
                                                                      <div style={{textAlign: "start"}}>
                                                                          <Link to={""}>
                                                                              <p>{item.products.title}</p>
                                                                          </Link>
                                                                          <small>Price: {item.price} vnd</small>
                                                                          <br />
                                                                          <small>Discount: {item.discount} vnd</small>
                                                                          <br />
                                                                          <small>Quantity: {item.quantity}</small>
                                                                          <br />
                                                                          <p className="item-delete">Remove</p>
                                                                      </div>
                                                                  </div>
                                                              </TableCell>

                                                              <TableCell align="center">
                                                                  {item.updatedAt ? item.updatedAt : item.createdAt}
                                                              </TableCell>
                                                              <TableCell align="center">
                                                                  {item.status === 0
                                                                      ? "Chờ xác nhận"
                                                                      : null || item.status === 1
                                                                      ? "Đã xác nhận"
                                                                      : null || item.status === 2
                                                                      ? "Đang vận chuyển"
                                                                      : null || item.status === 3
                                                                      ? "Thành công"
                                                                      : null || item.status === null
                                                                      ? "Chờ xác nhận"
                                                                      : null}
                                                              </TableCell>
                                                              <TableCell align="center">
                                                                  {item.status === 0 || item.status === null ? (
                                                                      <Button variant="outlined" onClick={() => handleConfirmStatus(item)}>
                                                                          Xác nhận
                                                                      </Button>
                                                                  ) : null}
                                                                  {item.status !== 3 ? (
                                                                      <Button variant="outlined" onClick={() => handleCancelStatus(item)}>
                                                                          Cancel
                                                                      </Button>
                                                                  ) : null}

                                                                  
                                                              </TableCell>
                                                          </TableRow>
                                                      ))
                                                    : null}
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
    );
}

export default ShopOrder;
