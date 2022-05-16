import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../redux/actions/productActions';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../layout/Home/ProductCard';
import MetaData from '../layout/MetaData';
import Pagination from 'react-js-pagination';
import './Products.css';
import { useParams } from 'react-router-dom';
import { Slider, Typography } from '@material-ui/core';
const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, productsCount, resultPerPage,
        //  filteredProductsCount,
        error } = useSelector(state => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000]);
    const alert = useAlert();
    const params = useParams();
    const keyword = params.keyword;
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, currentPage, price));
    }, [dispatch, keyword, error, alert, currentPage, price]);

    const setCountPageNo = p => setCurrentPage(p);
    let count = products.length;
    const productsViews = products && products && <Fragment>
        <h2 className='productsHeading'>Products</h2>
        <div className='products'>
            {products.map(product => <ProductCard key={product._id} product={product} />)}
        </div>
        <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
                getAriaLabel={() => ''}
                value={price}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                min={0}
                max={10000}
                onChange={priceHandler}
            />
        </div>
        {resultPerPage < productsCount && (<div className='paginationBox'><Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            pageRangeDisplayed={5}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass='page-item'
            linkClass='page-link'
            activeClass='pageItemActive'
            activeLinkClass='pageLinkActive'
            onChange={setCountPageNo}
        /></div>)}

    </Fragment>;

    return <Fragment>
        {loading ? <Loader /> : <Fragment>
            <MetaData title="PRODUCTS -- ECOMMARCE" />
            {productsViews}
        </Fragment>}
    </Fragment>

}

export default Products;