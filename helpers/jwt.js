const jwt = require('jsonwebtoken');

function signToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET)
}
function decodeToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports ={
    signToken,
    decodeToken
}