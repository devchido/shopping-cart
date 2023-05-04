import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
    Autocomplete,
    Avatar,
    Button,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TableFooter,
    TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//Icon
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import BorderColorIcon from "@mui/icons-material/BorderColor";
//item menu
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//Paginavtion
import TablePagination from "@mui/material/TablePagination";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import vi from "date-fns/locale/vi";
import { VND } from "../../Unity/VND";
import moment from "moment";

function CategoryManagement() {
    // data product-category
    const [data, setData] = React.useState([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");
    const [category, setCategory] = React.useState("");

    // Trang hiện tại của page
    const [page, setPage] = React.useState(0);

    // Số sản phẩm được hiển thị
    const [pageSize, setPageSize] = React.useState(5);
    const [field, setField] = React.useState("id");
    const [sort, setSort] = React.useState("ASC");
    const [title, setTitle] = React.useState("");
    const [totalElements, setTotalElements] = React.useState("");
    // dialog delete
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogItem, setDialogItem] = React.useState();

    const handleClickOpenDialog = (item) => {
        // console.log(item);
        setOpenDialog(true);
        setDialogItem(item);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDialogItem();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        loadDataCategory();
    };

    const handleChangePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
        loadDataCategory();
    };
    const navigation = useNavigate();
    const handleChange = (event) => {
        // setRole(event.target.value);
        loadDataCategory();
    };
    //
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // Đóng menu
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Đóng snackbar
    const snackbarClose = () => {
        setSnackbarOpen(false);
    };

    const loadDataCategory = () => {
        fetch(`/category/auth/admin/${page}/${pageSize}?field=${field}&sort=${sort}&title=${title}`, {
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
                console.log("category", result);
                setData(result.response.content);
                setTotalElements(result.response.totalElements);
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error! không load được dữ liệu user");
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPage(0);
        loadDataCategory();
    };
    const handleDelete = () => {
        fetch(
            `/category/auth/admin?` +
                new URLSearchParams({
                    id: dialogItem.id,
                }),
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.status;
                }
                throw Error(response.status);
            })
            .then((result) => {
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Đã xoá category với id: "+ dialogItem.id);
                handleCloseDialog();
                loadDataCategory();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error! Xoá không thành công");
                handleCloseDialog();
            });
    };
    React.useEffect(() => {
        loadDataCategory();
    }, [page, pageSize]);
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
                {dialogItem ? (
                    <>
                        <DialogTitle id="alert-dialog-title">Xoá category</DialogTitle>

                        <DialogContent className="d-flex justify-content-center">
                            <DialogContentText>Thực hiện xoá category có id: {dialogItem.id}?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Không</Button>
                            <Button onClick={handleDelete}>
                                Xoá
                            </Button>
                        </DialogActions>
                    </>
                ) : null}
            </Dialog>
            <section className="h-100 gradient-custom col-lg-12">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div>
                            <div className="card mb-4">
                                <div className="card-header d-flex py-3 justify-content-between ">
                                    <h5 className="mt-1">Quản lý Category</h5>
                                    <NavLink to={"/admin/category/create"}>
                                        <button className="btn btn-outline-dark">Tạo mới</button>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="card mb-4">
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    className="card-body row d-flex justify-content-between"
                                >
                                    <FormControl className="col-lg-3 col-auto px-2 my-1">
                                        <TextField
                                            id="outlined-basic"
                                            label="Search category"
                                            variant="outlined"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl className="col-auto px-2 my-1">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-dark text-nowrap"
                                            style={{ height: "61.6px" }}
                                        >
                                            Search
                                        </button>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="card mb-4">
                                <Box sx={{ width: "100%" }}>
                                    <Paper sx={{ width: "100%", mb: 2 }}>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className="text-nowrap">Id</TableCell>
                                                        <TableCell className="text-nowrap">Category</TableCell>
                                                        <TableCell className="text-nowrap">Sulg</TableCell>
                                                        <TableCell className="text-nowrap">Content</TableCell>
                                                        <TableCell className="text-nowrap" align="center">
                                                            Action
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.length > 0 ? (
                                                        data.map((item, i) => (
                                                            <TableRow
                                                                key={item.id}
                                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {item.id}
                                                                </TableCell>

                                                                <TableCell className="text-nowrap">{item.title}</TableCell>

                                                                <TableCell className="text-nowrap">{item.slug}</TableCell>
                                                                <TableCell className="text-nowrap">{item.content}</TableCell>

                                                                <TableCell align="center" className="row ">
                                                                    <div className="d-flex justify-content-center">
                                                                        {/* <IconButton color="primary">
                                                                            <CalendarViewMonthIcon />
                                                                        </IconButton> */}
                                                                        <Link to={`/admin/category/${item.id}`}>
                                                                            <IconButton color="success" title="Edit">
                                                                                <BorderColorIcon />
                                                                            </IconButton>
                                                                        </Link>

                                                                        <IconButton color="error" title="Delete">
                                                                            <DeleteIcon
                                                                                onClick={() => handleClickOpenDialog(item)}
                                                                            />
                                                                        </IconButton>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={"100%"}>
                                                                <Stack sx={{ width: "100%" }} spacing={2}>
                                                                    <Alert severity="info">No Data !</Alert>
                                                                </Stack>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Box>
                                <div className="mt-2 d-flex justify-content-end">
                                    <TablePagination
                                        count={Number(totalElements)}
                                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: Number(totalElements) }]}
                                        page={page}
                                        component="div"
                                        onPageChange={handleChangePage}
                                        rowsPerPage={pageSize}
                                        onRowsPerPageChange={handleChangePageSize}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CategoryManagement;
