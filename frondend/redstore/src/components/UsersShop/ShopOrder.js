import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  Button,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

function ShopOrder() {
    const [productOrder, setProductOrder] = useState();
    const [isLoading, setIsLoading] = useState(true);


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
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    return (
        <div>
            <div>
                
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
                                                                      <div style={{ textAlign: "start" }}>
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
