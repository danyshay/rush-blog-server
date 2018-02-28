"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
var APIRouter_1 = require("./routes/api/APIRouter");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.configs();
        this.routes();
    }
    Server.prototype.configs = function () {
        // Express Middlewares
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.resolve("../app/dist")));
        this.app.use(cors());
        // MongoDB Connection
        var MONGO_URI = 'mongodb://localhost/mean-blog';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, { useMongoClient: true }, function (err) {
            if (err)
                throw err;
            console.log("MongoDB connection established");
        });
    };
    Server.prototype.routes = function () {
        // const router: express.Router = APIRouter;
        console.log("This is a type of router : " + typeof (APIRouter_1.default));
        // this.app.use('/', router);
        this.app.use('/api/v1', APIRouter_1.default);
        this.app.get("*", function (req, res, next) {
            res.sendFile(path.resolve("../app/dist/index.html"));
        });
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map