import { Alert, Avatar, Box, Divider, Drawer, IconButton, List, ListItem, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { VND } from "../Unity/VND";
import CommentForm from "./CommentForm";
function SingleProduct() {
    const { slug } = useParams();
    const [product, setProduct] = useState({
        id: "",
        users: {},
    });
    const [category, setCategory] = useState([]);
    const [cart, setCart] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = React.useState(1);
    
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
        fetch("/cart/auth/my-cart?status=0", requestOptions)
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
                    <h1 className="display-5">{product.title}</h1>
                    <p className="lead">Loại sản phẩm: {category.title}</p>
                    <p className="lead">Hiện còn: {product.quantity}</p>
                    {product.discount === 0 ? (
                        <>
                            <h3 className="display-6 fw-bold my-4">{VND.format(product.price)} </h3>
                        </>
                    ) : (
                        <>
                            <p className="lead">
                                Giá: <del className="text-danger">{VND.format(product.price)} </del>
                            </p>
                            <h3 className="display-6 fw-bold my-4">
                                <span className="lead">Chỉ cần: </span>
                                {VND.format(product.price - (product.price * product.discount) / 100)}
                            </h3>
                        </>
                    )}

                    <p className="">{product.summary}</p>
                    <div className=" d-flex  my-3">
                        <IconButton
                            sx={{ mx: 1 }}
                            onClick={() => {
                                if (quantity > 0) {
                                    setQuantity((i) => i - 1);
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

                        <IconButton
                            sx={{ mx: 1 }}
                            onClick={() => {
                                if (quantity < product.quantity) {
                                    setQuantity((i) => i + 1);
                                }
                            }}
                        >
                            <AddIcon className="text-primary" />
                        </IconButton>
                    </div>

                    {localStorage.getItem("token") !== null ? (
                        <>
                            <button
                                className="btn btn-info ms-2 px-3 py-2"
                                onClick={() => {
                                    if (quantity <= 0) {
                                        setSnackbarOpen(true);
                                        setSnackbarSeverity("error");
                                        setSnackbarMsg("Số lượng sản phẩm không hợp lệ");
                                    } else {
                                        // setIsDrawerOpen(true);
                                        // loadDataCart();
                                        handleAddToCart();
                                    }
                                }}
                            >
                                Add to Cart
                            </button>

                            <Link to={"/carts"} className="btn btn-warning ms-2 px-3 py-2">
                                Đánh giá
                            </Link>
                        </>
                    ) : null}
                </div>
                <div className=" justify-content-center my-4">
                    <div className="card  mb-4 w-100">
                        <div className="card-header py-3">
                            <h5 className="mb-0 text-capitalize">Thông tin chi tiết</h5>
                        </div>
                        <div className="card-body">
                            <strong>
                                <pre>{product.content}</pre>
                            </strong>
                        </div>
                    </div>
                    <ShowUser />
                    <CommentForm product={product} />
                </div>
            </>
        );
    };
    const ShowUser = () => {
        return (
            <div>
                <br />
                <div className="card mb-4 w-100">
                    <div className="card-header py-3">
                        <h5 className="mb-0 text-capitalize">Người bán</h5>
                    </div>
                    <div className="card-body d-flex">
                        <Avatar alt="Remy Sharp" src={product.users.photos} variant="rounded" />
                        <p className="my-auto mx-3">
                            <Link to={"/user/" + product.users.id}>
                                <strong>{product.users.firstName + " " + product.users.lastName}</strong>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    };
    
    const handleAddToCart = () => {
        //
        fetch("/cart/auth/active", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                fetch("/cart-item/auth/create", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        quantity: quantity,
                    }),
                })
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
            })
            .catch((error) => console.log("error", error));
        //
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
                
            </div>
        </div>
    );
}

export default SingleProduct;
