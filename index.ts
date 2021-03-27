import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import Server from './clases/Server';
import todasRutas from './rutas/todas.routes';
import conexionDB from './clases/Conexion';

Server.app.use(express.urlencoded({extended: true}));
Server.app.use(express.json());
Server.app.use(cors());
Server.app.use(todasRutas);

conexionDB().then(resp => {
    console.log(resp);
}).catch(err => {
    console.log('Error al conectar con la base de datos');
});

Server.start();