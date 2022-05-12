const catchAsyncError = require("../middlewires/error/catchAsyncError");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const { createHash } = require('crypto');
const ApiFeatures = require("../utils/apiFeatures");
//Register user

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "sample pub id",
            url: "profile url"
        }
    });
    sendToken(user, 201, res);
});

//Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //check email and password
    if (!email || !password) next(new ErrorHander("Please enter your email and Password", 400));
    // user by email

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorHander("Email does not exist!", 400));
    //is not match password
    if (!await user.comparePassword(password)) return next(new ErrorHander('Password is invalid', 400));
    sendToken(user, 201, res);
});

//User logout

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
});
//Forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    //check email for forget
    if (!email) next(new ErrorHander("User not found", 404));
    // user by email

    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHander("Email does not exist!", 400));
    //is not match password
    const resetToken = user.getResetPasswordToken();
    //Save reset token in Database
    await user.save({ ValidateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;
    try {
        //Send Email 
        await sendEmail({
            email: user.email,
            subject: `Ecommarce Password Recovery`,
            message
        });
        return res.status(200).json({
            success: true,
            url: message,
            message: `Email send to ${user.email} successfully!`
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ ValidateBeforeSave: false });
        return next(new ErrorHander(err.message, 500));
    }

});

//Reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    //creating token Hash
    const resetPasswordToken = createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        const checkAgainUser = await User.findOne({ resetPasswordToken });
        if (checkAgainUser) {
            checkAgainUser.resetPasswordToken = undefined;
            checkAgainUser.resetPasswordExpire = undefined;
            await checkAgainUser.save({ ValidateBeforeSave: false });
        }
        return next(new ErrorHander('Reset password token is invalid or has been expired', 400));
    }
    if (password !== confirmPassword) return next(new ErrorHander("Password and confirm password doesn't match", 400));
    // console.log('Alhamdu lillah');
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
});
exports.getUserDetail = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
});
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const { password, confirmPassword, oldPassword } = req.body;
    if (!oldPassword) return next(new ErrorHander(`Old password is required!`, 400));
    const user = await User.findById(req.user.id).select('+password');
    if (! await user.comparePassword(oldPassword)) return next(new ErrorHander(`Old password is incorrect!`, 400));
    if (! await user.comparePassword(oldPassword)) return next(new ErrorHander(`Old password is incorrect!`, 400));
    if (password !== confirmPassword) return next(new ErrorHander(`Password and confirm password doesn't match!`, 400));

    user.password = password;
    await user.save();
    sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) return next(new ErrorHander(`Please provide those credentials`, 400));
    await User.findByIdAndUpdate(req.user.id, { name, email }, {
        new: true, runValidators: true, useFindAndModify: false
    });
    res.status(200).json({
        success: true,
    })
});


//get All user (admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const perPage = 2;
    const usersCount = await User.countDocuments();
    const apiFeatures = new ApiFeatures(User.find(), req.query)
        .search()
        .pagintion(perPage);
    const users = await apiFeatures.query;
    res.status(200).json({
        message: "Alhamdu Lillah",
        users,
        usersCount
    });
});
//User details
exports.getUserDetils = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) return next(new ErrorHander(`Please provide those credentials`, 400));
    await User.findByIdAndUpdate(req.user.id, { name, email }, {
        new: true, runValidators: true, useFindAndModify: false
    });
    res.status(200).json({
        success: true,
    })
});

//User details (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHander(`user not found form id: ${id}`, 404));
    res.status(200).json({
        success: true,
        user
    })
});
//update user role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const { role } = req.body;
    if (!role) return next(new ErrorHander(`Plealse provide the role`, 400));
    await User.findByIdAndUpdate(req.user.id, { role }, {
        new: true, runValidators: true, useFindAndModify: false
    });
    res.status(200).json({
        success: true,
    })
});

//Delete user (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(id);
    if (!user) return next(new ErrorHander(`user not found form id: ${id}`, 404));
    await user.remvoe();
    res.status(200).json({
        success: true,
    })
});
// const nDate = new Date().toLocaleString('bn-BD', {
    //     timeZone: 'Asia/Dhaka'
    // });