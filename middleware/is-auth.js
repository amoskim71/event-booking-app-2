const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuthorized = false;
    return next();
  }
  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token || token === '') {
    req.isAuthorized = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    req.isAuthorized = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuthorized = false;
    return next();
  }

  req.isAuthorized = true;
  req.userId = decodedToken.userId;
  next();
}