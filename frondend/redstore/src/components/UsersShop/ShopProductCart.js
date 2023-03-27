import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";

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

function ShopProductCart() {
    const [productCart, setProductCart] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [itemRemove, setItemRemove] = useState();
    const handleOpen = (item) => {
        setOpen(true);
        setItemRemove(item );
        // alert(item.id);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        loadDataProductCart();
    }, []);

    const loadDataProductCart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/cart-item/auth/shop/product-cart", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setProductCart(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    const handleRemove = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/cart-item/auth/shop/product-cart/" + itemRemove.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                handleClose();
                alert("true");
                loadDataProductCart();
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <div className="page">
            <div style={{ background: "#ff523b" }}>
                <div className="container">
                    <h1 style={{ color: "#fff" }}>Manage products in shopping cart</h1>
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
                                        <TableCell align="center">Photo</TableCell>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Price&nbsp;($)</TableCell>
                                        <TableCell align="center">Discount&nbsp;(%)</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">User's Cart</TableCell>
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
                                            {productCart
                                                ? productCart.map((item, i) => (
                                                      <TableRow>
                                                          <TableCell align="center" width={"10px"}>
                                                              {/* {i + 1} */}
                                                              {item.id}
                                                          </TableCell>
                                                          <TableCell align="center">
                                                              {<img src={item.product.photos} alt="" />}
                                                          </TableCell>
                                                          <TableCell align="center">{item.product.title}</TableCell>
                                                          <TableCell align="center">{item.price}</TableCell>
                                                          <TableCell align="center">{item.discount}</TableCell>
                                                          <TableCell align="center">{item.quantity}</TableCell>
                                                          <TableCell align="center">
                                                              {item.cart.users.firstName + " " + item.cart.users.lastName}
                                                          </TableCell>

                                                          <TableCell align="center">
                                                              {item.updatedAt ? item.updatedAt : item.createdAt}
                                                          </TableCell>
                                                          <TableCell align="center">
                                                              <Button variant="outlined">
                                                                  <Link
                                                                      to={`/products/${item.product.slug}`}
                                                                      style={{ color: "#000" }}
                                                                  >
                                                                      View
                                                                  </Link>
                                                              </Button>

                                                              <Button variant="outlined" onClick={() => handleOpen(item)}>
                                                                  Remove
                                                              </Button>
                                                              <Modal
                                                                  open={open}
                                                                  onClose={handleClose}
                                                                  aria-labelledby="modal-modal-title"
                                                                  aria-describedby="modal-modal-description"
                                                              >
                                                                  <Box sx={style}>
                                                                      {itemRemove ? (
                                                                          <>
                                                                              <h2 id="parent-modal-title">
                                                                                  Remove cart item from user's cart:{" "}
                                                                                  {itemRemove.id}
                                                                              </h2>
                                                                              <p id="parent-modal-description">
                                                                                  Remove cart item {itemRemove.product.title} from{" "}
                                                                                  {item.cart.users.firstName +
                                                                                      " " +
                                                                                      item.cart.users.lastName}
                                                                                  's cart
                                                                              </p>

                                                                              <div style={{ textAlign: "right" }}>
                                                                                  <Button
                                                                                      variant="contained"
                                                                                      onClick={() => handleRemove()}
                                                                                  >
                                                                                      Yes
                                                                                  </Button>
                                                                                  &nbsp;
                                                                                  <Button
                                                                                      variant="contained"
                                                                                      onClick={handleClose}
                                                                                  >
                                                                                      Close
                                                                                  </Button>
                                                                              </div>
                                                                          </>
                                                                      ) : null}
                                                                  </Box>
                                                              </Modal>
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
    );
}

export default ShopProductCart;
