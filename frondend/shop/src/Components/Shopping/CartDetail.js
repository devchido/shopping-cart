import React from "react";
import { Link, useParams } from "react-router-dom";
//
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
//
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";

function CartDetail() {
    const { id } = useParams();
    const [cart, setCart] = React.useState({});
    const [cartDetail, setCartDetail] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");

    const snackbarClose = () => {
        setSnackbarOpen(false);
    };

    const loadDataCartDetail = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart-item/auth/cart/" + id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("cart-item", result);
                setLoading(false);
                setCartDetail(result);
            })
            .catch((error) => console.log("error", error));
    };
    const loadDataCart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart/auth/my-cart/" + id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("cart", result);
                setCart(result);
            })
            .catch((error) => console.log("error", error));
    };

    const ShowCartItem = () => {
        return (
            <div>
                {cartDetail.length > 0 ? (
                    <>
                        {cartDetail.map((item, i) => (
                            <div className="d-flex align-items-center mb-4 " key={i}>
                                <div className="flex-shrink-0 me-2">
                                    <img src={item.product.photos} className="img-fluid" style={{ width: 200 }} alt="" />
                                </div>
                                <div className="flex-grow-1 ms-3 col-lg-5 col-md-6 mb-lg-0">
                                    {/* Data */}
                                    <p>
                                        <strong className="text-primary">{item.product.title}</strong>
                                    </p>
                                    <h6 style={{ color: "#9e9e9e" }}>Giảm giá: {item.product.discount}%</h6>
                                    <div className="d-flex justify-content-between">
                                        <p className="fw-bold mt-3">{item.product.price}vnd</p>

                                        <div className=" d-flex justify-content-center">
                                            <IconButton sx={{ mx: 1 }}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <input
                                                style={{ width: "4rem" }}
                                                min={0}
                                                name="quantity"
                                                defaultValue={item.quantity}
                                                type="number"
                                                className="form-control form-control-sm"
                                            />

                                            <IconButton sx={{ mx: 1 }}>
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <IconButton className="text-danger me-1 mb-2" title="remove">
                                            <DeleteIcon />
                                        </IconButton>
                                        <Link to={`/product/${item.product.slug}`}>
                                            <IconButton className="text-primary mb-2" title="view">
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>Chưa có sản phẩm</>
                )}
            </div>
        );
    };
    const Loading = () => {
        return <>Loading</>;
    };
    const ShowDataCart = () => {
        return (
            <>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-outline">
                            <input type="text" className="form-control form-control-lg" defaultValue={cart.firstName} disabled />
                            <label className="form-label">Họ</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-outline">
                            <input type="text" className="form-control form-control-lg" defaultValue={cart.lastName} disabled />
                            <label className="form-label">Tên</label>
                        </div>
                    </div>
                </div>
                <div className="form-outline mb-3">
                    <input type="number" className="form-control form-control-lg" defaultValue={cart.mobile} disabled />
                    <label className="form-label" htmlFor="typeText">
                        Điện thoại
                    </label>
                </div>
                <div className="form-outline mb-3">
                    <input type="text" className="form-control form-control-lg" defaultValue={cart.email} disabled />
                    <label className="form-label" htmlFor="typeText">
                        Email
                    </label>
                </div>
                <div className="form-outline mb-3">
                    <input
                        type="text"
                        id="line1"
                        name="line1"
                        className="form-control form-control-lg"
                        defaultValue={cart.line1}
                    />
                    <label className="form-label" htmlFor="typeName">
                        Địa chỉ
                    </label>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-outline">
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="form-control form-control-lg"
                                defaultValue={cart.city}
                            />
                            <label className="form-label">Thành phố/Tỉnh</label>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-outline">
                            <input
                                type="text"
                                id="country"
                                name="country"
                                className="form-control form-control-lg"
                                defaultValue={cart.country}
                                // readOnly
                            />
                            <label className="form-label">Quốc gia</label>
                        </div>
                    </div>
                    <div className="form-outline mb-3">
                        <input
                            type="text"
                            id="content"
                            name="content"
                            className="form-control form-control-lg"
                            defaultValue={cart.content}
                        />
                        <label className="form-label">Ghi chú</label>
                    </div>
                </div>
            </>
        );
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            line1: data.get("line1"),
            city: data.get("city"),
            country: data.get("country"),
            content: data.get("content"),
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/cart/auth/" + cart.id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.status;
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Thành công.");
                loadDataCart();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("False");
            });
    };
    const handleOrderNow = () => {
        alert(cart.id);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/order/auth/createByCart?idCart=" + cart.id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.status;
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                // alert("true");
                loadDataCart();
                loadDataCartDetail();
                //
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Thành công.");
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("False");
            });
    };
    React.useEffect(() => {
        setLoading(true);
        loadDataCart();
        loadDataCartDetail();
    }, []);
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
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card shopping-cart" style={{ borderRadius: 15 }}>
                                <div className="card-body text-black">
                                    <div className="row">
                                        <div className="col-lg-6 px-5 py-4">
                                            <div className="d-flex justify-content-between">
                                                <h3 className="mb-5 pt-2  fw-bold text-uppercase">Your products</h3>
                                                <p className="pt-3  fw-bold text-uppercase">Item: {cartDetail.length}</p>
                                            </div>
                                            {loading ? <Loading /> : <ShowCartItem />}

                                            <hr className="mb-4" style={{ height: 2, backgroundColor: "#1266f1", opacity: 1 }} />
                                            <div className="d-flex justify-content-between px-x">
                                                <p className="fw-bold">Discount:</p>
                                                <p className="fw-bold">95$</p>
                                            </div>
                                            <div
                                                className="d-flex justify-content-between p-2 mb-2"
                                                style={{ backgroundColor: "#e1f5fe" }}
                                            >
                                                <h5 className="fw-bold mb-0">Total:</h5>
                                                <h5 className="fw-bold mb-0">2261$</h5>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 px-5 py-4">
                                            <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">Thông tin</h3>
                                            <form onSubmit={handleSubmit} className="mb-5">
                                                <ShowDataCart />
                                                <div className="d-flex justify-content-between">
                                                    <span className="fw-bold mt-1">
                                                        <Link to={"/carts"} style={{ fontSize: "24px" }}>
                                                            <ChevronLeftIcon
                                                                className="text-primary me-0 pb-1 "
                                                                title="View"
                                                                sx={{ fontSize: "40px" }}
                                                            />
                                                            Back
                                                        </Link>
                                                    </span>
                                                    <span>
                                                        <button type="submit" className="btn btn-outline-primary btn-block  ">
                                                            Cập nhật
                                                        </button>
                                                    </span>
                                                    <span>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-block"
                                                            onClick={handleOrderNow}
                                                        >
                                                            Order now
                                                        </button>
                                                    </span>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CartDetail;
