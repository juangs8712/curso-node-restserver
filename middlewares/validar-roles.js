import { request, response } from 'express';


import Usuario from '../models/usuario.js';

// -----------------------------------------------------
export const esAdminRole = ( req = request, res = response, next ) => {
    // verificar si el token esta validado
    if ( ! req.usuario ){
        return res.status( 500 ).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }
    
    const  { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ){
        return res.status( 401 ).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}
// -----------------------------------------------------
export const tieneRole = ( ...roles ) => {

    return ( req = request, res = response, next ) => {
        // verificar si el token esta validado
        if ( ! req.usuario ){
            return res.status( 500 ).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if ( ! roles.includes( req.usuario.rol ) ) {
            return res.status( 401 ).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            });
        }

        next();
    }
}
// -----------------------------------------------------