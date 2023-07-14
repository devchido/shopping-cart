import React from "react";
import ProductItem from "./ProductItem";
import API from "../Api/Api";
function LastestProduct() {
    const [product, setProduct] = React.useState([]);

    const [loading, setLoading] = React.useState(false);

    const loadDataProduct = () => {
        setLoading(true);
        fetch(API+"/product/api/lastest-product?field=").then((resp) => {
            resp.json().then((result) => {
                // console.log(result);
                setLoading(false);
                setProduct(result);
            });
        });
    };
    const Loading = () => {
        return <>Loading . . .</>;
    };
    const ShowProducts = () => {
        return product.map((item, i) => {
            return <ProductItem {...item} key={item.id} />;
        });
    };
    React.useEffect(() => {
        loadDataProduct();
    }, []);
    return (
        <div className="container my-5 py-5">
            <div className="row">
                <div className="col-12 mb-5">
                    <h1 className="display-6 fw-bolder text-center">Sản phẩm mới nhất</h1>
                    <hr />
                </div>
            </div>
            <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>
        </div>
    );
}

export default LastestProduct;
