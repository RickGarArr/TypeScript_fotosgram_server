import { Request, Response } from "express";
import sendError from "../helpers/SendError";
import { IRequest, IRequestFile } from "../interfaces/IRequest";
import { Posteo } from "../modelos/posteo.model";
import borrarCarpeta from "../helpers/EliminarDirectorio";
import path from 'path';
import fs from 'fs';

async function posteo(req: Request, res: Response) {
    let imagenes = (req as IRequestFile).files.map((file: Express.Multer.File) => {
        return file.filename;
    });
    try {
        const posteoDB = await Posteo.create({
            usuario: (req as IRequest).id,
            imagenes,
            coordenadas: req.body.coordenadas,
            mensaje: req.body.mensaje
        });
        res.json({
            ok: true,
            posteoDB
        });
    } catch(err) {
        sendError(res, 'Problemas al subir la imagen');
        const carpetaABorrar = path.resolve(__dirname, `../uploads/${(req as IRequest).id}`);
        borrarCarpeta(carpetaABorrar);
        console.log(err);
    }
}

async function getAll(req: Request, res: Response) {    
    const page = Number(req.query.page) || 1;    
    try {
        const allPost = await Posteo.find()
            .populate('usuario', '-password')
            .sort({ id: -1})
            .skip(page * 10 - 10)
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

async function sendImagen(req: Request, res: Response) {
    const imagenPath = path.resolve(__dirname, `../uploads/${(req as IRequest).id}/${req.params.imagen}`);
    if (fs.existsSync(imagenPath)) {
        res.sendFile(imagenPath);
    } else {
        sendError(res, `recurso ${req.params.imagen} no encontrado`);
    }
}

export { posteo, getAll, sendImagen }