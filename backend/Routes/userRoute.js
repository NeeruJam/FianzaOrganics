const express = require('express');
const Router = express.Router();
const {userRegistration, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser} =require('../Controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

Router.route('/register').post(userRegistration);
Router.route('/login').post(loginUser);

Router.route('/logout').get(logout);

Router.route("/password/forgot").post(forgotPassword);

Router.route("/password/reset/:token").put(resetPassword);

Router.route("/me").get(isAuthenticatedUser ,getUserDetails);

Router.route("/password/update").put(isAuthenticatedUser ,updatePassword);

Router.route("/me/update").put(isAuthenticatedUser ,updateProfile);

Router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

Router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser).put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = Router;