import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function Product() {
    const [page, setPage] = React.useState(1);
    // product data
    const [product, setProduct] = React.useState([]);
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
    // loading
    const [loading, setLoading] = React.useState(false);
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
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={i}>
                                    <div className="card h-100 text-center p-4">
                                        <img src={item.photos} className="card-img-top" alt={item.title} height="250px" />
                                        <div className="card-body" title={item.title}>
                                            <h5 className="card-title mb-0" title={item.title}>
                                                {item.title.substring(0, 12)}...
                                            </h5>
                                            <p className="card-text lead fw-bold">{item.price} vnd</p>
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
        loadDataProduct();
    };
    return (
        <>
            <div className="container my-4 py-5">
                <div className="row">
                    <div className="col-12 mb-3">
                        <form onSubmit={handleSubmit} className="row">
                            <TextField
                                label="Search"
                                id="fullWidth"
                                name="title"
                                value={title}
                                style={{ width: "50%", marginLeft: "auto" }}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Button
                                variant="outlined"
                                style={{ width: "10%", height: "3.5rem", marginRight: "auto" }}
                                type="submit"
                                // onClick={() => loadDataProduct()}
                            >
                                Search
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <hr />
                    <div className="buttons d-flex justify-content-center mb-2 pb-2">
                        <button
                            className="btn btn-outline-dark me-2"
                            
                        >
                            All
                        </button>
                        <button className="btn btn-outline-dark me-2">Thời trang</button>
                        <button className="btn btn-outline-dark me-2">Gia dụng</button>
                    </div>
                    <hr />

                    {loading ? <Loading /> : <ShowProducts />}
                    <div className="container d-flex justify-content-center">
                        <Stack spacing={2}>
                            {/* <Typography>Page: {page}</Typography> */}
                            <Pagination count={totalPages} page={page} onChange={handleChange} />
                        </Stack>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
