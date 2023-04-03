import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function SingleProduct() {
    const { slug } = useParams();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        loadDataProduct();
    }, []);
    const loadDataProduct = () => {
        fetch("/product/api/findProductBySlug/" + slug).then((resp) => {
            resp.json().then((result) => {
                // console.log(result);
                setLoading(false);
                setProduct(result);
            });
        });
        fetch("/category/api/single-product-category?field=" + slug).then((resp) => {
            resp.json().then((result) => {
                // console.log(result);
                setCategory(result);
            });
        });
    };
    const Loading = () => {
        return <>Loading . . .</>;
    };
    const ShowProduct = () => {
        return (
            <>
                <div className="col-sm-6 d-flex justify-content-center border">
                    <img src={product.photos} alt={product.title} height={"400px"} width={"400px"} />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase test-black-50">{category.title}</h4>
                    <h1 className="display-5">{product.title}</h1>
                    {/* <p className="lead">
                        Rating
                        <i className="fa fa-star"></i>
                    </p> */}
                    <h3 className="display-6 fw-bold my-4">
                        {product.price} vnd
                    </h3>
                    <p className="lead">{product.content}</p>
                    {
                        localStorage.getItem('token') !== null ? <>
                        
                        <button className="btn btn-outline-dark">
                            Add to Cart
                        </button>
                        <Link to={""} className="btn btn-dark ms-2 px-3 py-2">Go to Cart</Link>
                        </> : null
                    }
                </div>
            </>
        );
    };
    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">{loading ? <Loading /> : <ShowProduct />}</div>
            </div>
        </div>
    );
}

export default SingleProduct;
