import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sendError from '../helpers/SendError';

export default function imageMiddleware(req: Request, res: Response, next: NextFunction) {
    let upload = multer({fileFilter: imageFilter }).array('images', 5);

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

const imageFilter = function(req: any, file: Express.Multer.File , cb: FileFilterCallback) {
    console.log(file.originalname);
    
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1].toLocaleLowerCase();
    const extValidas = ['png', 'jpg', 'jpeg', 'gift'];
    if (extValidas.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Error, tipo de archivo no valido'));
    }
};

interface IRequest extends Request {
    errorValidacionArchivo: string;
}
