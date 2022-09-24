import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';


// -----------------------------------------------------
const authRouter = Router();
// -----------------------------------------------------
authRouter.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login);
// -----------------------------------------------------
export default authRouter;
// -----------------------------------------------------
