const { decodeToken } = require('../helpers/jwt')
const Post = require('../models/posting')

function authentication(req, res, next) {
  try {
    let token = req.headers.token
    let decode = decodeToken(token)
    req.loggedUser = decode
    next()
  } catch (err) {
    next(err)
  }
}

function authorization(req, res, next) {
  let { id } = req.loggedUser
  let idPost = req.params.id
  Post.findById(idPost)
    .then(post => {
      if (post.userId == id) {
        next()
      } else[
        next({ status: 401, msg: `You are not Authorized!` })
      ]
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { authentication, authorization }