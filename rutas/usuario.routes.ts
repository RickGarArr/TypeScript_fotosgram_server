import { Router } from 'express';
import { check } from 'express-validator';
import {crear, login, update} from '../controladores/usuario.controller';
import validarCampos from '../middlewares/validarCampos';
import validarToken from '../middlewares/validarToken';

const usuarioRoutes = Router();

usuarioRoutes.post('/create', [
    check('nombre', 'El Nombre Es Necesario').notEmpty(),
    check('email', 'El Email es necesario').isEmail(),
    check('password', 'El Password Es Necesario').notEmpty(),
    validarCampos
], crear);

usuarioRoutes.post('/login', [
    check('email', 'El Email es necesario').isEmail(),
    check('password', 'El Password Es Necesario').notEmpty(),
    validarCampos
], login)

usuarioRoutes.put('/update', [
    validarToken,
    check('nombre', 'El Nombre es necesario').notEmpty(),
    validarCampos
], update);

export default usuarioRoutes;