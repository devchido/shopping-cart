import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var raw = "";
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch("/product/auth/" + id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log(result);
                setProduct(result);
                // console.log(product);
            })
            .catch((error) => console.log("error", error));
    },[])
    const handleCancel = () => {
        setProduct(null);
    };
    return (
        <div className="my-product-page">
            <div className="container">
                <div className="row">
                    <h2>Update product</h2>
                </div>
                <div className="formAdd-container" style={{ width: "100%" }}>
                    <form>
                        <div className="formAdd">
                            <div className="img-add">
                                <img src={product.photos} />
                                {/* bạn đặt tạm cái ảnh nào đấy vô, đường dẫn ấy */}
                                {/* <label>
                                    <input type="file"/>
                                    <img src="" />
                                </label> */}
                            </div>
                            <div className="text-add">
                                <label>
                                    <h3>Title</h3>
                                    <input type="text" placeholder="Title..." defaultValue={product.title} />
                                </label>
                                <label>
                                    <h3>Slug</h3>
                                    <input type="text" placeholder="Slug..." defaultValue={product.slug} />
                                </label>
                                <label>
                                    <h3>Summary</h3>
                                    <input type="text" placeholder="Summary..." defaultValue={product.summary} />
                                </label>
                            </div>
                            <div className="number-add">
                                <label>
                                    <h3>Price</h3>
                                    <input type="number" placeholder="Price?" defaultValue={product.price} />
                                </label>
                                <label>
                                    <h3>Discount</h3>
                                    <input type="number" placeholder="Discount?" defaultValue={product.discount} />
                                </label>
                                <label>
                                    <h3>Quantity</h3>
                                    <input type="number" placeholder="Quantity?" defaultValue={product.quantity} />
                                </label>
                            </div>
                            <div className="date-add">
                                {/* <label>
                                    <h3>CreatedAt</h3>
                                    <input type="date" />
                                </label>
                                <label>
                                    <h3>UpdateAt</h3>
                                    <input type="date" />
                                </label> */}
                                <label>
                                    <h3>Content</h3>
                                    <textarea style={{ height: "60%", width: "100%" }} defaultValue={product.content}></textarea>
                                </label>
                            </div>
                        </div>
                        <div className="btn-add">
                            <Button variant="outlined">Save</Button>
                            <Button variant="outlined" onClick={() => handleCancel}>
                                <Link to={"/my-product"}>Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
