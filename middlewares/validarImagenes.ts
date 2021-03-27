import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sendError from '../helpers/SendError';
import path from 'path';
import fs from 'fs';
import generarNombreUnico from '../helpers/GenerarNombreUnico';
import { IRequest, IRequestFile } from '../interfaces/IRequest';
import moment from 'moment';

export default function imageMiddleware(req: Request, res: Response, next: NextFunction) {
    let upload = multer({storage: storage, fileFilter: imageFilter}).array('images', 5);
    upload(req, res, function(err: any) {
        if (err instanceof multer.MulterError) {
            return sendError(res, err.message);
        } else if (err instanceof Error) {
            return sendError(res, err.message);
        } else if (req.files == undefined || req.files.length === 0) {
            return sendError(res, 'No se subió ningun archivo');
        }
        next();
    });    
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToSave = path.resolve(__dirname, `../uploads/${(req as IRequest).id}`);
        if(!fs.existsSync(pathToSave)) {
            fs.mkdirSync(pathToSave, {recursive: true});
        }
        callback(null, pathToSave);
    },
    filename: function(req, file, callback) {        
        const nombreUnico = generarNombreUnico(file.originalname);
        callback(null, nombreUnico);
    }
});

const imageFilter = function(req: any, file: Express.Multer.File , cb: FileFilterCallback) {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1].toLocaleLowerCase();
    const extValidas = ['png', 'jpg', 'jpeg', 'gift'];
    if (extValidas.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Error, tipo de archivo no valido'));
    }
};
