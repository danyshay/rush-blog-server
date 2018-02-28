import { Router } from 'express';
import postController from "../../controller/PostController";


class APIRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get("/posts", postController.getAll);
        this.router.get("/post/:slug",postController.getOnePost)
        this.router.post("/post", postController.createPost)
        this.router.put("/post/:slug",postController.updatePost);
        this.router.delete("/post/:slug",postController.deletePost)
    }

}

const apiRouter = new APIRouter();
apiRouter.routes();
export default apiRouter.router;

