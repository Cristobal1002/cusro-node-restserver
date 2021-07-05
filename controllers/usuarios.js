const { response, request } = require('express');//Truquini de perrazaso para que me ayude con el tipado

const getUsuarios = (req = request, res = response) => {

    const { id, nombre = 'No Name', page = 1, limit = 10  } = req.query;

    res.json({
        msg: 'get API - Controlador',
        id,
        nombre,
        page,
        limit
    })
}

const postUsuarios = (req, res) => {

    const body = req.body;

    res.json({
        msg: 'post API - Controlador',
        body
    })
}

const putUsuarios = (req, res) => {

    const { id } = req.params; //lo desestructuré por si quiero mandar varios pero pudo ser solo id y quearía id = req.params.id

    res.json({
        msg: 'put API - Controlador',
        id
    })
}


const deleteUsuarios = (req, res) => {
    res.json({
        msg: 'delete API - Controlador'
    })
}


module.exports = {
    //Use así porque voy a exportar muchos controladores
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios

}