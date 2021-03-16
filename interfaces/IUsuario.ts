import { Document } from 'mongoose';
export default interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    compararPasswords(password: string): boolean;
}