import { Document, ObjectId } from 'mongoose';
export default interface IPosteo extends Document {
    created: Date;
    mensaje: string;
    imagenes: string[];
    coordenadas: string;
    usuario: ObjectId;
}