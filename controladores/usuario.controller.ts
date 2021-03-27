import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../modelos/usuario.model';
import JWToken from '../helpers/JWToken';
import {IRequest} from '../interfaces/IRequest';
import sendError from '../helpers/SendError';

async function crear(req: Request, res: Response){
    try {
        const usuarioDB = await Usuario.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
            avatar: req.body.avatar
        });
        const token = await JWToken.getJwToken(usuarioDB.id);
        res.json({
            token
        });
    } catch (error) {
        if (error.name === 'MongoError') {
            if (error.code === 11000) {
                return sendError(res, 'El email ya está registrado');
            }
        }
        res.status(500).json({
            msg: 'error al crear el usuario'
        });
    }
}

async function login(req: Request, res: Response){
    try {
        const usuarioDB = await Usuario.findOne({email: req.body.email});
        if (!usuarioDB) {
            return sendError(res, 'Email es Incorrecto');
        }
        if(!usuarioDB.compararPasswords(req.body.password)) {
            return sendError(res, 'Contraseña Incorrecta');
        }
        const token = await JWToken.getJwToken(usuarioDB.id);
        res.json({
            token
        });
    } catch(error) {
        console.log(error);
        res.status(400).json({
            msg: 'error al iniciar sesion'
        });
    }
}

async function update(req: Request, res: Response){
    // retirar la propiedad password para que no se cambie
    const { password, ...usuario } = req.query;
    try {
        const usuarioDB = await Usuario.findByIdAndUpdate((req as IRequest).id, usuario, { new: true });
        const token = await JWToken.getJwToken(usuarioDB?.id);
        res.json({
            token
        });
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'error al actualizar el usuario'
        })
        console.log(err);
    }
}

async function get(req: Request, res: Response) {
    try {
        const usuarioDB = await Usuario.findById((req as IRequest).id);
        res.json({
            ok: true,
            usuarioDB
        });
    } catch (err) {
        sendError(res, 'error al encontrar el usuario');
    }
    
}

export {crear, login, update, get};