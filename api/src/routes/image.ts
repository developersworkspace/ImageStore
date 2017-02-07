// Imports 
import { Express, Request, Response } from "express";

// Imports services
import { ImageService } from './../core/services/imageService';

import * as express from 'express';
let router = express.Router();


router.get('/exist', (req: Request, res: Response, next: Function) => {
    console.log('exist');
    let imageService = new ImageService();

    imageService.exist(req.query.hash).then((exist: Boolean) => {
        // res.json({
        //     exist: exist
        // });
        res.json({
            exist: false
        });
    }).catch((err: Error) => {
        res.status(500).json({
            message: err.message
        });
    });
});

router.post('/upload', (req: Request, res: Response, next: Function) => {
    console.log('upload');
    let imageService = new ImageService();

    imageService.upload(req.body).then((result: any) => {
        res.json(true);
    }).catch((err: Error) => {
        res.status(500).json({
            message: err.message
        });
    });
});

router.get('/list', (req: Request, res: Response, next: Function) => {

    let imageService = new ImageService();

    imageService.list().then((result: any) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).json({
            message: err.message
        });
    });
});

router.get('/drop', (req: Request, res: Response, next: Function) => {

    let imageService = new ImageService();

    imageService.drop().then((result: any) => {
        res.json(result);
    }).catch((err: Error) => {
        res.status(500).json({
            message: err.message
        });
    });
});



export = router;