module.exports = app => {
  const errorMessages = (error) => {
    const customError = {
      code: 500,
      msg: 'Ocorreu um erro interno, se persistir resporte'
    }

    if (error.trim() === '') return customError

    switch (error) {
      case 'Você precisa digitar uma mensagem/pergunta primeiro':
      case 'E-mail inválido, verifique se seu e-mail está correto': {
        customError.code = 400
        break
      }
      default: {
        if (typeof error === 'string' && error.includes('Máximo permitido')) {
          customError.code = 400
        }
      }
    }

    customError.msg = error

    return customError
  }

  const errorComments = (error) => {
    const customError = {
      code: 500,
      msg: 'Ocorreu um erro interno, se persistir resporte'
    }

    if (error.trim() === '') return customError

    switch (error) {
      case 'Artigo não informado': {
        customError.code = 404
        break
      }
      case 'É necessário informar um nome':
      case 'É necessário informar um e-mail de contato válido':
      case 'Captcha inválido': {
        customError.code = 400
        break
      }
      default: {
        if (typeof error === 'string' && error.includes('somente permitido')) {
          customError.code = 400
        }
      }
    }

    customError.msg = error

    return customError
  }

  const errorLikes = (error) => {
    const customError = {
      code: 500,
      msg: 'Ocorreu um erro interno, se persistir resporte'
    }

    if (typeof error === 'string' && error.trim() === '') return customError

    switch (error) {
      case 'Não conseguimos te identificar, por acaso esta usando uma VPN?': {
        customError.code = 401
      }
    }

    customError.msg = error
  }

  return { errorMessages, errorComments, errorLikes }
}
