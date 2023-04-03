import React, { useEffect, useState } from "react";
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
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
};

function UserManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);
    const [itemUser, setItemUser] = useState();

    //
    const handleOpen = (item) => {
        setOpen(true);
        setItemUser(item);
    };
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setRole(event.target.value);
    };

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
    const handleSetRole = () => {
        console.log("đổi quyền thành", role);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/user/auth/admin/role/" + itemUser.id + "?role=" + role, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                handleClose();
                loadDataUser();
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

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
            {isLoading ? (
                <>Loading . . . </>
            ) : (
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
                            <>
                                {user
                                    ? user.map((item, i) => (
                                          <TableRow key={i}>
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
                                                  {item.role !== "ADMIN" ? (
                                                      <Button variant="outlined" onClick={() => handleOpen(item)}>
                                                          Đổi quyền
                                                      </Button>
                                                  ) : null}

                                                  <Modal
                                                      open={open}
                                                      onClose={handleClose}
                                                      aria-labelledby="modal-modal-title"
                                                      aria-describedby="modal-modal-description"
                                                  >
                                                      <Box sx={style}>
                                                          <Typography id="modal-modal-title" variant="h6" component="h2">
                                                              Set Role
                                                          </Typography>
                                                          {itemUser ? (
                                                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                  User {itemUser.firstName + " " + itemUser.lastName}
                                                                  <TableCell align="center">
                                                                      <FormControl
                                                                          variant="standard"
                                                                          sx={{ m: 1, minWidth: 120 }}
                                                                      >
                                                                          <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                                                                          <Select
                                                                              labelId="demo-simple-select-standard-label"
                                                                              id="demo-simple-select-standard"
                                                                              defaultValue={itemUser.role}
                                                                              onChange={handleChange}
                                                                              label="Role"
                                                                          >
                                                                              <MenuItem value={"USER"}>USER</MenuItem>
                                                                              <MenuItem value={"USER_SHOP"}>USER_SHOP</MenuItem>
                                                                          </Select>
                                                                      </FormControl>
                                                                  </TableCell>
                                                              </Typography>
                                                          ) : null}
                                                          <div style={{ textAlign: "right" }}>
                                                              <Button variant="outlined" onClick={handleClose}>
                                                                  Close
                                                              </Button>
                                                              &nbsp;
                                                              <Button variant="outlined" onClick={handleSetRole}>
                                                                  Save
                                                              </Button>
                                                          </div>
                                                      </Box>
                                                  </Modal>
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : null}
                            </>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default UserManagement;
