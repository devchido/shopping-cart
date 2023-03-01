import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Banner extends Component {
    render() {
        return (
            <div>
                <section className="banner">
                    <div className="container">
                    <div className="row">
                    <div className="col-2">
                        <h1>Give Your Workout <br />A New Style!</h1>
                        <p>
                            Success isn't always about greatness. It's about consistency. Consistent hard work gains success.
                            Greatness will come.
                        </p>
                        <a href="" className="btn">Explore Now &#8594;</a>
                    </div>
                    <div className="col-2">
                        <img src="assets/images/image1.png" alt="" className=''/>
                    </div>
                </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Banner
