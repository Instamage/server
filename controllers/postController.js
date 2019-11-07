const Post = require('../models/posting')

class PostController {
  static addPost(req, res, next) {
    let userId = req.loggedUser.id
    let { caption } = req.body
    let image_url = req.file.cloudStoragePublicUrl

    Post.create({
      userId, caption, image_url
    })
      .then(post => {
        res.status(201).json(post)
      })
      .catch(next)
  }

  static editCaption(req, res, next) {
    let idPost = req.params.id
    let newCaption = req.body.caption

    Post.findByIdAndUpdate(idPost, { caption: newCaption })
      .then(respon => {
        res.status(200).json(respon)
      })
      .catch(next)
  }
}

module.exports = PostController