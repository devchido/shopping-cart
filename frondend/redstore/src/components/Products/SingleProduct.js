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
//
function SingleProduct() {
    const { slug } = useParams();
    const [product, setProduct] = useState();
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    const [isLoadingCart, setIsLoadingCart] = useState(true);
    // Xử lý modal popup: hiển thị danh sách giỏ hàng
    const [open, setOpen] = React.useState(false);
    const [cart, setCart] = useState();
    const handleOpen = () => {
        setOpen(true);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart/auth/my-cart", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                // Set trạng thái loading
                setIsLoadingCart(false);
                // Set data vào cart
                setCart(result);
                // console.log(cart);
            })
            .catch((error) => console.log("error", error));
    };
    const handleClose = () => {
        setOpen(false);
    };
    // Get data item product by slug
    useEffect(() => {
        fetch("/product/api/findProductBySlug/" + slug).then((resp) => {
            resp.json().then((result) => {
                // console.log(result);
                setIsLoadingProduct(false);
                setProduct(result);
            });
        });
    }, []);
    // Xử lý sự kiện chọn giỏ hàng cần chọn để thêm item product
    const [cartId, setCartId] = useState({});
    const [quantity, setQuantity] = useState(1);
    const handleBuyNow = (cart) => {
        
        // console.log(product.id, cartId.id, quantity);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            productId: product.id,
            cartId: cartId.id,
            quantity: quantity,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/cart-item/auth/create", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                // console.log(result);
                alert("true");
                handleClose();
                
            })
            .catch((error) => {
                // console.log("error", error);
                alert("false");
            });
    }

    return (
        <>
            <div className="small-container single-product">
                {/* Nếu loadingProduct false thì mới hiện thông tin product */}
                {isLoadingProduct ? (
                    <div className="row">
                        <h2>Loading . . . </h2>
                    </div>
                ) : (
                    <>
                        {/* Khi product có dữ liệu thì hiện thị thông tin ra màn hình */}
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
                                        {/* Khi product có sự kiện hạ giá thì hiện sự thay đối giá của product */}
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
                                        <input 
                                        type="number" 
                                        max={product.quantity} 
                                        min={1} 
                                        value={quantity} 
                                        onChange={(e)=> {setQuantity(e.target.value);}}
                                        />
                                        {/* Xự kiện chọn mua thì hiện ra một modal để user chọn cart cần thêm product item */}
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
                                                {/* Kiểm tra xem user hiện có đang đăng nhập hay không */}
                                                {localStorage.getItem("token") ? (
                                                    <>
                                                        <h2 id="parent-modal-title">Select cart:&nbsp;{cartId.content} </h2>
                                                        {/* <p id="parent-modal-description">Hãy chọn giỏ hàng:</p> */}
                                                        {/* Check loadingCart false thì hiện thị list cart của user */}
                                                        {isLoadingCart ? (
                                                            <div className="row">
                                                                <h2>Loading . . . </h2>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {/* Check user's cart có data hay không */}
                                                                {cart ? (
                                                                    <>
                                                                        {" "}
                                                                        <div className="parent-modal-item row">
                                                                            {/* Hiện thị các user's cart */}
                                                                            {cart.map((item, i) => (
                                                                                <>
                                                                                    {/*  */}
                                                                                    <div
                                                                                        className="col-5"
                                                                                        onClick={() => {
                                                                                            setCartId(item);
                                                                                            // console.log(cartId);
                                                                                        }}
                                                                                    >
                                                                                        <div className="cart-detail">
                                                                                            <img src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/cart.png" />

                                                                                            <p>content: {item.content}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            ))}
                                                                        </div>
                                                                    </>
                                                                ) : null}
                                                            </>
                                                        )}
                                                        <div style={{ textAlign: "right" }}>
                                                            <Button variant="outlined" onClick={handleBuyNow}>Buy now</Button>
                                                            &nbsp;
                                                            <Button variant="outlined" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h2>Bạn chưa đăng nhập</h2>
                                                        <div style={{ textAlign: "right" }}>
                                                            <Button variant="outlined">
                                                                <Link to={"/login"} style={{ color: "#1976d2" }}>
                                                                    Login
                                                                </Link>
                                                            </Button>
                                                            &nbsp;
                                                            <Button variant="outlined" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
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
