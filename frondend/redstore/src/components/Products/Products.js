import React, { Component } from "react";
import { Link } from "react-router-dom";

class Products extends Component {
    constructor() {
        super();
        this.state = {
            searchData: null,
            noData: false,
            products: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        console.log(e.target.value);
        this.setState({shortData: e.target.value});
    }
    filter(key) {
        console.warn(key);

        fetch("/product/filter?keySearch=" + key ).then((data) => {
            data.json().then((resp) => {
                console.warn("resp", resp);
                if (resp.length > 0) {
                    this.setState({ searchData: resp, noData: false });
                } else {
                    this.setState({ noData: true, searchData: null, products:null });
                }
            });
        });
    }
    componentDidMount() {
        fetch("product/filter").then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                this.setState({ products: result });
            });
        });
    }
    render() {
        return (
            <div>
                <div className="small-container">
                    <div className="row row-2">
                        <h2>All Products</h2>
                        <div>
                            <input type={"text"} onChange={(event) => this.filter(event.target.value)} />
                            <select value={this.state.shortData}  onChange={this.handleChange}>
                                <option value={this.state.shortData} >Default Shorting</option>
                                <option value={"created_at DESC"}>Short by new product</option>
                                <option value={"updated_at DESC"}>Short by new product update</option>
                                <option value={"price ASC"}>Short by price ASC</option>
                                <option value={"price DESC"}>Short by price DESC</option>
                                <option value={"discount ASC"}>Short by discount ASC</option>
                                <option value={"discount DESC"}>Short by discount DESC</option>
                                <option value={"quantity ASC"}>Short by quantity ASC</option>
                                <option value={"quantity DESC"}>Short by quantity DESC</option>
                                
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.searchData ? (
                            <>
                                {this.state.searchData.map((item) => (
                                    <div className="col-4">
                                        <a href="#">
                                            <img src={item.photos} alt="" />
                                        </a>
                                        <h4>{item.title}</h4>

                                        <p>{item.price} đ</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {this.state.products
                                    ? this.state.products.map((item, i) => (
                                          <div className="col-4">
                                              <Link to={"/singleProduct"}>
                                                  <img src={item.photos} alt="" />
                                              </Link>
                                              <h4>{item.title}</h4>

                                              <p></p>
                                              
                                              <p>{item.price} đ</p>
                                          </div>
                                      ))
                                    : null}
                            </>
                        )}
                        {this.state.noData ? (
                            <div style={{ margin: "150px" }}>
                                <h1 className="display-4">Not Found</h1>
                                <p>Sorry, please search again</p>
                            </div>
                        ) : null}
                        {/* <ProductItem /> */}
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

export default Products;
