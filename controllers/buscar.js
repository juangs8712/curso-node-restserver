import { request, response } from "express";
import { isValidObjectId } from "mongoose";
import { Usuario, Categoria, Producto } from "../models/index.js";


// -----------------------------------------------------
const coleccionesPermitidas = [
    "categorias",
    "usuarios",
    "productos",
    "roles"
];

const idNoValido = 'Este ID no corresponde a la coleccion especificada';

// -----------------------------------------------------
const buscarUsuario = async ( termino = '', res = response ) => {
    const esMongoID = isValidObjectId( termino );

    if ( esMongoID ) {
        const usuario = await Usuario.findById( termino );

        return res.json( { 
            results: usuario ? [ usuario ] : [] 
        });
    }

    const usuarios = Usuario.find( { nombre: termino } );

    res.json({
        results: usuarios
    })
}

// -----------------------------------------------------
export const buscar = async ( req = request, res = response ) => {
    const { coleccion, termino } = req.params;

    if ( ! coleccionesPermitidas.includes( coleccion ) ) {
        return res.status( 400 ).json({
            msg: `Las colecciones permitidas son: [ ${ coleccionesPermitidas } ]`
        });
    }

    switch ( coleccion ) {
        case 'categorias':
        
        break;
        case 'usuarios':
            await buscarUsuario( termino, res );
        break;
        case 'productos':
        
        break;
        default:
            return res.status( 500 ).json({
                msg: 'Se le olvidó hacer esta búsqueda.'
            })
            break;
    }

    
}
// -----------------------------------------------------