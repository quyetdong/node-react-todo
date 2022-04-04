import bcrypt from 'bcryptjs';

import User from '../model/user.js';
import createToken from '../lib/createToken.js';

export default async function (req, res) {
  // our register logic goes here...
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // Validate if use exist in the database
    const oldUser = await User.findOne({ email })

    // if use exist, response with status code 409
    if (oldUser) {
      res.status(409).send('User already exist. Please login.');
    }

    // if use not exist, continue
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
    });

    // create token
    const token = createToken({ id: user._id, email });

    // save user token
    user.token = token;
    // await user.save();

    // return new user 
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
