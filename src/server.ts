import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';

import APIRouter from "./routes/api/APIRouter";

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.configs();
        this.routes();
    }

    public configs(): void {

        // Express Middlewares
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.resolve("../app/dist")));
        this.app.use(cors());

        // MongoDB Connection
        const MONGO_URI: string = 'mongodb://localhost/mean-blog'; 
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI,{ useMongoClient: true },(err)=>{
            if(err) throw err;
            console.log("MongoDB connection established")
        });


    }

    public routes(): void {
        // const router: express.Router = APIRouter;
        console.log("This is a type of router : " + typeof(APIRouter))
        // this.app.use('/', router);

        this.app.use('/api/v1', APIRouter);
        
        this.app.get("*", (req, res, next) => {
            res.sendFile(path.resolve("../app/dist/index.html"));
        })
    }

}


export default new Server().app;
