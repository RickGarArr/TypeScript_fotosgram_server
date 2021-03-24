import { Request, Response } from "express";
import multer, { StorageEngine } from 'multer';
import saveImages from "../helpers/SaveImages";

import IRequest from "../interfaces/IRequest";
import { Posteo } from "../modelos/posteo.model";

async function posteo(req: Request, res: Response) {
    saveImages(req, res, (req as IRequest).id);
    res.json({
        ok: true
    })
}

async function getAll(req: Request, res: Response) {
    const page = Number(req.query.page) || 0;    
    try {
        const allPost = await Posteo.find()
            .populate('usuario', '-password')
            .sort({ id: -1})
            .skip(page * 10)
            .limit(10).exec();
        res.json({
            ok: true,
            page,
            allPost
        });
    } catch (err) {
        console.log(err);
    }
}

export { posteo, getAll }

/*
const body = req.body;
body.usuario = (req as IRequest).id;

try {
    const postDB = await Posteo.create(body);
    res.json({
        ok: true,
        postDB
    });
} catch (err) {
    console.log(err);
}
*/