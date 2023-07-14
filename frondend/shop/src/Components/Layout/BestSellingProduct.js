import React from "react";
import ProductItem from "./ProductItem";
import API from "../Api/Api";
export default function BestSellingProduct() {
    const [product, setProduct] = React.useState([]);
    const [time1, setTime1] = React.useState(new Date("2021-12-30"));
    const [time2, setTime2] = React.useState(new Date("2023-12-30"));

    const [loading, setLoading] = React.useState(false);

    const loadDataProduct = () => {
        setLoading(true);
        fetch(
            API+"/product/api/best_selling_product/0/8?title=&time1=" +
                time1.toISOString().slice(0, 10) +
                "&time2=" +
                time2.toISOString().slice(0, 10) +
                "&sort=DESC&field=count"
        ).then((resp) => {
            resp.json().then((result) => {
                // console.log(result);
                setLoading(false);
                setProduct(result.response.content);
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
                    <h1 className="display-6 fw-bolder text-center">Sản phẩm bán chạy nhất</h1>
                    <hr />
                </div>
            </div>
            <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>
        </div>
    );
}
