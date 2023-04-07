import { Alert, Box, Divider, Drawer, IconButton, List, ListItem, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
function SingleProduct() {
    const { slug } = useParams();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = React.useState(0);
    //Drawer
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");
    const snackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        loadDataProduct();
    }, []);
    const loadDataProduct = () => {
        fetch("/product/api/findProductBySlug/" + slug).then((resp) => {
            resp.json().then((result) => {
                // console.log(result);
                setLoading(false);
                setProduct(result);
            });
        });
        fetch("/category/api/single-product-category?field=" + slug).then((resp) => {
            resp.json().then((result) => {
                // console.log(result);
                setCategory(result);
            });
        });
    };
    const loadDataCart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart/auth/my-cart?status=1", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                setCart(result);
            })
            .catch((error) => console.log("error", error));
    };
    const Loading = () => {
        return <>Loading . . .</>;
    };

    const ShowProduct = () => {
        return (
            <>
                <div className="col-sm-6 d-flex justify-content-center border">
                    <img src={product.photos} alt={product.title} height={"400px"} width={"400px"} />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase test-black-50">{category.title}</h4>
                    <h1 className="display-5">{product.title}</h1>
                    <p className="lead">Hiện còn: {product.quantity}</p>
                    {product.discount === 0 ? (
                        <>
                            <h3 className="display-6 fw-bold my-4">{product.price} vnd</h3>
                        </>
                    ) : (
                        <>
                            <p className="lead">
                                Giá: <del>{product.price} vnd</del>
                            </p>
                            <h3 className="display-6 fw-bold my-4">
                                <span className="lead">Chỉ còn:</span> {product.price} vnd
                            </h3>
                        </>
                    )}

                    <p className="lead">{product.content}</p>
                    <div className=" d-flex  my-3">
                        <IconButton
                            sx={{ mx: 1 }}
                            onClick={() => {
                                if (quantity > 0) {
                                    setQuantity(i => i- 1);
                                }
                            }}
                        >
                            <RemoveIcon className="text-danger" />
                        </IconButton>
                        <input
                            style={{ width: "4rem" }}
                            min={0}
                            max={product.quantity}
                            name="quantity"
                            value={quantity}
                            defaultValue={quantity}
                            type="number"
                            className="form-control form-control-sm"
                            onChange={(e) => {
                                if (e.target.value < 0) {
                                    setQuantity(0);
                                } else if (e.target.value > product.quantity) {
                                    setQuantity(product.quantity);
                                } else {
                                    setQuantity(e.target.value);
                                }
                            }}
                        />

                        <IconButton sx={{ mx: 1 }} onClick={() => {
                                if (quantity < product.quantity) {
                                    setQuantity(i => i+1);
                                }
                            }}>
                            <AddIcon className="text-primary" />
                        </IconButton>
                    </div>

                    {localStorage.getItem("token") !== null ? (
                        <>
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => {
                                    if (quantity <= 0) {
                                        setSnackbarOpen(true);
                                        setSnackbarSeverity("error");
                                        setSnackbarMsg("Số lượng sản phẩm không hợp lệ");
                                    } else {
                                        setIsDrawerOpen(true);
                                        loadDataCart();
                                    }
                                }}
                            >
                                Buy Now
                            </button>

                            <Link to={"/carts"} className="btn btn-dark ms-2 px-3 py-2">
                                Go to Cart
                            </Link>
                        </>
                    ) : null}
                </div>
            </>
        );
    };
    const ShowCarts = () => {
        return (
            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width={"25rem"} textAlign={"center"} role="presentation">
                    <Typography variant="h6" component="div">
                        Giỏ hàng
                    </Typography>
                    <List>
                        {cart.map((cart, i) => (
                            <ListItem key={i} className="mb-3 " disablePadding>
                                <div className=" row mx-auto w-100">
                                    <hr className="mb-3" />
                                    <h6 className="text-muted">Cart: {cart.id}</h6>
                                    <h6 className="text-black mb-0">{cart.content}</h6>
                                    <p className="text-muted mb-0">
                                        {formatDistanceToNow(new Date(cart.updatedAt), {
                                            locale: vi,
                                            addSuffix: true,
                                        })}
                                    </p>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-outline-dark" onClick={() => handleAddToCart(cart)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        );
    };
    const handleAddToCart = (cart) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            productId: product.id,
            cartId: cart.id,
            quantity: quantity,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/cart-item/auth/create", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.status;
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // console.log(result);
                setIsDrawerOpen(false);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Thành công");
                loadDataProduct();
            })
            .catch((error) => {
                // console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("False");
            });
    };
    return (
        <div>
            <Snackbar
                sx={{ marginTop: "50px" }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={snackbarClose}
            >
                <Alert
                    severity={`${snackbarSeverity}`}
                    action={[
                        <IconButton key={"close"} aria-label="Close" sx={{ p: 0.5 }} onClick={snackbarClose}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                >
                    {snackbarMsg}
                </Alert>
            </Snackbar>
            <div className="container py-5">
                <div className="row py-4">{loading ? <Loading /> : <ShowProduct />}</div>
                <ShowCarts />
            </div>
        </div>
    );
}

export default SingleProduct;
