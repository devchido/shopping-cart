import React, { Component } from 'react'

export class FeaturedCategories extends Component {
  render() {
    return (
        <div className="categories">
        <div className="small-container">
            <div className="row">
                <div className="col-3">
                    <a href="product-details.html">
                        <img src="./assets/images/category-1.jpg" alt="" />
                    </a>
                </div>
                <div className="col-3">
                    <a href="product-details.html">
                        <img src="./assets/images/category-2.jpg" alt="" />
                    </a>
                </div>
                <div className="col-3">
                    <a href="product-details.html">
                        <img src="./assets/images/category-3.jpg" alt="" />
                    </a>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default FeaturedCategories