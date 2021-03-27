import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";

function validarCampos( req: any, res: any, next: any) {
    const errores = validationResult(req);
    const err = errores.array().map( err => {
        return err.msg
    });
    if(!errores.isEmpty()) {
        return res.status(401).json({
            ok: false,
            errores: err
        });
    }
    next();
}

export default validarCampos;