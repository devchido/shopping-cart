import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

function Order() {
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState();
    const [orderStatus, setOrderStatus] = useState("0");

    const loadDataOrder = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/order/auth/user?status=" + orderStatus, requestOptions)
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

    const handleChange = (event) => {
        setOrderStatus(event.target.value);
    };
    //
    useEffect(() => {
        loadDataOrder();
    }, []);

    //

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
                        value={orderStatus}
                        label="Status"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Chờ xác nhận</MenuItem>
                        <MenuItem value={1}>Không thành công</MenuItem>
                        <MenuItem value={2}>Đang vận chuyển</MenuItem>
                        <MenuItem value={3}>Đã giao</MenuItem>
                        <MenuItem value={4}>Đã trả lại</MenuItem>
                        <MenuItem value={5}>Hoàn thành</MenuItem>
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
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">OrderId</TableCell>
                            <TableCell align="center">CartId</TableCell>
                            <TableCell align="center">Content</TableCell>
                            <TableCell align="center">Total($)</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <div className="row">
                                <h2>Loading . . . </h2>
                            </div>
                        ) : (
                            <>
                                {order
                                    ? order.map((item, i) => (
                                          <TableRow>
                                              <TableCell align="center" width={"10px"}>
                                                  {i + 1}
                                              </TableCell>
                                              <TableCell align="center">{item.id}</TableCell>
                                              <TableCell align="center">
                                                  <Link to={`/cart/${item.carts.id}`}>{item.carts.id}</Link>
                                              </TableCell>
                                              <TableCell align="center">{item.content}</TableCell>
                                              <TableCell align="center">{item.total} vnd</TableCell>

                                              <TableCell align="center">
                                                  {moment(item.updatedAt).format('LLL')}
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
                                                  <Button variant="outlined">
                                                      <Link to={`/order/${item.id}`} style={{ color: "#000" }}>
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

export default Order;
