import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function ChildModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
//
function SingleProduct() {
    const { slug } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // Sử lý modal popup
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetch("/product/api/findProductBySlug/" + slug).then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                setIsLoading(false);
                setProduct(result);
            });
        });
    }, []);

    return (
        <>
            <div className="small-container single-product">
                {isLoading ? (
                    <div className="row">
                        <h2>Loading . . . </h2>
                    </div>
                ) : (
                    <>
                        {product ? (
                            <>
                                <div className="row">
                                    <div className="col-2">
                                        <img src={product.photos} width="100%" id="ProductImg" />
                                    </div>
                                    <div className="col-2">
                                        <p>
                                            <Link to={"/"}>Home</Link> / {product.summary}
                                        </p>
                                        <h1>{product.title}</h1>

                                        {product.discount != 0 ? (
                                            <>
                                                <h4>
                                                    Price:{" "}
                                                    <b style={{ color: "#ff523b" }}>
                                                        {product.price - (product.price * product.discount) / 100}
                                                    </b>{" "}
                                                    <strike>{product.price}</strike>
                                                    vnd
                                                </h4>
                                                <h5>Discount: {product.discount}%</h5>
                                            </>
                                        ) : (
                                            <h4>
                                                <p>Price: {product.price} vnd</p>
                                            </h4>
                                        )}

                                        <h4>Quantity: {product.quantity}</h4>
                                        <input type="number" defaultValue={1} max={product.quantity} min={1} />
                                        <Button variant="contained" style={{ background: "#ff523b" }} onClick={handleOpen}>
                                            Add To Cart
                                        </Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="parent-modal-title"
                                            aria-describedby="parent-modal-description"
                                        >
                                            <Box sx={{ ...style, width: 900 }}>
                                                <h2 id="parent-modal-title">Select cart</h2>
                                                <p id="parent-modal-description">
                                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                                </p>
                                                <ChildModal />
                                            </Box>
                                        </Modal>
                                        <h3>
                                            Product Details <i className="fa fa-indent" />
                                        </h3>
                                        <br />
                                        <p>{product.content}</p>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </>
                )}
            </div>
        </>
    );
}

export default SingleProduct;
