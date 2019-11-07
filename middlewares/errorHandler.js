module.exports = (err, req, res, next) => {
  let status
  let message

  switch (err.name) {
    case 'AuthenticationError':
      status = 401;
      message = err.message
      break;
    case 'ValidationError':
      status = 400
      let arr = []
      for (const key in err.errors) { arr.push(err.errors[key].message) }
      message = arr
      break;
    case 'JsonWebTokenError':
      status = 401
      message = err.message
      break;
    default:
      status = err.status || 500
      message = err.message || err.msg || 'Internal Server Error'
      break;
  }
  res.status(status).json(message)
  // console.log(err);
  // if(err.msg == 'authen') {
  //   res.status(401).json({msg: 'Authentication Error'})
  // } else if(err.code == 11000) {
  //   res.status(403).json({msg: 'Duplicate deteced!'})
  // } else if(err.errors && err.errors.username) {
  //   res.status(400).json({msg: err.errors.username.message});
  // } else if(err.errors && err.errors.email) {
  //   res.status(400).json({msg: err.errors.email.message});
  // } else if(err.errors && err.errors.password) {
  //   res.status(400).json({msg: err.errors.password.message});
  // } else if(err.msg == 'wrong') {
  //   res.status(403).json({msg: 'email/password wrong'})
  // }
  // else {
  //   res.status(500).json({msg: 'Internal Server Errror'})
  // }
}