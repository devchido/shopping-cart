import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function Cart() {
    const [cart, setCart] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [line1, setLine1] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const [dropdown, setdropdown] = useState(false);
    const [status, setStatus] = useState("1");
    useEffect(() => {
        loadDataCart();
    }, []);

    const loadDataCart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart/auth/my-cart?status=" + status, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                // Set trạng thái loading
                setIsLoading(false);
                // Set data vào cart
                setCart(result);
                console.log(cart);
            })
            .catch((error) => console.log("error", error));
    };

    //
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // new cart
    
    const handleNewCart = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            line1: line1,
            city: city,
            country: country,
            content: content,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/cart/auth/create", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert("true");
                handleClose();
                loadDataCart();
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    
    const openDropdown = () => {
        setdropdown(!dropdown);
    };
    const handleDeleteCart = (item) => {
        // alert(item.id);
        setdropdown(false);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/cart/auth/delete/" + item.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // alert("true");
                loadDataCart();
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <div className="row">
            <TextField
                label="Search (Chưa làm)"
                id="fullWidth"
                style={{ width: "50%", marginLeft: "auto" }}
                // onChange={(e) => setTitle(e.target.value)}
            />
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleChange}
                    >
                        {/* <MenuItem value={0}>New</MenuItem> */}
                        <MenuItem value={1}>Cart</MenuItem>
                        <MenuItem value={2}>Order</MenuItem>
                        {/* <MenuItem value={3}>Null</MenuItem> */}
                        {/* <MenuItem value={4}>Null</MenuItem> */}
                        {/* <MenuItem value={5}>Hoàn thành</MenuItem> */}
                    </Select>
                </FormControl>
            </Box>
            <Button
                variant="outlined"
                style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                onClick={() => loadDataCart()}
            >
                Search
            </Button>
            <Button variant="outlined" style={{ width: "10%", height: "3.5rem", marginRight: "0" }} onClick={handleOpen}>
                Add
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New cart
                    </Typography>
                    <TextField
                        sx={{ margin: "15px auto" }}
                        fullWidth
                        name="line1"
                        label="Địa chỉ"
                        onChange={(e) => setLine1(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: "15px auto" }}
                        fullWidth
                        name="city"
                        label="City"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: "15px auto" }}
                        fullWidth
                        name="country"
                        label="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: "15px auto" }}
                        fullWidth
                        name="content"
                        label="Content"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div style={{ textAlign: "right" }}>
                        <Button variant="contained" onClick={handleClose}>
                            Close
                        </Button>
                        &nbsp;
                        <Button variant="contained" onClick={handleNewCart}>
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
            <TableContainer style={{ paddingTop: "15px" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Content</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <>
                                <h2>Loading . . . </h2>
                            </>
                        ) : (
                            <>
                                {cart
                                    ? cart.map((item, i) => (
                                          <TableRow>
                                              <TableCell align="center" width={"10px"}>
                                                  {item.id}
                                              </TableCell>
                                              <TableCell align="center">
                                                  <p>{item.line1}</p>
                                                  <p>City: {item.city}</p>
                                                  {/* <p>Country: {item.country}</p> */}
                                              </TableCell>
                                              <TableCell align="center">{item.content}</TableCell>

                                              <TableCell align="center">
                                                  {/* {item.updatedAt ?
                                                  moment(item.updatedAt).fromNow()
                                                  : moment(item.createdAt).fromNow()
                                                } */}
                                                  
                                                  {moment(item.updatedAt).fromNow()}
                                                  {/* {moment(item.updatedAt).format('LLL')} */}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {item.status == 0
                                                      ? "New"
                                                      : null || item.status == 1
                                                      ? "Cart"
                                                      : null || item.status == 2
                                                      ? "Order"
                                                      : null || item.status == 3
                                                      ? "Đã thanh toán"
                                                      : null}
                                              </TableCell>
                                              <TableCell align="center">
                                                  <Button variant="outlined">
                                                      <Link to={`/cart/${item.id}`} style={{ color: "#000" }}>
                                                          View
                                                      </Link>
                                                  </Button>
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : null}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
