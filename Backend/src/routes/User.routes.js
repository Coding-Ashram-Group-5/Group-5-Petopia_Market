"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_middleware_js_1 = require("../middlewares/isAuth.middleware.js");
const User_controller_js_1 = require("../controllers/User.controller.js");
const multer_middleware_js_1 = require("../middlewares/multer.middleware.js");
const router = (0, express_1.Router)();
router.route('/signup').post(multer_middleware_js_1.upload.single('avatar'), User_controller_js_1.registerUser);
router.route('/signin').post(User_controller_js_1.loginUser);
// Refresh Access Token
router.route('/refresh/token').get(User_controller_js_1.refreshAccessToken);
// Protected or Secure Route
router.route('/logout').get(isAuth_middleware_js_1.isAuthenticate, User_controller_js_1.logoutUser);
router.route('/delete/:id').delete(isAuth_middleware_js_1.isAuthenticate, User_controller_js_1.deleteAccount);
exports.default = router;
