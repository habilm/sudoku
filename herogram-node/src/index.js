"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.json({ status: "success" });
});
app.use("/v1/", routes_1.default);
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
