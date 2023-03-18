import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function AddProduct() {
    // Tạo dữ liệu gốc
    const [photos, setPhotos] = useState(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Sh209MMxKFXtyWOKLVXe-JjSc7_eFz-p6g&usqp=CAU"
    );
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [content, setContent] = useState("");

    const handleCancel = () => {};
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title, slug, summary, price, discount, quantity, content, photos);
        //
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            title: title,
            slug: slug,
            summary: summary,
            price: price,
            discount: discount,
            quantity: quantity,
            photos: photos,
            content: content,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/product/auth/create", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert("true");
            })
            .catch((error) => {
                console.log("error", error);
                alert("false");
            });
    };
    const resetForm = () => {
        setTitle("");
        setSlug("");
        setSummary("");
        setPrice(0);
        setDiscount(0)
        setQuantity(0);
        setPhotos("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Sh209MMxKFXtyWOKLVXe-JjSc7_eFz-p6g&usqp=CAU")
        setContent("");
    };

    return (
        <div className="my-product-page">
            <div className="container">
                <div className="row">
                    <h2>New product</h2>
                </div>
                <div className="formAdd-container" style={{ width: "100%" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="formAdd row">
                            <div className="img-add">
                                <img src={photos} />

                                <input
                                    type="text"
                                    name="photos"
                                    placeholder="Photos Link"
                                    defaultValue={photos}
                                    onChange={(e) => setPhotos(e.target.value)}
                                />
                            </div>
                            <div className="text-add">
                                <label>
                                    <h3>Title</h3>
                                    <input
                                        type="text"
                                        placeholder="Title..."
                                        defaultValue={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <h3>Slug</h3>
                                    <input
                                        type="text"
                                        placeholder="Slug..."
                                        defaultValue={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <h3>Summary</h3>
                                    <input
                                        type="text"
                                        placeholder="Summary..."
                                        defaultValue={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="number-add">
                                <label>
                                    <h3>Price</h3>
                                    <input
                                        type="number"
                                        placeholder="Price?"
                                        defaultValue={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <h3>Discount</h3>
                                    <input
                                        type="number"
                                        placeholder="Discount?"
                                        defaultValue={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <h3>Quantity</h3>
                                    <input
                                        type="number"
                                        placeholder="Quantity?"
                                        defaultValue={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="date-add">
                                <label>
                                    <h3>Content</h3>
                                    <textarea
                                        type="text"
                                        placeholder="content . . ."
                                        defaultValue={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </label>
                            </div>
                        </div>
                        <div className="btn-add">
                            <Button type="reset" variant="outlined" onClick={() => resetForm()}>
                                Reset
                            </Button>
                            <Button type="submit" variant="outlined">
                                Save
                            </Button>
                            <Button variant="outlined" onClick={() => handleCancel}>
                                <Link to={"/shop/product"}>Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
