import React from "react";
import { Link, useParams } from "react-router-dom";
//

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar, createTheme } from "@mui/material";
import { format } from "date-fns";
function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = React.useState({
        id: "",
        title: "",
        slug: "",
        summary: "",
        price: "",
        discount: "",
        quantity: "",
        content: "",
        photos: "",
        createdAt: new  Date(),
        updatedAt: new  Date(),
        endsAt: new  Date(),
        status: "",
        users: [],
    });
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
                setProduct({
                    id: result.id,
                    title: result.title,
                    slug: result.slug,
                    summary: result.summary,
                    price: result.price,
                    discount: result.discount,
                    quantity: result.quantity,
                    content: result.content,
                    photos: result.photos,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    endsAt: result.endsAt,
                    status: result.status,
                    users: [result.users],
                });
                setNewImage(result.photos);
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
                setCategory(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    React.useEffect(() => {
        loadDataProduct();
        loadDataCategory();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (
            // data.get("category") === "" ||
            data.get("title") === "" ||
            data.get("slug") === "" ||
            data.get("summary") === "" ||
            data.get("price") === "" ||
            data.get("discount") === "" ||
            data.get("quantity") === "" ||
            data.get("photos") === "" ||
            data.get("content") === ""
        ) {
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMsg("Thông tin chưa đầy đủ!");
        } else {
            setSnackbarOpen(true);
            setSnackbarSeverity("success");
            setSnackbarMsg("Thông tin đầy đủ!");
            fetch(`/product/auth/${id}`, {
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
                    photos: data.get("photos"),
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
                })
                .catch((error) => {
                    console.log("error", error);
                    setSnackbarOpen(true);
                    setSnackbarSeverity("error");
                    setSnackbarMsg("Cập nhật False");
                });
        }
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
            <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <p className="lead" style={{ fontWeight: "500" }}>
                        Cập nhật sản phẩm
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-lg-7 ">
                                <div className="card mb-4">
                                    <div className="card-header d-flex justify-content-between py-3">
                                        <h5 className="mb-0 text-capitalize">Thông tin sản phẩm</h5>

                                        {product.status === 0 ? (
                                            <span className="badge bg-warning text-capitalize ms-2">Chờ xét duyệt</span>
                                        ) : (
                                            <span className="badge bg-primary text-capitalize ms-2">Đã xét duyệt</span>
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
                                            <input
                                                type="datetime-local"
                                                defaultValue={format(new Date(product.createdAt), "yyyy-MM-dd'T'hh:mm:ss")}
                                                readOnly
                                                className="form-control w-auto"
                                            />
                                        </div>
                                        <div className="form-outline d-flex justify-content-between mt-4">
                                            <label className="form-label">Updated At</label>
                                            <input
                                                type="datetime-local"
                                                defaultValue={format(new Date(product.updatedAt), "yyyy-MM-dd'T'hh:mm:ss")}
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

                                        <button type="reset" className="btn btn-dark btn-block ">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-dark btn-block ">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default UpdateProduct;
