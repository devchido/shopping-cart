import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function SingleProduct() {
    const { slug } = useParams();
    const [ product, setProduct ] = useState({
        id: "",
        users: {},
        title: "",
        slug: "",
        summary: "",
        price: "",
        discount: "",
        photos: "",
        quantity: "",
        content: "",
    });
    // var requestOptions = {
    //     method: "GET",
    //     redirect: "follow",
    // };
    useEffect(()=>{
        fetch("/product/api/findProductBySlug/" + slug).then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                setProduct({
                    id: result.id,
                    users: result.users,
                    title: result.title,
                    slug: result.slug,
                    summary:result.summary,
                    price: result.price,
                    discount: result.discount,
                    photos: result.photos,
                    quantity:result.quantity,
                    content: result.content,
                });
            });
        });
    },[])

    

    return (
        <>
            <div className="small-container single-product">
                <div className="row">
                    <div className="col-2">
                        <img src={product.photos} width="100%" id="ProductImg" />
                        {/* <div className="small-img-row">
                            <div className="small-img-col">
                                <img src={product.photos} width="100%" className="small-img" />
                            </div>
                            <div className="small-img-col">
                                <img src="images/gallery-2.jpg" width="100%" className="small-img" />
                            </div>
                            <div className="small-img-col">
                                <img src="images/gallery-3.jpg" width="100%" className="small-img" />
                            </div>
                            <div className="small-img-col">
                                <img src="images/gallery-4.jpg" width="100%" className="small-img" />
                            </div>
                        </div> */}
                    </div>
                    <div className="col-2">
                        <p><Link to={"/"}>Home</Link> / {product.summary}</p>
                        <h1>{product.title}</h1>
                        <h4>${product.price}</h4>
                        {/* <select>
                            <option>Select Size</option>
                            <option>XXL</option>
                            <option>XL</option>
                            <option>Large</option>
                            <option>Medium</option>
                            <option>Small</option>
                        </select> */}
                        <input type="number" defaultValue={1} />
                        <a href="" className="btn">
                            Add To Cart
                        </a>
                        <h3>
                            Product Details <i className="fa fa-indent" />
                        </h3>
                        <br />
                        <p>
                            {product.content}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProduct;
