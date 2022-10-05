
import path from 'path';
import fs from 'fs';

import { request, response } from "express";
import { v2 as cloudinary } from 'cloudinary';

import { subirArchivo } from "../helpers/index.js";
import { Producto, Usuario } from "../models/index.js";

// -----------------------------------------------------
// cloudinary.config( process.env.CLOUDINARY_URL );
 
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
/*
    Esta funcion es para guardar los datos en el mismo host donde
    se encuentra corriendo el servidor (localhost, heroku...)
*/
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
/*
    Esta funcion es para obtener los datos en el mismo host donde
    se encuentra corriendo el servidor (localhost, heroku...)
*/
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
// Actualizar una imagen hacia claudinary
export const actualizarImagenCloudinary 
    = async ( req = request, res = response ) => 
{
    // configurar cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    const modelo = req.coleccion;

    // limpiar imagenes previas
    if ( modelo.img ) {        
        const index = modelo.img.lastIndexOf( '/' )

        const nombreArr = modelo.img.substring( index + 1 );
        const public_id = nombreArr.substring( 0, nombreArr.lastIndexOf('.') );
        
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;

    try {

        // subir la imagen a cloudinary
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        modelo.img = secure_url;

        // guardar el modelo en mongo
        await modelo.save();

        res.json( modelo );
    } catch (error) {
        res.json( { error } )
    }

}
// -----------------------------------------------------
// obtener la imagen desde claudinary
export const mostrarImagenCloudinary = async ( req = request, res = response ) => {
    const modelo = req.coleccion;

    if ( modelo.img ) {        
        return res.redirect( modelo.img );
    }

    const __dirname = path.resolve();
    
    const pathPlaceholder = path.join( __dirname, '/assets/no-image.jpg' );
    res.sendFile( pathPlaceholder );
}
// -----------------------------------------------------

