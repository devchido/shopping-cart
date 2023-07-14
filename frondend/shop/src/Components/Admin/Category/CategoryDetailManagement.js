import React from "react";
import { Link, useParams } from "react-router-dom";
//
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, Snackbar } from "@mui/material";
import convertToUrl from "../../Unity/CovertToUrl";
import API from "../../Api/Api";

export default function CategoryDetailManagement() {
    const { id } = useParams();
    const [title, setTitle] = React.useState("");
    const [slug, setSlug] = React.useState("");
    const [content, setContent] = React.useState("");
    const [category, setCategory] = React.useState({});

    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");

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
        fetch(`${API}/category/api/${id}`, {
            method: "GET",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("category ", result);
                setTitle(result.title);
                setSlug(result.slug);
                setContent(result.content);
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("Load product error!");
            });
    };
    // Đổi data
    const handleEditCategory = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (
            title === "" ||
            slug === "" 
        ) {
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setSnackbarMsg("Thông tin chưa hợp lệ!");
        } else {
            fetch(`${API}/category/auth/admin/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.get("title"),
                    slug: data.get("slug"),
                    content: data.get("content"),
                }),
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
                    setSnackbarMsg("Set data true");
                    loadDataCategory();
                })
                .catch((error) => {
                    console.log("error", error);
                    setSnackbarOpen(true);
                    setSnackbarSeverity("error");
                    setSnackbarMsg("Load product error!");
                });
        }
    };
    React.useEffect(() => {
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
                    <Box component="form" onSubmit={handleEditCategory} className="row d-flex justify-content-center my-4">
                        <div className="col-lg-7 ">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between py-3">
                                    <h5 className="mb-0 text-capitalize">Thông tin Category</h5>
                                </div>

                                <div className="card-body px-5">
                                    <div className="form-outline mt-4  ">
                                        <label className="form-label">Id</label>
                                        <input
                                            type="text"
                                            defaultValue={id}
                                            className="form-control"
                                            id="id"
                                            name="id"
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-outline mt-4  ">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={title}
                                            name="title"
                                            onChange={handleChangeSlug}
                                        />
                                    </div>
                                    <div className="form-outline mt-4  ">
                                        <label className="form-label">Slug</label>
                                        <input
                                            type="text"
                                            value={slug}
                                            className="form-control"
                                            id="slug"
                                            name="slug"
                                            onChange={(e) => setSlug(convertToUrl(e.target.value))}
                                        />
                                    </div>

                                    <div className="form-outline mt-4  ">
                                        <label className="form-label">Content</label>
                                        <textarea
                                            type="text"
                                           value={content}
                                            className="form-control"
                                            id="content"
                                            name="content"
                                            onChange={(e)=> setContent(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card mb-4 ">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Action</h5>
                                </div>
                                <div className="card-body">
                                    <div className=" row form-group ">
                                        <Link to={"/admin"} className="col-auto m-auto">
                                            <button type="button" className="btn btn-dark  ">
                                                Cancel
                                            </button>
                                        </Link>
                                        {/* <button type="reset" className="btn btn-secondary col-auto m-auto">
                                            Reset
                                        </button> */}
                                        <button type="submit" className="btn btn-primary col-auto m-auto">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </section>
        </div>
    );
}
