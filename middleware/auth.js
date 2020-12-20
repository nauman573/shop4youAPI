const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user')


module.exports = async function (req, res, next) {
  try {
  const token = req.header('auth-token');
  
  if (!token) return res.status(401).send('Access denied : token was not provided.');

  
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    const user = await User.findOne({email: decoded.email})
    req.user = user;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}