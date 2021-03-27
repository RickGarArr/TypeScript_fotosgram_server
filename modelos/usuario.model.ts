import { Schema, model, Document } from 'mongoose';
import IUsuario from '../interfaces/IUsuario';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema<IUsuario>({
    nombre: {
        type: String,
        required: [true, 'EL Nombre es Necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El Email Es NEcesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    password: {
        type: String,
        required: [true, 'La Contraseña es necesaria']
    },
}, {collection: 'usuarios'});

usuarioSchema.methods.compararPasswords = function(password: string = ""): boolean {
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.toJSON = function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};

export const Usuario = model('usuarios', usuarioSchema);
