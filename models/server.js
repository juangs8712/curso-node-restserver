import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { 
    authRouter,
    categoryRouter, 
    productRouter,
    searchRouter,
    uploadsRouter,
    userRouter 
}from '../routes/index.js';

import { dbConnection } from '../database/config.js';

export default class Server{
    // -----------------------------------------------------
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:     '/api/auth',
            category: '/api/categorias',
            search:   '/api/buscar',
            product:  '/api/productos',
            uploads:  '/api/uploads',
            user:     '/api/usuarios',
        }

        // conectar a base de datos
        this.conectarDB();

        // middlewares
        this.middlewares();

        // rutas de mi applicacion
        this.routes();
    }

    // -----------------------------------------------------
    async conectarDB(){
        await dbConnection();
    }
    // -----------------------------------------------------
    middlewares(){
        // CORS
        this.app.use( cors() );

        // parseo y lectura del body
        // con esto especifico que el body viene en formato json
        this.app.use( express.json() );   

        // directorio publico
        this.app.use( express.static( 'public' ) );

        // File upload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    // -----------------------------------------------------
    routes()  {
        this.app.use( this.path.auth,     authRouter );
        this.app.use( this.path.category, categoryRouter );
        this.app.use( this.path.product,  productRouter );
        this.app.use( this.path.search,   searchRouter );
        this.app.use( this.path.uploads,  uploadsRouter );
        this.app.use( this.path.user,     userRouter );
    }
    // -----------------------------------------------------
    listen(){
        this.app.listen( this.port, () =>{
            console.log( 'Servidor corriendo en puerto: ', this.port );
        })
    }
    // -----------------------------------------------------
}