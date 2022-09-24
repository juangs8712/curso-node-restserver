import { Router } from 'express';
import { check } from 'express-validator';

import { 
    validarCampos, 
    validarJWT, 
    esAdminRole, 
    tieneRole 
} from '../middlewares/index.js';

import { 
    esRoleValido, 
    emailExiste, 
    existeUsuarioById 
} from '../helpers/db-validators.js';

import { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch, 
} from '../controllers/usuarios.js';

// -----------------------------------------------------
const userRouter = Router();
// -----------------------------------------------------
userRouter.get('/', usuariosGet);
// -----------------------------------------------------
userRouter.put('/:id', 
    [
        check("id", "No es un ID válido").isMongoId(),
        check( 'id' ).custom( existeUsuarioById ),
        check('rol').custom( esRoleValido ),
        validarCampos
    ],
    usuariosPut);
// -----------------------------------------------------
userRouter.post('/',
    // estos son middlewares
    [
        check('nombre', 'El  nombre es obligatorio').notEmpty(),
        check('correo', 'El  correo no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres.').isLength({ min: 6 }),
        check('correo').custom( emailExiste ),
        // check('rol', 'El rol no es válido.').isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
        check('rol').custom( esRoleValido ),
        validarCampos        
    ],
    usuariosPost
);
// -----------------------------------------------------
userRouter.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE' ),
    check("id", "No es un ID válido").isMongoId(),
    check( 'id' ).custom( existeUsuarioById ),
    validarCampos
], usuariosDelete);
// -----------------------------------------------------
userRouter.patch('/', usuariosPatch);
// -----------------------------------------------------
export default userRouter;