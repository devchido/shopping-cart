import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductItem from "./products/ProductItem";
import { getAllProducts } from "../../redux/actions/product.action";

class Products extends Component {
    render() {
        return (
            <div>
                <div className="small-container">
                    <div className="row row-2">
                        <h2>All Products</h2>
                        <select>
                            <option>Default Shorting</option>
                            <option>Short by price</option>
                            <option>Short by popularity</option>
                            <option>Short by rating</option>
                            <option>Short by sale</option>
                        </select>
                    </div>
                    <div className="row">
                        <ProductItem />
                    </div>
                    <div className="page-btn">
                        <span>&#x3c;&#x3c;</span>
                        <span>&#8592;</span>
                        <span>1</span>
                        <span>&#8594;</span>
                        <span>&#x3e;&#x3e;</span>
                    </div>
                </div>
            </div>
        );
    }
}

Products.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    product: state.product,
    cart: state.cart,
});

export default connect(mapStateToProps, { getAllProducts })(Products);
