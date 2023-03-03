import React, { Component } from 'react'
import FeatureProducts from './FeatureProducts'
import LatestProducts from './LatestProducts'

export class SmallContainer extends Component {
  render() {
    return (
        <div className="small-container">
        <h2 className="title">Featured Products</h2>
        <FeatureProducts />
        <h2 className="title">Latest Products</h2>
        <LatestProducts />
    </div>
    )
  }
}

export default SmallContainer