const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const {
    isAuthinticatedUser,
    authintizeRoles
} = require('../middlewires/auth');
const router = require("express").Router();

router
    //cusomer
    .post("/order/new", isAuthinticatedUser, createOrder)
    .get('/orders/me', isAuthinticatedUser, myOrders)
    .get('/order/:id', isAuthinticatedUser, getSingleOrder)
    //Admin
    .get('/admin/orders', isAuthinticatedUser, authintizeRoles('sadmin', 'admin'), getAllOrders)
    .route('/order/:id').put(isAuthinticatedUser, authintizeRoles('sadmin', 'admin'), updateOrder)
    .delete(isAuthinticatedUser, authintizeRoles('sadmin', 'admin'), deleteOrder)

module.exports = router;