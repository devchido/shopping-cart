import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShopProduct() {
    const [product, setProduct] = useState();
    const [title, setTitle] = useState("");

    const loadDataProduct = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var raw = "";
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch("/product/auth/user?title=" + title, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                // console.log(result);
                setProduct({ result });
                // console.log(product);
            })
            .catch((error) => console.log("error", error));
    };
    const handleDelete = (item) => {
        // console.log(item.id);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/product/auth/delete/" + item.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                // console.log(result);
                // alert("true");
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    const handleSearch = () => {
        loadDataProduct();
    };
    useEffect(() => {
        loadDataProduct();
    }, []);
    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <TextField
                            label="Search"
                            id="fullWidth"
                            style={{ width: "50%", marginLeft: "auto" }}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Button
                            variant="outlined"
                            style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                            onClick={() => handleSearch()}
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
                                    {product
                                        ? product.result.map((item, i) => (
                                              <TableRow key={item.id}>
                                                  <TableCell align="center" width={"10px"}>
                                                      {i + 1}
                                                  </TableCell>
                                                  <TableCell align="center">
                                                      <img src={item.photos} alt="" />
                                                  </TableCell>
                                                  <TableCell align="center">{item.title}</TableCell>
                                                  <TableCell align="center">{item.price}</TableCell>
                                                  <TableCell align="center">{item.discount}%</TableCell>
                                                  <TableCell align="center">{item.quantity}</TableCell>
                                                  <TableCell align="center">
                                                      <Button variant="outlined">
                                                          <Link to={`/products/${item.slug}`} style={{ color: "#000" }}>
                                                              View
                                                          </Link>
                                                      </Button>
                                                      <Button variant="outlined">
                                                          <Link to={`/shop/product/update/${item.id}`}>Update</Link>
                                                      </Button>

                                                      <Button variant="outlined" onClick={() => handleDelete(item)}>
                                                          Delete
                                                      </Button>
                                                  </TableCell>
                                              </TableRow>
                                          ))
                                        : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ShopProduct;
