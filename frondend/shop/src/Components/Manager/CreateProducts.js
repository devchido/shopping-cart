import React from "react";
import { Link, useNavigate } from "react-router-dom";
//

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Container, CssBaseline, Snackbar, TextField, ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme();
function CreateProduct() {
    const [category, setCategory] = React.useState([]);

    const [newImage, setNewImage] = React.useState(
        "https://nghikhangmy.vn/wp-content/themes/webchuan-ecom1/images/default-image.jpg"
    );
    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");
    const navigation = useNavigate();

    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
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
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            title: data.get("title"),
            slug: data.get("slug"),
            summary: data.get("summary"),
            price: data.get("price"),
            discount: data.get("discount"),
            quantity: data.get("quantity"),
            photos: data.get("photos"),
            content: data.get("content"),
            category: data.get("category"),
        });
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            title: data.get("title"),
            slug: data.get("slug"),
            summary: data.get("summary"),
            price: data.get("price"),
            discount: data.get("discount"),
            quantity: data.get("quantity"),
            photos: data.get("photos"),
            content: data.get("content"),
            category: data.get("category"),
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        if (
            data.get("category") === "" ||
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
            fetch("/product/auth/create", requestOptions)
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
                    navigation("/carts");
                })
                .catch((error) => {
                    console.log("error", error);
                    setSnackbarOpen(true);
                    setSnackbarSeverity("error");
                    setSnackbarMsg("False");
                });
        }
    };

    const ShowDataCart = () => {
        return (
            <div>
                <p className="mb-3 lead text-capitalize">Thông tin Sản phẩm</p>

                <div className="form-outline mb-3">
                    <input
                        type="text"
                        id="line1"
                        name="line1"
                        className="form-control form-control-lg h-100"
                        defaultValue=""
                        autoFocus
                    />
                    <label className="form-label">Line</label>
                </div>

                <div className="form-outline mb-3">
                    <input
                        type="text"
                        id="line1"
                        name="line1"
                        className="form-control form-control-lg"
                        defaultValue=""
                        autoFocus
                    />
                    <label className="form-label">Line</label>
                </div>
                <div className="form-outline mb-3">
                    <input type="text" id="city" name="city" className="form-control form-control-lg" defaultValue="" />
                    <label className="form-label">City</label>
                </div>
                <div className="form-outline mb-3">
                    <input
                        type="text"
                        id="country"
                        name="country"
                        className="form-control form-control-lg"
                        defaultValue="Việt Nam"
                        readOnly
                    />
                    <label className="form-label">Country</label>
                </div>

                <div className="form-outline mb-3">
                    <input type="text" id="content" name="content" className="form-control form-control-lg" defaultValue="" />
                    <label className="form-label">Content</label>
                </div>
                <img
                    src={newImage}
                    alt="Images"
                    class="img-thumbnail form-control form-control-lg col-md-2"
                    style={{ width: "auto", maxHeight: "250px", maxWidth: "250px" }}
                ></img>
            </div>
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
            <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                            <p className="lead" style={{fontWeight: "500"}}>Tạo sản phẩm mới</p>
                    <form onSubmit={handleSubmit}>
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
                                                
                                            />
                                        </div>
                                        <div className="form-outline d-flex justify-content-between mt-4">
                                            <label className="form-label">Slug</label>
                                            <input id="form1" name="slug" type="text" className="form-control w-75" />
                                        </div>
                                        <div className="form-outline d-flex justify-content-between mt-4">
                                            <label className="form-label">Summary</label>
                                            <input id="form1" name="summary" type="text" className="form-control w-75" />
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
                                                // defaultValue={newImage}
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
                                        <button type="reset" className="btn btn-dark btn-block ">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-dark btn-block ">
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
