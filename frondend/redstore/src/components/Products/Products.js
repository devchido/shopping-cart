import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function Products() {
    // Khai báo
    const [page, setPage] = React.useState(1);
    // product data
    const [product, setProduct] = React.useState();
    // size của 1 page
    const [pageSize, setPageSize] = React.useState(8);
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

    // Sự kiện
    const handleChange = (event, value) => {
        setPage(value);
        setOffset(value - 1);
        loadDataProduct();
    };
    const handleTitleChange = (event, value) => {
        setTitle(value);
        loadDataProduct();
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
    React.useEffect(() => {
        loadDataProduct();
    }, [page, offset]);
    return (
        <div>
            <div className="container page">
                <h2>All Products</h2>
                <br />
                <div className="row">
                    <TextField
                        label="Search"
                        id="fullWidth"
                        style={{ width: "50%", marginLeft: "auto" }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        variant="outlined"
                        style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                        onClick={() => loadDataProduct()}
                    >
                        Search
                    </Button>
                </div>
                <br />

                <div className="row">
                    {product ? (
                        <>
                            {product.map((item, i) => (
                                <div className="product-item col-4" style={{ border: "1px" }} key={i}>
                                    <Link to={`/products/${item.slug}`}>
                                        <img src={item.photos} alt="" />
                                    </Link>
                                    <h4>{item.title}</h4>
                                    <p>{item.price} đ</p>
                                    <Link to={"#"} className={"product-user-name"}>
                                        Cre: {item.users.firstName}&nbsp;{item.users.lastName}
                                    </Link>
                                </div>
                            ))}
                        </>
                    ) : null}
                </div>
                <div className="row">
                    <Stack spacing={2}>
                        {/* <Typography>Page: {page}</Typography> */}
                        <Pagination count={totalPages} page={page} onChange={handleChange} />
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Products;
