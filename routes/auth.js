import { Router } from 'express';
import { check } from 'express-validator';

import { googleSignin, login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';


// -----------------------------------------------------
export const authRouter = Router();
// -----------------------------------------------------
authRouter.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login
);
// -----------------------------------------------------
authRouter.post('/google', [
    check('id_token', 'El id_token es necesario').notEmpty(),
    validarCampos
], googleSignin
);

// -----------------------------------------------------
