const Post = require('../models/posting')

class PostController {
  static findAll(req, res, next) {
    Post.find().populate('userId')
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(next)
  }

  static myPost(req, res, next) {
    let userId = req.loggedUser.id
    Post.find().populate('userId')
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(next)
  }

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

    Post.findByIdAndUpdate(idPost, { caption: newCaption }, { new: true, })
      .then(respon => {
        res.status(200).json(respon)
      })
      .catch(next)
  }
  static likeUnlikePost (req, res, next) {
    const id = req.params.id;
    const loginUser = req.loggedUser.id
    let pass = true
    Post.findById(id)
      .then(post => {
        for(let i=0; i<post.Likes.length; i++) {
          if(post.Likes[i] == req.loggedUser.id) pass = false;
        }
        if(!pass) {
          return post.findByIdAndUpdate(id, {$pull: {Likes: loginUser}});
        } else {
          return post.findByIdAndUpdate(id, {$push: {Likes: loginUser}});
        }
      })
      .then(() => {
        if(!pass) res.status(200).json({msg: 'UnLike'})
        else res.status(200).json({msg: 'Like'})
      })
      .catch(next)
  }

  static postComment (req, res, next) {
    const username = req.loggedUser.username;
    const id = req.params.id;
    const comment = req.body.comment
    const payload = {
      username,
      comment
    }
    Post.findByIdAndUpdate(id, {$push: {comments: payload}}, {new: true})
      .then(post => {
        res.status(200).json({post})
      })
      .catch(next)
  }
}

module.exports = PostController