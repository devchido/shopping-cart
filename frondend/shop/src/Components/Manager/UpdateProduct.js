import React from "react";
import { Link, useParams } from "react-router-dom";
//

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Skeleton,
    Snackbar,
    Stack,
    createTheme,
} from "@mui/material";
import { format } from "date-fns";
import convertToUrl from "../Unity/CovertToUrl";
import API from "../Api/Api";
function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = React.useState({
        createdAt: new Date(),
        updatedAt: new Date(),
        endsAt: new Date(),
        users: [],
    });
    const [title, setTitle] = React.useState("");
    const [slug, setSlug] = React.useState("");
    const [status, setStatus] = React.useState({});

    const [productCategory, setProductCategory] = React.useState({});
    const [category, setCategory] = React.useState([]);

    const [newImage, setNewImage] = React.useState({});
    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");
    const [isLoading, setIsLoading] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        // console.log(item);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleChangeSlug = (event) => {
        const text = event.target.value;
        const url = convertToUrl(text);
        setTitle(text);
        setSlug(url);
    };
    const loadDataProduct = () => {
        setIsLoading(true);
        fetch(`${API}/product/auth/${id}`, {
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
                setIsLoading(false);
                setTitle(result.title);
                setSlug(result.slug);
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("Load product error!");
            });
        // product category
        fetch(`${API}/product-category/api/${id}`)
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
        fetch(API+"/category/api/filter?title= ")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                setCategory(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    // Đăng bán sản phẩm
    const handleChangeStatus = () => {
        var url = API+"/product/auth/change-status?";
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
                setSnackbarMsg("Success!");
                loadDataProduct();
                handleCloseDialog();
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var formdata = new FormData();
        // console.log(data.get("photos"));
        // console.log(event.target[0].value);
        if (data.get("photos").name === "" || data.get("photos").name === null) {
        } else {
            formdata.append("image", data.get("photos"), "/" + event.target[0].value);
            formdata.append("slug", product.slug);
            fetch(API+"/product/auth/image", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: formdata,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.status;
                    }
                    throw Error(response.status);
                })
                .then((result) => {
                    setSnackbarOpen(true);
                    setSnackbarSeverity("success");
                    setSnackbarMsg("Cập nhật ảnh thành công.");
                })
                .catch((error) => {
                    console.log("error", error);
                    // setSnackbarOpen(true);
                    // setSnackbarSeverity("error");
                    // setSnackbarMsg("False");
                });
        }
        if (
            data.get("title") === "" ||
            data.get("slug") === "" ||
            data.get("summary") === "" ||
            data.get("price") === "" ||
            data.get("discount") === "" ||
            data.get("quantity") === "" 
        ) {
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMsg("Thông tin chưa đầy đủ!");
        } else {
            fetch(`${API}/product/auth/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    title: data.get("title"),
                    slug: data.get("slug"),
                    summary: data.get("summary"),
                    price: data.get("price"),
                    discount: data.get("discount"),
                    quantity: data.get("quantity"),
                    content: data.get("content"),
                    category: data.get("category"),
                }),
            })
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
                    setSnackbarMsg("Cập nhật Thành công.");
                    loadDataProduct();
                })
                .catch((error) => {
                    console.log("error", error);
                    setSnackbarOpen(true);
                    setSnackbarSeverity("error");
                    setSnackbarMsg("Cập nhật False");
                });
        }
    };
    // Chuyển sản phẩm vào mục kiểm duyệt
    const handleCensorship = () => {
        var url = API+"/product/auth/admin/setStatus?";
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
    const Loading = () => {
        return (
            <Stack direction="row" spacing={2} sx={{ m: 1, justifyContent: "center" }}>
                <Skeleton variant="rectangular" width={800} height={300} />
                <Skeleton variant="rectangular" width={400} height={300} />
            </Stack>
        );
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
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {status === 0 ? (
                    <>
                        <DialogTitle id="alert-dialog-title">Công bố sản phẩm</DialogTitle>

                        <DialogContent className="d-flex justify-content-center">
                            <DialogContentText>Bạn có chắc muốn công bố sản phẩm này không?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Không</Button>
                            <Button onClick={handleChangeStatus}>Có</Button>
                        </DialogActions>
                    </>
                ) : null}
                {status === 2 ? (
                    <>
                        <DialogTitle id="alert-dialog-title">Huỷ bán sản phẩm</DialogTitle>

                        <DialogContent className="d-flex justify-content-center">
                            <DialogContentText>Bạn có chắc muốn huỷ bán này không?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Không</Button>
                            <Button onClick={handleChangeStatus}>Có</Button>
                        </DialogActions>
                    </>
                ) : null}
            </Dialog>
            <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <p className="lead" style={{ fontWeight: "500" }}>
                        Cập nhật sản phẩm
                    </p>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <form onSubmit={handleSubmit} noValidate="novalidate" encType="multipart/form-data">
                            <div className="row d-flex justify-content-center my-4">
                                <div className="col-lg-7 ">
                                    <div className="card mb-4">
                                        <div className="card-header d-flex justify-content-between py-3">
                                            <h5 className="mb-0 text-capitalize">Thông tin sản phẩm</h5>
                                            {product.status === 0 ? (
                                                <span className="badge bg-warning text-capitalize ms-2">Chờ xét duyệt</span>
                                            ) : null}
                                            {product.status === 1 ? (
                                                <span className="badge bg-info text-capitalize ms-2">Được đăng bán</span>
                                            ) : null}
                                            {product.status === 2 ? (
                                                <span className="badge bg-secondary text-capitalize ms-2">Chưa đăng bán</span>
                                            ) : null}
                                            {product.status === 3 ? (
                                                <span className="badge bg-danger text-capitalize ms-2">Ngưng bán</span>
                                            ) : null}
                                        </div>
                                        <div className="card-body">
                                            <div className="form-outline d-flex justify-content-between mt-4">
                                                <label className="form-label">Tên sản phẩm</label>
                                                <input
                                                    id="form1"
                                                    name="title"
                                                    type="text"
                                                    className="form-control text-right w-75  word-wrap"
                                                    value={title}
                                                    onChange={handleChangeSlug}
                                                />
                                            </div>
                                            <div className="form-outline d-flex justify-content-between mt-4">
                                                <label className="form-label">Slug</label>
                                                <input
                                                    id="form1"
                                                    name="slug"
                                                    type="text"
                                                    className="form-control w-75"
                                                    value={slug}
                                                    onChange={(e) => setSlug(convertToUrl(e.target.value))}
                                                />
                                            </div>
                                            <div className="form-outline d-flex justify-content-between mt-4">
                                                <label className="form-label">Summary</label>
                                                <input
                                                    id="form1"
                                                    name="summary"
                                                    type="text"
                                                    defaultValue={product.summary}
                                                    maxLength={100}
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
                                                <input
                                                    type="datetime-local"
                                                    defaultValue={format(new Date(product.createdAt), "yyyy-MM-dd'T'hh:mm")}
                                                    readOnly
                                                    className="form-control w-auto"
                                                />
                                            </div>
                                            <div className="form-outline d-flex justify-content-between mt-4">
                                                <label className="form-label">Updated At</label>
                                                <input
                                                    type="datetime-local"
                                                    defaultValue={format(new Date(product.updatedAt), "yyyy-MM-dd'T'hh:mm")}
                                                    readOnly
                                                    className="form-control w-auto"
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
                                </div>
                                <div className="col-lg-4">
                                    <div className="card mb-4">
                                        <div className="card-header py-3">
                                            <h5 className="mb-0 text-capitalize">Ảnh sản phẩm</h5>
                                        </div>
                                        <div className="card-body ">
                                            <img
                                                src={API+product.photos}
                                                alt="Images"
                                                className="img-thumbnail form-control  m-auto"
                                                style={{ height: "300px", width: "300px" }}
                                            ></img>
                                            <input
                                                id="form1"
                                                name="photos"
                                                type="file"
                                                className="form-control mt-2 mx-auto"
                                                style={{ width: "300px" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="card mb-4 card-body ">
                                        <div className="d-flex form-group justify-content-between">
                                            <Link to={"/management/list-products"}>
                                                <button type="button" className="btn btn-dark btn-block ">
                                                    Cancel
                                                </button>
                                            </Link>
                                            {product.status === 1 ? (
                                                <Link to={`/product/${product.slug}`}>
                                                    <button type="button" className="btn btn-dark btn-block ">
                                                        View
                                                    </button>
                                                </Link>
                                            ) : null}

                                            {product.status === 0 ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-block"
                                                    onClick={() => {
                                                        setStatus(2);
                                                        handleClickOpenDialog();
                                                    }}
                                                >
                                                    Huỷ đăng bán
                                                </button>
                                            ) : null}
                                            {product.status === 1 ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-warning btn-block"
                                                    onClick={() => {
                                                        setStatus(2);
                                                        handleClickOpenDialog();
                                                    }}
                                                >
                                                    Huỷ đăng bán
                                                </button>
                                            ) : null}
                                            {product.status === 2 ? (
                                                <>
                                                    <button type="submit" className="btn btn-primary btn-block">
                                                        Update
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-info btn-block"
                                                        onClick={() => {
                                                            setStatus(0);
                                                            handleClickOpenDialog();
                                                        }}
                                                    >
                                                        Posting
                                                    </button>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}

export default UpdateProduct;
