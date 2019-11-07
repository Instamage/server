const User = require('../models/user');
const { comparePassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');
const mongoose = require('mongoose');

module.exports = {
  signup (req, res, next) {
    const { username, password, email } = req.body;
    User.create({ username, password, email })
      .then(user => {
        res.status(200).json({user})
      })
      .catch(next)
  },
  signin (req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if(user && comparePassword(password, user.password)){
          const payload = {
            id: user._id,
            username: user.username,
            email: user.email
          }
          const serverToken = signToken(payload);
          res.status(200).json({msg: 'Success Login', token: serverToken})
        } else {
          throw {msg: 'wrong'}
        }
      })
      .catch(next)
  },
  followingStatusFalse (req, res, next) { 
    console.log(req.params.id)
    const _id = req.params.id;
    User.findById({ _id })
      .then(user => {
        let pass = true;
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
        if(a.Followers.length == 0) {
          return User.findByIdAndUpdate({ _id }, {$push: {Following: targetId}})
        } else {
          return User.findByIdAndUpdate({ _id }, {$pull: {Following: targetId}})
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
  }
}