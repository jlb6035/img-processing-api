"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var images = express_1.default.Router();
images.get("/", function (req, res) {
    var filename = req.query.filename;
    var width = req.query.width;
    var height = req.query.height;
    (0, sharp_1.default)("./fjord.jpg")
        .resize(500, 200)
        .toFile("out_2.jpg");
});
exports.default = images;
