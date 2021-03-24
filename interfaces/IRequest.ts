import { Request, RequestParamHandler } from "express";
import { ObjectId } from "mongoose";

export interface IRequest extends Request {
    id: ObjectId;   
}

export interface IRequestFile extends Request {
    errorValidacionArchivo: string;
    files: Express.Multer.File[];
    nombreUnico: string;
    fecha: string;
}