const { getAllProducts, createProduct, getProductDetails, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthinticatedUser, authintizeRoles } = require('../middlewires/auth');

const router = require('express').Router();
router.get("/products", getAllProducts)
    .post("/admin/products/new", isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), createProduct)
.get("/products/:id", isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), getProductDetails)
    .route("/admin/products/:id").put(isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), updateProduct)
    .delete(isAuthinticatedUser, authintizeRoles('admin', 'sadmin'), deleteProduct)
module.exports = router;