import {Router} from 'express';
import usuarioRoutes from './usuario.routes';
const todasRutas = Router();

todasRutas.use('/usuario', usuarioRoutes);

export default todasRutas;