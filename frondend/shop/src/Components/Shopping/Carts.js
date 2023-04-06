import React from "react";
//
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
//
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import vi from "date-fns/locale/vi";

function Carts() {
    const [loading, setLoading] = React.useState(false);
    const [cart, setCart] = React.useState([]);
    const [status, setStatus] = React.useState("1");
    // const navigation = useNavigate();
    const loadDataCart = () => {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart/auth/my-cart?status=" + status, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                // Set trạng thái loading
                setLoading(false);
                // Set data vào cart
                setCart(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    };
    const Loading = () => {
        return (
            <Stack>
                <Skeleton variant="rounded" sx={{ marginBlock: 1 }} height={120} />
                <Skeleton variant="rounded" sx={{ marginBlock: 1 }} height={120} />
                <Skeleton variant="rounded" sx={{ marginBlock: 1 }} height={120} />
            </Stack>
        );
    };
    React.useEffect(() => {
        loadDataCart();
    }, []);
    // const handleView = (item) => {
    //     navigation("/carts/" + item.id);
    // };
    const ShowCarts = () => {
        return (
            <>
                {/* Thông tin cart */}
                {cart.length > 0 ? (
                    <>
                        {cart.map((item, i) => {
                            return (
                                <div className="card rounded-3 mb-4" key={i}>
                                    <div className="card-body p-4">
                                        <div className="row d-flex justify-content-between align-items-center">
                                            {/* 1 */}
                                            <div className="col-md-5 col-lg-5 col-xl-5">
                                                <p className="lead fw-normal mb-2 ">
                                                    <span className="text-muted">Cart :</span> {item.id}
                                                </p>
                                                <p>
                                                    <span className="text-muted">Line: </span>
                                                    {item.line1}
                                                </p>
                                                <p>
                                                    <span className="text-muted">City: </span>
                                                    {item.city} &nbsp;
                                                    <span className="text-muted">Country: </span>
                                                    {item.country}
                                                </p>
                                                <p>
                                                    <span className="text-muted">Content: </span>
                                                    {item.content}
                                                </p>
                                            </div>

                                            {/* 3 */}
                                            <div className="col-md-5 col-lg-4 col-xl-4 offset-lg-1">
                                                <h5 className="mb-0 text-nowrap">
                                                    Status:{" "}
                                                    {item.status === 0
                                                        ? "New"
                                                        : null || item.status === 1
                                                        ? "Cart"
                                                        : null || item.status === 2
                                                        ? "Order"
                                                        : null || item.status === 3
                                                        ? "Đã thanh toán"
                                                        : null}
                                                </h5>
                                                <span>
                                                    <span className="text-muted">Created At: </span>
                                                    {format(parseISO(item.createdAt), "dd-MM-yyyy")}
                                                </span>
                                                <br />
                                                {item.updatedAt ? (
                                                    <span>
                                                        <span className="text-muted">Updated At: </span>
                                                        {formatDistanceToNow(new Date(item.updatedAt), {
                                                            locale: vi,
                                                            addSuffix: true,
                                                        })}
                                                    </span>
                                                ) : null}
                                            </div>
                                            {/* 4 */}
                                            <div className="col-md-2 col-lg-2 col-xl-2 text-end justify-content-end d-flex">
                                                <Link to={`/carts/${item.id}`}>
                                                    <IconButton sx={{ m: 1 }} className="text-primary" title="View">
                                                        {/* <DeleteIcon /> */}
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton sx={{ m: 1 }} className="text-danger" title="Remove">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <div className="card rounded-3 mb-4">Not found</div>
                )}
            </>
        );
    };
    // Chưa cần đến search
    // const ShowSearch = () => {
    //     return (
    //         <div className="card mb-4">
    //             <div className="card-body p-4 d-flex flex-row">
    //                 <div className="form-outline flex-fill">
    //                     <input type="text" id="form1" className="form-control form-control-lg" />
    //                     <label className="form-label" htmlFor="form1">
    //                         Discound code
    //                     </label>
    //                 </div>
    //                 <button type="button" className="btn btn-outline-warning btn-lg ms-3">
    //                     Apply
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <div>
            <section className="h-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                <div>
                                    <p className="mb-0">
                                        <Link to={"/carts/add-cart"}>
                                            <button type="button" className="btn btn-outline-primary btn-block ">
                                                Add Cart
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            {loading ? <Loading /> : <ShowCarts />}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Carts;
