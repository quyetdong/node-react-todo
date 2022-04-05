import bcrypt from 'bcryptjs';

import User from '../model/user.js';
import createToken from '../lib/createToken.js';

export const getUser = async (body) => {
  const result = {
    status: 300,
    message: '',
    data: null,
  };
  // get user input
  const { email, password } = body;

  // validate user input
  if (!(email && password)) {
    result.status = 400;
    result.message = 'All input is required';

    return result;
  }

  // validate if user exist in our database, response user infor
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // create token
    const token = createToken({ id: user._id, email });

    user.token = token;
    result.status = 200;
    result.data = user;
  }
  else {
    result.status = 400;
    result.message = 'Invalid credentials'
  }

  return result;
};

export const createUser = async (body) => {
  const result = {
    status: 300,
    message: '',
    data: null,
  };
  const { first_name, last_name, email, password } = body;

  // Validate user input
  if (!(email && password && first_name && last_name)) {
    result.status = 400;
    result.message = 'All input is required';

    return result;
  }

  // Validate if use exist in the database
  const oldUser = await User.findOne({ email })

  // if use exist, response with status code 409
  if (oldUser) {
    result.status = 409;
    result.message = 'User already exist. Please login';

    return result;
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
  // return new user 
  result.status = 201;
  result.data = user;

  return result;
}
