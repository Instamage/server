const { decodeToken } = require('../helpers/jwt')
const User = require('../models/user');
const Post = require('../models/posting')

function authentication(req, res, next) {
  try {
    if(req.headers.token) {
      const decode = decodeToken(req.headers.token);
      User.findById(decode.id)
        .then(user => {
          if(user) {
            req.loggedUser = decode;
            next()
          }
        })
    } else {
      throw {status: 401, msg: 'Authentication Error'}
    }
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