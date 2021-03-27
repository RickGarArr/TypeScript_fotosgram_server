import { Router } from "express";
import { getAll, posteo, sendImagen } from "../controladores/posteo.controller";
import validarToken from "../middlewares/validarToken";
import validarImagenes from "../middlewares/validarImagenes";
import { param } from "express-validator";
import validarCampos from "../middlewares/validarCampos";
const posteoRoutes = Router();

posteoRoutes.get('/all', validarToken, getAll);

posteoRoutes.get('/imagen/:imagen', [
    validarToken
], sendImagen);

posteoRoutes.post('/', [
    validarToken,
    validarImagenes
], posteo);

export default posteoRoutes;