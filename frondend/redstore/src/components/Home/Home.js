import React, { Component } from "react";
import Banner from "../layouts/Banner";

import Brands from "./Brands";
import FeaturedCategories from "./FeaturedCategories";
import Offer from "./Offer";
import SmallContainer from "./SmallContainer";
import Testimonials from "./Testimonials";

class Home extends Component {
    render() {
        return (
            <>
                <Banner />
                {/* featured categories */}
                <FeaturedCategories />
                {/* featured products */}
                <SmallContainer />
                {/* offer */}
                <Offer />
                {/* testimonial */}
                <Testimonials />
                {/* brands */}

                <Brands />
            </>
        );
    }
}
export default Home;
