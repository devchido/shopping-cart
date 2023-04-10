import React from "react";
import { Link, useParams } from "react-router-dom";
//
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Typography } from "@mui/material";
//
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
//
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { VND } from "../Unity/VND";

const steps = ["Chờ xử lý", "Đang vận chuyển", "Đang giao", "Đã nhận"];
function OrderDetail() {
    // id của order
    const { id } = useParams();
    //
    const [order, setOrder] = React.useState({});
    // thông tin chi tiết của order
    const [orderDetail, setOrderDetail] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    // Nhận thông tin của order: item được chọn
    const [orderItem, setOrderItem] = React.useState();

    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");
    //

    //
    const [open, setOpen] = React.useState(false);
    

    const handleClickOpen = (item) => {
        console.log(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // Đóng snackbar
    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    // get data chi tiết của order
    const loadDataOrderDetail = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/order-item/auth/shop/order/" + id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                // console.log("cart-item", result);
                setLoading(false);
                setOrderDetail(result);
            })
            .catch((error) => console.log("error", error));
    };
    // get data của order
    const loadDataOrder = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/order/auth/findOneById/" + id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("order", result);
                setOrder(result);
            })
            .catch((error) => console.log("error", error));
    };

    const Loading = () => {
        return <>Loading</>;
    };
    // Thông tin của phiếu order
    const ShowDataOrder = () => {
        return (
            <div className="card mb-4">
                <div className="card-header py-3">
                    <h5 className="mb-0">Thông tin</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Người đặt hàng
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {order.firstName + " " + order.lastName}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Mobile
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {order.mobile}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center  px-0 ">
                            Email
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {order.email}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Address
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {order.line1}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            City
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {order.city}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            Country
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {order.country}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            Content
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {order.content}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Sub Total
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {VND.format(order.subTotal)}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Item Discount
                            <span className="w-auto" style={{ maxWidth: "75%" }}>
                                {VND.format(order.itemDiscount)}
                            </span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center  px-0 mb-3">
                            <div>
                                <strong>Total</strong>
                                {/* <strong>
                                    <p className="mb-0">(including VAT)</p>
                                </strong> */}
                            </div>
                            <span>
                                <strong>{VND.format(order.total)}</strong>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const SingleItem = () => {
        return orderDetail.length > 0
            ? orderDetail.map((item, i) => (
                  <div key={i}>
                      <div className="row mb-3 justify-content-center">
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                              {/* Image start */}
                              <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                  <img src={item.products.photos} className="w-100" alt={item.products.title} />
                                  <a href="#!">
                                      <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }} />
                                  </a>
                              </div>
                              {/* Image end */}
                          </div>
                          <div className="col-lg-8 col-md-12 m-0">
                              {/* Data start */}
                              <p>
                                  <strong>{item.products.title}</strong>
                              </p>
                              {/* discount start */}
                              <p>Giảm giá: {item.discount}%</p>
                              {/* discount end */}
                              {/* Price start */}
                              <p>
                                  Giá: <strong>{VND.format(item.price)}</strong>
                              </p>
                              {/* Price end */}
                              {/* Quantity start */}
                              <p>
                                  Số lượng: <strong>{item.quantity}</strong>
                              </p>
                              {/* Quantity end*/}
                              <Link to={`/product/${item.products.slug}`}>
                                  <IconButton className="text-primary" title="view">
                                      <VisibilityIcon />
                                  </IconButton>
                              </Link>

                              {/* Data end */}
                          </div>
                      </div>
                      <hr className="my-4" />
                  </div>
              ))
            : null;
    };
    const handleCancelOrder = () => {
        if (order.status === 1 || order.status === 5) {
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMsg("Đơn hàng id= " + order.id + " không hợp lệ!");
            handleClose();
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                redirect: "follow",
            };

            fetch("/order/auth/cancel-order?id=" + order.id, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.status;
                    }
                    throw new Error(response.status);
                })
                .then((result) => {
                    setSnackbarOpen(true);
                    setSnackbarSeverity("success");
                    setSnackbarMsg("Đã huỷ đơn hàng id= " + order.id + ".");
                    handleClose();
                    loadDataOrder();
                })
                .catch((error) => {
                    setSnackbarOpen(true);
                    setSnackbarSeverity("error");
                    setSnackbarMsg("Lỗi huỷ đơn hàng id= " + order.id + "!");
                    handleClose();
                });
        }
    };

    React.useEffect(() => {
        setLoading(true);
        loadDataOrder();
        loadDataOrderDetail();
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Bạn có chắc muốn huỷ đơn hàng id: {order.id} không?</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose}>Không</Button>
                    <Button onClick={handleCancelOrder}>Huỷ đơn hàng</Button>
                </DialogActions>
            </Dialog>
            <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Order item - {orderDetail.length} items</h5>
                                </div>
                                <div className="card-body">
                                    {/* Single item start */}
                                    <SingleItem />
                                    {/* Single item end */}
                                </div>
                            </div>
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Trạng thái đơn hàng</h5>
                                </div>
                                <div className="card-body">
                                    <Box sx={{ width: "100%" }}>
                                        <Stepper activeStep={order.status}>
                                            {steps.map((label) => (
                                                <Step key={label}>
                                                    <StepLabel>{label}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </Box>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body">
                                    <p>
                                        <strong>We accept</strong>
                                    </p>
                                    <img
                                        className="me-2"
                                        width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                        alt="Visa"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {loading ? <Loading /> : <ShowDataOrder />}
                            <div className="card mb-4 card-body ">
                                <div className="d-flex form-group justify-content-between">
                                    <Link to={"/orders"}>
                                        <button type="reset" className="btn btn-dark btn-block ">
                                            Trở lại
                                        </button>
                                    </Link>
                                    {order.status === 1 || order.status === 5 ? null : (
                                        <>
                                            <button className="btn btn-danger btn-block" onClick={handleClickOpen}>
                                                Huỷ đơn
                                            </button>
                                            <button type="button" className="btn btn-primary btn-block ">
                                                Thanh toán
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default OrderDetail;
