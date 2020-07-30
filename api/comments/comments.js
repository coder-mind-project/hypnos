const rp = require('request-promise')

const Comment = require('../../config/database/schemas/Comment')
const { captcha } = require('../../config/environments')

module.exports = app => {
  const { url, secretKey } = captcha

  const { errorComments } = app.api.managementHttpResponse

  const { exists, validateEmail, validateLength } = app.config.validation

  const sendComment = async (req, res) => {
    /*
            Persiste o comentário do usuário a partir de um artigo
        */

    try {
      const cRequest = { ...req.body }

      exists(cRequest.userName, 'É necessário informar um nome')
      validateEmail(cRequest.userEmail, 'É necessário informar um e-mail de contato válido')
      exists(cRequest.comment, 'É necessário informar o comentário')
      validateLength(cRequest.userName, 50, 'bigger', 'Para o nome é somente permitido 50 caracteres')
      validateLength(cRequest.userEmail, 80, 'bigger', 'Para o email é somente permitido 80 caracteres')
      validateLength(cRequest.comment, 1000, 'bigger', 'Para o comentário é somente permitido 1000 caracteres')

      const endpoint = `${url}?secret=${secretKey}&response=${cRequest.response}`

      await rp({ method: 'POST', uri: endpoint, json: true }).then(response => {
        if (!response.success) throw 'Captcha inválido'
      })

      const comment = new Comment({
        ...cRequest
      })

      comment.save().then(() => res.status(201).send('Comentário salvo com sucesso'))
        .catch(error => {
          throw error
        })
    } catch (error) {
      error = await errorComments(error)
      return res.status(error.code).send(error.msg)
    }
  }

  /* Obtém os comentários confirmados pelo artigo */
  const getComments = async (_id, page, limit) => {
    try {
      if (!limit) limit = 10
      if (!page) page = 1

      if (limit > 10) limit = 10

      if (!_id) throw 'Artigo não informado'

      /* Obtém a quantidade de comentários que não sejam respostas */
      let count = await Comment.aggregate([
        {
          $match:
                    {
                      $and: [
                        { 'article._id': { $regex: `${_id}`, $options: 'i' } },
                        { confirmed: true },
                        { answerOf: null }
                      ]
                    }
        }
      ]).count('id')

      count = count.length > 0 ? await count.reduce(item => item).id : 0

      /* Obtém os comentários do artigo */
      let comments = await Comment.aggregate([
        {
          $match:
                    {
                      $and: [
                        { 'article._id': { $regex: `${_id}`, $options: 'i' } },
                        { confirmed: true }
                      ]
                    }
        },
        { $sort: { created_at: -1 } }
      ]).skip(page * limit - limit).limit(limit)

      const noAnswers = comments.filter((comment) => Boolean(!comment.answerOf))

      comments.map(comment => {
        if (comment.answerOf) {
          noAnswers.map(answer => {
            if (comment.answerOf._id == answer._id) {
              if (Array.isArray(answer.answers)) {
                answer.answers.push(comment)
              } else {
                answer.answers = [comment]
              }
            }
          })
        }

        return comment
      })

      comments = noAnswers
      return { comments, count, status: true }
    } catch (error) {
      return { error, count: 0, status: false }
    }
  }

  /* Responsável por obter os comentários que são respostas de outros comentários */
  const getAnswers = async (req, res) => {
    try {
      let limit = parseInt(req.query.limit) || 10

      const _id = req.params.id
      const page = parseInt(req.query.page) || 1

      if (limit > 100) limit = 10

      if (!_id) throw 'Artigo não informado'

      Comment.aggregate([
        {
          $match: {
            'answerOf._id': _id
          }
        }
      ]).skip(page * limit - limit)
        .limit(limit)
        .then(comments => res.json(comments))
    } catch (error) {
      error = await errorComments(error)
      return res.status(error.code).send(error.msg)
    }
  }

  const get = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10
      const page = parseInt(req.query.page) || 1
      const articleId = req.query.article || ''

      if (!articleId) throw 'Artigo não informado'

      const comments = await getComments(articleId, page, limit)

      return res.json(comments)
    } catch (error) {
      error = await errorComments(error)
      return res.status(error.code).send(error.msg)
    }
  }

  return { sendComment, getComments, getAnswers, get }
}
