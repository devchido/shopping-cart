import React, { Component } from "react";
class ProductItem extends Component {
    constructor() {
        super();
        this.state = {
            products: null,
        };
    }
    componentDidMount() {
        fetch("/product/filter").then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                this.setState({ products: result});
            });
        });
    }

    render() {
        return (
            <>
                {this.state.products
                    ? this.state.products.map((item, i) => 
                          <div className="col-4" >
                              <a href="#">
                                  <img src={item.photos} alt="" />
                              </a>
                                  <h4>{item.title}</h4>
                              
                              <p></p>
                              {/* <div class="rating">
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star-o"></i>
                              </div> */}
                              <p>{item.price} đ</p>
                          </div>
                      )
                    : null}
            </>
        );
    }
}

export default ProductItem;
