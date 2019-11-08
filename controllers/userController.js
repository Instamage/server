const User = require('../models/user')
const { comparePassword, hashPassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');
const mongoose = require('mongoose');
const gcsDelete = require('../helpers/gcsDelete')

module.exports = {
  findUser (req, res, next) {
    User.find()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  },
  signup (req, res, next) {
    const { username, password, email } = req.body;
    User.create({ username, password, email })
      .then(user => {
        const payload = {
          id: user._id,
          username: user.username,
          email: user.email
        }
        const serverToken = signToken(payload);
        res.status(200).json({username: user.username, token: serverToken,
          image_url: user.image_url})
      })
      .catch(next)
  },
  signin (req, res, next) {
    const { identity, password } = req.body;
    User.findOne({ $or: [{ username: identity }, { email: identity }] })
      .then(user => {
        if(user && comparePassword(password, user.password)){
          const payload = {
            id: user._id,
            username: user.username,
            email: user.email
          }
          const serverToken = signToken(payload);
          res.status(200).json({msg: 'Success Login', token: serverToken,
          image_url: user.profile_img, username: user.username})
        } else {
          next({ status: 400, msg: {msg:'email/password wrong'}})
        }
      })
      .catch(next)
  },
  followingStatusFalse (req, res, next) {
    const _id = req.params.id;
    let pass = true
    User.findById({ _id })
      .then(user => {
        for(let i=0; i<user.Followers.length; i++) {
          if(user.Followers[i] == req.loggedUser.id) {
            pass = false
          }
        }
        let id = new mongoose.Types.ObjectId(req.loggedUser.id)
        if(!pass) {
          return User.findByIdAndUpdate({ _id }, {$pull: {Followers: id}})
        } else {
          return User.findByIdAndUpdate({ _id }, {$push: {Followers: id}})
        }
      })
      .then((a) => {
        let _id = new mongoose.Types.ObjectId(req.loggedUser.id);
        let targetId = new mongoose.Types.ObjectId(req.params.id);
        if(!pass) {
          return User.findByIdAndUpdate({ _id }, {$pull: {Following: targetId}})
        } else {
          return User.findByIdAndUpdate({ _id }, {$push: {Following: targetId}})
        }
      })
      .then((a) => {
        if(a.Following.length == 0) {
          res.status(200).json({msg: 'Following Success!'})
        } else {
          res.status(200).json({ msg: 'Unfollowing Success' })
        }
      })
      .catch(next)
  },
  updateImage (req, res, next) {
    let image_url = req.file.cloudStoragePublicUrl
    let _id = req.loggedUser.id;
    User.findById(_id)
      .then(user => {
        gcsDelete(user.profile_img)
        return User.findByIdAndUpdate(_id, {profile_img: image_url}, {new: true})
      })
      .then((user) => {
        res.status(200).json({user})
      })
      .catch(next)
  },
  changePassword (req, res, next) {
    const id = req.loggedUser.id;
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    User.findById(id)
      .then(user => {
        if(user && comparePassword(oldPassword, user.password)) {
          const hashpass = hashPassword(newPassword)
          return User.findByIdAndUpdate(id, {password: hashpass}, {new: true})
        } else {
          throw { status: 400, msg: 'wrong old password'}
        }
      })
      .then((user) => {
        res.status(200).json({user})
      })
      .catch(next)
  }
}