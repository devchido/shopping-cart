import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Autocomplete, Avatar, CardHeader, Stack, TableFooter, TextField } from "@mui/material";
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
import { VND } from "../Unity/VND";

function ListProducts() {
    const [status, setStatus] = React.useState("");
    const [product, setProduct] = React.useState([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");

    // Trang hiện tại của page
    const [page, setPage] = React.useState(0);

    // Số sản phẩm được hiển thị
    const [pageSize, setPageSize] = React.useState(10);
    const [field, setField] = React.useState("id");
    const [totalElements, setTotalElements] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [sort, setSort] = React.useState("ASC");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        loadDataProduct();
    };

    const handleChangePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
        loadDataProduct();
    };
    const navigation = useNavigate();
    const handleChange = (event) => {
        setStatus(event.target.value);
        loadDataProduct();
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

    const loadDataProduct = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(`/product/auth/user/${page}/${pageSize}/${field}?title=${title}&status=${status}&sort=${sort}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("product", result);
                setProduct(result.response.content);
                setTotalElements(result.response.totalElements);
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("error!");
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPage(0);
        loadDataProduct();
    };
    React.useEffect(() => {
        loadDataProduct();
    }, [page, pageSize, status]);
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
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div>
                            <div className="card mb-4">
                                <div className="card-header d-flex py-3 justify-content-between ">
                                    <h5 className="mt-1">Danh sách sản phẩm</h5>
                                    <NavLink to={"/management/create-products"}>
                                        <button className="btn btn-outline-dark">Tạo mới</button>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="card mb-4">
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    className="card-body d-flex justify-content-between"
                                >
                                    <FormControl className="px-2">
                                        <Select
                                            inputProps={{ "aria-label": "Without label" }}
                                            value={status}
                                            displayEmpty
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Tất cả</em>
                                            </MenuItem>
                                            <MenuItem value={0}>Chờ xét duyệt</MenuItem>
                                            <MenuItem value={1}>Đã xét duyệt</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className="col-lg-8 col-auto px-2">
                                        <TextField
                                            id="outlined-basic"
                                            name="title"
                                            label="Search"
                                            variant="outlined"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl className="col-auto px-2">
                                        <button type="submit" className="btn btn-outline-dark h-100">
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
                                                        <TableCell className="text-nowrap">Sản phẩm</TableCell>
                                                        <TableCell className="text-nowrap" align="right">
                                                            Giá (₫)
                                                        </TableCell>
                                                        <TableCell className="text-nowrap" align="right">
                                                            Giảm giá (%)
                                                        </TableCell>
                                                        <TableCell className="text-nowrap" align="right">
                                                            Số lượng
                                                        </TableCell>
                                                        {/* <TableCell className="text-nowrap">Created At</TableCell> */}
                                                        <TableCell className="text-nowrap">Updated At</TableCell>
                                                        <TableCell className="text-nowrap" align="center">
                                                            Status
                                                        </TableCell>
                                                        <TableCell className="text-nowrap" align="center">
                                                            Action
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {product.length > 0 ? (
                                                        product.map((item, i) => (
                                                            <TableRow
                                                                key={item.id}
                                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {item.id}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <CardHeader
                                                                        avatar={
                                                                            <Avatar
                                                                                alt="Remy Sharp"
                                                                                src={item.photos}
                                                                                variant="rounded"
                                                                            />
                                                                        }
                                                                        style={{ minWidth: "200px", maxWidth: "400px" }}
                                                                        title={item.title}
                                                                        sx={{ p: 0 }}
                                                                    />
                                                                </TableCell>

                                                                <TableCell align="right">{VND.format(item.price)}</TableCell>
                                                                <TableCell align="right">{item.discount}(%)</TableCell>
                                                                <TableCell align="right">{item.quantity}</TableCell>
                                                                {/* <TableCell className="text-nowrap">
                                                                    <input 
                                                                    type="datetime-local"
                                                                    defaultValue={format(new Date(item.createdAt), "yyyy-MM-dd'T'hh:mm")}
                                                                    />
                                                                
                                                                </TableCell> */}
                                                                <TableCell className="text-nowrap">
                                                                    {formatDistanceToNow(new Date(item.updatedAt), {
                                                                        locale: vi,
                                                                        addSuffix: true,
                                                                    })}
                                                                </TableCell>
                                                                <TableCell className="text-nowrap" align="center">
                                                                    {item.status === 0 ? (
                                                                        <span className="badge bg-warning ms-2">
                                                                            Chờ xét duyệt
                                                                        </span>
                                                                    ) : (
                                                                        <span className="badge bg-info ms-2">
                                                                            Đã xét duyệt
                                                                        </span>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <div className="d-flex">
                                                                        <Link to={`/product/${item.slug}`}>
                                                                            <IconButton color="primary" title="View">
                                                                                <CalendarViewMonthIcon />
                                                                            </IconButton>
                                                                        </Link>
                                                                        <Link to={`/management/update-product/${item.id}`}>
                                                                            <IconButton color="success" title="Edit">
                                                                                <BorderColorIcon />
                                                                            </IconButton>
                                                                        </Link>
                                                                        <IconButton color="error" title="Remove">
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            {/* Khi không có sản phẩm */}
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

export default ListProducts;
