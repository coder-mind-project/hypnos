/*  
    Aqui existem funções para validação de dados
*/

module.exports = app => {

    function exists(valor, msg){
        /*  Verifica existencia de dados para
            arrays, strings e valores numéricos
            Caso não exista é lançado uma excessão com a 
            mensagem de erro definida na função 
        */

        if(!valor) throw msg
        if(Array.isArray(valor) && valor.length === 0) throw msg
        if(typeof valor === 'string' && !valor.trim()) throw msg
    }

    function validateEmail(email, msg){
        /* Função que valida um e-mail digitado */

        exists(email, msg)
        if(!(email.includes('@') && email.includes('.'))) throw msg
    }

    function validateLength(value, length, method, msg){
        /*
        
            Função que valida o tamanho de uma string
            Atributo = Descrição - tipo
            value = string a ser testada - String
            length = Limite de caracteres - Number
            method = (padrão = 'bigger') Metodo de comparação - enum 'bigger', 'smaller' e 'biggerOrEqual'
            msg = (opcional) Mensagem a ser apresentada ao critério ser burlado
        
         */
        if(!method || (method !== 'bigger' && method !== 'smaller' && method !== 'biggerOrEqual')) method = 'bigger'
        
        switch(method){
            case 'bigger': {
                if(value.trim().length > length) throw msg || `Máximo permitido ${length} caracteres` 
                break
            }
            case 'smaller': {
                if(value.trim().length < length) throw msg || `Mínimo permitido ${length} caracteres` 
                break
            }
            case 'biggerOrEqual': {
                if(value.trim().length >= length) throw msg || `Máximo permitido ${length - 1} caracteres` 
                break
            }
        }
    }

    return { exists, validateEmail, validateLength }
}