const { response, request } = require('express');//Truquini de perrazaso para que me ayude con el tipado
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validarEmail } = require('../helpers/db-validator');


const getUsuarios = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const filtro = { estado: true }
    /*const usuarios = await Usuario.find(filtro)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(filtro);*/ //Manera que funciona pero no es la más apropiada

    //Aquí con los corchetes desestructure el arreglo sacando un resultado como total y el otro como usuarios
    const [total, usuarios] = await Promise.all([ //Este promise,all se usa para que los await de las funciones que estan adentro se ejecuten simultaneas, si alguna de las dos funciones falla vota error
        Usuario.countDocuments(filtro),
        Usuario.find(filtro)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const postUsuarios = async (req, res) => {



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol }); //Se crea una instancia de la clase de usuario y le mando como parametro el body

    //Encriptar contraseña *salt es el tipo de vueltas que se da para hacer más dificil la encriptación
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API - Controlador',
        usuario
    })
}

const putUsuarios = async (req, res) => {

    const { id } = req.params; //lo desestructuré por si quiero mandar varios pero pudo ser solo id y quearía id = req.params.id
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO Validar id contra la base de datos


    //Volver a encriptar
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}


const deleteUsuarios = async (req, res) => {

    const { id } = req.params;

    //Borrado Físico, No recomendado, puede causar errores relacionales si el usuario ha realizado alguna transaccion
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado lógico
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});


    res.json({
        usuario
    })
}


module.exports = {
    //Use así porque voy a exportar muchos controladores
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios

}