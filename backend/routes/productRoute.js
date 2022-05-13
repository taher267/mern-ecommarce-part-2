const {
    getAllProducts,
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews
} = require('../controllers/productController');
const {
    isAuthinticatedUser,
    authintizeRoles
} = require('../middlewires/auth');

const router = require('express').Router();
router
    //public
    .get("/products", getAllProducts)
    .get("/product/:id", isAuthinticatedUser, getProductDetails)
    .get('/reviews/:id', getProductReviews)
    .put('/review', isAuthinticatedUser, createProductReview)
    .delete('/reviews/:id', isAuthinticatedUser, getProductReviews)
    //Admin
    .get("/admin/products", isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), getAllProducts)
    .post("/admin/product/new", isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), createProduct)
    .route("/admin/product/:id")
    .get(isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), getProductDetails)
    .put(isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), updateProduct)
    .delete(isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), deleteProduct)
module.exports = router;