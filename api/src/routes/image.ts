// Imports 
import { Express, Request, Response } from "express";

// Imports services
import { ImageService } from './../core/services/imageService';

import * as express from 'express';
let router = express.Router();


router.get('/exist', (req: Request, res: Response, next: Function) => {
    let imageService = new ImageService();

    imageService.exist(req.query.hash).then((exist) => {
        res.json({
            exist: exist
        });
    }).catch((err: Error) => {
        res.status(500).json({
            message: err.message
        });
    });
});



export = router;