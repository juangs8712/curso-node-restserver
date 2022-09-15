import express from 'express';
import cors from 'cors';

import router from '../routes/usuarios.js';

export default class Server{
    // -----------------------------------------------------
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // middlewares
        this.middlewares();

        // rutas de mi applicacion
        this.routes();
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
        this.app.use( this.usuariosPath, router);
    }
    // -----------------------------------------------------
    listen(){
        this.app.listen( this.port, () =>{
            console.log( 'Servidor corriendo en puerto: ', this.port );
        })
    }
    // -----------------------------------------------------
}