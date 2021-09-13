const { validationResult } = require('express-validator');

const validarCampos = (req , res, next) => { //Como es un middleware tiene untercer argumento y es next, es lo que llamo si el middleware pasa

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();

}

module.exports = {
    validarCampos
}