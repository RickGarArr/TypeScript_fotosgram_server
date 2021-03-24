import { Response } from "express";

export default function sendError(res: Response, ...mensajes: string[]) {
    res.status(400).json({
        ok: false,
        errores: mensajes
    });
}