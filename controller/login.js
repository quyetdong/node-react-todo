import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../model/user.js';

export default async function (req, res) {
  // our login logic goes here
  try {
    // get user input
    const { email, password } = req.body;

    // validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required.');
    }

    // validate if user exist in our database, response user infor
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      user.token = token;
      return res.status(200).json(user);
    }

    // if user not exist, response error
    res.status(400).send('Invalid credentials.');
  } catch (err) {
    res.status(400).send(err.message);
  }
}
