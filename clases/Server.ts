import Express from 'express';
import {IRouter} from 'express';

export default class Server {
    public static app: Express.Application = Express();
    private static port: number = 3030;

    constructor() {
    }

    public static start():void {
        try {
            Server.app.listen(Server.port, ()=>{
                console.log(`Servidor Escuchando en el puerto: ${Server.port}`);
            });
        } catch(error) {
            console.log('error al conectar a base de datos');
            
        }
    }

}