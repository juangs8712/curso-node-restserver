
import { request, response } from "express";
import path from 'path';
import fs from 'fs';

import { subirArchivo } from "../helpers/index.js";
import { Producto, Usuario } from "../models/index.js";

// -----------------------------------------------------
export const cargarArchivo = async ( req = request, res = response ) => {

    try {
        // const nombre = await subirArchivo( req.files, [ 'txt', 'md' ], 'textos' );   
        // el undefined es para que cargue los argumentos por defecto 
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );   
         
        res.json({ nombre });        
    } catch ( msg ) {
        res.status( 400 ).json({ msg });
    }
}
// -----------------------------------------------------
export const actualizarImagen = async ( req = request, res = response ) => {

    const { coleccion } = req.params;

    const modelo = req.coleccion;

    // limpiar imagenes previas
    if ( modelo.img ) {        
        const __dirname = path.resolve();
        const pathImagen 
            = path.join( __dirname, '/uploads', coleccion, modelo.img  ) ;
        
        // preguntar si la imagen existe en el directorio ../uploads/colecion/...
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );        // esto borra la imagen del directorio uploads
        }
    }

    modelo.img = await subirArchivo( req.files, undefined, coleccion );
    modelo.save();

    res.json( modelo )
}
// -----------------------------------------------------
export const mostrarImagen = async ( req = request, res = response ) => {
    const { coleccion } = req.params;

    const modelo = req.coleccion;

    const __dirname = path.resolve();
    if ( modelo.img ) {        
        const pathImagen 
            = path.join( __dirname, '/uploads', coleccion, modelo.img  ) ;
        
        // preguntar si la imagen existe en el directorio ../uploads/colecion/...
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen );        
        }
    }

    const pathPlaceholder = path.join( __dirname, '/assets/no-image.jpg' );
    res.sendFile( pathPlaceholder );
}
// -----------------------------------------------------
