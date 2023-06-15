import React from "react";
import Banner from "../Layout/Banner";
import LastestProduct from "../Layout/LastestProduct";
import ProductsByCategory from "../Layout/ProductsByCategory";

function Home() {
    return (
        <div>
            <Banner/>
            <LastestProduct/>
            <ProductsByCategory/>
        </div>
    );
}

export default Home;
