import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export default class JWToken {
    private static seed: string = process.env.SEED as string;
    private static caducidad: string = '30d';

    constructor() {}

    public static getJwToken(idUsuario: ObjectId): string{
        return jwt.sign({user: idUsuario},  JWToken.seed, {expiresIn: JWToken.caducidad});
    }

    public static comprobarJwToken(token: string){
        return new Promise((resolve, reject)=>{
            jwt.verify(token, JWToken.seed, (err: any, decoded: any)=>{
                if(err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}