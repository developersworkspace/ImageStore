// Imports
import express = require("express");
import bodyParser = require("body-parser");

// Import Routes
import * as imageRouter from './routes/image';


export class WebApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    private configureMiddleware(app: express.Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));;
        
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/images", imageRouter);
    }

    public run() {
        this.app.listen(this.port);
    }
}


let port = 3000;
let api = new WebApi(express(), port);
api.run();
console.info(`Listening on ${port}`);