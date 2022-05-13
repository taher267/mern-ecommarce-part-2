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
});

//Create Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const { _id, name } = req.user;

    const review = {
        name,
        rating: Number(rating),
        comment,
        user: _id
    }
    // if (!rating || rating > 5) return next(new ErrorHander("please select rating", 400));
    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHander("Product not found", 400));

    const isReviewed = product.reviews.find(rev => rev.user._id.toString() === _id.toString());//id ==req.user.id
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() == _id.toString()) rev.rating = rating, rev.comment = comment
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rav => {
        avg += rav.rating;
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ new: true });
    responseMessage(res, 200, true, { name: 'message', data: 'Review Successfull' }, { name: "reviews", data: review });
});
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next(new ErrorHander(`Product not found`, 404));
    responseMessage(res, 200, true, null, { name: "reviews", data: product.reviews });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return next(new ErrorHander(`Product not found`, 404));

    const reviews = product.reviews.filter(rev => rev._id.toString() !== productId);
    let avg = 0;
    reviews.forEach(rav => avg += rav.rating);
    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;
    await product.findByIdAndUpdate(productId, { reviews, ratings, numOfReviews }, {
        new: true, runValidators: true, useFindAndModify: false
    });

    responseMessage(res, 200, true, null, { name: "reviews", data: product.reviews });
});

function responseMessage(res, statusCode, statusType, feedback = null, data = null) {
    const obj = {
        success: statusType
    }
    if (feedback) obj[feedback.name] = feedback.data;
    if (data) obj[data.name] = data.data;
    return res.status(statusCode).json(obj);
}

