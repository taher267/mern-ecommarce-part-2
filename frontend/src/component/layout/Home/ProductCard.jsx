import React from 'react'
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

const Product = ({ product }) => {
    const options = {
        name: "unique-rating",
        color: "rgba(20,20,20,0.1)",
        activecolor: "tomato",
        size: "small",
        value: product.ratings,
        precision: 0.5,
        readOnly: true

    }
    return (<Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images.length > 0 ? product.images[0].url : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"} alt={product.name} />
        <p>{product.name}</p>
        <div id="ratting-wrapper">
            <Rating {...options} />

            <span className="productCardSpan">
                ({product.numOfReviews} Reviews)
            </span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>)
}

export default Product