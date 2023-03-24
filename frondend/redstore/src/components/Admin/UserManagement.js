import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

function UserManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const loadDataUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/user/auth/admin/filter", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setUser(result);
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
                            <TableCell align="center">Photos</TableCell>
                            <TableCell align="center">Full Name</TableCell>
                            <TableCell align="center">Mobile</TableCell>
                            <TableCell align="center">email</TableCell>
                            <TableCell align="center">Role</TableCell>
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
                                {user
                                    ? user.map((item, i) => (
                                          <TableRow>
                                              <TableCell align="center" width={"10px"}>
                                                  {item.id}
                                              </TableCell>
                                              <TableCell align="center">
                                                  <img src={item.photos} alt="" />
                                              </TableCell>
                                              <TableCell align="center">{item.firstName + " " + item.lastName}</TableCell>
                                              <TableCell align="center">{item.mobile}</TableCell>
                                              <TableCell align="center">{item.email}</TableCell>
                                              <TableCell align="center">{item.role}</TableCell>

                                              <TableCell align="center">
                                                  <Button variant="outlined">
                                                      Action
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

export default UserManagement;
