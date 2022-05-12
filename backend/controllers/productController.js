const catchAsyncError = require("../middlewires/error/catchAsyncError");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const ApiFeatures = require('../utils/apiFeatures');

//Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const perPage = 2;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagintion(perPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        message: "Alhamdu Lillah, Route is working",
        products,
        productCount
    });
});
//Get single product
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next(new ErrorHander('Product not found!', 404));
    res.status(200).json({
        message: "Alhamdu Lillah, Route is working",
        product
    });
});
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) return next(new ErrorHander('Product not found!', 404));
    product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({
        message: "Alhamdu Lillah, Route is working",
        success: true,
        product
    });
});
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) return next(new ErrorHander('Product not found!', 404));
    await product.remove();
    res.status(200).json({
        message: "Product has been deleted succefully",
        success: true
    });
})

