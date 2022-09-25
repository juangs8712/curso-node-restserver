import express from 'express';
import cors from 'cors';

import userRouter from '../routes/usuarios.js';
import { authRouter } from '../routes/auth.js';

import { dbConnection } from '../database/config.js';

export default class Server{
    // -----------------------------------------------------
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath =     '/api/auth';

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
    }

    // -----------------------------------------------------
    routes(){
        this.app.use( this.authPath, authRouter );
        this.app.use( this.usuariosPath, userRouter );
    }
    // -----------------------------------------------------
    listen(){
        this.app.listen( this.port, () =>{
            console.log( 'Servidor corriendo en puerto: ', this.port );
        })
    }
    // -----------------------------------------------------
}