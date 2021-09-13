const { response, request } = require('express');

const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const validarRol = async (rol = '') => {
    const valRol = await Role.findOne({ rol });

    if (!valRol) {
        throw new Error(`El rol ${rol} no existe en la base de datos`) //Así se usa el error personalizado del custom de express validator
    }

}

const validarEmail = async (correo = '') => {

    const valCorreo = await Usuario.findOne({ correo });
    if (valCorreo) {
        throw new Error(`El correo ${correo} ya se encuentra registrado`)
    }
}

const validarUsuarioPorId = async (id ) => {

    const valId = await Usuario.findById( id );
    if (!valId) {
        throw new Error(`El Id: ${id} no se encuentra registrado`)
    }
}

module.exports = {
    validarRol,
    validarEmail,
    validarUsuarioPorId
}