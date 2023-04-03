import React from "react";
import { Link } from "react-router-dom";
function LastestProduct() {
    const [product, setProduct] = React.useState();

    const [loading, setLoading] = React.useState(false);

    const loadDataProduct = () => {
        setLoading(true);
        fetch("/product/api/lastest-product?field=").then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                setLoading(false);
                setProduct(result);
            });
        });
    };
    const Loading = () => {
        return <>Loading . . .</>;
    };
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2">All</button>
                    <button className="btn btn-outline-dark me-2">Thời trang</button>
                    <button className="btn btn-outline-dark me-2">Gia dụng</button>
                </div>
                {product ? (
                    <>
                        {product.map((item, i) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-5 mb-4" key={i}>
                                    <div className="card h-100 text-center p-4" >
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
                ) : null}
            </>
        );
    };
    React.useEffect(() => {
        loadDataProduct();
    }, []);
    return (
        <div className="container my-5 py-5">
            <div className="row">
                <div className="col-12 mb-5">
                    <h1 className="display-6 fw-bolder text-center">Lastest Product</h1>
                    <hr />
                </div>
            </div>
            <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>
        </div>
    );
}

export default LastestProduct;
