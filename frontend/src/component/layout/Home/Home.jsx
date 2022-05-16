import React, { Fragment, useEffect } from 'react'
import { FaMouse } from 'react-icons/fa';
import ProductCard from './ProductCard';
import MetaData from '../MetaData';
import { clearErrors, getProducts } from '../../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import './Home.css';
import Loader from '../Loader/Loader';


const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts());
    }, [dispatch, error, alert]);

    return <Fragment>
        {loading ? <Loader /> : <Fragment>
            <MetaData title="Home Page" />
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
                {products && products.map(product => <ProductCard key={product._id} product={product} />)}
            </div>
        </Fragment>}
    </Fragment>
}

export default Home