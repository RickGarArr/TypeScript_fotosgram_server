import { Request, Response } from "express";
import sendError from "../helpers/SendError";
import { IRequest, IRequestFile } from "../interfaces/IRequest";
import { Posteo } from "../modelos/posteo.model";
import moment from 'moment';
import borrarCarpeta from "../helpers/EliminarDirectorio";
import path from 'path';

async function posteo(req: Request, res: Response) {
    let imagenes = (req as IRequestFile).files.map((file: Express.Multer.File) => {
        return `${(req as IRequestFile).fecha}/${file.filename}`;
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
        const carpetaABorrar = path.resolve(__dirname, `../uploads/${(req as IRequest).id}/${(req as IRequestFile).fecha}`);
        borrarCarpeta(carpetaABorrar);
        console.log(err);
    }
}

async function getAll(req: Request, res: Response) {    
    console.log(moment().format('YYYY_MM_DD_hh'));
    
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