const Mongoose = require('mongoose')
const Schema = Mongoose.Schema;
const { hashPassword } = require('../helpers/hash');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required!']
  },
  email: {
    type: String,
    required: [true, 'email is required!'],
    validate: [validateEmail, 'Validation Email Error']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'password min 8 char']
  },
  Following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  Followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  profile_img: String
})

UserSchema.pre('save', function(next) {
  this.password = hashPassword(this.password);
  this.profile_img = 'https://storage.cloud.google.com/newminiwp/157310485641659162520-blanco-perfil-de-usuario-icono-en-el-boto%CC%81n-negro-aislado-en-blanco.jpg?authuser=1';
  this.Following = [];
  this.Followers = [];
  next()
})

const User = Mongoose.model('users', UserSchema);

module.exports = User;