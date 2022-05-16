import React, { Fragment, useEffect } from 'react';
import './ProductDetails.css';
import { getProductDetails } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import Carousel from 'react-material-ui-carousel';
import { Rating } from '@material-ui/lab';
import ReviewCard from './ReviewCard.jsx';
import { useAlert } from 'react-alert';
import { clearErrors } from './../../redux/actions/productActions';
import MetaData from '../layout/MetaData';
const ProductDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const alert = useAlert();
    const { product, loading, error } = useSelector(
        state => state.productDetails
    );
    const options = {
        name: "unique-rating",
        color: "rgba(20,20,20,0.1)",
        activecolor: "tomato",
        size: window.innerWidth < 600 ? "small" : "medium",
        value: product && product.ratings ? product.ratings : 0,
        precision: 0.5,
        readOnly: true

    }
    const carouselOps = {
        interval: 6000,
        swipe: false
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id, alert, error]);

    const productDetailsView = product && product ? <Fragment>
        <MetaData title={`${product.name} -- ECOMMERCE`} />
        <div className='ProductDetails'>
            <div>
                <Carousel {...carouselOps}>
                    {product && product.images && product.images.map((image, i) => <img src={image.url} key={image.url} alt={`${i} Slide`} className="CarouselImage" />)}
                </Carousel>
            </div>
            <div>
                <div className='detailsBlock-1'>
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>

                </div>
                <div className='detailsBlock-2'>
                    {product.ratings}
                    <Rating {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className='detailsBlock-3'>
                    <h1>৳{product.price}</h1>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button>-</button>
                            <input readOnly value="1" type="number" />
                            <button>+</button>
                        </div>{" "}
                        {/* <button>Add to Cart</button> */}
                    </div>
                    <p>Status: {" "}
                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                            {product.stock < 1 ? "outOfStock" : "InStock"}
                        </b>
                    </p>
                </div>
                <div className='detailsBlock-4'>
                    Description : <p>{product.description}</p>
                </div>
                <button className='submitReview'>Submit Review</button>
            </div>
        </div>
        <h3 className='reviewsHeading'>REVIEWS</h3>
        {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
                {product && product.reviews && product.reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
            </div>
        ) : <p className='noReviews'>No Reviews Yet</p>}
    </Fragment> : <h1>{error}</h1>;
    return <Fragment>
        {loading ? <Loader /> : productDetailsView}
    </Fragment>
}

export default ProductDetails