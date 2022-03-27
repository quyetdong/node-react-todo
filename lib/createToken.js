import jwt from 'jsonwebtoken';

export default function (user) {
  return jwt.sign(
    { user_id: user.id, email: user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
}
