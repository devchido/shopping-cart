import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProductItemmew extends Component {
    render() {
        
        return (

            <div className="col-4">
            {/* <img src={product.productImages[0]} alt="" /> */}
            <img src={"public\assets\images\product-1.jpg"} alt="" />
            <h4>abcde</h4>
            <div className="rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
            </div>
            <p>123 <del>Rs. 21324536 </del></p>
            <a href="" className="btn">Add To Cart</a>
        </div>

        )
    }
}

ProductItemmew.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductItemmew
