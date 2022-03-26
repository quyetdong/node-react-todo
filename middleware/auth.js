import jwt from 'jsonwebtoken';

const config = process.env;

export default function verifyToken (req, res, next) {
  let token = req.body.token || req.query.token || 
    req.headers["x-access-token"] ||
    req.header("authorization");

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
