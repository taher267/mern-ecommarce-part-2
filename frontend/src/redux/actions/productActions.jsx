import axios from 'axios';
import * as Types from '../constants/productConstants';


//Get all products
export const getProducts = (keyword = "", page = 1, price = [0, 10000]) => async (dispatch) => {
    try {
        dispatch({
            type: Types.ALL_PRODUCT_REQUEST
        });
        const link = `/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        const { data } = await axios.get(link);
        dispatch({
            type: Types.ALL_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: Types.ALL_PRODUCT_FAIL,
            payload: err.message
        });
    }
}
//Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: Types.PRODUCT_DETAILS_REQUEST
        });
        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: Types.PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        });
    } catch (err) {
        dispatch({
            type: Types.PRODUCT_DETAILS_FAIL,
            payload: err.message
        });
    }
}
//Cleaning Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: Types.CLEAR_ERRORS })
}
// export const getProducts = () => async (dispatch) => {}