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
exports.isAuthenticate = void 0;
const User_model_js_1 = __importDefault(require("../models/User.model.js"));
const APIError_util_js_1 = require("../utils/APIError.util.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AsyncHandler_util_js_1 = __importDefault(require("../utils/AsyncHandler.util.js"));
exports.isAuthenticate = (0, AsyncHandler_util_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let token;
        if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.authToken) {
            token = req.cookies.authToken;
        }
        else if (((_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization) && typeof req.headers.authorization === 'string') {
            token = req.headers.authorization.replace('Bearer ', '');
        }
        else if (req.body && typeof req.body.token === 'string') {
            token = req.body.token;
        }
        if (!token) {
            throw new APIError_util_js_1.APIError('Unauthorized Request', 402);
        }
        if (process.env.ACCESS_TOKEN_SECRET) {
            const decodeToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const userData = yield User_model_js_1.default.findById(decodeToken._id).select('-password -refreshToken');
            if (!userData) {
                throw new APIError_util_js_1.APIError('Invalid Access Token', 402);
            }
            req.user = userData;
            next();
        }
    }
    catch (error) {
        console.log(error);
        throw new APIError_util_js_1.APIError((error === null || error === void 0 ? void 0 : error.message) || 'Internal Server Error', 502);
    }
}));
