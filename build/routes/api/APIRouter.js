"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PostController_1 = require("../../controller/PostController");
var APIRouter = /** @class */ (function () {
    function APIRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    APIRouter.prototype.routes = function () {
        this.router.get("/posts", PostController_1.default.getAll);
        this.router.get("/post/:slug", PostController_1.default.getOnePost);
        this.router.post("/post", PostController_1.default.createPost);
        this.router.put("/post/:slug", PostController_1.default.updatePost);
        this.router.delete("/post/:slug", PostController_1.default.deletePost);
    };
    return APIRouter;
}());
var apiRouter = new APIRouter();
apiRouter.routes();
exports.default = apiRouter.router;
//# sourceMappingURL=APIRouter.js.map