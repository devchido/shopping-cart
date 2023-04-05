import React from "react";
//
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
//
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
function Carts() {
    const [loading, setLoading] = React.useState(true);

    const Loading = () => {
        return (
            <Stack>
                <Skeleton variant="rounded" sx={{ marginBlock: 1 }} height={120} />
                <Skeleton variant="rounded" sx={{ marginBlock: 1 }} height={120} />
                <Skeleton variant="rounded" sx={{ marginBlock: 1 }} height={120} />
            </Stack>
        );
    };
    const ShowCarts = () => {
        return (
            <>
                <div className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                            {/* 1 */}
                            <div className="col-md-4 col-lg-4 col-xl-4">
                                <p className="lead fw-normal mb-2 ">
                                    <span className="text-muted">Cart code:</span> 1
                                </p>
                                <p>
                                    <span className="text-muted">Size: </span>M <span className="text-muted">Color: </span>Grey
                                </p>
                            </div>

                            {/* 3 */}
                            <div className="col-md-4 col-lg-4 col-xl-4 offset-lg-1">
                                <h5 className="mb-0">$499.00</h5>
                            </div>
                            {/* 4 */}
                            <div className="col-md-2 col-lg-2 col-xl-2 text-end justify-content-end d-flex">
                                <Link to={`/carts/${1}`}>
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
                {/*  */}
                <div className="card mb-4">
                    <div className="card-body p-4 d-flex flex-row">
                        <div className="form-outline flex-fill">
                            <input type="text" id="form1" className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="form1">
                                Discound code
                            </label>
                        </div>
                        <button type="button" className="btn btn-outline-warning btn-lg ms-3">
                            Apply
                        </button>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <button type="button" className="btn btn-warning btn-block btn-lg">
                            Proceed to Pay
                        </button>
                    </div>
                </div>
            </>
        );
    };
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
                                        <span className="text-muted">Sort by:</span>{" "}
                                        <a href="#!" className="text-body">
                                            price <i className="fas fa-angle-down mt-1" />
                                        </a>
                                    </p>
                                </div>
                            </div>
                            {loading ? <ShowCarts /> : <Loading />}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Carts;
