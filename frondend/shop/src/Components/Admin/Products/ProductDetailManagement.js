import React from "react";
import { Link, useParams } from "react-router-dom";
//

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Avatar, Box, Container, CssBaseline, Input, Snackbar, TextField, ThemeProvider } from "@mui/material";
import { format } from "date-fns";

function ProductDetailManagement() {
    const { id } = useParams();
    const [product, setProduct] = React.useState({
        createdAt: new Date(),
        updatedAt: new Date(),
        endsAt: new Date(),
        users: [],
    });
    // chuyển đổi trạng thái của sản phẩm
    const [status, setStatus] = React.useState(0);
    const [productCategory, setProductCategory] = React.useState({});
    const [category, setCategory] = React.useState([]);

    const [newImage, setNewImage] = React.useState({});
    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");

    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    const loadDataProduct = () => {
        fetch(`/product/auth/${id}`, {
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
                console.log("product", result);
                setProduct(result);
                setNewImage(result.photos);
                setStatus(result.status);
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("Load product error!");
            });
        // product category
        fetch(`/product-category/api/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("product-category", result);
                setProductCategory(result.category);
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("Load product-category error!");
            });
    };
    const loadDataCategory = () => {
        fetch("/category/api/filter?title= ")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                // console.log(result);
                setCategory(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    // Set trạng thái của sản phẩm : status
    const handleSetStatus = () => {
        var url = "/product/auth/admin/setStatus?";
        console.log("status: " + status);
        fetch(
            url +
                new URLSearchParams({
                    id: product.id,
                    status: status,
                }),
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("user", result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                loadDataProduct();
                if (status === 0) {
                    setSnackbarMsg("Sản phẩm được chuyển vào mục Chờ xác nhận");
                }
                if (status === 1) {
                    setSnackbarMsg("Sản phẩm được chuyển vào mục đã duyệt");
                }
                if (status === 2) {
                    setSnackbarMsg("Sản phẩm được chuyển vào mục kiểm duyệt");
                }
                if (status === 3) {
                    setSnackbarMsg("Sản phẩm được chuyển vào mục bị ngưng bán!");
                }
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error! Chuyển đổi trạng thái sản phẩm không hoạt động!");
            });
    };
    // Chuyển sản phẩm vào mục chờ xác nhận
    const handleWait = () => {
        var url = "/product/auth/admin/setStatus?";
        fetch(
            url +
                new URLSearchParams({
                    id: product.id,
                    status: 0,
                }),
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("user", result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Sản phẩm được chuyển vào mục Chờ xác nhận");
                loadDataProduct();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error! Chuyển đổi trạng thái sản phẩm không hoạt động!");
            });
    };
    // Chuyển sản phẩm vào mục đã xác nhận
    const handleConfirm = () => {
        var url = "/product/auth/admin/setStatus?";
        fetch(
            url +
                new URLSearchParams({
                    id: product.id,
                    status: 1,
                }),
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("user", result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Sản phẩm được chuyển vào mục Đã xác nhận");
                loadDataProduct();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error! Chuyển đổi trạng thái sản phẩm không hoạt động!");
            });
    };
    // Chuyển sản phẩm vào mục kiểm duyệt
    const handleCensorship = () => {
        var url = "/product/auth/admin/setStatus?";
        fetch(
            url +
                new URLSearchParams({
                    id: product.id,
                    status: 2,
                }),
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("user", result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Sản phẩm được chuyển vào mục kiểm duyệt");
                loadDataProduct();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error! Chuyển đổi trạng thái sản phẩm không hoạt động!");
            });
    };
    // Chuyển sản phẩm vào mục ngưng bán
    const handleStop = () => {
        var url = "/product/auth/admin/setStatus?";
        fetch(
            url +
                new URLSearchParams({
                    id: product.id,
                    status: 3,
                }),
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("user", result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Sản phẩm được chuyển vào mục ngưng bán");
                loadDataProduct();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error! Chuyển đổi trạng thái sản phẩm không hoạt động!");
            });
    };

    React.useEffect(() => {
        loadDataProduct();
        loadDataCategory();
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
            <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-lg-7 ">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between py-3">
                                    <h5 className="mb-0 text-capitalize">Thông tin sản phẩm</h5>
                                    
                                    {product.status === 0 ? (
                                        <span className="badge bg-warning text-capitalize ms-2">Chờ xét duyệt</span>
                                    ) : (
                                        null
                                    )}
                                    {product.status === 1 ? (
                                        <span className="badge bg-info text-capitalize ms-2">Đã xác nhận</span>
                                    ) : (
                                        null
                                    )}
                                    {product.status === 2 ? (
                                        <span className="badge bg-success text-capitalize ms-2">Kiểm duyệt</span>
                                    ) : (
                                        null
                                    )}
                                    {product.status === 3 ? (
                                        <span className="badge bg-danger text-capitalize ms-2">Ngưng bán</span>
                                    ) : (
                                        null
                                    )}
                                </div>
                                <div className="card-body">
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Tên sản phẩm</label>
                                        <input
                                            id="form1"
                                            name="title"
                                            type="text"
                                            defaultValue={product.title}
                                            className="form-control text-right w-75  word-wrap"
                                        />
                                    </div>
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Slug</label>
                                        <input
                                            id="form1"
                                            name="slug"
                                            type="text"
                                            defaultValue={product.slug}
                                            className="form-control w-75"
                                        />
                                    </div>
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Summary</label>
                                        <input
                                            id="form1"
                                            name="summary"
                                            type="text"
                                            defaultValue={product.summary}
                                            className="form-control w-75"
                                        />
                                    </div>
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Giá (₫)</label>
                                        <input
                                            id="form1"
                                            name="price"
                                            type="number"
                                            min={0}
                                            defaultValue={product.price}
                                            className="form-control w-50"
                                        />
                                    </div>
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Giảm giá (%)</label>
                                        <input
                                            id="form1"
                                            name="discount"
                                            type="number"
                                            min={0}
                                            defaultValue={product.discount}
                                            className="form-control w-50"
                                        />
                                    </div>
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Số lượng</label>
                                        <input
                                            id="form1"
                                            name="quantity"
                                            type="number"
                                            min={0}
                                            defaultValue={product.quantity}
                                            className="form-control w-50"
                                        />
                                    </div>
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Content</label>
                                        <textarea
                                            id="form1"
                                            name="content"
                                            type="text"
                                            defaultValue={product.content}
                                            rows={3}
                                            className="form-control w-75"
                                        />
                                    </div>
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Created At</label>
                                        <Input
                                            type="datetime-local"
                                            value={format(new Date(product.createdAt), "yyyy-MM-dd'T'hh:mm:ss")}
                                        />
                                    </div>
                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Updated At</label>
                                        <Input
                                            type="datetime-local"
                                            value={format(new Date(product.updatedAt), "yyyy-MM-dd'T'hh:mm:ss")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 ">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Loại Sản Phẩm</h5>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <select className="form-control" name="category">
                                            <option value={productCategory.id ? productCategory.id : ""}>
                                                {productCategory.title ? productCategory.title : "Chọn thể loại"}
                                            </option>
                                            {category.map((item, i) => (
                                                <option value={item.slug} key={i}>
                                                    {item.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 ">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Người bán</h5>
                                </div>
                                <div className="card-body d-flex">
                                    <Avatar alt="Remy Sharp" src={product.users.photos} variant="rounded" />
                                    <p className="my-auto mx-3">
                                        <strong>{product.users.firstName + " " + product.users.lastName}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0 text-capitalize">Ảnh sản phẩm</h5>
                                </div>
                                <div className="card-body ">
                                    <img
                                        src={newImage}
                                        alt="Images"
                                        className="img-thumbnail form-control form-control-lg col-md-2 m-auto"
                                        style={{ width: "auto", maxHeight: "250px", maxWidth: "250px" }}
                                    ></img>
                                    <div className="form-group mt-5">
                                        <label>Photos link</label>

                                        <input
                                            id="form1"
                                            name="photos"
                                            defaultValue={product.photos}
                                            type="text"
                                            className="form-control w-100"
                                            onChange={(e) => setNewImage(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-4 card-body ">
                                <div className=" row form-group justify-content-between">
                                    <Link to={"/admin/product"} className="col-auto">
                                        <button type="button" className="btn btn-dark  ">
                                            Cancel
                                        </button>
                                    </Link>
                                    {product.status === 2 ? (
                                        <button type="button" className="btn btn-danger col-auto " onClick={handleStop}>
                                            Ngừng bán
                                        </button>
                                    ) : null}

                                    {product.status === 1 || product.status === 3 ? (
                                        <button type="button" className="btn btn-success col-auto" onClick={handleCensorship}>
                                            Kiểm duyệt
                                        </button>
                                    ) : null}
                                    {product.status === 0 || product.status === 2 ? (
                                        <button type="reset" className="btn btn-info col-auto " onClick={handleConfirm}>
                                            Duyệt bài
                                        </button>
                                    ) : null}
                                    {/* {product.status !== 0 ? (
                                        <button type="reset" className="btn btn-warning col-auto " onClick={handleWait}>
                                            Chờ xác nhận
                                        </button>
                                    ) : null} */}
                                    {product.status === 1 ? (
                                        <Link to={`/product/${product.slug}`} className="col-auto">
                                            <button type="button" className="btn btn-primary">
                                                View
                                            </button>
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetailManagement;