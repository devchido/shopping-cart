import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCartMain, removeFromCartMain } from '../../../redux/actions/cart.action';
import { getProductByProductNumber } from '../../../redux/actions/product.action';
import Spinner from '../../Common/Spinner';


class ProductItem extends Component {


    render() {
    

        return (
            <div class="col-4">
                    <a href="product-details.html"><img src="./assets/images/product-1.jpg" alt="" /></a>
                    <a href="product-details.html"><h4>Red Printed T-Shirt</h4></a>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <p>$50.00</p>
                </div>

        )
    }
}



export default ProductItem;
