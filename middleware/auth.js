import jwt from 'jsonwebtoken';
import createToken from '../lib/createToken.js';

const config = process.env;

export default function verifyToken (req, res, next) {
  let user = req.user || {};
  let token = req.body.token || req.query.token || 
    req.headers["x-access-token"] ||
    req.header("authorization") || user.token;

  if (!token && req.user) {
    token = createToken({ id: req.user._id, email: req.user.email });
    req.user.token = token;
  }
  
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  else if (token.startsWith("Bearer ")) {
    token = token.substring(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    res.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
}
