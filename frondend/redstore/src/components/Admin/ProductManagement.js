import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Link } from "react-router-dom";

function ProductManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState();
    const loadDataUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/product/auth/admin/filter", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setProduct(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    useEffect(() => {
        loadDataUser();
    }, []);
    return (
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
                // onClick={() => loadDataOrder()}
            >
                Search
            </Button>

            <TableContainer style={{ paddingTop: "15px" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Photos</TableCell>
                            <TableCell align="center">Time</TableCell>
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
                                {product
                                    ? product.map((item, i) => (
                                            <TableRow>
                                                <TableCell align="center" width={"10px"}>
                                                    {item.id}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="cart-info">
                                                        <Link to={`/products/`}>
                                                            <img src={item.photos} alt="" />
                                                        </Link>
                                                        <div>
                                                            <Link to={`/products/${item.slug}`}>
                                                                <p>{item.title}</p>
                                                            </Link>
                                                            <small>Price: {item.price} vnd</small>
                                                            <br />
                                                            <small>Quantity: {item.quantity}</small>
                                                            <br />
                                                            <small>User: {item.users.firstName + " " + item.users.lastName}</small>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell align="center">
                                                    {item.updatedAt ? item.updatedAt : item.createdAt}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button variant="outlined">Action</Button>
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
    );
}

export default ProductManagement;
