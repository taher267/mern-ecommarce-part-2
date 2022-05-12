const router = require("express").Router();
const { isAuthinticatedUser, authintizeRoles } = require('../middlewires/auth');
const { registerUser, loginUser, logout, forgotPassword, updateUserRole, resetPassword, getUserDetail, updatePassword, updateProfile, getSingleUser, getAllUsers, deleteUser } = require("../controllers/userController");

router.post('/register', registerUser)
    .post('/login', loginUser)
    .get('/logout', logout)
    .post('/password/forget', forgotPassword)
    .put('/password/reset/:token', resetPassword)
    .get('/me', isAuthinticatedUser, getUserDetail)
    .put('/me/update', isAuthinticatedUser, updateProfile)
    .put('/password/update', isAuthinticatedUser, updatePassword)
    //admin
    .get('/admin/users', isAuthinticatedUser, authintizeRoles, getAllUsers)
    .put('/admin/user/:id', isAuthinticatedUser, authintizeRoles, updateUserRole)
    .delete('/admin/user/:id', isAuthinticatedUser, authintizeRoles, deleteUser)
    .get('/admin/user/:id', isAuthinticatedUser, authintizeRoles, getSingleUser)
module.exports = router