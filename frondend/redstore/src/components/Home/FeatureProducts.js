import React, { Component } from 'react';
import Slider from "react-slick";
import Spinner from '../Common/Spinner'

// import ProductItem from '../Products/products/ProductItem';
import ProductItemmew from './ProductItemnew';
import ProductItem from '../Products/products/ProductItem';


class FeatureProducts extends Component {
    render() {
        

        return (
            <div className="row">
        <div className="col-4">
            <a href="product-details.html">
                <img src="./assets/images/product-1.jpg" alt="" />
            </a>
            <a href="product-details.html">
                <h4>Red Printed T-Shirt</h4>
            </a>
            <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-o" />
            </div>
            <p>$50.00</p>
        </div>
        <div className="col-4">
            <a href="product-details.html">
                <img src="./assets/images/product-2.jpg" alt="" />
            </a>
            <a href="product-details.html">
                <h4>Red Printed T-Shirt</h4>
            </a>
            <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
                <i className="fa fa-star-o" />
            </div>
            <p>$50.00</p>
        </div>
        <div className="col-4">
            <a href="product-details.html">
                <img src="./assets/images/product-3.jpg" alt="" />
            </a>
            <a href="product-details.html">
                <h4>Red Printed T-Shirt</h4>
            </a>
            <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
            </div>
            <p>$50.00</p>
        </div>
        <div className="col-4">
            <a href="product-details.html">
                <img src="./assets/images/product-4.jpg" alt="" />
            </a>
            <a href="product-details.html">
                <h4>Red Printed T-Shirt</h4>
            </a>
            <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-o" />
            </div>
            <p>$50.00</p>
        </div>
    </div>
        )
    }
}

export default FeatureProducts
