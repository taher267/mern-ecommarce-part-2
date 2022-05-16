import * as Types from '../constants/productConstants'

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case Types.ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case Types.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                // filteredProductsCount: action.payload.filteredProductsCount
            }
        case Types.ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case Types.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};


export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case Types.PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case Types.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case Types.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case Types.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};
