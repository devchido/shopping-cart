import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Modal,
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
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Category() {
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState();
    const [title, setTitle] = useState("");
    //
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // data new category
    const [newTitle, setNewTitle] = useState("");
    const [newSlug, setNewSlug] = useState("");
    const [newContent, setNewContent] = useState("");

    const loadDataCategory = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("/category/api/filter?title=" + title, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                setCategory(result);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    const handleNewCategory = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            title: newTitle,
            slug: newSlug,
            content: newContent,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/category/auth", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);

                handleClose();
                loadDataCategory();
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    useEffect(() => {
        loadDataCategory();
    }, []);
    return (
        <div className="row">
            <TextField
                label="Search title"
                id="fullWidth"
                style={{ width: "50%", marginLeft: "auto" }}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Button
                variant="outlined"
                style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                onClick={()=> loadDataCategory()}
            >
                Search
            </Button>
            <Button variant="outlined" style={{ width: "10%", height: "3.5rem", marginLeft: "0" }} onClick={handleOpen}>
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
                        New Categoty
                    </Typography>
                    <TextField
                        sx={{ margin: "15px auto" }}
                        fullWidth
                        name="title"
                        label="Title"
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: "15px auto" }}
                        fullWidth
                        name="slug"
                        label="Slug"
                        onChange={(e) => setNewSlug(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: "15px auto" }}
                        fullWidth
                        name="content"
                        label="Content"
                        onChange={(e) => setNewContent(e.target.value)}
                    />

                    <div style={{ textAlign: "right" }}>
                        <Button variant="contained" onClick={handleClose}>
                            Close
                        </Button>
                        &nbsp;
                        <Button variant="contained" onClick={handleNewCategory}>
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>

            <TableContainer style={{ paddingTop: "15px" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Slug</TableCell>
                            <TableCell align="center">Content</TableCell>
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
                                {category
                                    ? category.map((item, i) => (
                                          <TableRow>
                                              <TableCell align="center" width={"10px"}>
                                                  {item.id}
                                              </TableCell>
                                              <TableCell align="center">{item.title}</TableCell>
                                              <TableCell align="center">{item.slug}</TableCell>
                                              <TableCell align="center">{item.content}</TableCell>
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

export default Category;
