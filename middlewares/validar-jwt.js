import { request, response } from 'express';
import jwt from 'jsonwebtoken';

import Usuario from '../models/usuario.js';


// -----------------------------------------------------
export const validarJWT = async ( req = request, res = response, next ) => {
    // el x-token se envia en el header desde el cliente (Ej. desde Postman)
    const token = req.header( 'x-token' );

    // si el token no existe, retornar con un error 401
    if ( ! token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        // obtener el uid del usuario
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        // si el usuario no existe retorna con un error 401
        if ( !usuario ){
            return res.status( 401 ).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }

        // si el usuario.estado === false retorna un error 401
        if ( ! usuario.estado ){
            return res.status( 401 ).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        // agregar la informacion del usuario al request
        req.usuario = usuario;

        // ejecutar el middleware siguiente
        next();
    } catch (error) {
        console.log(error);
        return res.status( 401 ).json({
            msg: 'Token no válido'
        });
    }
}
// -----------------------------------------------------