import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import moment from "moment";

function OrderManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState();
    const [status, setStatus] = useState("0");
    const loadDataOrder = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/order/auth/admin/filter?status=" + status, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setOrder(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    useEffect(() => {
        loadDataOrder();
    }, []);
    const handleCancelOrder = (item) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/order/auth/admin/cancel-order?id=" + item.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                loadDataOrder();
            })
            .catch((error) => console.log("error", error));
    };
    const handleConfirmOrder = (item) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/order/auth/admin/confirm-order?id=" + item.id + "&status=2", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                loadDataOrder();
            })
            .catch((error) => console.log("error", error));
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
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value={"0"}>Chờ xác nhận</MenuItem>
                        <MenuItem value={"1"}>Không thành công</MenuItem>
                        <MenuItem value={"2"}>Đang vận chuyển</MenuItem>
                        <MenuItem value={"3"}>Đã giao</MenuItem>
                        <MenuItem value={"4"}>Đã trả lại</MenuItem>
                        <MenuItem value={"5"}>Hoàn thành</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Button
                variant="outlined"
                style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                onClick={() => loadDataOrder()}
            >
                Search
            </Button>

            <TableContainer style={{ paddingTop: "15px" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">User</TableCell>
                            <TableCell align="center">Detail</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            "Loading . . ."
                        ) : (
                            <>
                                {order
                                    ? order.map((item, i) => (
                                          <TableRow>
                                              <TableCell align="center" width={"10px"}>
                                                  {item.id}
                                              </TableCell>
                                              <TableCell align="center">
                                                  <div className="cart-info">
                                                      <img src={item.users.photos} alt="" />
                                                      <div style={{ textAlign: "left" }}>
                                                          <p>Name: {item.users.firstName + " " + item.users.lastName}</p>

                                                          <p>Mobile: {item.mobile}</p>

                                                          <p>Email: {item.email}</p>
                                                      </div>
                                                  </div>
                                              </TableCell>

                                              <TableCell align="left">
                                                  <p>Line1: {item.line1}</p>
                                                  <p>City: {item.city}</p>
                                                  <p>Country: {item.country}</p>
                                                  <b>Total: {item.total} vnd</b>
                                                  <br />
                                                  <small>{moment(item.updatedAt).fromNow()}</small>
                                              </TableCell>
                                              <TableCell align="center">
                                                  {item.status === 0
                                                      ? "Chờ xác nhận"
                                                      : null || item.status === 1
                                                      ? "Không thành công"
                                                      : null || item.status === 2
                                                      ? "Đang vận chuyển"
                                                      : null || item.status === 3
                                                      ? "Đã giao"
                                                      : null || item.status === 4
                                                      ? "Đã trả lại"
                                                      : null || item.status === 5
                                                      ? "Hoàn thành"
                                                      : null}
                                              </TableCell>
                                              <TableCell align="center">
                                                  {item.status === 0 ? (
                                                      <Button variant="outlined" onClick={() => handleConfirmOrder(item)}>
                                                          Xác nhận
                                                      </Button>
                                                  ) : null}
                                                  
                                                  {item.status !== 1 || item.status !== 5 ? (
                                                      <Button variant="outlined" onClick={() => handleCancelOrder(item)}>
                                                          Huỷ
                                                      </Button>
                                                  ) : null}
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

export default OrderManagement;
