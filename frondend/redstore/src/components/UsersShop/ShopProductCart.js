import React from "react";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

function ShopProductCart() {
    return (
        <div className="page">
            <div style={{ background: "#ff523b" }}>
                <div className="container">
                    <h1 style={{ color: "#fff" }}>Manage products in shopping cart</h1>
                </div>
            </div>
            <div className="small-container shop-product-cart-page">
                <div>
                    <div className="row">
                        <TextField
                            label="Search"
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
                        <Button variant="outlined" style={{ width: "10%", height: "3.5rem", marginLeft: "0" }}>
                            <Link to={"/shop/product/new-product"}>Add</Link>
                        </Button>
                        <TableContainer style={{ paddingTop: "15px" }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                        <TableCell align="center">Photo</TableCell>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Price&nbsp;($)</TableCell>
                                        <TableCell align="center">Discount&nbsp;(%)</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {product
                                        ? product.result.map((item, i) => ( */}
                                    <TableRow>
                                        <TableCell align="center" width={"10px"}>
                                            {/* {i + 1} */}1
                                        </TableCell>
                                        <TableCell align="center">{/* <img src={item.photos} /> */}</TableCell>
                                        <TableCell align="center">sfd</TableCell>
                                        <TableCell align="center">54</TableCell>
                                        <TableCell align="center">2345</TableCell>
                                        <TableCell align="center">
                                            {/* {item.quantity} */}
                                            sdf
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="outlined">
                                                {/* <Link to={`/products/${item.slug}`} style={{ color: "#000" }}> */}
                                                View
                                                {/* </Link> */}
                                            </Button>
                                            <Button variant="outlined">
                                                {/* <Link to={`/shop/product/update/${item.id}`}> */}
                                                Update
                                                {/* </Link> */}
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                //   onClick={() => handleDelete(item)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    {/* )) */}
                                    {/* : null} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopProductCart;
