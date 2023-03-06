import React, { Component } from "react";
import { Table } from "react-bootstrap";

export class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("users"),
            products: null,
        };
    }

    componentDidMount() {
        // console.log(this.state.userId);
        this.loadDataProduct();
        
    }
    loadDataProduct = () => {
        fetch("/product/" + this.state.userId).then((resp) => {
            resp.json().then((result) => {
                console.log(result);
                this.setState({ products: result });
            });
        });
    }
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <div className="small-container">
                    <div className="row">
                        <h2>My Product</h2>
                        <>
                        <Table>
                        
                            <tr>
                                <td>SST</td>
                                <td>Images</td>
                                <td>#Id</td>
                                <td>Name</td>
                                <td>Summary</td>
                                <td>Price</td>
                                <td>Discount</td>
                                <td>Quantity</td>
                            </tr>
                            {this.state.products
                                    ? this.state.products.map((item, i) => (
                                        <tr>
                                        <td>{i}</td>
                                        <td><img src={item.photos} /></td>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.summary}</td>
                                        <td>{item.price}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                      ))
                                    : null}
                        </Table>
                        </>
                    </div>
                </div>
                <br/><br/><br/><br/><br/>
            </div>
        );
    }
}


export default ProductList;
