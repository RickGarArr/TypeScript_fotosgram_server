import { Router } from "express";
import { getAll, posteo } from "../controladores/posteo.controller";
import validarToken from "../middlewares/validarToken";
import multer from 'multer';
import validarImagenes from "../middlewares/validarImagenes";
const posteoRoutes = Router();
const upload = multer;

posteoRoutes.get('/', validarToken, getAll);

posteoRoutes.post('/', [
    validarToken,
    validarImagenes
], posteo);

export default posteoRoutes;