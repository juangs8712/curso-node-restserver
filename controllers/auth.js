import { response, request } from "express";
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario.js';
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";


// -----------------------------------------------------
export const login = async ( req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        // verificar si el correo existe
        const usuario = await Usuario.findOne( { correo } );
        if ( ! usuario ) {
            return res.status( 400 ).json( {
                msg: "Usuario o contraseña incorrectos - correo"
            });
        }
        
        // verificar si el usuario esta activo
        if ( ! usuario.estado ) {
            return res.status( 400 ).json( {
                msg: "Usuario o contraseña incorrectos - estado: false"
            });
        }

        // verificar la clave
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( ! validPassword ) {
            return res.status( 400 ).json( {
                msg: "Usuario o contraseña incorrectos - password"
            });
        }
        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        }); 
    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({
            msg: "Hable con el administrador"
        });
    }    
}
// -----------------------------------------------------
export const googleSignin = async ( req, res = response ) => {
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne( { correo } );

        if ( ! usuario ) {
            // crear un usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        // si el usuario esta bloqueado
        if ( !usuario.estado ){
            return res.status( 401 ).json({
                msg: 'Hable con el administrador - usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log( error );
        res.status( 400 ).json({
            msg: 'Token de Google no válido.'
        });
    }

}
// -----------------------------------------------------