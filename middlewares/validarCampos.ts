import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";

function validarCampos( req: any, res: any, next: any) {
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(401).json({
            ok: false,
            errores: errores.array()
        });
    }
    next();
}

export default validarCampos;