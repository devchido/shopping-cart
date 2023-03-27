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
import { Link } from "react-router-dom";
//icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import moment from "moment";

function ProductManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState();
    const [sort, setSort] = useState("DESC");
    const [field, setField] = useState("createdAt");

    const loadDataProduct = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/product/auth/admin/filter?sort=" + sort + "&field=" + field, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setProduct(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    //
    const handleChangeSort = (event) => {
        setSort(event.target.value);
    };
    const handleChangeField = (event) => {
        setField(event.target.value);
    };
    useEffect(() => {
        loadDataProduct();
    }, []);
    const handleSetStatusProduct = (item) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/product/auth/admin/setStatus?id=" + item.id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                loadDataProduct();
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
                        value={field}
                        label="Sort"
                        onChange={handleChangeField}
                    >
                        <MenuItem value={"id"}>Id</MenuItem>
                        <MenuItem value={"title"}>Title</MenuItem>
                        <MenuItem value={"price"}>Price</MenuItem>
                        <MenuItem value={"discount"}>Discount</MenuItem>
                        <MenuItem value={"quantity"}>Quantity</MenuItem>
                        <MenuItem value={"createdAt"}>CreatedAt</MenuItem>
                        <MenuItem value={"updatedAt"}>UpdatedAt</MenuItem>
                        <MenuItem value={"endsAt"}>EndsAt</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Sort"
                        onChange={handleChangeSort}
                    >
                        <MenuItem value={"ASC"}>ASC</MenuItem>
                        <MenuItem value={"DESC"}>DESC</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button
                variant="outlined"
                style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                onClick={() => loadDataProduct()}
            >
                Search
            </Button>

            <TableContainer style={{ paddingTop: "15px" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Photos</TableCell>
                            <TableCell align="center">Time</TableCell>
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
                                {product
                                    ? product.map((item, i) => (
                                          <TableRow>
                                              <TableCell align="center" width={"10px"}>
                                                  {item.id}
                                              </TableCell>

                                              <TableCell>
                                                  <div className="cart-info">
                                                      <Link to={`/products/`}>
                                                          <img src={item.photos} alt="" />
                                                      </Link>
                                                      <div>
                                                          <Link to={`/products/${item.slug}`}>
                                                              <p>{item.title}</p>
                                                          </Link>
                                                          <small>Price: {item.price} vnd</small>
                                                          <br />
                                                          <small>Quantity: {item.quantity}</small>
                                                          <br />
                                                          <small>User: {item.users.firstName + " " + item.users.lastName}</small>
                                                      </div>
                                                  </div>
                                              </TableCell>

                                              <TableCell align="center">
                                                  {item.updatedAt
                                                      ? moment(item.updatedAt).format("LLL")
                                                      : moment(item.createdAt).format("LLL")}
                                              </TableCell>
                                              {item.status === 0 ? (
                                                  <TableCell align="center">
                                                      <Button variant="outlined" onClick={() => handleSetStatusProduct(item)}>
                                                          <VisibilityOffIcon />
                                                      </Button>
                                                  </TableCell>
                                              ) : (
                                                  <TableCell align="center">
                                                      <Button variant="outlined" onClick={() => handleSetStatusProduct(item)}>
                                                          <VisibilityIcon />
                                                      </Button>
                                                  </TableCell>
                                              )}
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

export default ProductManagement;
