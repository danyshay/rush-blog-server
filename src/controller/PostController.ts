import { Router, Request, Response } from 'express'
import postModel from "../models/Post";
import { Document } from 'mongoose';
import { MongoError } from 'mongodb';

export class PostController {

    public getAll(req: Request, res: Response): void {


        postModel.find()
            .then((data) => {
                res.status(200).json({ succes: true, data: data })
            })
            .catch((error) => {
                res.json({ success: false, msg: "Internal Error" });
            })

    }


    public getOnePost(req: Request, res: Response): void {

        let slug = req.params.slug;
        console.log(slug)

        let response = {
            success: false,
            msg: ""
        }

        postModel.findOne({ slug: slug }, (err, data) => {

            if (err) {
                response.msg = "Internal Error";
                res.json(response)
            }

            if (!data) {
                response.msg = "Invalid Slug Provided";
                res.json(response);
            }

            res.json({ success: true, data: data });


        })


    }

    public createPost(req: Request, res: Response): void {

        let response = {
            success: false,
            msg: ""
        }


        let title: String = req.body.title;
        // res.json(title)
        // let slug:String = this.createSlug(title);
        let slug: String = title.replace(/ /g, "-").toLowerCase();
        let postContent = req.body.postContent;

        let newPost = new postModel({
            title: title,
            slug: slug,
            body: postContent
        })


        newPost.save().then(data => {

            response.msg = "Post Created";
            response.success = true;
            res.json(response)

        }).catch((error: MongoError) => {
            response.msg = error.message;
            res.json(response).status(403)
            // return
        })

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

    }

    public updatePost(req: Request, res: Response): void {
        let slug: String = req.params.slug;

        postModel.findOne({ slug: slug }, (err, data) => {

            let response = {
                success: false,
                msg: ""
            }

            if (err) {
                response.msg = err;
                res.json(response)
            }

            if (!data || data == null) {
                response.msg = "Invalid Slug Provided";
                res.json(response);
            }


            // For some reason the code runs after even sending data :(
            if (data != null) {

                console.log("THis is a tests")

                let title: String = req.body.title;
                // res.json(title)
                // let slug:String = this.createSlug(title);
                let slug: String = title.replace(/ /g, "-").toLowerCase();
                let postContent = req.body.postContent;

                let newUpdate = {
                    title: title,
                    slug: slug,
                    body: postContent
                }

                console.log(data)



                postModel.update({ _id: data._id }, newUpdate, (err, newData) => {

                    if (err) {
                        response.msg = "Internal Erorr";
                        res.json(response);
                    }

                    console.log(newData)

                    response.success = true;
                    response.msg = "Post has been updated";

                    res.json(response)

                })

            }



        })



    }

    public deletePost(req: Request, res: Response): void {

        let slug: String = req.params.slug;

        postModel.findOneAndRemove({ slug: slug }, (err: any, responseDocument: Document) => {

            let response = {
                success: false,
                msg: ""
            }

            if (err) {
                response.msg = "Internal Errors"
                res.json(response);
            }


            if (responseDocument != null) {
                response.success = true;
                response.msg = "Post has been deleted";
                res.json(response)
            } else {
                response.msg = "Invalid Slug Provided"
                res.json(response)
            }


        })

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


    }

    public createSlug(title: String): String {
        let slug: String = title.replace(" ", "-");
        return slug;

    }

}

const postController = new PostController();

export default postController;