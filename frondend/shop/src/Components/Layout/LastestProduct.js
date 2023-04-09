import React from "react";
import { Link } from "react-router-dom";
import { VND } from "../Unity/VND";
function LastestProduct() {
    const [product, setProduct] = React.useState([]);

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
                {/* {product ? ( */}
                    <>
                        {product.map((item, i) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4 col-auto " key={i}>
                                    <div className="card h-100 text-center p-2 " style={{maxWidth: "350px"}}>
                                        <img src={item.photos} className="card-img-top" alt={item.title} height="250px" />
                                        <div className="card-body" title={item.title}>
                                            <div className="mask">
                                                <div className="d-flex justify-content-center h-100">
                                                    <h5>
                                                        {/* <span className="badge bg-primary ms-2">New</span>
                                                        <span className="badge bg-success ms-2">Eco</span> */}
                                                        {
                                                            item.discount > 0 ? <span className="badge bg-danger ms-2">-{item.discount}%</span> : null
                                                        }
                                                        
                                                    </h5>
                                                </div>
                                            </div>
                                            

                                            <h5 className="card-title mb-0 text-nowrap text-truncate text-capitalize" title={item.title}>
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
                {/* ) : null} */}
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
