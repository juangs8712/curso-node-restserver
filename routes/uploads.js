import { Router } from 'express';
import { check } from 'express-validator';


import { 
    cargarArchivo, 
    actualizarImagen, 
    mostrarImagen 
} from '../controllers/index.js';
import { 
    checkUploadsParam, 
    validarArchivoSubir, 
    validarCampos 
} from '../middlewares/index.js';


// -----------------------------------------------------
const router = Router();
// -----------------------------------------------------

router.post( '/', validarArchivoSubir, cargarArchivo );
// -----------------------------------------------------
// esta es otra forma de validar un parametro
// check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
router.put( '/:coleccion/:id', [
    check( 'id', 'El id deber ser de mongo' ).isMongoId(),
    validarArchivoSubir,
    validarCampos,
    checkUploadsParam
], actualizarImagen );
// -----------------------------------------------------
router.get('/:coleccion/:id', [
    check( 'id', 'El id deber ser de mongo' ).isMongoId(),
    validarCampos,
    checkUploadsParam
], mostrarImagen );
// -----------------------------------------------------

// -----------------------------------------------------

// -----------------------------------------------------

export default router;
// -----------------------------------------------------
