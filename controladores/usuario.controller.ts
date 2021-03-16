import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../modelos/usuario.model';
import JWToken from '../helpers/JWToken';

const crear = async (req: Request, res: Response) => {
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
    }
    try {
        const usuarioDB = await Usuario.create(usuario);
        const token = await JWToken.getJwToken(usuarioDB.id);
        res.json({
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: 'error al crear el usuario'
        });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const usuarioDB = await Usuario.findOne({email: req.body.email});
        if (!usuarioDB) {
            return res.json({
                msg: 'No hay usuario con ese email'
            });
        }

        if(!usuarioDB.compararPasswords(req.body.password)) {
            return res.json({
                msg: 'Contraseña Invaalida'
            });
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

const update = async (req: any, res: Response) => {
    const { nombre, email, avatar } = req.body;
    const userUpdate = {
        nombre
    }

    try {
        const usuarioBD = await Usuario.findById(req.id, userUpdate, {new: true});
        res.json({
            usuarioBD
        });
    } catch(error) {
        res.json({
            ok: false,
            msg: 'NO Existe El Uusuario'
        })
    }

}

export {crear, login, update};