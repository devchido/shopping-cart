import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
    
    const [cart, setCart] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("/cart/auth/my-cart", requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                // Set trạng thái loading
                setIsLoading(false);
                // Set data vào cart
                setCart(result);
                console.log(cart);
            })
            .catch((error) => console.log("error", error));
    }, []);
    return (
        <>
            <div style={{ width: "100%", background: "#ff523b", marginTop: "8rem" }}>
                <div className="container">
                    <h1>My cart</h1>
                </div>
            </div>
            <div className="container">
                <div className="cart-page">
                    {isLoading ? (
                        <div className="row">
                            <h2>Loading . . . </h2>
                        </div>
                    ) : (
                        <>
                            {
                                cart 
                                    ? //
                                      cart.map((item, i) => (
                                          <>
                                              <div className="row">
                                                  {/* New cart */}
                                                  <div className="col-5">
                                                      <div className="new-cart-detail">
                                                          <i class="fa fa-plus-square-o"></i>
                                                      </div>
                                                  </div>
                                                  {/*  */}
                                                  <div className="col-5">
                                                      <Link to={`/cart/${item.id}`}>
                                                          <div className="cart-detail">
                                                              <img src="https://raw.githubusercontent.com/devchido/frontend-ecommerce-website/main/images/cart.png" />
                                                              {/* <p>Create at:{item.createdAt}</p>
                                                              <p>Update at:{item.updatedAt}</p> */}
                                                              <p>content: {item.content}</p>
                                                          </div>
                                                      </Link>
                                                  </div>
                                              </div>
                                          </>
                                      ))
                                    : null
                                //
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
