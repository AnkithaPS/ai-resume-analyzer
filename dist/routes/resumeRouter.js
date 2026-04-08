"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeRouter = void 0;
const express_1 = __importDefault(require("express"));
const resumeController_1 = require("../controllers/resumeController");
const auth_1 = require("../middlewares/auth");
const resumeRouter = express_1.default.Router();
exports.resumeRouter = resumeRouter;
resumeRouter.post("/analyzer", auth_1.authHandler, resumeController_1.analyze);
