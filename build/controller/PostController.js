"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post_1 = require("../models/Post");
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.getAll = function (req, res) {
        Post_1.default.find()
            .then(function (data) {
            res.status(200).json({ succes: true, data: data });
        })
            .catch(function (error) {
            res.json({ success: false, msg: "Internal Error" });
        });
    };
    PostController.prototype.getOnePost = function (req, res) {
        var slug = req.params.slug;
        console.log(slug);
        var response = {
            success: false,
            msg: ""
        };
        Post_1.default.findOne({ slug: slug }, function (err, data) {
            if (err) {
                response.msg = "Internal Error";
                res.json(response);
            }
            if (!data) {
                response.msg = "Invalid Slug Provided";
                res.json(response);
            }
            res.json({ success: true, data: data });
        });
    };
    PostController.prototype.createPost = function (req, res) {
        var response = {
            success: false,
            msg: ""
        };
        var title = req.body.title;
        // res.json(title)
        // let slug:String = this.createSlug(title);
        var slug = title.replace(/ /g, "-").toLowerCase();
        var postContent = req.body.postContent;
        var newPost = new Post_1.default({
            title: title,
            slug: slug,
            body: postContent
        });
        newPost.save().then(function (data) {
            response.msg = "Post Created";
            response.success = true;
            res.json(response);
        }).catch(function (error) {
            response.msg = error.message;
            res.json(response).status(403);
            // return
        });
        // newPost.save((error, data) => {
        //     if (error) {
        //         response.msg = error;
        //         res.json(response).status(403)
        //         return
        //     }
        //     response.msg = "Post Created";
        //     response.success = true;
        //     res.json(response)
        // })
    };
    PostController.prototype.updatePost = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOne({ slug: slug }, function (err, data) {
            var response = {
                success: false,
                msg: ""
            };
            if (err) {
                response.msg = err;
                res.json(response);
            }
            if (!data || data == null) {
                response.msg = "Invalid Slug Provided";
                res.json(response);
            }
            // For some reason the code runs after even sending data :(
            if (data != null) {
                console.log("THis is a tests");
                var title = req.body.title;
                // res.json(title)
                // let slug:String = this.createSlug(title);
                var slug_1 = title.replace(/ /g, "-").toLowerCase();
                var postContent = req.body.postContent;
                var newUpdate = {
                    title: title,
                    slug: slug_1,
                    body: postContent
                };
                console.log(data);
                Post_1.default.update({ _id: data._id }, newUpdate, function (err, newData) {
                    if (err) {
                        response.msg = "Internal Erorr";
                        res.json(response);
                    }
                    console.log(newData);
                    response.success = true;
                    response.msg = "Post has been updated";
                    res.json(response);
                });
            }
        });
    };
    PostController.prototype.deletePost = function (req, res) {
        var slug = req.params.slug;
        Post_1.default.findOneAndRemove({ slug: slug }, function (err, responseDocument) {
            var response = {
                success: false,
                msg: ""
            };
            if (err) {
                response.msg = "Internal Errors";
                res.json(response);
            }
            if (responseDocument != null) {
                response.success = true;
                response.msg = "Post has been deleted";
                res.json(response);
            }
            else {
                response.msg = "Invalid Slug Provided";
                res.json(response);
            }
        });
        // postModel.findOneAndRemove({ slug: slug })
        //     .then((err) => {
        //         if(err){
        //             res.json("this is ates")
        //         }
        //         res.json(
        //             { success: true, msg: "Post Deleted" }
        //         );
        //     })
        //     .catch(() => {
        //         res.json(
        //             { success: false, msg: "Internal Errors" }
        //         );
        //     })
    };
    PostController.prototype.createSlug = function (title) {
        var slug = title.replace(" ", "-");
        return slug;
    };
    return PostController;
}());
exports.PostController = PostController;
var postController = new PostController();
exports.default = postController;
//# sourceMappingURL=PostController.js.map