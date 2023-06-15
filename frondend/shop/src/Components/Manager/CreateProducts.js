import React from "react";
import { Link, useNavigate } from "react-router-dom";

//

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Container, CssBaseline, Snackbar, TextField, ThemeProvider, createTheme } from "@mui/material";
import convertToUrl from "../Unity/CovertToUrl";

const theme = createTheme();
function CreateProduct() {
    const [category, setCategory] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState();
    const [preview, setPreview] = React.useState();

    //
    const [title, setTitle] = React.useState("");
    const [slug, setSlug] = React.useState("");
    //
    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");
    const navigation = useNavigate();

    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleChangeSlug = (event) => {
        const text = event.target.value;
        const url = convertToUrl(text);
        setTitle(text);
        setSlug(url);
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
                console.log(result);
                setCategory(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    React.useEffect(() => {
        loadDataCategory();
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);
    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var formdata = new FormData();
        formdata.append("image", data.get("photos"), "/" + event.target[0].value);
        formdata.append("slug", data.get("slug"));
        if (
            data.get("category") === "" ||
            data.get("title") === "" ||
            data.get("slug") === "" ||
            data.get("summary") === "" ||
            data.get("price") === "" ||
            data.get("discount") === "" ||
            data.get("quantity") === "" ||
            data.get("photos").name === "" ||
            data.get("photos").name === null
        ) {
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMsg("Thông tin chưa đầy đủ!");
        } else {
            // save thông tin product
            fetch("/product/auth", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
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
                    setSnackbarOpen(true);
                    setSnackbarSeverity("success");
                    setSnackbarMsg("tạo thông tin sản phẩm Thành công.");

                    fetch("/product/auth/image", {
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
                            setSnackbarMsg("Tạo ảnh thành công.");
                            fetch("/product/api/findProductBySlug/" + data.get("slug")).then((resp) => {
                                resp.json().then((result) => {
                                    // console.log(result);
                                    navigation(`/management/update-product/${result.id}`);
                                });
                            });
                        })
                        .catch((error) => {
                            console.log("error", error);
                            setSnackbarOpen(true);
                            setSnackbarSeverity("error");
                            setSnackbarMsg("False tạo ảnh");
                        });
                })
                .catch((error) => {
                    console.log("error", error);
                    setSnackbarOpen(true);
                    setSnackbarSeverity("error");
                    setSnackbarMsg("Không thành công");
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
                        Tạo sản phẩm mới
                    </p>
                    <form onSubmit={handleSubmit} noValidate="novalidate" encType="multipart/form-data">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-lg-7 ">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0 text-capitalize">Thông tin sản phẩm</h5>
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
                                                className="form-control w-75"
                                                maxLength={100}
                                            />
                                        </div>
                                        <div className="form-outline d-flex justify-content-between mt-4">
                                            <label className="form-label">Giá</label>
                                            <input
                                                id="form1"
                                                name="price"
                                                type="number"
                                                min={0}
                                                defaultValue={0}
                                                className="form-control w-50"
                                            />
                                        </div>
                                        <div className="form-outline d-flex justify-content-between mt-4">
                                            <label className="form-label">Giảm giá</label>
                                            <input
                                                id="form1"
                                                name="discount"
                                                type="number"
                                                min={0}
                                                defaultValue={0}
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
                                                defaultValue={0}
                                                className="form-control w-50"
                                            />
                                        </div>
                                        <div className="form-outline d-flex justify-content-between mt-4">
                                            <label className="form-label">Content</label>
                                            <textarea
                                                id="form1"
                                                name="content"
                                                type="text"
                                                defaultValue={""}
                                                rows={3}
                                                className="form-control w-75"
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
                                                <option value={""}>Chọn thể loại</option>
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
                                        {selectedFile && (
                                            <img
                                                src={preview}
                                                alt="Images"
                                                className="img-thumbnail form-control  m-auto"
                                                style={{ height: "300px", width: "300px" }}
                                            ></img>
                                        )}
                                        <input
                                            id="form1"
                                            name="photos"
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            className="form-control mt-2 mx-auto"
                                            style={{ width: "300px" }}
                                            onChange={onSelectFile}
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
                                        <button type="submit" className="btn btn-primary btn-block ">
                                            Create
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

export default CreateProduct;
