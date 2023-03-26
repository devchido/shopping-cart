import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

function TransactionManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [transaction, setTransaction] = useState();
    const loadDataUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/transaction/auth/admin?field=createdAt", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setTransaction(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    useEffect(() => {
        loadDataUser();
    }, []);
    return (
        <div className="row">
            <TextField
                label="Search (Chưa làm)"
                id="fullWidth"
                style={{ width: "50%", marginLeft: "auto" }}
                // onChange={(e) => setTitle(e.target.value)}
            />

            <Button
                variant="outlined"
                style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                // onClick={() => loadDataOrder()}
            >
                Search
            </Button>

            <TableContainer style={{ paddingTop: "15px" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">User</TableCell>
                            <TableCell align="center">Order</TableCell>
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
                                {transaction
                                    ? transaction.map((item, i) => (
                                          <TableRow>
                                              <TableCell align="center" width={"10px"}>
                                                  {item.id}
                                              </TableCell>
                                              <TableCell align="center">
                                                  <div className="cart-info">
                                                      <img src={item.users.photos} alt="" />
                                                      <div style={{ textAlign: "left" }}>
                                                          <small>User's Id: {item.users.id}</small>
                                                          <br />
                                                          <small>Name: {item.users.firstName + " " + item.users.lastName}</small>
                                                          <br />
                                                          <small>Mobile: {item.users.mobile}</small>
                                                          <br />
                                                          <small>Email: {item.users.email}</small>
                                                          <br />
                                                      </div>
                                                  </div>
                                              </TableCell>

                                              <TableCell align="center">
                                                  <div className="cart-info">
                                                      <div style={{ textAlign: "left" }}>
                                                          <small>Order's Id: {item.orders.id}</small>
                                                          <br />
                                                          <small>Name: {item.users.firstName + " " + item.users.lastName}</small>
                                                          <br />
                                                          <small>Total: {item.orders.total} vnd</small>
                                                          <br />
                                                      </div>
                                                  </div>
                                              </TableCell>
                                              <TableCell align="center">
                                                  <div className="cart-info">
                                                      <div style={{ textAlign: "left" }}>
                                                          <small>Status: {item.status}</small>
                                                          <br />
                                                          <small>Time: {item.updatedAt ? item.updatedAt : item.createdAt}</small>
                                                          <br />
                                                      </div>
                                                  </div>
                                              </TableCell>
                                              <TableCell align="center">
                                                  <Button variant="outlined">Action</Button>
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

export default TransactionManagement;
