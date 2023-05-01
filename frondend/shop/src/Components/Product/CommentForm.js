import { Alert, Avatar, Button, Grid, IconButton, Paper, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { formatDistanceToNow } from "date-fns";
import vi from "date-fns/locale/vi";

export default function CommentForm(product) {
    const [replyParentId, setReplyParentId] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [comment, setComment] = useState([]);
    //
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");

    const imgLink =
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

    //
    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!commentText.trim()) return;
        fetch("/comment/auth", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: product.product.id,
                content: commentText,
                parentId: replyParentId,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.status;
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setSnackbarMsg("Thành công.");
                filterCommentByProduct();
            })
            .catch((error) => {
                console.log("error", error);
                setSnackbarOpen(true);
                setSnackbarSeverity("error");
                setSnackbarMsg("False");
            });
        setCommentText("");
        setReplyParentId(null);
    };
    const handleCommentTextChange = (event) => {
        setCommentText(event.target.value);
    };
    const handleReply = (parentId) => {
        setReplyParentId(parentId);
    };
    const filterCommentByProduct = () => {
        fetch("/comment/api/find-by-product?productId=" + product.product.id, {
            method: "GET",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                setComment(result);
            })
            .catch((error) => console.log("error", error));
    }
    useEffect(()=>{
        filterCommentByProduct();
        
    },[])
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
            <h1>Comments</h1>
            <form onSubmit={handleSubmit}>
                <Paper style={{ padding: "20px 20px", marginTop: 10 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item className="w-100">
                            <textarea
                                className="form-control"
                                placeholder="Nhập bình luận"
                                value={commentText}
                                onChange={handleCommentTextChange}
                            ></textarea>
                        </Grid>
                        <Grid item justifyContent="left">
                            <Button type="submit" variant="outlined" className="h-100">
                                Gửi
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
            {comment.map((item, i) => (
                <Paper style={{ padding: "10px 20px 0 20px", marginTop: 10 }} key={item.id}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={item.user.photos} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <p  style={{ textAlign: "left" }}>{item.content}</p>
                            <div className="d-flex" style={{ fontSize: "12px" , color: "gray" }}>
                                <p className="me-1">Trả lời</p>
                                -
                                <p className="mx-1">{item.user.firstName + " " + item.user.lastName}</p>
                                -
                                <p className="mx-1">
                                    {formatDistanceToNow(new Date(item.createdAt), {
                                        locale: vi,
                                        addSuffix: true,
                                    })}
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </div>
    );
}
