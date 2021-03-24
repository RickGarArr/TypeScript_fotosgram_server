import {Router} from 'express';
import posteoRoutes from './posteo.routes';
import usuarioRoutes from './usuario.routes';
const todasRutas = Router();

todasRutas.use('/usuario', usuarioRoutes);
todasRutas.use('/posteo', posteoRoutes);

export default todasRutas;