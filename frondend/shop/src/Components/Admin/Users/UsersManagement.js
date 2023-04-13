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
import { VND } from "../../Unity/VND";
import moment from "moment";

function UsersManagement() {
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
    const [keyname, setKeyName] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [role, setRole] = React.useState("");
    const [totalElements, setTotalElements] = React.useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        loadDataUser();
    };

    const handleChangePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
        loadDataUser();
    };
    const navigation = useNavigate();
    const handleChange = (event) => {
        setRole(event.target.value);
        loadDataUser();
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

    const loadDataUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(
            `/user/auth/admin/${page}/${pageSize}?field=${field}&sort=${sort}&keyname=${keyname}&mobile=${mobile}&email=${email}&role=${role}`,
            requestOptions
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log("user", result);
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
        loadDataUser();
    };
    React.useEffect(() => {
        loadDataUser();
    }, [page, pageSize, role]);
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
            <section className="h-100 gradient-custom col-lg-12">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div>
                            <div className="card mb-4">
                                <div className="card-header d-flex py-3 justify-content-between ">
                                    <h5 className="mt-1">Quản lý User</h5>
                                    <strong>{data.length} user</strong>
                                </div>
                            </div>
                            <div className="card mb-4">
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    className="card-body row d-flex justify-content-between"
                                >
                                    <FormControl className="col-lg-2 col-md-2 col-4 my-1">
                                        <Select
                                            inputProps={{ "aria-label": "Without label" }}
                                            value={role}
                                            displayEmpty
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Role</em>
                                            </MenuItem>
                                            <MenuItem value={"USER"}>USER</MenuItem>
                                            <MenuItem value={"USER_SHOP"}>USER_SHOP</MenuItem>
                                            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className="col-lg-3 col-auto px-2 my-1">
                                        <TextField
                                            id="outlined-basic"
                                            label="Search User"
                                            variant="outlined"
                                            onChange={(e) => setKeyName(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl className="col-lg-3 col-auto px-2 my-1">
                                        <TextField
                                            id="outlined-basic"
                                            label="Search Mobile"
                                            variant="outlined"
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl className="col-lg-3 col-auto px-2 my-1">
                                        <TextField
                                            id="outlined-basic"
                                            label="Search Email"
                                            variant="outlined"
                                            onChange={(e) => setEmail(e.target.value)}
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
                                                        <TableCell className="text-nowrap">User</TableCell>
                                                        <TableCell className="text-nowrap">Mobile</TableCell>
                                                        <TableCell className="text-nowrap">Email</TableCell>
                                                        <TableCell className="text-nowrap">Role</TableCell>
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

                                                                <TableCell>
                                                                    <CardHeader
                                                                        avatar={
                                                                            <Avatar
                                                                                alt="Remy Sharp"
                                                                                src={item.photos}
                                                                                variant="rounded"
                                                                                sx={{ width: 56, height: 56 }}
                                                                            />
                                                                        }
                                                                        style={{ minWidth: "200px", maxWidth: "400px" }}
                                                                        title={item.firstName + " " + item.lastName}
                                                                        sx={{ p: 0 }}
                                                                    />
                                                                </TableCell>

                                                                <TableCell className="text-nowrap">{item.mobile}</TableCell>
                                                                <TableCell className="text-nowrap">{item.email}</TableCell>
                                                                
                                                                <TableCell className="text-nowrap">{item.role}</TableCell>

                                                                <TableCell align="center"  className="row ">
                                                                    <div className="d-flex justify-content-center">
                                                                        <IconButton color="primary">
                                                                            <CalendarViewMonthIcon />
                                                                        </IconButton>

                                                                        <IconButton color="success">
                                                                            <BorderColorIcon />
                                                                        </IconButton>

                                                                        <IconButton color="error">
                                                                            <DeleteIcon />
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

export default UsersManagement;
