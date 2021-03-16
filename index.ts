import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

import Server from './clases/Server';
import bodyParser from 'body-parser';
import todasRutas from './rutas/todas.routes';
import conexionDB from './clases/Conexion';

Server.app.use(bodyParser.urlencoded({extended: true}));
Server.app.use(bodyParser.json());

Server.app.use(todasRutas);

conexionDB().then(resp => {
    console.log(resp);
}).catch(err => {
    console.log(err);
});

Server.start();