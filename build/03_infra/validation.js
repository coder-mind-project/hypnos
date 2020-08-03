"use strict";
module.exports = function (app) {
    function exists(valor, msg) {
        if (!valor)
            throw msg;
        if (Array.isArray(valor) && valor.length === 0)
            throw msg;
        if (typeof valor === 'string' && !valor.trim())
            throw msg;
    }
    function validateEmail(email, msg) {
        exists(email, msg);
        if (!(email.includes('@') && email.includes('.')))
            throw msg;
    }
    function validateLength(value, length, method, msg) {
        if (!method || (method !== 'bigger' && method !== 'smaller' && method !== 'biggerOrEqual'))
            method = 'bigger';
        switch (method) {
            case 'bigger': {
                if (value.trim().length > length)
                    throw msg || "M\u00E1ximo permitido " + length + " caracteres";
                break;
            }
            case 'smaller': {
                if (value.trim().length < length)
                    throw msg || "M\u00EDnimo permitido " + length + " caracteres";
                break;
            }
            case 'biggerOrEqual': {
                if (value.trim().length >= length)
                    throw msg || "M\u00E1ximo permitido " + (length - 1) + " caracteres";
                break;
            }
        }
    }
    return { exists: exists, validateEmail: validateEmail, validateLength: validateLength };
};
