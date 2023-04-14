import React from "react";
import { Link, useParams } from "react-router-dom";
//

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    ThemeProvider,
} from "@mui/material";
import { format } from "date-fns";

export default function UserDetailManagement() {
    const { id } = useParams();
    const [user, setUser] = React.useState({
        createAt: new Date(),
    });
    const [role, setRole] = React.useState({});
    // chuyển đổi trạng thái của sản phẩm
    const [status, setStatus] = React.useState(0);
    const [category, setCategory] = React.useState([]);

    const [newImage, setNewImage] = React.useState({});
    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        // console.log(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleChange = (event) => {
        setRole(event.target.value);
      };
    const loadDataUser = () => {
        fetch(`/user/auth/admin/u/${id}`, {
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
                console.log("user", result);
                setUser(result);
                setRole(result.role);
                handleClose();
            })
            .catch((error) => {
                console.log("error", error);
                handleClose();
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("Load product error!");
            });
    };
    // Đổi quyền truy cập cho user
    const handleSetRole =()=>{
        fetch(
            "/user/auth/admin/role?" +
                new URLSearchParams({
                    userId: user.id,
                    role: role,
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
                setSnackbarMsg("Đã chuyển chức năng: "+role);
                loadDataUser();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error! Chuyển đổi trạng thái sản phẩm không hoạt động!");
            });
    }
    React.useEffect(() => {
        loadDataUser();
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
                <DialogTitle id="alert-dialog-title" style={{width: "20rem"}}>Phân Quyền User: {user.id}</DialogTitle>

                <DialogContent >
                    <DialogContentText className="mb-3">Chọn chức năng của user: </DialogContentText>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value={"USER"}>USER</MenuItem>
                            <MenuItem value={"USER_SHOP"}>USER_SHOP</MenuItem>
                            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ</Button>
                    <Button onClick={handleSetRole}>Thay đổi</Button>
                </DialogActions>
            </Dialog>
            <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-lg-7 ">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between py-3">
                                    <h5 className="mb-0 text-capitalize">Thông tin User</h5>
                                </div>
                                <div className="card-body px-5">
                                    <div className="form-outline mt-4">
                                        <img
                                            src={user.photos}
                                            alt="Images"
                                            className="img-thumbnail form-control form-control-lg col-md-2 m-auto"
                                            style={{ width: "auto", maxHeight: "250px", maxWidth: "250px" }}
                                        ></img>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="form-outline  mt-4 col-lg-5 ">
                                            <label className="form-label">Họ</label>
                                            <input type="text" defaultValue={user.firstName} className="form-control" readOnly />
                                        </div>
                                        <div className="form-outline  mt-4 col-lg-5 ">
                                            <label className="form-label">Tên</label>
                                            <input type="text" defaultValue={user.lastName} className="form-control" readOnly />
                                        </div>
                                    </div>
                                    <div className="form-outline mt-4  ">
                                        <label className="form-label">Mobile</label>
                                        <input type="text" defaultValue={user.mobile} className="form-control" readOnly />
                                    </div>
                                    <div className="form-outline mt-4  ">
                                        <label className="form-label">Email</label>
                                        <input type="text" defaultValue={user.email} className="form-control" readOnly />
                                    </div>
                                    <div className="form-outline mt-4  ">
                                        <label className="form-label">Intro</label>
                                        <textarea type="text" defaultValue={user.intro} className="form-control" readOnly />
                                    </div>
                                    <div className="form-outline mt-4  ">
                                        <label className="form-label">Profile</label>
                                        <textarea type="text" defaultValue={user.profile} className="form-control" readOnly />
                                    </div>

                                    <div className="form-outline d-flex justify-content-between mt-4">
                                        <label className="form-label">Created At</label>
                                        <input
                                            type="datetime-local"
                                            defaultValue={format(new Date(user.createAt), "yyyy-MM-dd'T'hh:mm:ss")}
                                            className="form-control w-auto"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card mb-4 ">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Chức năng/Quyền</h5>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <input className="form-control" name="category" defaultValue={user.role} readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-4 card-body ">
                                <div className=" row form-group ">
                                    <Link to={"/admin/user"} className="col-auto m-auto">
                                        <button type="button" className="btn btn-dark  ">
                                            Cancel
                                        </button>
                                    </Link>
                                    <button type="button" className="btn btn-success col-auto m-auto" onClick={handleClickOpen}>
                                        Phân quyền
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
