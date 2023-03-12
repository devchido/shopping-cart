
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddProduct() {
    const { id } = useParams();
    useEffect(() => {
        fetch("product/user/findProductById/" + id).then((resp) => {
            resp.json().then((result) => {
                console.log(result);
            });
        });
    }, []);
    return (
        <div className="my-product-page">
            <div className="container">
                <div className="row">
                    <h2>New product</h2>
                </div>
                <div className="formAdd-container" style={{ width: "100%" }}>
                    <form>
                        <div className="formAdd">
                            <div className="img-add">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9jyeynlFwVGBRreQHauSuqrkhoKGk7ytIw8OpgZbNA&s" />
                                {/* bạn đặt tạm cái ảnh nào đấy vô, đường dẫn ấy */}
                                {/* <label>
                                    <input type="file"/>
                                    <img src="" />
                                </label> */}
                            </div>
                            <div className="text-add">
                                <label>
                                    <h3>Title</h3>
                                    <input type="text" placeholder="Title..."/>
                                </label>
                                <label>
                                    <h3>Slug</h3>
                                    <input type="text" placeholder="Slug..."/>
                                </label>
                                <label>
                                    <h3>Summary</h3>
                                    <input type="text" placeholder="Summary..."/>
                                </label>
                            </div>
                            <div className="number-add">
                                <label>
                                    <h3>Price</h3>
                                    <input type="number" placeholder="Price?"/>
                                </label>
                                <label>
                                    <h3>Discount</h3>
                                    <input type="number" placeholder="Discount?"/>
                                </label>
                                <label>
                                    <h3>Quantity</h3>
                                    <input type="number" placeholder="Quantity?"/>
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
                                    <textarea style={{ height: "60%", width:"100%"}}></textarea>
                                </label>
                            </div>
                        </div>
                        <div className="btn-add">
                            <Button variant="outlined">Save</Button>
                            <Button variant="outlined">Cancel</Button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
