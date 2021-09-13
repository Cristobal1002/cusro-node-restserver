const mongoose = require('mongoose');


const dbConnection = async () => {

    const urldb = process.env.MONGODB_CONECT

    try {//Siempre es bueno que hagamos un try catch cuando sea una conexion a un lugar del cual no tengo el control absoluto

        mongoose.connect( urldb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } );

        console.log('Base de datos OnLine');
        
    } catch (error) {

        console.log(error);
        throw new Error('Error de conexión a la base de datos')

    }

}

module.exports = {
    dbConnection
}