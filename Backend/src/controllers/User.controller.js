"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.deleteAccount = exports.logoutUser = exports.registerUser = exports.loginUser = void 0;
const User_model_js_1 = __importDefault(require("../models/User.model.js"));
const APIError_util_js_1 = require("../utils/APIError.util.js");
const APIResponse_util_js_1 = require("../utils/APIResponse.util.js");
const AsyncHandler_util_js_1 = __importDefault(require("../utils/AsyncHandler.util.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_js_1.default.findById(id);
        if (!user) {
            return new APIError_util_js_1.APIError('User not found', 404);
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        yield user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        console.log(error);
        return new APIError_util_js_1.APIError('Error While Generating Token', 502);
    }
});
const loginUser = (0, AsyncHandler_util_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(402).json(new APIError_util_js_1.APIError('All Fields are Required', 402));
        }
        const isUserExist = yield User_model_js_1.default.findOne({ email }).select('-refreshToken');
        if (!isUserExist) {
            return res.status(402).json(new APIError_util_js_1.APIError('User Not Exist', 402));
        }
        const isPasswordCorrect = yield isUserExist.ComparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(402).json(new APIError_util_js_1.APIError('Invalid User Credentials', 402));
        }
        const loggedInUser = yield User_model_js_1.default.findById(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id).select('-password -refreshToken -created_at -updated_at -__v');
        const { accessToken, refreshToken } = (yield generateToken(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id));
        res
            .status(200)
            .cookie('authToken', accessToken, {
            maxAge: 86400000 // 1 Days
        })
            .cookie('refreshToken', refreshToken, {
            maxAge: 1296000000 // 15 Days
        })
            .json(new APIResponse_util_js_1.APIResponse('User Logged In Successfully', 200, loggedInUser));
    }
    catch (error) {
        console.log('Error in Login Controller', error);
    }
}));
exports.loginUser = loginUser;
const registerUser = (0, AsyncHandler_util_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        if ([firstName, email, password].some((attr) => (attr === null || attr === void 0 ? void 0 : attr.trim()) === '')) {
            return res.status(402).json(new APIError_util_js_1.APIError('Required Fields are Missing', 402));
        }
        const isUserExist = yield User_model_js_1.default.findOne({
            email
        });
        if (isUserExist) {
            return res.status(402).json(new APIError_util_js_1.APIError('User Already Exist With Provided Email', 402));
        }
        if (password.length < 6) {
            return res.status(402).json(new APIError_util_js_1.APIError('Password Must be 8 Character Long', 402));
        }
        const createUser = yield User_model_js_1.default.create({
            firstName,
            lastName,
            email,
            password
        });
        const isUserCreated = yield User_model_js_1.default.findById({ _id: createUser._id }).select('-password -refreshToken -created_at -updated_at -__v');
        if (isUserCreated) {
            const { accessToken, refreshToken } = (yield generateToken(isUserCreated === null || isUserCreated === void 0 ? void 0 : isUserCreated._id));
            res
                .status(200)
                .cookie('authToken', accessToken, {
                maxAge: 604800000
            })
                .cookie('refreshToken', refreshToken, {
                maxAge: 2592000000
            })
                .json(new APIResponse_util_js_1.APIResponse('User Created Successfully', 200, isUserCreated));
        }
        else {
            res.status(502).json(new APIError_util_js_1.APIError('Failed to Create User', 502));
        }
    }
    catch (error) {
        console.log(error);
        return res.status(502).json(new APIError_util_js_1.APIError((error === null || error === void 0 ? void 0 : error.message) || 'Internal Server Error', 502));
    }
}));
exports.registerUser = registerUser;
const logoutUser = (0, AsyncHandler_util_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log(_id);
        yield User_model_js_1.default.findByIdAndUpdate({ _id }, {
            $unset: {
                refreshToken: ''
            }
        }, {
            new: true
        });
        res
            .status(200)
            .clearCookie('authToken')
            .json(new APIResponse_util_js_1.APIResponse('User Logged Out Successfully', 200, []));
    }
    catch (error) {
        console.log(error);
    }
}));
exports.logoutUser = logoutUser;
const deleteAccount = (0, AsyncHandler_util_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id) {
            return res.status(402).json(new APIError_util_js_1.APIError('Provide Necessary Parameters', 402));
        }
        const isUserExistWithId = yield User_model_js_1.default.findById(id);
        if (!isUserExistWithId) {
            return res.status(402).json(new APIError_util_js_1.APIError(`User Not Exist With ID : ${id}`, 402));
        }
        const isDeleted = yield User_model_js_1.default.findByIdAndDelete(id);
        if (!isDeleted) {
            return res.status(502).json(new APIError_util_js_1.APIError('Failed to Delete Account', 502));
        }
        res.status(200).json(new APIResponse_util_js_1.APIResponse('Account Deleted Successfully', 200, isDeleted));
    }
    catch (error) {
        console.log(error);
        res.status(502).json(new APIError_util_js_1.APIError('Failed to Delete Account', 502));
    }
}));
exports.deleteAccount = deleteAccount;
const refreshAccessToken = (0, AsyncHandler_util_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
        if (!token) {
            return res.status(402).json(new APIError_util_js_1.APIError('Refresh Token Required', 402));
        }
        if (REFRESH_TOKEN_SECRET) {
            const decodeToken = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
            if (!(decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken._id)) {
                return res.status(402).json(new APIError_util_js_1.APIError('Invalid or Expired Refresh Token', 402));
            }
            const isUserExist = yield User_model_js_1.default.findById(decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken._id);
            if (!isUserExist) {
                return res.status(402).json(new APIError_util_js_1.APIError('Invalid or Expired Refresh Token', 402));
            }
            const loggedInUser = yield User_model_js_1.default.findById(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id).select('-password -refreshToken -created_at -updated_at -__v');
            const { accessToken, refreshToken } = (yield generateToken(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id));
            res
                .status(200)
                .cookie('authToken', accessToken, {
                maxAge: 604800000 // 7 Days
            })
                .cookie('refreshToken', refreshToken, {
                maxAge: 2592000000 // 30 Days
            })
                .json(new APIResponse_util_js_1.APIResponse('User Logged In Successfully', 200, loggedInUser));
        }
        else {
            res.status(502).json(new APIError_util_js_1.APIError('Internal Server Error ENV Required', 502));
        }
    }
    catch (error) {
        console.log(error);
        res.status(502).json(new APIError_util_js_1.APIError((error === null || error === void 0 ? void 0 : error.message) || 'Internal Server Error', 502));
    }
}));
exports.refreshAccessToken = refreshAccessToken;
