import { Request, Response, NextFunction } from 'express';
import JWToken from '../helpers/JWToken';
export default async function(req: any, res: Response, next: NextFunction) {
    const userToken = req.get('x-token');
    if(!userToken) {
        return res.status(400).json({
            ok: false,
            msg: 'No Hay Token En La Peticion'
        });
    }

    try{
        const decoded: any = await JWToken.comprobarJwToken(userToken);
        req.id = decoded.user;
        next();
    } catch(e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Error al comprobar el Tokn'
        });
    }
}