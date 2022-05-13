const catchAsyncError = require("../middlewires/error/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");

//Create Order
exports.createOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });
    responseMessage(res, 201, true, { name: "order", data: order });
});

//Get single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findById(id).populate('user', 'name', 'email');
    if (!order) return next(new ErrorHander(`Order not found with this id :- ${id}`));

    responseMessage(res, 200, true, { name: "order", data: order });
});

//Get Logged in user Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const orders = await Order.find({ user: req.user._id });
    responseMessage(res, 200, true, { name: "order", data: orders });
});


//Get Logged in user Orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    let totalOrdersAmount = 0;
    orders.forEach(order => totalOrdersAmount += order.totalPrice);
    res.status(200).json({
        success: true,
        orders,
        totalOrdersAmount
    });
});

//Update order status (Admin)
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHander(`Order not found with this id :- ${id}`));
    if (order.orderStatus.toLowerCase() === "delivered") return next(new ErrorHander(`You have already delivired this order!`));
    order.orderItems.forEach(async odr => {
        await updateStock(odr.Product, odr.quantity);
    });
    order.orderStatus = req.body.status;
    if (req.body.status.toLowerCase() === 'delivered') order.deliveredAt = Date.now();
    await order.save({ validateBeforeSave: false });
    responseMessage(res, 200, true);
});

//Delete order (Admin)
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHander(`Order not found with this id :- ${id}`));

    await order.remove();
    responseMessage(res, 200, true);
});

//Update stock for update order
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

function responseMessage(res, statusCode, statusType, data = null, feedback = null) {
    const obj = {
        success: statusType
    }
    if (feedback) obj[feedback.name] = feedback.data;
    if (data) obj[data.name] = data.data;
    return res.status(statusCode).json(obj);
}
// 627cec074224cc57bad570dd


// {
// 	"shipppingInfo": {
//     "address": "Dhaka",
//     "city": "Dhaka",
//     "state": "Dhaka",
//     "country": "Bd",
//     "zipCode": "34343",
//     "phoneNo": "01962054584"},
//     "orderItems": [
//         {
//             "name": "Product 1",
//             "price": "1000",
//             "quantity": "1",
//             "image": "simple image",
//             "product": "627e264e525466376446860f"
//         }
//     ],
//     "paymentInfo": {
//         "id": "sample product",
//         "status": "succeed"
//     },
//     "itemsPrice":"500",
//     "taxPrice": "10",
//     "shippingPrice": "100",
//     "totalPrice":"610"
// }