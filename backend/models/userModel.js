const { Schema, model } = require("mongoose");
const validator = require("validator");
const { hash, compare } = require('bcryptjs');
const { randomBytes, createHash } = require('crypto');
const { sign } = require('jsonwebtoken');
const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        maxLength: [30, "Name must be less than 30 chars"],
        minLength: [5, "Name must be greter than 4 chars"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your mail address!"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter strong password!"],
        minLength: [8, "Password should be greater than 8 chars!"],
        trim: true,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {
    //update time working
    if (!this.isModified('password')) {
        next();
    }
    this.password = await hash(this.password, 10);
});
//JWT Token
userSchema.methods.getJWTToken = function () {
    return sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
}
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
}
userSchema.methods.getResetPasswordToken = function () {
    //Generating Token
    const resetToken = randomBytes(20).toString('hex');
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = model('User', userSchema);
