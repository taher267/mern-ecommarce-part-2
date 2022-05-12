const catchAsyncError = require("./error/catchAsyncError");
const { verify } = require('jsonwebtoken');
const ErrorHander = require("../utils/errorHandler");
const User = require("../models/userModel");
exports.isAuthinticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;
    if (!token) return next(new ErrorHander("Please login to access this resourse", 401));
    const decoded = verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
});

exports.authintizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) next(new ErrorHander(`Role: ${req.user.role} doesn't allow to this resource`, 403));
    next();
};