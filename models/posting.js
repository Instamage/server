const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  image_url: String,
  caption: String,
  Likes: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  comments: []
}, { timestamps: true })

PostSchema.pre('save', function(next){
  this.comments = [];
  this.Likes = [];
  next()
})

const Post = Mongoose.model('posts', PostSchema);

module.exports = Post;