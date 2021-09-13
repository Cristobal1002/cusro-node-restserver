require('dotenv').config();
const express = require('express');
const cors = require('cors');


const { dbConnection } = require('../database/config');


class Server {

    constructor(){ 

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conexión a base de datos
        this.conexionDB();

        //Middlewares: Funciones que swe ejecuntan cuando levanta mi servidor
        this.middlewares();


        //Rutas de mi aplicación
        this.routes();

    }

    async conexionDB() {

        await dbConnection();

    }

    middlewares() {

        //CORS
        this.app.use( cors() )

        //Lectura y parseo del body
        this.app.use( express.json() )

        //Conf de directorio publico
        this.app.use( express.static('public') )

    }

    routes(){
        
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen(){

        this.app.listen( this.port, () => {
            console.log('Sevidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;