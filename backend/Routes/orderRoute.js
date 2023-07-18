const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrderDetails,
} = require("../Controllers/orderController");
const Router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

Router.route('/order/new').post(isAuthenticatedUser, newOrder);

Router.route('/order/:id').get(isAuthenticatedUser, getOrderDetails);

Router.route('/orders/me').get(isAuthenticatedUser, myOrders);

Router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);

Router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = Router;