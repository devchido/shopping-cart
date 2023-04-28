import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Button, Divider, InputBase, Paper, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { VND } from "../Unity/VND";

function Product() {
    const [page, setPage] = React.useState(1);
    // product data
    const [product, setProduct] = React.useState([]);
    // size của 1 page
    const [pageSize, setPageSize] = React.useState(12);
    // sort by filde
    const [field, setField] = React.useState("id");
    // thứ tự của page
    const [offset, setOffset] = React.useState(0);
    // tổng số product
    const [totalElements, setTotalElements] = React.useState();
    // Tổng số trang
    const [totalPages, setTotalPages] = React.useState();
    // key search
    const [title, setTitle] = React.useState("");
    // loading
    const [loading, setLoading] = React.useState(false);

    // Sự kiện
    const handleChange = (event, value) => {
        setPage(value);
        setOffset(value - 1);
        loadDataProduct();
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        // loadDataProduct();
    };

    const loadDataProduct = () => {
        fetch("product/api/paginationAndSort/" + offset + "/" + pageSize + "/" + field + "?title=" + title).then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                setProduct(result.response.content);
                setTotalElements(result.response.totalElements);
                setTotalPages(result.response.totalPages);
            });
        });
    };
    const Loading = () => {
        return <>Loading . . .</>;
    };
    const ShowProducts = () => {
        return (
            <>
                {product.length > 0 ? (
                    <>
                        {product.map((item, i) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4 col-auto p-2" key={i}>
                                    <div className="card h-100 text-center p-2" style={{maxWidth: "320px"}}>
                                        <img src={item.photos} className="card-img-top w-auto " title={item.title} alt={item.title} height="250px" />
                                        <div className="card-body">
                                            <div className="mask">
                                                <div className="d-flex justify-content-center h-100">
                                                    <h5>
                                                        {/* <span className="badge bg-primary ms-2">New</span>
                                                        <span className="badge bg-success ms-2">Eco</span> */}
                                                        {item.discount > 0 ? (
                                                            <span className="badge bg-danger ms-2">-{item.discount}%</span>
                                                        ) : null}
                                                    </h5>
                                                </div>
                                            </div>

                                            <h5
                                                className="card-title mb-0 text-nowrap text-truncate text-capitalize"
                                                title={item.title}
                                            >
                                                {item.title}
                                            </h5>
                                            <p className="card-text lead fw-bold">{VND.format(item.price)}</p>
                                            <Link to={`/product/${item.slug}`} className="btn btn-outline-dark">
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <>
                        <h1>Not Found!</h1>
                    </>
                )}
            </>
        );
    };
    React.useEffect(() => {
        loadDataProduct();
    }, [page, offset]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setPage(1);
        setOffset(0);
        loadDataProduct();
    };
    return (
        <div>
            <div className="container my-4 py-5">
                <div className="row">
                    <div className="col-12 mb-3 d-flex justify-content-center">
                        <Paper
                            component="form"
                            onSubmit={handleSubmit}
                            className="d-flex justify-content-center w-50 border"
                            sx={{ p: "4px 8px" }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1, fontSize: 18 }}
                                placeholder="Search products"
                                name="title"
                                value={title}
                                onChange={(event) => handleTitleChange(event)}
                            />
                            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <hr />
                    <div className="buttons d-flex justify-content-center mb-2 pb-2">
                        <button className="btn btn-outline-dark me-2">All</button>
                        <button className="btn btn-outline-dark me-2">Thời trang</button>
                        <button className="btn btn-outline-dark me-2">Gia dụng</button>
                    </div>
                    <hr />

                    {loading ? <Loading /> : <ShowProducts />}
                    <div className="container d-flex justify-content-center">
                        <Stack spacing={2}>
                            {/* <Typography>Page: {page}</Typography> */}
                            <Pagination
                                // Tổng số items
                                count={totalPages}
                                // Số page hiện tại
                                page={page}
                                // Xử lý chuyển page
                                onChange={handleChange}
                                // định dạng nút bấm
                                variant="outlined"
                                // màu nút bấm
                                color="primary"
                                // Kiểm xoát số nút bấm 2 bên khi đang ở page giữa. ví dụ là xuất hiện nút : 1 2 . . . 6 . . . 11 12
                                boundaryCount={1}
                                // Hiện nút bấm trở về trang đầu tiên
                                showFirstButton
                                // Hiện nút bấm trở về trang cuối cùng
                                showLastButton
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
