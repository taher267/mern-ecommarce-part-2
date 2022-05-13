import React, { Fragment } from 'react'
import { FaMouse } from 'react-icons/fa';
import Product from './Product.js'
import './Home.css';
const Home = () => {
    const product = {
        name: "Blue Tshirt",
        images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
        price: "৳ 130",
        _id: "taher267"
    }

    return <Fragment>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                    Scroll <FaMouse />
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
            <Product product={product} />
            {/* {products &&
    products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))} */}
        </div>
    </Fragment>
}

export default Home